import type { Metadata } from "next";
import Link from "next/link";

import { getAllPosts } from "@/sanity/lib/queries";
import { imageUrl } from "@/lib/sanity-image";

export const revalidate = 30;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
  title: "Blog | PromptRaise — Web3 AI Visibility Research",
  description:
    "Research, case studies and strategy from the team building the AI layer for Web3 protocols: how ChatGPT, Perplexity, Claude and Gemini discover, read and cite you.",
  alternates: { canonical: `${siteUrl}/blog` },
  openGraph: {
    title: "Blog | PromptRaise",
    description: "Research, case studies and strategy on Web3 AI visibility.",
    url: `${siteUrl}/blog`,
  },
};

function formatDate(iso?: string): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function readTime(text: string): string {
  if (!text) return "3 min read";
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const [featured, ...rest] = posts;

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-6xl px-4 py-16">
      {/* Page hero */}
      <section className="flex flex-col gap-4">
        <p className="text-sm tracking-[0.12em] text-[var(--accent-primary)] uppercase">
          Blog
        </p>
        <h1 className="tablet:text-5xl text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
          Insights on{" "}
          <span className="text-[var(--accent-primary)]">AI Visibility</span>
        </h1>
        <p className="max-w-xl leading-relaxed text-[var(--text-secondary)]">
          Research, case studies, and strategy from the team building the AI
          layer for Web3 protocols.
        </p>
      </section>

      {featured ? (
        <section className="mt-10">
          <FeaturedCard post={featured} />
        </section>
      ) : null}

      {/* Grid */}
      <section className="mt-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug?.current ?? post._id} post={post} />
          ))}
        </div>
        {posts.length === 0 ? (
          <p className="py-16 text-center text-[var(--text-muted)]">
            No posts published yet. Check back soon.
          </p>
        ) : null}
      </section>
    </main>
  );
}

function CategoryTag({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5 px-3 py-1 text-xs text-[var(--accent-primary)]">
      {label}
    </span>
  );
}

function coverUrl(
  img?: { asset?: { url?: string } },
  w = 800,
  h = 500,
): string | null {
  const url = img?.asset?.url;
  if (!url) return null;
  try {
    return imageUrl(url, { width: w, height: h, fit: "crop" });
  } catch {
    return url;
  }
}

function FeaturedCard({
  post,
}: {
  post: NonNullable<Awaited<ReturnType<typeof getAllPosts>>>[number];
}) {
  const href = `/blog/${post.slug?.current ?? ""}`;
  const img = coverUrl(post.coverImage, 1080, 640);
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-3xl border border-[var(--border-soft)] bg-[var(--bg-surface-panel)] transition-colors hover:border-[var(--accent-primary)]/30"
    >
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col gap-5 p-8 lg:w-[55%] lg:p-12">
          <div className="flex items-center gap-3">
            <CategoryTag label={post.categories?.[0]} />
            <span className="text-xs text-[var(--text-muted)]">Featured</span>
          </div>
          <h2 className="text-3xl leading-tight font-semibold tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] md:text-4xl">
            {post.title}
          </h2>
          <p className="leading-relaxed text-[var(--text-secondary)]">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted)]">
            <span>{formatDate(post.publishedAt)}</span>
            <span className="h-1 w-1 rounded-full bg-[var(--text-muted)]" />
            <span>{readTime(post.excerpt ?? "")}</span>
          </div>
        </div>
        {img ? (
          <div className="relative min-h-[300px] flex-1 overflow-hidden lg:h-auto">
            <img
              src={img}
              alt={post.title ?? ""}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function PostCard({
  post,
}: {
  post: NonNullable<Awaited<ReturnType<typeof getAllPosts>>>[number];
}) {
  const href = `/blog/${post.slug?.current ?? ""}`;
  const img = coverUrl(post.coverImage, 600, 400);
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-surface-panel)] transition-colors hover:border-[var(--accent-primary)]/30"
    >
      {img ? (
        <div className="relative h-[180px] overflow-hidden">
          <img
            src={img}
            alt={post.title ?? ""}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <CategoryTag label={post.categories?.[0]} />
          </div>
        </div>
      ) : (
        <div className="p-4">
          <CategoryTag label={post.categories?.[0]} />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-lg leading-snug font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
          {post.title}
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center gap-3 border-t border-[var(--border-soft)] pt-3 text-xs text-[var(--text-muted)]">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="h-0.5 w-0.5 rounded-full bg-[var(--text-muted)]" />
          <span>{readTime(post.excerpt ?? "")}</span>
        </div>
      </div>
    </Link>
  );
}
