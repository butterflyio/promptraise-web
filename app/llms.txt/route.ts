const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export async function GET() {
  const content = `# PromptRaise — LLM Navigation File
# https://llmstxt.org/

## Overview

PromptRaise helps Web3 projects rank across AI summaries, LLM responses, and search surfaces. We optimize how projects appear in ChatGPT, Perplexity, Claude, Gemini, and emerging AI search engines.

## Pages

- ${siteUrl}/ — Landing page with service overview, pricing, case studies, and team
- ${siteUrl}/privacy — Privacy notice and data handling practices
- ${siteUrl}/studio — Sanity CMS studio (admin only)

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
