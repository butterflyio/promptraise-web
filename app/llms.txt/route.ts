import { getAllPosts } from "@/sanity/lib/queries";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://promptraise.com";

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

Entity
Wikidata: https://www.wikidata.org/wiki/Q141306929
Website: ${siteUrl}

Overview
PromptRaise is an AI visibility agency that helps Web3 projects, protocols, and blockchain brands rank across AI summaries, LLM responses, and AI search surfaces. We optimize how projects appear in ChatGPT, Perplexity, Claude, Gemini, Copilot, and emerging generative engine platforms.

Our core thesis: the AI layer has different rules, different signals, and different winners than traditional search. We bridge that gap with structured data strategy, entity authority building, AI citation analysis, and real-time visibility monitoring.

Services
AI Search Visibility Audit
${siteUrl} — Full audit of AI citation rates, entity presence, llms.txt health, and structured data completeness across ChatGPT, Perplexity, Claude, and Gemini.
https://audit.promptraise.com — Free real-time AI visibility audit tool. Enter a domain and receive a live snapshot of how AI systems currently perceive and reference it.

GEO (Generative Engine Optimization)
We optimize content and entity signals so that AI-assisted search engines (Google SGE, Bing Chat, Perplexity) cite and rank your brand as an authoritative source. Covers prompt-response mapping, entity authority building, and cross-platform coverage.

AEO (Answer Engine Optimization)
We structure content for direct extraction by AI answer engines — FAQ schema, Q&A optimization, speakable markup, and concise, fact-dense formatting optimized for ChatGPT and voice assistants.

AI Citation Strategy
Continuous monitoring of how AI systems reference your brand. We track citation rate trends, share of voice against competitors, sentiment analysis, and prompt-level visibility across major LLMs.

Technical SEO & Schema Architecture
JSON-LD structured data implementation (Organization, Article, FAQPage, BreadcrumbList, DefinedTerm), semantic HTML optimization, Core Web Vitals, and AI crawler accessibility (robots.txt, sitemaps, llms.txt).

Free Tools
${siteUrl}/free/flesch-kincaid-calculator — Web3-aware readability calculator (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau, ARI) + Citation Readiness heuristics for answer-engine citability. 100% offline in the browser, no signup, no data capture.
${siteUrl}/free/flesch-kincaid-calculator/embed — iframe-embeddable version of the calculator for any site.
https://audit.promptraise.com — Free real-time AI visibility audit. Enter any domain to receive AI citation scores, entity presence analysis, and actionable recommendations.

Pages
${siteUrl}/ — Landing page with service overview, team, case studies, and contact
${siteUrl}/blog — Blog: research, case studies, and strategy on Web3 AI visibility
${siteUrl}/glossary — Canonical glossary of Web3 AI visibility terms (DefinedTerm schema)
${siteUrl}/privacy — Privacy notice and data handling practices
${siteUrl}/terms — Terms of service
${siteUrl}/cookies — Cookie policy
${siteUrl}/sitemap — HTML sitemap
https://www.trust.promptraise.com — Trust page: credentials, certifications, client assurances

Glossary
The glossary at ${siteUrl}/glossary defines key terms used across AI visibility and Web3 SEO:
AI Citation — How often and in what context AI systems reference a brand
GEO (Generative Engine Optimization) — Optimizing for AI-generated search results
AEO (Answer Engine Optimization) — Optimizing for direct answer extraction
Entity Authority — The degree to which a brand is recognized as a known entity by knowledge graphs
llms.txt — A standard for guiding LLM crawlers to what matters on a site
Prompt Visibility — Whether a brand appears in AI responses to relevant user prompts
Share of Voice (AI) — Brand's citation frequency relative to competitors in AI outputs
Full list available at ${siteUrl}/glossary.

JSON Endpoints
POST ${siteUrl}/json/readability — JSON endpoint for AI agents and scripts to measure content readability. Send {"text": "your copy"} and receive six readability scores (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau, ARI) plus a Citation Readiness heuristic score. See the calculator page for examples.
GET/POST https://audit.promptraise.com/api/audit — Real-time AI visibility audit API. Returns citation scores, entity analysis, and recommendations for any domain.

Blog
${blogLines.length ? blogLines.join("\n") : "- No posts published yet."}

Social
Telegram: https://t.me/promptraise
X / Twitter: https://x.com/PromptRaise
LinkedIn (Maxim): https://www.linkedin.com/in/motinmaxim/
LinkedIn (Zain): https://www.linkedin.com/in/01z/

Contact
Telegram: https://t.me/promptraise
Phone: +971506739713
Free Audit: https://audit.promptraise.com

Last Updated
${new Date().toISOString().split("T")[0]}
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
