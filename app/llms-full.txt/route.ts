import { getAllPosts, getGlossary } from "@/sanity/lib/queries";
import { termAnchor } from "@/lib/glossary-terms";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

export const revalidate = 300;

export async function GET() {
  const posts = await getAllPosts();
  const glossary = await getGlossary();

  const blogLines = posts
    .map((p) => {
      const slug = p.slug?.current;
      if (!slug) return null;
      const title = p.title ?? "Untitled";
      const excerpt = p.excerpt ?? "";
      return `- [${title}](${siteUrl}/blog/${slug}) — Blog post${excerpt ? `: ${excerpt}` : ""}`;
    })
    .filter((l): l is string => l !== null);

  const glossaryLines = (glossary?.terms ?? [])
    .map((t) => {
      const term = t.term?.trim();
      if (!term) return null;
      return `- [${term}](${siteUrl}/academy/glossary#${termAnchor(term)}) — Glossary term${t.definition ? `: ${t.definition}` : ""}`;
    })
    .filter((l): l is string => l !== null);

  const content = `# PromptRaise — Full LLM Navigation File
# https://llmstxt.org/ (llms-full.txt: expanded site index for AI agents)

> PromptRaise helps Web3 projects rank across AI summaries, LLM responses and
> search surfaces. We make protocols discoverable and citable inside ChatGPT,
> Perplexity, Claude, Gemini and emerging AI search engines.

## Overview

PromptRaise provides an AI audit tool, an educational glossary, and a blog of
research and case studies on Web3 AI visibility (GEO / AEO / LLM visibility).
Our free audit tool scans any Web3 project and scores how well AI systems can
read it, then generates concrete fixes (llms.txt, robots.txt, JSON-LD, meta).

## Pages

- [Home]( ${siteUrl}/) — Landing: services, pricing, case studies, team
- [Blog index]( ${siteUrl}/blog) — Research, case studies, Web3 AI visibility strategy
- [Academy Glossary]( ${siteUrl}/academy/glossary) — Web3 AI visibility glossary (canonical; legacy /glossary 301s here)
- [Free AI Visibility Audit]( https://audit.promptraise.com) — Scan any Web3 site
- [AI Visibility Checker for Web3]( ${siteUrl}/ai-seo-for-web3) — Free playbook
- [Privacy]( ${siteUrl}/privacy) — Privacy notice and data handling

## Tools

- [Audit.promptraise.com]( https://audit.promptraise.com) — free AI visibility scanner: scores SSR content, AI crawler access (20 crawlers), JSON-LD, tokenomics, llms.txt readiness; generates fixes.

## Blog

${blogLines.length ? blogLines.join("\n") : "- No posts published yet."}

## Glossary

${glossaryLines.length ? glossaryLines.join("\n") : "- No glossary terms yet."}

## People

- Zain Khan — Co-founder, Promptraise: writes on Web3 AI visibility, AEO and GEO strategy. Homepage: ${siteUrl}
- Maxim Moris — Co-founder, Promptraise.

## Contact

- Free Audit: https://audit.promptraise.com
- Telegram: https://t.me/promptraise (placeholder)

## Last Updated

${new Date().toISOString().split("T")[0]}
`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
