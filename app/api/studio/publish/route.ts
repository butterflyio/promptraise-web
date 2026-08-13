import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

import { sanityEnv } from "@/sanity/lib/env";

/**
 * Auto-Publish on Save (whitelist below).
 *
 * Studio's save flow only writes to the DRAFT document (drafts.<id>). The
 * live site renders the PUBLISHED document (<id>), so edits stay invisible
 * until someone clicks Publish. This route closes that gap for GLOBAL
 * SETTINGS ONLY: it reads the draft (unpublished edits included), writes the
 * publishable fields over the published document in the SAME dataset, then
 * triggers site revalidation - so a CMS save is reflected on the main site
 * automatically, no manual Publish / Approve & Sync step needed.
 *
 * Only `AUTOPUBLISH_TYPES` are accepted. Content that must be deliberately
 * published (blog posts, glossary, pages, home) is rejected here so it stays
 * gated behind the Studio Publish button - never auto-promoted.
 *
 * The write token and trigger secret stay server-side; the client only posts
 * {_id, _type} gated by the x-sync-secret header (same pattern as the
 * existing sync route).
 */

/** Only these doc types auto-publish on save. Everything else is manual. */
const AUTOPUBLISH_TYPES = ["siteSettings"];

const PUBLISHABLE_FIELDS = [
  "_type",
  "title",
  "slug",
  "metaTitle",
  "metaDescription",
  "noindex",
  "ogImage",
  "sections",
  "body",
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

/** Map a published doc _type to the site path that needs revalidating. */
function revalidatePathFor(doc: {
  _type: string;
  slug?: { current?: string };
}): string {
  if (doc._type === "siteSettings") return "/";
  const s = doc.slug?.current?.replace(/^\/+|\/+$/g, "");
  return s ? `/${s}` : "/";
}

export async function POST(request: Request) {
  // Validate against the SAME public secret the client action sends
  // (NEXT_PUBLIC_SANITY_STUDIO_SYNC_SECRET). This keeps the client pairing
  // consistent regardless of how the server-only counterpart is configured.
  const expectedSecret = process.env.NEXT_PUBLIC_SANITY_STUDIO_SYNC_SECRET ?? "";
  const secret = request.headers.get("x-sync-secret") ?? "";
  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json(
      { ok: false, error: "Invalid sync secret" },
      { status: 401 },
    );
  }

  let body: { _id?: string; _type?: string };
  try {
    body = (await request.json()) as { _id?: string; _type?: string };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const { _id, _type } = body ?? {};
  if (!_id || !_type) {
    return NextResponse.json(
      { ok: false, error: "_id and _type required" },
      { status: 400 },
    );
  }

  // Hard gate: only whitelisted types may auto-publish. Blog posts, glossary,
  // pages and home must go through the manual Publish button instead.
  if (!AUTOPUBLISH_TYPES.includes(_type)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Type "${_type}" is not auto-published; use the Publish button in Studio.`,
      },
      { status: 403 },
    );
  }

  const writeToken = sanityEnv.writeToken;
  if (!writeToken) {
    return NextResponse.json(
      { ok: false, error: "SANITY_API_WRITE_TOKEN not configured on server" },
      { status: 500 },
    );
  }

  const client = createClient({
    projectId: sanityEnv.projectId,
    dataset: sanityEnv.dataset,
    apiVersion: sanityEnv.apiVersion,
    useCdn: false,
    token: writeToken,
  });

  try {
    // Read the DRAFT (perspective: previewDrafts) so unpublished edits are
    // captured. Falls back to the published doc if no draft exists.
    const draft = await client.fetch(
      `*[_id in [$id, "drafts." + $id] && _type == $type][0]`,
      { id: _id, type: _type },
      { perspective: "previewDrafts" },
    );
    if (!draft) {
      return NextResponse.json(
        { ok: false, error: `Document ${_id} not found` },
        { status: 404 },
      );
    }

    const publishable: Record<string, unknown> = { _id, _type };
    for (const field of PUBLISHABLE_FIELDS) {
      if (field in draft && draft[field as keyof typeof draft] !== undefined) {
        publishable[field] = draft[field as keyof typeof draft];
      }
    }

    // Write over the published doc in the same dataset (auto-publish).
    await client.createOrReplace(publishable as never);

    // Match Sanity's Publish semantics: clear the draft so it no longer
    // appears as "unpublished changes" in Studio. Best-effort - a missing
    // draft is fine (nothing to delete).
    try {
      await client.delete(`drafts.${_id}` as never);
    } catch {
      // draft may already be gone
    }

    // Revalidate the site so the published change is served immediately.
    // Best-effort - never fail the publish if revalidation is unreachable.
    const origin = new URL(request.url).origin;
    const triggerSecret = process.env.TRIGGER_SECRET_KEY ?? "";
    try {
      await fetch(`${origin}/api/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-trigger-secret": triggerSecret,
        },
        body: JSON.stringify({
          slug: revalidatePathFor(publishable as {
            _type: string;
            slug?: { current?: string };
          }),
        }),
        signal: AbortSignal.timeout(10_000),
      });
    } catch {
      // revalidation is best-effort
    }

    return NextResponse.json({
      ok: true,
      published: { _id, _type },
      dataset: sanityEnv.dataset,
    });
  } catch (error) {
    console.error("Auto-publish failed:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Publish failed",
      },
      { status: 500 },
    );
  }
}
