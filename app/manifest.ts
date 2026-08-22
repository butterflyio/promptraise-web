import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  // CMS favicon is the single source of truth (same source as layout.tsx).
  // Fallback is the on-repo brand mark, NOT /favicon.ico - that file was
  // intentionally removed (d4d5be7) and 404s.
  const faviconUrl =
    settings?.favicon?.asset?.url ?? `${siteUrl}/brand/promptraise-mark.svg`;

  return {
    name: "PromptRaise",
    short_name: "PromptRaise",
    description:
      "AI visibility for Web3 teams. Rank across LLM summaries, AI search, and conversational discovery.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F0F0F",
    theme_color: "#67FF67",
    icons: [
      {
        src: faviconUrl,
        sizes: "128x128",
        type: "image/png",
        purpose: "any",
      },
      {
        src: `${siteUrl}/brand/promptraise-mark.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
