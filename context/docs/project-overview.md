# PromptRaise — Project Overview

## Overview

PromptRaise is a marketing and credibility website at `www.promptraise.com` that demonstrates, through case studies and original content, how PromptRaise makes Web3 projects discoverable and citable across AI systems. The site educates Web3 founders and marketers on AI visibility, proves PromptRaise's expertise with concrete case studies and a monthly industry report, and converts interest into action via two calls-to-action: joining the Telegram community and requesting a free AI-visibility audit. The site itself is engineered as a live proof-of-concept of the discoverability techniques PromptRaise sells — server-rendered, structured-data-rich, and explicitly optimized for both search engines and AI agents.

## Goals

1. Establish credibility by sustaining a publishing cadence of 1–2 articles/week plus one monthly AI-ranking report (case studies, thought leadership, spotlights).
2. Drive measurable click-through to the primary CTA (Telegram community) and secondary CTA (free audit), tracked via cookieless analytics.
3. Score in the "Good"/"Excellent" range on the Vercel Agent Readability Spec and be indexed/cited across LLMs and AI search surfaces (verified via Google Search Console and Bing Webmaster).
4. Enable a non-technical teammate to publish a complete article end-to-end in the CMS without developer involvement.
5. Maximize discoverability across any LLM and AI-powered search surface — ChatGPT, Claude, Perplexity, Google Gemini / AI Overviews, DuckDuckGo summaries, and YouTube summaries — not just traditional Google search.
6. Ship incrementally (V1 landing → 48-hour validation → V2 full site → V3 differentiation), meeting each version's Success Criteria before starting the next.

## Core User Flow

The site has no sign-up and no user accounts; the core value is credibility and a clear path to contact.

1. A visitor arrives via an LLM citation, AI search summary, organic Google result, social post, or direct link.
2. They land on a server-rendered page (landing page or a deep-linked article) with content present in the initial HTML.
3. They read content that establishes what PromptRaise does differently to improve LLM ranking and AI visibility.
4. They explore related content — case studies, guides, the glossary, or the monthly report.
5. They reach a decision point and act on one of: the **primary CTA** (join the **Telegram** community), the **secondary CTA** (request a **free audit**, routed to `audit.promptraise.com` now and the Telegram audit bot later), or a **tertiary** action (book a call via Google Calendar, or submit the contact form delivered by email with no data stored).
6. They return later for new articles, the monthly report, free tools/guides, the glossary, and the public roadmap.

## Features

### Content

- Articles in three evolving categories: Thought Leadership, Spotlight, Monthly Report.
- Author attribution with EEAT-grade author profiles (bio, photo, links to socials).
- TL;DR/summary and estimated reading time per article.
- Categories + free-form tags; filter-by-category/tag (full-text search deferred).
- Related articles and a "featured" flag for homepage promotion.
- Glossary (definition entries) and an FAQ section.

### Conversion

- Telegram CTA (primary) sitewide.
- Free-audit CTA → `audit.promptraise.com`.
- Contact form → email via Resend (no persistence).
- Google Calendar booking link.

### Discoverability (AI visibility layer)

- Server-side rendering/static generation; clean semantic HTML.
- Generated JSON-LD (Person, Organization, Article, FAQPage, BreadcrumbList, DefinedTerm) derived from typed CMS fields.
- `robots.txt` (AI bots allowed), `sitemap.xml`, `sitemap.md`, `llms.txt`, `llms-full.txt` (also hosting the public agent/skill file).
- Markdown mirrors with `Accept: text/markdown` content negotiation, `alternate` link tags, and canonical `Link` headers.
- RSS (full-content, syndication pipe), dynamic OG images, IndexNow, Google Search Console + Bing Webmaster verification.
- Cookieless analytics (no cookie banner required).

### Transparency / Brand

- Public roadmap (`/roadmap`) — build-in-public.
- Brand/press kit with downloadable assets at `/aivisibility`.
- "How we built this" discoverability proof page at `/how-we-built-this`, displaying a live agent-readability score.

### Syndication

- Manual cross-posting to Mirror.xyz, Medium, dev.to, LinkedIn, and X, always with `rel="canonical"` back to promptraise.com (this site is the canonical source).

## Scope

### In Scope

- A Next.js (App Router) + TypeScript marketing site, styled with Tailwind (tokens from Figma) and shadcn/Radix primitives, hosted on Vercel.
- Sanity headless CMS (Studio for editors; roles: admin = owner, editor = team) with a single flexible Article model plus Author, Category, Tag, GlossaryTerm, FAQ, RoadmapItem, BrandAsset, and SiteSettings types.
- The full AI-visibility layer per the Vercel Agent Readability Spec.
- Pages: Landing (V1); then Article detail, Category/listing, About, Author profiles, Free Audit landing, Contact, Events, Glossary, FAQ, Roadmap, Brand kit (`/aivisibility`), Legal (Privacy + Terms); then `/how-we-built-this` and a public read-only content API.
- Contact/free-audit form delivery via email (Resend).
- Internal documentation in `context/docs/` and a repo-root `AGENTS.md`.

### Out of Scope

- Runtime AI features on the website (no embedded chatbot, no live LLM calls to visitors).
- On-site newsletter/email capture in V1 (primary CTA is Telegram; no inbound list yet).
- A cookie-consent banner (avoided by using cookieless analytics and setting no tracking cookies).
- Any owned storage of visitor PII; no application database or cache (no Postgres/Supabase/Redis in this repo).
- The audit web app's internals (`audit.promptraise.com` is a separate repo, linked to only).
- The Telegram audit bot (separate infrastructure, rebuilt after V1; the site only links to `t.me/...`).
- Automated/programmatic syndication (V1 is manual cross-posting with canonical).
- Interactive articles as a CMS feature (built later as one-off, code-owned pages per piece).
- User authentication/accounts on the public site.

## Success Criteria

1. (V1) The landing page matches the Figma design (node `63-93`) at mobile, tablet, and desktop breakpoints.
2. (V1) The Telegram and free-audit CTAs work and route correctly.
3. (V1) Lighthouse SEO, Performance, and Accessibility scores are each ≥ 95.
4. (V1) The AI-visibility foundation is live: `robots.txt`, `sitemap.xml`, `llms.txt`, Organization + WebSite JSON-LD, GSC + Bing verified, and cookieless analytics reporting.
5. (V1) The site is deployed to Vercel on `www.promptraise.com`.
6. (V2) A non-technical teammate can publish a complete article (author, TL;DR, tags, related, JSON-LD) end-to-end in Sanity without developer help.
7. (V2) All content pages emit correct JSON-LD (Article, Person, BreadcrumbList; FAQPage and DefinedTerm where applicable) with no schema errors.
8. (V2) Markdown mirrors, content negotiation, `sitemap.md`, `llms-full.txt`, RSS, dynamic OG images, and IndexNow all function correctly.
9. (V2) Content pages score "Good"/"Excellent" on the Vercel Agent Readability Spec.
10. (V2) The Glossary, FAQ, Roadmap, Brand kit (`/aivisibility`), Events, Contact, and Legal pages are live.
11. (V3) The public read-only content API (`/api/posts`, `/api/content`) is live, cached, documented in `llms-full.txt`, with `openapi.json` linked.
12. (V3) `/how-we-built-this` displays a live, audited agent-readability score validated in CI.
13. (V3) A documented process exists to ship interactive articles as individual coded pages when scoped.
