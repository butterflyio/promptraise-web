/**
 * Post slug redirects - 301 map for renamed blog posts.
 *
 * PURPOSE: When a published post's slug is changed (new SEO-targeted slug),
 * the old URL dies unless it 301s to the new one. Search engines and anyone
 * who shared the old link need the redirect or they hit a 404 (broken link,
 * lost authority, Google de-indexes old URLs).
 *
 * HOW TO USE:
 *   - Add one entry per renamed post: `"OLD-SLUG": "NEW-SLUG"`.
 *   - Order does not matter. Keys must be the OLD (previously indexed) slug.
 *   - This affects /blog/<slug> only. Post content is edited in Sanity.
 *   - After adding, deploy (Zain alone publishes prod) - Next.js redirects()
 *     is a build-time static config, so a deploy is required to go live.
 *   - Do NOT remove old entries later without confirming the old URL is
 *     genuinely gone from Google / no longer in use - redirects are cheap.
 */
export const POST_SLUG_REDIRECTS: Record<string, string> = {
  // Example (delete before real use):
  // "how-ai-search-quantifies-brand-visibility": "ai-search-visibility-web3",
};

/** Expands the map into Next.js redirected route entries (/blog/<old> -> /blog/<new>). */
export function slugRedirectEntries() {
  return Object.entries(POST_SLUG_REDIRECTS).map(([from, to]) => ({
    source: `/blog/${from}`,
    destination: `/blog/${to}`,
    permanent: true, // 301 - tells search engines the move is permanent
  }));
}
