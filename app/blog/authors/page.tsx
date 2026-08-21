import type { Metadata } from "next";
import Link from "next/link";

import { getAllPublicAuthors } from "@/sanity/lib/queries";
import { imageUrl } from "@/lib/sanity-image";
import { authorHref, authorUrl } from "@/lib/blog";

export const revalidate = 30;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Authors | PromptRaise",
    description:
      "Meet the researchers, analysts and engineers publishing on the PromptRaise blog on AI visibility for Web3 teams.",
    alternates: { canonical: `${siteUrl}/blog/authors` },
  };
}

export default async function AuthorsIndexPage() {
  const authors = await getAllPublicAuthors();

  return (
    <main className="mobile:px-6 tablet:py-16 mx-auto w-full max-w-4xl px-4 py-12">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        The people behind
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl">
        PromptRaise authors
      </h1>
      <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
        Research, audits and analysis on AI visibility from the people who run
        them.
      </p>

      <div className="mobile:grid-cols-2 tablet:grid-cols-3 mt-10 grid gap-4">
        {authors.map((a) => {
          const avatar =
            a.avatar?.asset?.url &&
            imageUrl(a.avatar.asset.url, {
              width: 160,
              height: 160,
              fit: "crop",
            });
          return (
            <Link
              key={a._id}
              href={authorHref(a)}
              className="group rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.02)] p-6 text-center transition-colors hover:border-[rgba(103,255,103,0.25)]"
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={a.name ?? "author"}
                  className="mx-auto h-20 w-20 rounded-full border border-[var(--border-soft)] object-cover"
                />
              ) : (
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[rgba(103,255,103,0.15)] text-2xl font-semibold text-[var(--accent-primary)]">
                  {(a.name ?? "A").charAt(0).toUpperCase()}
                </div>
              )}
              <h2 className="mt-4 text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                {a.name}
              </h2>
              {a.role ? (
                <p className="mt-1 text-sm text-[var(--text-muted)]">
                  {a.role}
                </p>
              ) : null}
              {a.shortBio ? (
                <p className="mt-2 line-clamp-3 text-sm text-[var(--text-secondary)]">
                  {a.shortBio}
                </p>
              ) : null}
            </Link>
          );
        })}
      </div>

      <div className="mt-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    </main>
  );
}
