import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { draftMode } from "next/headers";

import PostBody from "@/components/post-body";
import {
  getAllPostSlugs,
  getPostBySlug,
  getPostBySlugPreview,
  type PostDoc,
} from "@/sanity/lib/queries";
import { imageUrl } from "@/lib/sanity-image";
import { postUrl, formatLongDate, readTime } from "@/lib/blog";

export const revalidate = 30;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs;
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

  return (
    <article className="mobile:px-6 tablet:py-16 mx-auto w-full max-w-4xl px-4 py-12">
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

      {/* Author */}
      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(103,255,103,0.15)] text-sm font-semibold text-[var(--accent-primary)]">
          {post.author?.avatar?.asset?.url ? (
            <img
              src={post.author.avatar.asset.url}
              alt={post.author?.name ?? "author"}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            (post.author?.name ?? "P").charAt(0).toUpperCase()
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {post.author?.name ?? "PromptRaise"}
          </p>
          {post.author?.role ? (
            <p className="text-xs text-[var(--text-muted)]">
              {post.author.role}
            </p>
          ) : null}
        </div>
      </div>

      {/* Cover */}
      {(() => {
        const cover = post.coverImage?.asset?.url;
        if (!cover) return null;
        const src = imageUrl(cover, { width: 1400, height: 700, fit: "crop" });
        if (!src) return null;
        return (
          <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--border-soft)]">
            <img
              src={src}
              alt={post.title ?? ""}
              className="aspect-[2/1] w-full object-cover"
            />
          </div>
        );
      })()}

      {/* Body */}
      <div className="prose-blog mt-10">
        <PostBody blocks={(post.body ?? []) as never} />
      </div>

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
