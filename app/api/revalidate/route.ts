import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Revalidation endpoint for Sanity webhooks.
 *
 * Called by Sanity whenever a `page` document is created, updated, or
 * deleted. Guarded by TRIGGER_SECRET_KEY (already configured in Vercel
 * env vars). Publishes content to the live site without a redeploy.
 */

/**
 * Notify IndexNow (Bing, ChatGPT search, Yandex) that a page changed so it
 * is crawled within minutes instead of days. Only runs on the production
 * domain (the key file lives in /public/<key>.txt).
 */
async function pingIndexNow(slug?: string) {
  try {
    const key = process.env.INDEXNOW_KEY;
    if (!key) return;
    const prodUrl = process.env.NEXT_PUBLIC_SITE_URL;
    if (!prodUrl?.includes("promptraise.com") || prodUrl.includes("staging")) {
      return;
    }
    const root = new URL(prodUrl).origin;
    const target =
      slug && slug !== "/" ? `${root}/${slug.replace(/^\/+/, "")}` : root;
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(prodUrl).host,
        key,
        keyLocation: `${root}/${key}.txt`,
        urlList: [target],
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    // IndexNow is best-effort; never fail the webhook for it.
    console.error("IndexNow ping failed:", error);
  }
}

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
      const rawSlug = doc.slug as string | { current?: string } | undefined;

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
    // Sitemap + robots/llms.txt are dynamic; revalidate them too so new
    // pages and posts are crawled quickly. Blog routes get revalidated on
    // any publish (cheap, matches revalidate=30 ISR behavior).
    revalidatePath("/sitemap.xml");
    revalidatePath("/robots.txt");
    revalidatePath("/llms.txt");
    revalidatePath("/blog");

    // Fire-and-forget IndexNow ping for fast indexing (Bing + ChatGPT).
    // Only when INDEXNOW_KEY is configured AND we're on the production URL
    // (staging must not submit URLs to the index).
    void pingIndexNow(slug);

    return NextResponse.json({ revalidated: true });
  } catch (error) {
    console.error("Revalidation failed:", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
