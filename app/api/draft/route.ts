import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import { sanityEnv } from "@/sanity/lib/env";

/**
 * Enables Next.js Draft Mode for Sanity Studio previews.
 *
 * Usage: /api/draft?slug=/&secret=<SANITY_PREVIEW_SECRET>
 * The Studio "Preview" action builds this URL. When the secret env is not
 * set (local dev), the check is skipped.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") ?? "/";
  const secret = searchParams.get("secret") ?? "";

  if (sanityEnv.previewSecret && secret !== sanityEnv.previewSecret) {
    return NextResponse.json(
      { ok: false, error: "Invalid preview secret" },
      { status: 401 },
    );
  }

  (await draftMode()).enable();
  const resolved = slug.startsWith("/") ? slug : `/${slug}`;
  // Draft content is not cached; force dynamic rendering for the path.
  return NextResponse.json(
    { ok: true, draft: true, redirect: resolved },
    { headers: { "x-draft-mode": "enabled" } },
  );
}

export async function POST(request: Request) {
  return GET(request);
}

export async function DELETE() {
  (await draftMode()).disable();
  return NextResponse.json({ ok: true, draft: false });
}