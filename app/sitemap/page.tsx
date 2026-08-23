import type { Metadata } from "next";
import Link from "next/link";

import {
  getAllPages,
  getAllPosts,
  getAllPublicAuthors,
} from "@/sanity/lib/queries";
import { postUrl, authorUrl } from "@/lib/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

export const metadata: Metadata = {
  title: "Sitemap",
  description:
    "Every page on PromptRaise - AI visibility resources, the glossary, free tools, and the blog.",
  robots: { index: false, follow: true },
};

export default async function SitemapPage() {
  const [pages, posts, authors] = await Promise.all([
    getAllPages(),
    getAllPosts(),
    getAllPublicAuthors(),
  ]);

  const pageEntries = pages
    .filter(
      (p): p is typeof p & { slug: { current: string }; title: string } =>
        !p.noindex && !!p.slug?.current && !!p.title,
    )
    .map((p) => ({
      url: `/${p.slug.current.replace(/^\/+|\/+$/g, "")}`,
      label: p.title,
    }));

  const postEntries = posts
    .filter((p) => !p.noindex && p.slug?.current && p.title)
    .map((p) => ({ url: postUrl(p), label: p.title as string }));
  const authorEntries = authors
    .filter((a) => !a.noindex && a.slug?.current && a.name)
    .map((a) => ({ url: authorUrl(a), label: a.name as string }));

  const sections: Array<{
    heading: string;
    entries: Array<{ url: string; label: string }>;
  }> = [
    {
      heading: "Core",
      entries: [
        { url: "/", label: "Home" },
        { url: "/blog", label: "AI Visibility Blog" },
        { url: "/academy/glossary", label: "Glossary" },
        { url: "/free/flesch-kincaid-calculator", label: "Free Tools" },
        { url: "/privacy", label: "Privacy Policy" },
        { url: "/terms", label: "Terms of Service" },
        { url: "/cookies", label: "Cookie Usage" },
      ],
    },
    { heading: "Articles", entries: postEntries },
    { heading: "Pages", entries: pageEntries },
    { heading: "Authors", entries: authorEntries },
  ].filter((s) => s.entries.length > 0);

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Sitemap
      </h1>
      <p className="mt-2 text-[15px] text-[var(--text-muted)]">
        A human-readable index of every page on PromptRaise. Crawlers use the
        machine-readable{" "}
        <a href="/sitemap.xml" className="underline hover:text-[var(--accent-primary)]">
          sitemap.xml
        </a>
        .
      </p>

      <div className="mt-10 flex flex-col gap-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="text-[13px] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
              {section.heading}
            </h2>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {section.entries.map((entry) => (
                <li key={entry.url + entry.label}>
                  <Link
                    href={entry.url}
                    className="block truncate text-[14px] text-[#cfd3d8] transition-colors hover:text-[var(--accent-primary)]"
                    title={entry.label}
                  >
                    {entry.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}