import type { PostDoc } from "@/sanity/lib/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

/**
 * Central post URL helper.
 *
 * Currently posts live at /blog/<slug>. When the date-based URL layer is
 * enabled (see promptraise-web blog-publishing ref), switch OUT the default
 * here and the whole site (listing + detail + sitemap) follows automatically.
 */
export function postHref(post: {
  slug?: { current?: string };
  publishedAt?: string;
}): string {
  const slug = post.slug?.current;
  if (!slug) return "/blog";
  return `/blog/${slug}`;
}

export function postUrl(post: {
  slug?: { current?: string };
  publishedAt?: string;
}): string {
  return `${siteUrl}${postHref(post)}`;
}

/** en-US short date: "Aug 8, 2025" */
export function formatShortDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** en-US long date: "August 8, 2025" */
export function formatLongDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function readTime(text?: string): string {
  if (!text) return "3 min read";
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}
