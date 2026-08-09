import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Revalidation endpoint for Sanity webhooks.
 *
 * Called by Sanity whenever a `page` document is created, updated, or
 * deleted. Guarded by TRIGGER_SECRET_KEY (already configured in Vercel
 * env vars). Publishes content to the live site without a redeploy.
 */
export async function POST(request: Request) {
  const secret = process.env.TRIGGER_SECRET_KEY;
  const headerSecret =
    request.headers.get("x-trigger-secret") ??
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");

  if (!secret || headerSecret !== secret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  try {
    // Sanity webhook payloads: {_id, _type, slug: {current}, _rev, ...}
    // Accept the raw document body (Sanity posts the document directly) OR
    // a wrapped {slug} / {document: {...}} shape.
    let slug: string | undefined;
    try {
      const body = (await request.json()) as Record<string, unknown>;

      const doc = (body.document ?? body) as Record<string, unknown>;
      const rawSlug = doc.slug as
        | string
        | { current?: string }
        | undefined;

      if (typeof rawSlug === "string") {
        slug = rawSlug;
      } else if (rawSlug && typeof rawSlug.current === "string") {
        slug = rawSlug.current;
      }

      // _id fallback: "drafts.page-home" or "page-home" -> home "/"
      if (!slug && typeof doc._id === "string") {
        const id = doc._id.replace(/^drafts\./, "");
        slug = id.startsWith("page-") ? "/" : undefined;
      }
    } catch {
      // Body is optional - revalidate the whole site on webhook ping.
    }

    revalidatePath("/");
    if (slug && slug !== "/") {
      revalidatePath(`/${slug.replace(/^\/+|\/+$/g, "")}`);
    }

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
