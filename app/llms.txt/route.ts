import { getAllPosts } from "@/sanity/lib/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const revalidate = 300;

export async function GET() {
  const posts = await getAllPosts();
  const blogLines = posts
    .map((p) => {
      const slug = p.slug?.current;
      if (!slug) return null;
      const title = p.title ?? "Untitled";
      const excerpt = p.excerpt ?? "";
      return `- ${siteUrl}/blog/${slug} — Blog post: ${title}${excerpt ? `. ${excerpt}` : ""}`;
    })
    .filter((l): l is string => l !== null);

  const content = `# PromptRaise — LLM Navigation File
# https://llmstxt.org/

## Overview

PromptRaise helps Web3 projects rank across AI summaries, LLM responses, and search surfaces. We optimize how projects appear in ChatGPT, Perplexity, Claude, Gemini, and emerging AI search engines.

## Pages

- ${siteUrl}/ — Landing page with service overview, pricing, case studies, and team
- ${siteUrl}/blog — Blog: research, case studies and strategy on Web3 AI visibility
- ${siteUrl}/glossary — Web3 AI visibility glossary: terms answer engines use to discover, read and cite protocols
- ${siteUrl}/academy/glossary — Web3 AI visibility glossary (Academy)
- ${siteUrl}/free/flesch-kincaid-calculator — Free Flesch-Kincaid readability calculator for Web3: six readability formulas plus a Citation Readiness score. 100% offline in the browser, no signup, no data capture.
- ${siteUrl}/free/flesch-kincaid-calculator/embed — iframe-embeddable version of the calculator for any site
- ${siteUrl}/privacy — Privacy notice and data handling practices
- ${siteUrl}/studio — Sanity CMS studio (admin only)

## Tools

- ${siteUrl}/free/flesch-kincaid-calculator — Web3-aware readability calculator (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau, ARI) + Citation Readiness heuristics for answer-engine citability

## API

- POST ${siteUrl}/api/readability — a simple JSON endpoint for AI agents and scripts to measure readability. Send {"text": "your copy"} and receive six readability scores (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau, ARI). See the calculator page for examples.

## Blog

${blogLines.length ? blogLines.join("\n") : "- No posts published yet."}

## Contact

- Telegram: https://t.me/placeholder
- Free Audit: https://audit.promptraise.com

## Last Updated

${new Date().toISOString().split("T")[0]}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
