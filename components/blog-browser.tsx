"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import type { PostDoc } from "@/sanity/lib/queries";
import { imageUrl } from "@/lib/sanity-image";
import { postHref, formatShortDate, readTime } from "@/lib/blog";

type Post = NonNullable<
  Awaited<ReturnType<typeof import("@/sanity/lib/queries").getAllPosts>>
>[number];

function CategoryTag({ label }: { label?: string }) {
  if (!label) return null;
  return (
    <span className="inline-flex items-center rounded-full border border-[rgba(103,255,103,0.2)] bg-[rgba(103,255,103,0.08)] px-3 py-1 text-[12px] leading-[1.4] text-[#67ff67]">
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

function FeaturedCard({ post }: { post: Post }) {
  const img = coverUrl(post.coverImage, 1200, 480); // 2.5:1 = native banner ratio
  return (
    <Link
      href={postHref(post)}
      className="group relative block overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] backdrop-blur-[12px] transition-colors duration-300 hover:border-[rgba(103,255,103,0.15)]"
    >
      <div className="relative flex flex-col">
        {/* Image across the top at native 2.5:1 — single deterministic crop, no browser second-crop */}
        {img ? (
          <div className="relative aspect-[5/2] w-full overflow-hidden">
            <img
              src={img}
              alt={post.title ?? ""}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-[rgba(15,15,15,0.15)]" />
          </div>
        ) : null}
        {/* Content below the banner */}
        <div className="relative flex flex-col gap-6 p-8 lg:p-12">
          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(103,255,103,0.4) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 flex items-center gap-3">
            <CategoryTag label={post.categories?.[0]} />
            <span className="text-[12px] tracking-[-0.24px] text-[rgba(255,255,255,0.35)]">
              Featured
            </span>
          </div>
          <h2 className="relative z-10 text-[32px] leading-[1.1] tracking-[-0.84px] text-white md:text-[42px]">
            {post.title}
          </h2>
          <p className="relative z-10 text-[16px] leading-[1.65] tracking-[-0.32px] text-[rgba(255,255,255,0.5)]">
            {post.excerpt}
          </p>
          <div className="relative z-10 flex items-center gap-4">
            <span className="text-[13px] tracking-[-0.26px] text-[rgba(255,255,255,0.35)]">
              {formatShortDate(post.publishedAt)}
            </span>
            <span className="h-1 w-1 rounded-full bg-[rgba(255,255,255,0.2)]" />
            <span className="text-[13px] tracking-[-0.26px] text-[rgba(255,255,255,0.35)]">
              {readTime(post.excerpt)}
            </span>
          </div>
          <span className="relative z-10 inline-flex items-center gap-2 self-start rounded-[9999px] bg-white px-6 py-3 text-[16px] leading-[1.5] tracking-[-0.32px] text-[#09090b] transition-colors hover:bg-[#ededee]">
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
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: Post }) {
  const img = coverUrl(post.coverImage, 640, 360); // 16:9, matches the box ratio
  return (
    <Link
      href={postHref(post)}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.02)] backdrop-blur-[8px] transition-all duration-300 hover:border-[rgba(103,255,103,0.15)] hover:bg-[rgba(255,255,255,0.04)]"
    >
      {img ? (
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <img
            src={img}
            alt={post.title ?? ""}
            className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-[rgba(15,15,15,0.35)]" />
          <div
            className="absolute inset-x-0 bottom-0 h-16"
            style={{
              background:
                "linear-gradient(to top, rgba(15,15,15,0.9), transparent)",
            }}
          />
          <div className="absolute top-4 left-4">
            <CategoryTag label={post.categories?.[0]} />
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[17px] leading-[1.35] tracking-[-0.34px] text-white transition-colors group-hover:text-[rgba(255,255,255,0.9)]">
          {post.title}
        </h3>
        <p className="flex-1 text-[14px] leading-[1.6] tracking-[-0.28px] text-[rgba(255,255,255,0.45)]">
          {post.excerpt}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-[rgba(255,255,255,0.06)] pt-3">
          <div className="flex items-center gap-3">
            <span className="text-[12px] tracking-[-0.24px] text-[rgba(255,255,255,0.3)]">
              {formatShortDate(post.publishedAt)}
            </span>
            <span className="h-0.5 w-0.5 rounded-full bg-[rgba(255,255,255,0.2)]" />
            <span className="text-[12px] tracking-[-0.24px] text-[rgba(255,255,255,0.3)]">
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
  const [email, setEmail] = useState("");
  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] p-8 backdrop-blur-[12px] md:p-12">
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
            <span className="text-[12px] tracking-[-0.24px] text-[#67ff67]">
              Newsletter
            </span>
          </div>
          <h2 className="mb-3 text-[28px] leading-[1.2] tracking-[-0.72px] text-white md:text-[36px]">
            Stay ahead of the AI visibility curve
          </h2>
          <p className="max-w-md text-[16px] leading-[1.6] tracking-[-0.32px] text-[rgba(255,255,255,0.45)]">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 rounded-[9999px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] px-5 py-3 text-[16px] tracking-[-0.32px] text-white transition-colors outline-none placeholder:text-[rgba(255,255,255,0.25)] focus:border-[rgba(103,255,103,0.4)] md:w-64"
          />
          <button
            type="submit"
            className="rounded-[9999px] bg-white px-6 py-3 text-[16px] leading-[1.5] tracking-[-0.32px] whitespace-nowrap text-[#09090b] transition-colors hover:bg-[#ededee]"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}

const ALL = "All";

export function BlogBrowser({ posts }: { posts: Post[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.categories?.forEach((c) => set.add(c)));
    return [ALL, ...Array.from(set)];
  }, [posts]);

  const [active, setActive] = useState(ALL);

  const filtered = useMemo(
    () =>
      active === ALL
        ? posts
        : posts.filter((p) => p.categories?.includes(active)),
    [posts, active],
  );

  const [featured, ...rest] = filtered;

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-6xl px-4 py-16">
      {/* Page hero */}
      <section className="flex flex-col gap-6">
        <div className="inline-flex items-center gap-2 self-start rounded-[9999px] border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-4 py-2 backdrop-blur-[12px]">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="4" fill="#67ff67" />
          </svg>
          <span className="text-[13px] tracking-[-0.26px] text-[rgba(255,255,255,0.7)]">
            Blog
          </span>
        </div>
        <h1 className="max-w-3xl text-[52px] leading-[1.05] tracking-[-1.44px] text-white md:text-[72px]">
          Insights on <span style={{ color: "#67ff67" }}>AI Visibility</span>
        </h1>
        <p className="max-w-xl text-[18px] leading-[1.6] tracking-[-0.36px] text-[rgba(255,255,255,0.45)]">
          Research, case studies, and strategy from the team building the AI
          layer for Web3 protocols.
        </p>
      </section>

      {/* Featured */}
      {featured ? (
        <section className="mt-12">
          <FeaturedCard post={featured} />
        </section>
      ) : null}

      {/* Category filter + grid */}
      <section className="mt-12 flex flex-col gap-8">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-[9999px] px-4 py-2 text-[13px] leading-[1.4] tracking-[-0.26px] transition-all ${
                active === cat
                  ? "border border-[rgba(103,255,103,0.3)] bg-[rgba(103,255,103,0.12)] text-[#67ff67]"
                  : "border border-[rgba(255,255,255,0.08)] text-[rgba(255,255,255,0.45)] hover:border-[rgba(255,255,255,0.2)] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-16 text-center text-[16px] text-[rgba(255,255,255,0.3)]">
            No posts in this category yet.
          </p>
        ) : null}
      </section>

      {/* Newsletter */}
      <section className="mt-16">
        <NewsletterStrip />
      </section>
    </main>
  );
}
