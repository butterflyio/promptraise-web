import type { Metadata } from "next";

import { getAllPosts } from "@/sanity/lib/queries";
import { BlogBrowser } from "@/components/blog-browser";

export const revalidate = 30;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

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

export default async function BlogPage() {
  const posts = await getAllPosts();
  return <BlogBrowser posts={posts} />;
}
