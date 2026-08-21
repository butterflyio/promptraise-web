import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

import PostBody from "@/components/post-body";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostBySlugPreview,
  getRelatedPosts,
  type PostDoc,
} from "@/sanity/lib/queries";
import { imageUrl, naturalAspectRatio } from "@/lib/sanity-image";
import {
  postUrl,
  postHref,
  authorHref,
  authorUrl,
  formatLongDate,
  formatShortDate,
  readTime,
} from "@/lib/blog";

export const revalidate = 30;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs;
}

/** Person JSON-LD node, referenced by @id from the Article graph. */
function personSchema(post: PostDoc) {
  const sameAs = [
    post.author?.linkedin,
    post.author?.twitter,
    post.author?.github,
    post.author?.website,
  ].filter((u): u is string => Boolean(u));
  return {
    "@type": "Person",
    "@id": post.author?.slug
      ? authorUrl(post.author)
      : `${siteUrl}/#person-${post.author?.name ?? "promptraise"}`,
    name: post.author?.name ?? "PromptRaise",
    ...(post.author?.role ? { jobTitle: post.author.role } : {}),
    ...(post.author?.avatar?.asset?.url
      ? { image: post.author.avatar.asset.url }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/** Breadcrumb JSON-LD: Home > Blog > Post. */
function breadcrumbSchema(post: PostDoc) {
  const url = postUrl(post);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${siteUrl}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title ?? "Post",
        item: url,
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dm = await draftMode();
  const post = dm.isEnabled
    ? await getPostBySlugPreview(slug)
    : await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }
  const url = postUrl(post);
  const title = post.metaTitle || post.title || "Blog";
  const description = post.metaDescription || post.excerpt || "";
  const image = post.openGraphImage?.asset?.url || post.coverImage?.asset?.url;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      ...(image ? { images: [{ url: image }] } : {}),
      type: "article",
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const dm = await draftMode();
  const post = dm.isEnabled
    ? await getPostBySlugPreview(slug)
    : await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(post._id, post.categories ?? [], 3);
  const coverAssetUrl = post.coverImage?.asset?.url;
  const coverRatio = naturalAspectRatio(coverAssetUrl) ?? 2;
  const cover = coverAssetUrl
    ? imageUrl(coverAssetUrl, {
        width: 1600,
        height: Math.round(1600 / coverRatio),
        fit: "crop",
      })
    : null;
  const authorAvatar = post.author?.avatar?.asset?.url
    ? imageUrl(post.author.avatar.asset.url, {
        width: 160,
        height: 160,
        fit: "crop",
      })
    : null;
  const updatedAt = post.lastUpdated || post.publishedAt;

  // Article JSON-LD with author->Person @id and publisher->Organization @id.
  const articleGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: post.title,
        ...(post.excerpt ? { description: post.excerpt } : {}),
        url: postUrl(post),
        ...(cover ? { image: post.coverImage?.asset?.url ?? undefined } : {}),
        datePublished: post.publishedAt || undefined,
        ...(updatedAt ? { dateModified: updatedAt } : {}),
        author: post.author?.name
          ? { "@id": personSchema(post)["@id"] }
          : undefined,
        publisher: { "@id": `${siteUrl}/#organization` },
        mainEntityOfPage: postUrl(post),
      },
      post.author?.name ? personSchema(post) : null,
    ].filter(Boolean),
  };

  return (
    <article className="mobile:px-6 tablet:py-16 mx-auto w-full max-w-4xl px-4 py-12">
      {/* Article JSON-LD: author -> Person @id, publisher -> Organization @id */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleGraph),
        }}
      />
      {/* BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema(post)),
        }}
      />

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-3">
        {post.categories?.[0] ? (
          <span className="inline-flex items-center rounded-full border border-[rgba(103,255,103,0.2)] bg-[rgba(103,255,103,0.08)] px-3 py-1 text-[12px] text-[#67ff67]">
            {post.categories[0]}
          </span>
        ) : null}
        <span className="text-sm text-[var(--text-muted)]">
          {formatLongDate(post.publishedAt)}
        </span>
        {post.excerpt ? (
          <>
            <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
            <span className="text-sm text-[var(--text-muted)]">
              {readTime(post.excerpt)}
            </span>
          </>
        ) : null}
      </div>

      <h1 className="mt-5 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-5xl">
        {post.title}
      </h1>

      {/* Author + trust meta */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(103,255,103,0.15)] text-sm font-semibold text-[var(--accent-primary)]">
          {authorAvatar ? (
            <img
              src={authorAvatar}
              alt={post.author?.name ?? "author"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            (post.author?.name ?? "P").charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {post.author?.slug ? (
              <Link
                href={authorHref(post.author)}
                className="hover:text-[var(--accent-primary)]"
              >
                {post.author?.name ?? "PromptRaise"}
              </Link>
            ) : (
              (post.author?.name ?? "PromptRaise")
            )}
          </p>
          {post.author?.role ? (
            <p className="text-xs text-[var(--text-muted)]">
              {post.author.role}
            </p>
          ) : null}
        </div>
        {/* Freshness + review trust lines */}
        <div className="ml-auto flex flex-col items-end gap-0.5 text-right">
          {updatedAt && updatedAt !== post.publishedAt ? (
            <span className="text-xs text-[var(--text-muted)]">
              Last updated {formatShortDate(updatedAt)}
            </span>
          ) : null}
          {post.reviewedBy ? (
            <span className="text-xs text-[var(--text-muted)]">
              Reviewed by {post.reviewedBy}
              {post.reviewedDate
                ? ` on ${formatShortDate(post.reviewedDate)}`
                : ""}
            </span>
          ) : null}
        </div>
      </div>

      {/* Cover */}
      {cover ? (
        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border-soft)]">
          <img
            src={cover}
            alt={post.title ?? ""}
            className="w-full object-cover"
            style={{ aspectRatio: String(coverRatio) }}
          />
        </div>
      ) : null}

      {/* Body */}
      <div className="prose-blog mt-10">
        <PostBody blocks={(post.body ?? []) as never} />
      </div>

      {/* About the author box */}
      {post.author?.name ? (
        <section className="mt-10 rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.02)] p-6">
          <div className="mobile:flex-row mobile:items-start flex flex-col gap-4">
            {authorAvatar ? (
              <img
                src={authorAvatar}
                alt={post.author.name}
                className="h-14 w-14 flex-shrink-0 rounded-full border border-[var(--border-soft)] object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-[var(--border-soft)] bg-[rgba(103,255,103,0.15)] text-lg font-semibold text-[var(--accent-primary)]">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-[11px] tracking-[0.12em] text-[var(--text-muted)] uppercase">
                About the author
              </p>
              <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">
                {post.author.slug ? (
                  <Link
                    href={authorHref(post.author)}
                    className="hover:text-[var(--accent-primary)]"
                  >
                    {post.author.name}
                  </Link>
                ) : (
                  post.author.name
                )}
              </p>
              {post.author.shortBio ? (
                <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
                  {post.author.shortBio}
                </p>
              ) : null}
              <div className="mt-2 flex flex-wrap gap-3">
                {post.author.linkedin ? (
                  <a
                    href={post.author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent-primary)] hover:underline"
                  >
                    LinkedIn
                  </a>
                ) : null}
                {post.author.twitter ? (
                  <a
                    href={post.author.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[var(--accent-primary)] hover:underline"
                  >
                    X / Twitter
                  </a>
                ) : null}
                {post.author.slug ? (
                  <Link
                    href={authorHref(post.author)}
                    className="text-xs text-[var(--accent-primary)] hover:underline"
                  >
                    All posts by {post.author.name}
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Related posts */}
      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Related reads
          </h2>
          <div className="mobile:grid-cols-2 tablet:grid-cols-3 mt-5 grid gap-4">
            {related.map((r) => (
              <Link
                key={r._id}
                href={postHref(r)}
                className="group rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.02)] p-5 transition-colors hover:border-[rgba(103,255,103,0.25)]"
              >
                {r.categories?.[0] ? (
                  <span className="inline-flex rounded-full border border-[rgba(103,255,103,0.2)] bg-[rgba(103,255,103,0.08)] px-2.5 py-0.5 text-[11px] text-[#67ff67]">
                    {r.categories[0]}
                  </span>
                ) : null}
                <h3 className="mt-2.5 text-[15px] leading-snug font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                  {r.title}
                </h3>
                <p className="mt-1.5 text-xs text-[var(--text-muted)]">
                  {formatShortDate(r.publishedAt)} · {readTime(r.excerpt)}
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Footer */}
      <div className="mt-10 border-t border-[var(--border-soft)] pt-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[var(--accent-primary)] hover:underline"
        >
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
