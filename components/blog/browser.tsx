"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { PostDoc } from "@/sanity/lib/queries";

import { formatShortDate, postHref, readTime } from "@/lib/blog";
import { imageUrl } from "@/lib/sanity-image";

type BlogBrowserProps = {
  posts: PostDoc[];
};

const NS = (weight: "Regular" | "Meidum" | "Bold" = "Regular") =>
  `'Neutral_Sans:${weight}', 'Inter', sans-serif`;

function CategoryTag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center rounded-[9999px] border border-[rgba(103,255,103,0.2)] bg-[rgba(103,255,103,0.08)] px-3 py-1 text-[12px] leading-[1.4] tracking-[-0.24px] text-[#67ff67]"
      style={{ fontFamily: NS("Meidum") }}
    >
      {label}
    </span>
  );
}

function coverImg(
  post: PostDoc,
  w: number,
  h: number,
): string | null | undefined {
  const img = post.coverImage?.asset?.url ?? post.openGraphImage?.asset?.url;
  if (!img) return undefined;
  try {
    return imageUrl(img, { width: w, height: h, fit: "crop" });
  } catch {
    return img;
  }
}

function FeaturedCard({ post }: { post: PostDoc }) {
  const href = postHref(post);
  const img = coverImg(post, 1080, 640);
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] bg-[rgba(255,255,255,0.03] backdrop-blur-[12px] transition-colors duration-300 hover:border-[rgba(103,255,103,0.15)]"
    >
      <div className="relative flex flex-col lg:flex-row">
        <div className="relative flex shrink-0 flex-col gap-6 p-8 md:p-12 lg:w-[55%]">
          <div
            className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(103,255,103,0.4) 0%, transparent 70%)",
            }}
          />
          <div className="relative flex items-center gap-3">
            {post.categories?.[0] ? (
              <CategoryTag label={post.categories[0]} />
            ) : null}
            <span
              className="text-[12px] tracking-[-0.24px] text-[rgba(255,255,255,0.35)]"
              style={{ fontFamily: NS() }}
            >
              Featured
            </span>
          </div>
          <h2
            className="relative text-[32px] leading-[1.1] tracking-[-0.84px] text-white md:text-[42px]"
            style={{ fontFamily: NS("Bold") }}
          >
            {post.title}
          </h2>
          <p
            className="relative text-[16px] leading-[1.65] tracking-[-0.32px] text-[rgba(255,255,255,0.5)]"
            style={{ fontFamily: NS() }}
          >
            {post.excerpt}
          </p>
          <div className="relative flex items-center gap-4">
            <span
              className="text-[13px] tracking-[-0.26px] text-[rgba(255,255,255,0.35)]"
              style={{ fontFamily: NS() }}
            >
              {formatShortDate(post.publishedAt)}
            </span>
            <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
            <span
              className="text-[13px] tracking-[-0.26px] text-[rgba(255,255,255,0.35)]"
              style={{ fontFamily: NS() }}
            >
              {readTime(post.excerpt)}
            </span>
          </div>
          <span
            className="relative mt-2 inline-flex cursor-pointer items-center gap-2 self-start rounded-[9999px] bg-white px-6 py-3 text-[16px] leading-[1.5] tracking-[-0.32px] text-[#09090b] transition-colors hover:bg-[#ededee]"
            style={{ fontFamily: NS() }}
          >
            Read Article
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M1 13L13 1M13 1H5M13 1V9"
                stroke="#09090b"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        {img ? (
          <div className="relative min-h-[280px] flex-1 overflow-hidden lg:h-auto">
            <img
              src={img}
              alt={post.title ?? ""}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-24 lg:w-32"
              style={{
                background:
                  "linear-gradient(to right, rgba(15,15,15,0.95), transparent)",
              }}
            />
            <div className="pointer-events-none absolute inset-0 bg-[rgba(15,15,15,0.25)]" />
          </div>
        ) : null}
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: PostDoc }) {
  const img = coverImg(post, 600, 400);
  return (
    <Link
      href={postHref(post)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[8px] transition-all duration-300 hover:border-[rgba(103,255,103,0.15)] hover:bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.04]"
    >
      {img ? (
        <div className="relative h-[180px] overflow-hidden">
          <img
            src={img}
            alt={post.title ?? ""}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-[rgba(15,15,15,0.35)]" />
          <div className="absolute top-4 left-4">
            {post.categories?.[0] ? (
              <CategoryTag label={post.categories[0]} />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="p-4">
          {post.categories?.[0] ? (
            <CategoryTag label={post.categories[0]} />
          ) : null}
        </div>
      )}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className="text-[17px] leading-[1.35] tracking-[-0.34px] text-white transition-colors group-hover:text-[rgba(255,255,255,0.9)]"
          style={{ fontFamily: NS("Bold") }}
        >
          {post.title}
        </h3>
        <p
          className="flex-1 text-[14px] leading-[1.6] tracking-[-0.28px] text-[rgba(255,255,255,0.45)]"
          style={{ fontFamily: NS() }}
        >
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
          <div className="flex items-center gap-3">
            <span
              className="text-[12px] tracking-[-0.24px] text-[rgba(255,255,255,0.3)]"
              style={{ fontFamily: NS() }}
            >
              {formatShortDate(post.publishedAt)}
            </span>
            <span className="h-0.5 w-0.5 rounded-full bg-[rgba(255,255,255,0.2]" />
            <span
              className="text-[12px] tracking-[-0.24px] text-[rgba(255,255,255,0.3)]"
              style={{ fontFamily: NS() }}
            >
              {readTime(post.excerpt)}
            </span>
          </div>
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="opacity-0 transition-opacity group-hover:opacity-100"
          >
            <path
              d="M1 13L13 1M13 1H5M13 1V9"
              stroke="rgba(103,255,103,0.8)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}

function NewsletterStrip() {
  return (
    <section className="relative mt-8 overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 backdrop-blur-[12px] md:p-12">
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-[400px] w-[400px] rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(103,255,103,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-8 md:flex-row md:gap-16">
        <div className="min-w-0 flex-1">
          <div className="mb-4 inline-flex items-center gap-2 rounded-[9999px] border border-[rgba(103,255,103,0.25)] bg-[rgba(103,255,103,0.05)] px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67ff67]" />
            <span
              className="text-[12px] tracking-[-0.24px] text-[#67ff67]"
              style={{ fontFamily: NS("Meidum") }}
            >
              Newsletter
            </span>
          </div>
          <h2
            className="mb-3 text-[28px] leading-[1.2] tracking-[-0.72px] text-white md:text-[36px]"
            style={{ fontFamily: NS("Bold") }}
          >
            Stay ahead of the AI visibility curve
          </h2>
          <p
            className="max-w-md text-[16px] leading-[1.6] tracking-[-0.32px] text-[rgba(255,255,255,0.45)]"
            style={{ fontFamily: NS() }}
          >
            Weekly insights on AI citation patterns, protocol rankings, and
            strategies that actually work.
          </p>
        </div>
        <form
          className="flex w-full shrink-0 flex-col gap-3 sm:flex-row md:w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            className="flex-1 rounded-[9999px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-5 py-3 text-[16px] tracking-[-0.32px] text-white transition-colors outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-[rgba(103,255,103,0.4)] md:w-64"
            style={{ fontFamily: NS() }}
          />
          <button
            type="submit"
            className="rounded-[9999px] bg-white px-6 py-3 text-[16px] leading-[1.5] tracking-[-0.32px] whitespace-nowrap text-[#09090b] transition-colors hover:bg-[#ededee]"
            style={{ fontFamily: NS() }}
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

export default function BlogBrowser({ posts }: BlogBrowserProps) {
  const allCategories = useMemo(
    () => Array.from(new Set(posts.flatMap((p) => p.categories ?? []))).sort(),
    [posts],
  );
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.categories?.includes(activeCategory));

  const visibleFeatured = activeCategory === "All" ? posts[0] : undefined;
  const categoryFeatured = activeCategory === "All" ? posts[0] : filtered[0];
  const featured = activeCategory === "All" ? undefined : categoryFeatured;
  const gridPosts =
    activeCategory === "All"
      ? posts.slice(1)
      : filtered.filter((p) => p._id !== featured?._id);

  const categories = ["All", ...allCategories];

  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-24 md:px-24">
      {/* Page hero */}
      <section className="flex flex-col gap-6 pt-16">
        <div className="inline-flex items-center gap-2 self-start rounded-[9999px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-2 backdrop-blur-[12px]">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#67ff67" />
          </svg>
          <span
            className="text-[13px] tracking-[-0.26px] text-[rgba(255,255,255,0.7)]"
            style={{ fontFamily: NS("Meidum") }}
          >
            Blog
          </span>
        </div>
        <h1
          className="max-w-3xl text-[52px] leading-[1.05] tracking-[-1.44px] text-white md:text-[72px]"
          style={{ fontFamily: NS("Bold") }}
        >
          Insights on <span style={{ color: "#67ff67" }}>AI Visibility</span>
        </h1>
        <p
          className="max-w-xl text-[18px] leading-[1.6] tracking-[-0.36px] text-[rgba(255,255,255,0.45)]"
          style={{ fontFamily: NS() }}
        >
          Research, case studies, and strategy from the team building the AI
          layer for Web3 protocols.
        </p>
      </section>

      {/* Featured */}
      {visibleFeatured ? (
        <div className="mt-16">
          <FeaturedCard post={visibleFeatured} />
        </div>
      ) : null}

      {/* Category filter + grid */}
      <section className="mt-16 flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-[9999px] px-4 py-2 text-[13px] leading-[1.4] tracking-[-0.26px] transition-all ${
                activeCategory === cat
                  ? "border border-[rgba(103,255,103,0.3)] bg-[rgba(103,255,103,0.12)] text-[#67ff67]"
                  : "border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.45)] hover:border-[rgba(255,255,255,0.2)] hover:text-white"
              }`}
              style={{ fontFamily: NS("Meidum") }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gridPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {gridPosts.length === 0 ? (
          <p
            className="py-16 text-center text-[16px] text-[rgba(255,255,255,0.3)]"
            style={{ fontFamily: NS() }}
          >
            No posts in this category yet.
          </p>
        ) : null}
      </section>

      {/* Newsletter */}
      <NewsletterStrip />
    </main>
  );
}
