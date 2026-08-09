import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

import { sanityEnv } from "@/sanity/lib/env";

/**
 * Approve & Sync to Production.
 *
 * Copies a document from the current (staging) dataset into the production
 * dataset with the same _id, ready for the production site to pick up after
 * its own revalidation. The Studio action posts {_id, _type}; this route
 * does the actual cross-dataset copy using the server-side write token so
 * the token never ships to the browser.
 *
 * Only the fields in `PUBLISHABLE_FIELDS` are copied (safe subset), and a
 * server-side secret gate protects the route from public access.
 */

const PRODUCTION_DATASET = "production";
const PRODUCTION_PROJECT_ID = sanityEnv.projectId;

const PUBLISHABLE_FIELDS = [
  "_type",
  "title",
  "slug",
  "metaTitle",
  "metaDescription",
  "noindex",
  "ogImage",
  "sections",
  "siteName",
  "organizationLegalName",
  "logo",
  "favicon",
  "openGraphImage",
  "headerCtaLabel",
  "headerCtaUrl",
  "headerNavItems",
  "footerPoweredByText",
  "footerCopyrightText",
  "footerLegalLinks",
  "socialLinks",
  "announcement",
  "primaryTelegramCtaUrl",
  "freeAuditCtaUrl",
];

/**
 * Recursively collect every `asset._ref` (sanity.imageAsset ids) referenced
 * anywhere in a document - including inside image objects, arrays, and
 * nested objects.
 */
function collectAssetRefs(value: unknown, found = new Set<string>()): string[] {
  if (!value || typeof value !== "object") return [...found];
  if (Array.isArray(value)) {
    for (const item of value) collectAssetRefs(item, found);
    return [...found];
  }
  const obj = value as Record<string, unknown>;
  const asset = obj.asset as { _ref?: string } | undefined;
  if (obj._type === "image" && typeof asset?._ref === "string") {
    found.add(asset._ref);
  }
  if (obj._type === "file" && typeof asset?._ref === "string") {
    found.add(asset._ref);
  }
  for (const key of Object.keys(obj)) {
    if (key.startsWith("_")) continue;
    collectAssetRefs(obj[key], found);
  }
  return [...found];
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-sync-secret") ?? "";
  if (sanityEnv.studioSyncSecret && secret !== sanityEnv.studioSyncSecret) {
    return NextResponse.json({ ok: false, error: "Invalid sync secret" }, { status: 401 });
  }

  let body: { _id?: string; _type?: string };
  try {
    body = (await request.json()) as { _id?: string; _type?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const { _id, _type } = body ?? {};
  if (!_id || !_type) {
    return NextResponse.json({ ok: false, error: "_id and _type required" }, { status: 400 });
  }

  const writeToken = sanityEnv.writeToken;
  if (!writeToken) {
    return NextResponse.json(
      { ok: false, error: "SANITY_API_WRITE_TOKEN not configured on server" },
      { status: 500 },
    );
  }

  // Source client reads from the current dataset (staging in dev/preview).
  const source = createClient({
    projectId: PRODUCTION_PROJECT_ID,
    dataset: sanityEnv.dataset,
    apiVersion: sanityEnv.apiVersion,
    useCdn: false,
    token: writeToken,
  });

  // Target client writes to the production dataset.
  const target = createClient({
    projectId: PRODUCTION_PROJECT_ID,
    dataset: PRODUCTION_DATASET,
    apiVersion: sanityEnv.apiVersion,
    useCdn: false,
    token: writeToken,
  });

  try {
    const doc = await source.getDocument(_id);
    if (!doc) {
      return NextResponse.json(
        { ok: false, error: `Document ${_id} not found in ${sanityEnv.dataset}` },
        { status: 404 },
      );
    }

    const publishable: Record<string, unknown> = { _id, _type };
    for (const field of PUBLISHABLE_FIELDS) {
      if (field in doc && doc[field as keyof typeof doc] !== undefined) {
        publishable[field] = doc[field as keyof typeof doc];
      }
    }

    // Image assets are dataset-scoped in Sanity. Copy every referenced
    // sanity.imageAsset into the target dataset first (same _id), so the
    // document's image refs don't dangle after the sync.
    const assetIds = collectAssetRefs(publishable);
    const copiedAssets: string[] = [];
    for (const assetId of assetIds) {
      const assetDoc = await source.getDocument(assetId);
      if (assetDoc && assetDoc._type === "sanity.imageAsset") {
        // createOrReplace with the same _id makes the target CDN serve it
        // without re-upload; Sanity generates the url/fields on the target.
        await target.createOrReplace({
          _id: assetId,
          _type: "sanity.imageAsset",
          originalFilename: assetDoc.originalFilename ?? "",
          extension: assetDoc.extension ?? "jpg",
          mimeType: assetDoc.mimeType ?? "image/jpeg",
          metadata: assetDoc.metadata ?? {},
        });
        copiedAssets.push(assetId);
      }
    }

    await target.createOrReplace(publishable as never);

    // Trigger production revalidation (harmless if prod URL is not deployed yet).
    const prodRevalidate = process.env.NEXT_PUBLIC_PROD_URL ?? "https://www.promptraise.com";
    try {
      await fetch(`${prodRevalidate}/api/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-trigger-secret": process.env.TRIGGER_SECRET_KEY ?? "",
        },
        body: JSON.stringify({ slug: normalizeSlugForRevalidate(publishable) }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      // Production may not be deployed yet - never fail the sync for that.
    }

    return NextResponse.json({
      ok: true,
      synced: { _id, _type },
      dataset: PRODUCTION_DATASET,
    });
  } catch (error) {
    console.error("Sync to production failed:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 },
    );
  }
}

function normalizeSlugForRevalidate(doc: Record<string, unknown>): string {
  const slug = doc.slug as { current?: string } | undefined;
  if (doc._type === "siteSettings") return "/";
  const s = slug?.current?.replace(/^\/+|\/+$/g, "");
  return s ? `/${s}` : "/";
}