import { getAllPosts, getSiteSettings } from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

export const revalidate = 300;

export async function GET() {
  const posts = await getAllPosts();
  const settings = await getSiteSettings();

  const siteName = settings?.siteName ?? "PromptRaise";
  const contactEmail = settings?.contactEmail ?? "";

  const rssItems = posts
    .map((p) => {
      const slug = p.slug?.current;
      if (!slug) return null;
      const title = p.title ?? "Untitled";
      const excerpt = p.excerpt ?? "";
      const pubDate = p.publishedAt
        ? new Date(p.publishedAt).toUTCString()
        : new Date().toUTCString();
      const url = `${siteUrl}/blog/${slug}`;
      const authorName = p.author?.name ?? "PromptRaise";
      return `    <item>
      <title><![CDATA[${title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <author>${contactEmail || "hello@promptraise.com"} (${authorName})</author>
      <description><![CDATA[${excerpt}]]></description>
      <source url="${siteUrl}/blog/feed.xml">${siteName} Blog</source>
    </item>`;
    })
    .filter((l): l is string => l !== null)
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${siteName} — Blog</title>
    <link>${siteUrl}/blog</link>
    <description>AI visibility research, case studies, and strategy for Web3 projects.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <managingEditor>${contactEmail || "hello@promptraise.com"} (${siteName})</managingEditor>
    <webMaster>${contactEmail || "hello@promptraise.com"} (${siteName})</webMaster>
    <category>AI Visibility</category>
    <category>SEO</category>
    <category>Web3</category>
    <category>GEO</category>
    <category>AEO</category>
    <image>
      <url>${siteUrl}/images/logo-mark.png</url>
      <title>${siteName}</title>
      <link>${siteUrl}/blog</link>
    </image>
${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
