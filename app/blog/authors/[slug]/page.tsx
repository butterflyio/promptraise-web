import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import PostBody from "@/components/post-body";
import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getPostsByAuthor,
} from "@/sanity/lib/queries";
import { imageUrl } from "@/lib/sanity-image";
import { authorUrl, postHref, formatShortDate, readTime } from "@/lib/blog";

export const revalidate = 30;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAuthorSlugs();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    return { title: "Author not found" };
  }
  const title = author.metaTitle || author.name || "Author";
  const description =
    author.metaDescription ||
    author.shortBio ||
    `Posts by ${author.name} on PromptRaise.`;
  return {
    title,
    description,
    alternates: { canonical: authorUrl(author) },
    openGraph: {
      title,
      description,
      url: authorUrl(author),
      ...(author.avatar?.asset?.url
        ? { images: [{ url: author.avatar.asset.url }] }
        : {}),
      type: "profile",
      ...(author.name
        ? { profile: { firstName: author.name.split(" ")[0] } }
        : {}),
    },
  };
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) {
    notFound();
  }
  const posts = await getPostsByAuthor(author._id);
  const avatar =
    author.avatar?.asset?.url &&
    imageUrl(author.avatar.asset.url, { width: 200, height: 200, fit: "crop" });

  // Person JSON-LD with sameAs - the E-E-A-T recognition signal.
  const sameAs = [
    author.linkedin,
    author.twitter,
    author.github,
    author.website,
  ].filter((u): u is string => Boolean(u));

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    ...(author.role ? { jobTitle: author.role } : {}),
    url: authorUrl(author),
    ...(avatar ? { image: author.avatar?.asset?.url ?? undefined } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    worksFor: {
      "@type": "Organization",
      name: "PromptRaise",
      url: siteUrl,
    },
  };

  return (
    <main className="mobile:px-6 mx-auto w-full max-w-4xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Profile header */}
      <section className="mobile:flex-row mobile:items-start mobile:text-left flex flex-col items-center gap-6 text-center">
        {avatar ? (
          <img
            src={avatar}
            alt={author.name ?? "author"}
            className="h-28 w-28 flex-shrink-0 rounded-full border border-[var(--border-soft)] object-cover"
          />
        ) : (
          <div className="flex h-28 w-28 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[rgba(103,255,103,0.15)] text-3xl font-semibold text-[var(--accent-primary)]">
            {(author.name ?? "A").charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            {author.name}
          </h1>
          {author.role ? (
            <p className="mt-1 text-[var(--text-secondary)]">{author.role}</p>
          ) : null}
          {author.shortBio ? (
            <p className="mt-3 max-w-xl text-[var(--text-secondary)]">
              {author.shortBio}
            </p>
          ) : null}
          {sameAs.length ? (
            <div className="mobile:justify-start mt-4 flex flex-wrap justify-center gap-3">
              {author.linkedin ? (
                <a
                  href={author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-primary)] hover:underline"
                >
                  LinkedIn
                </a>
              ) : null}
              {author.twitter ? (
                <a
                  href={author.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-primary)] hover:underline"
                >
                  X / Twitter
                </a>
              ) : null}
              {author.github ? (
                <a
                  href={author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-primary)] hover:underline"
                >
                  GitHub
                </a>
              ) : null}
              {author.website ? (
                <a
                  href={author.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--accent-primary)] hover:underline"
                >
                  Website
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {/* Full bio */}
      {author.longBio && author.longBio.length > 0 ? (
        <section className="prose-blog mt-10">
          <PostBody blocks={(author.longBio ?? []) as never} />
        </section>
      ) : null}

      {/* Posts by author */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">
          Posts by {author.name}
        </h2>
        {posts.length === 0 ? (
          <p className="mt-4 text-[var(--text-secondary)]">
            No published posts yet.
          </p>
        ) : (
          <div className="mt-6 divide-y divide-[var(--border-soft)]">
            {posts.map((post) => (
              <article key={post._id} className="py-5">
                <Link href={postHref(post)} className="group block">
                  <h3 className="text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {formatShortDate(post.publishedAt)}
                    {post.excerpt ? ` · ${readTime(post.excerpt)}` : ""}
                  </p>
                  {post.excerpt ? (
                    <p className="mt-2 line-clamp-2 text-sm text-[var(--text-secondary)]">
                      {post.excerpt}
                    </p>
                  ) : null}
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="mt-10 border-t border-[var(--border-soft)] pt-6">
        <Link
          href="/blog"
          className="mr-5 inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline"
        >
          ← Back to Blog
        </Link>
        <Link
          href="/blog/authors"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline"
        >
          All authors
        </Link>
      </div>
    </main>
  );
}
