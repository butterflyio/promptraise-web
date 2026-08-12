import type { MetadataRoute } from "next";

import { getAllPages } from "@/sanity/lib/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await getAllPages();

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
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/glossary`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
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
