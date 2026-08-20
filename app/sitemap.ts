import type { MetadataRoute } from "next";

import {
  getAllPages,
  getAllPosts,
  getAllPublicAuthors,
} from "@/sanity/lib/queries";
import { postUrl, authorUrl } from "@/lib/blog";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();
  const posts = await getAllPosts();
  const authors = await getAllPublicAuthors();

  const pageEntries: MetadataRoute.Sitemap = pages
    .filter((p) => !p.noindex)
    .map((p) => {
      const slug = p.slug?.current?.replace(/^\/+|\/+$/g, "");
      if (!slug) {
        // The home page doc uses slug "/" - it is already listed below.
        return null;
      }
      return {
        url: `${siteUrl}/${slug}`,
        lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...pageEntries,
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...buildBlogEntries(posts, siteUrl),
    {
      url: `${siteUrl}/blog/authors`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    ...buildAuthorEntries(authors, siteUrl),
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/academy/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/free/flesch-kincaid-calculator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/studio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];
}

function buildBlogEntries(
  posts: Awaited<ReturnType<typeof getAllPosts>>,
  siteUrl: string,
): MetadataRoute.Sitemap {
  return posts
    .filter((p) => !p.noindex)
    .map((p) => {
      const slug = p.slug?.current;
      if (!slug) return null;
      return {
        url: postUrl(p),
        lastModified: p._updatedAt ? new Date(p._updatedAt) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);
}

function buildAuthorEntries(
  authors: Awaited<ReturnType<typeof getAllPublicAuthors>>,
  siteUrl: string,
): MetadataRoute.Sitemap {
  return authors
    .filter((a) => !a.noindex)
    .map((a) => {
      const slug = a.slug?.current;
      if (!slug) return null;
      return {
        url: authorUrl(a),
        lastModified: a._updatedAt ? new Date(a._updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    })
    .filter((e): e is NonNullable<typeof e> => e !== null);
}
