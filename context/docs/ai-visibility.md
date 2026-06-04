# PromptRaise — AI Visibility

The single source of truth for the site's discoverability surface. Aligns to the
Vercel Agent Readability Spec and the llmstxt.org proposal. Every item
is tagged with its target version. Keep this file in sync when adding pages,
content types, or machine-readable endpoints.

## Purpose

The site is itself a proof-of-concept of what PromptRaise sells: maximum
discoverability and citability across LLMs and AI search surfaces (ChatGPT,
Claude, Perplexity, Google Gemini / AI Overviews, DuckDuckGo summaries, YouTube
summaries) and traditional search.

## Principles

- Server-rendered/static HTML; meaningful content present without executing JS.
- Structured data is generated from typed Sanity fields, never hand-pasted.
- This site is always the canonical source; syndicated copies point back here.
- AI crawlers are explicitly allowed.
- Production is indexable; staging is never indexable.

## Site-Level Requirements

- [ ] `robots.txt` — allow `GPTBot`, `ClaudeBot`, `CCBot`, `Google-Extended`; never disallow `/llms.txt`; link `sitemap.xml`. **(V1)**
- [ ] `sitemap.xml` — valid `<urlset>` with `<lastmod>`. **(V1)**
- [ ] `llms.txt` — at site root, `text/plain`, lists pages with `.md` URLs. **(V1)**
- [ ] `Organization` + `WebSite` JSON-LD sitewide. **(V1)**
- [ ] Google Search Console + Bing Webmaster verification. **(V1)**
- [ ] Cookieless analytics (no consent banner). **(V1)**
- [ ] `sitemap.md` — `/sitemap.md`, headings + links mirroring structure. **(V2)**
- [ ] `llms-full.txt` — full-content index; also hosts the public agent/skill file content. **(V2)**
- [ ] Public agent/skill file — served via `/llms-full.txt` (install/config/usage framed around the public content API and Telegram audit bot). **(V2)**
- [ ] RSS (full-content) — syndication pipe. **(V2)**
- [ ] IndexNow — ping on publish (production only). **(V2)**

## Page-Level Requirements (every page)

- [ ] HTTP 200, 0–1 redirects, correct `Content-Type`; no `noindex`/`noai` on production.
- [ ] `<link rel="canonical">` present and correct.
- [ ] `meta description` (50+ chars), `og:title`, `og:description`, `html lang`.
- [ ] JSON-LD with at least title, description, canonical URL, `dateModified`, and `BreadcrumbList`.
- [ ] 3+ headings (h1–h3); exactly one `<h1>`; correct hierarchy.
- [ ] Text-to-HTML ratio > 15% (content pages; landing page exempted by design).
- [ ] Footer link to the Glossary (sitewide terminology link). **(V2)**

## Structured Data (never omitted for its page type)

- [ ] `Organization` — sitewide; `sameAs` -> Reddit, X, Telegram, Discord, YouTube. **(V1)**
- [ ] `Article` — every article (`datePublished` + `dateModified`). **(V2)**
- [ ] `Person` — every author profile; `sameAs` -> author socials (EEAT). **(V2)**
- [ ] `BreadcrumbList` — category -> article navigation. **(V2)**
- [ ] `FAQPage` — pages/sections with Q&A. **(V2)**
- [ ] `DefinedTerm` — glossary entries. **(V2)**

## Markdown Mirrors and Content Negotiation (V2)

- [ ] Every HTML page has a `.md` mirror with frontmatter.
- [ ] `Accept: text/markdown` content negotiation returns markdown for the same URL.
- [ ] `<link rel="alternate" type="text/markdown">` on HTML pages.
- [ ] `Link: <canonical>; rel="canonical"` header on markdown responses.
- [ ] `## Sitemap` section in each markdown page linking `/sitemap.md`.
- [ ] Code blocks carry language identifiers.

## Syndication and Canonical Discipline (V2)

- [ ] Manual cross-posting to Mirror.xyz, Medium, dev.to, LinkedIn, and X.
- [ ] Each syndicated copy sets `rel="canonical"` back to the promptraise.com URL.
- [ ] Optional per-article `canonicalUrl` override field for reverse-syndication cases.

## Environments

- [ ] Production (`www.promptraise.com`) is fully indexable.
- [ ] Staging (`staging.promptraise.com`) is `noindex` + `robots: disallow /`, excluded from `sitemap.xml`/`llms.txt`, and never pinged to IndexNow.
- [ ] Per-environment Sanity datasets (`production` / `staging`) and per-environment secrets.

## Public Content API (V3)

- [ ] Read-only, cached `/api/posts` and `/api/content` (clean JSON).
- [ ] Documented in `llms-full.txt`; `openapi.json` published and linked from API pages.

## Validation and Scoring

- [ ] CI runs `@vercel/agent-readability` (and Lighthouse) on every PR; systemic failures block merge.
- [ ] `/how-we-built-this` displays a live, audited agent-readability score. **(V3)**
- [ ] Target: content pages score "Good"/"Excellent"; landing page judged separately (image-heavy, lower text ratio by design).
