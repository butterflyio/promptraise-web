# PromptRaise — Architecture Context

## Stack

| Layer              | Technology                                        | Role                                                                                                                                                           |
| ------------------ | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Next.js (App Router) + TypeScript                 | SSR/SSG for crawlable HTML (core to the discoverability value prop); single codebase also hosts future coded interactive articles. TypeScript for type safety. |
| Styling            | Tailwind CSS (tokens from Figma)                  | Figma design tokens map 1:1 to `tailwind.config`; enforces a single source of design truth.                                                                    |
| UI primitives      | shadcn/ui (Radix under the hood)                  | Accessible, owned-in-repo primitives (nav, dialog, dropdown). No heavy opinionated kit fighting the Figma designs.                                             |
| Fonts              | `next/font` (self-hosted)                         | No layout shift, no third-party font requests; better Core Web Vitals.                                                                                         |
| Content body       | Portable Text + custom blocks                     | Rich but consistent article bodies (callout, image+caption, quote, FAQ, code).                                                                                 |
| CMS                | Sanity (headless)                                 | Flexible, evolvable content model; friendly Studio for non-technical authors; structured fields drive entity-consistent JSON-LD.                               |
| Hosting            | Vercel (ISR)                                      | First-class Next.js support, edge CDN, image optimization, preview deploys; CMS edits go live via ISR without redeploys.                                       |
| Email              | Resend (transactional)                            | Contact / free-audit form delivery to inbox; no database, minimal PII liability.                                                                               |
| Analytics          | Vercel Web Analytics or Plausible (cookieless)    | Visitor metrics with zero tracking cookies -> no cookie banner.                                                                                                |
| Search/AI indexing | Google Search Console + Bing Webmaster + IndexNow | Search-side performance + instant indexing; Bing feeds ChatGPT.                                                                                                |

## System Boundaries

- `/app` — owns routes, layouts, `generateMetadata`, JSON-LD injection, and route handlers for `robots.txt` / `sitemap.xml` / `sitemap.md` / `llms.txt` / `llms-full.txt` / markdown mirrors / RSS / OG images. Must not contain business/data-fetch logic (delegate to `/lib`) or presentational markup (delegate to `/components`).
- `/components` — owns presentational, token-driven UI components. Must not contain data fetching, GROQ queries, secrets, or hardcoded colors/spacing.
- `/lib` — owns the Sanity client, GROQ queries, schema-to-JSON-LD generators, reading-time, OG-image helpers, and content-negotiation utilities. Must not contain React/JSX or route definitions.
- `/sanity` — owns schema type definitions, Studio config, and desk structure. Must not contain app runtime/render logic.
- `/public` — owns static brand assets and static artifacts where applicable. Must not contain secrets or content that should be generated dynamically.
- `/context/docs` — owns internal documentation, roadmap, and decision log. Must not contain application code.
- `AGENTS.md` (repo root) — owns guidance for coding agents working in this repo. Must not contain public-facing content (the public agent file is served via `/llms-full.txt`).

## Storage Model

- **Sanity (CDN-backed content lake)**: articles, authors, categories, tags, glossary terms, FAQ, roadmap items, brand assets, and site settings — the single source of content truth.
- **Vercel edge cache / ISR**: rendered pages, revalidated on publish. This is a cache, not a database.
- **Email (Resend)**: contact / free-audit submissions are delivered to an inbox, never persisted; no PII is stored.
- **External apps only**: Telegram bot data and audit results live in `audit.promptraise.com` and the bot — never in this repo.
- **None (no application database or cache)**: no Postgres, Supabase, Redis, or KV in this repo, by design.

## Auth and Access Model

- **Public website**: no authentication. Fully open — no accounts, no login, no gated content.
- **Sanity Studio (CMS)**: Sanity-managed SSO (Google/email). `admin` = owner (schema, billing, publish); `editor` = team (draft/publish content, no schema or billing access).
- **Forms**: public POST with no auth. The server route validates input, rate-limits at the edge, and sends email; it stores nothing.
- **Ownership**: the site owns no user data, so there are no user-data mutation boundaries. The only privileged surface is the CMS, where access control is delegated entirely to Sanity.

## AI and Background Task Model

- **No runtime AI on the website.** The site performs zero LLM calls for visitors. "AI-assisted" refers only to the team's private authoring workflow (OpenCode + OpenRouter), which happens outside this app.
- **No long-lived/background work in request handlers.** Vercel Functions are treated as stateless and ephemeral. Any deferred work (e.g., IndexNow ping on publish) uses `waitUntil`, never a daemon or in-memory queue.
- **Audits run elsewhere.** The audit engine (OpenCode via OpenRouter) lives in the separate `audit.promptraise.com` app; this site only links out to it (and later to the Telegram bot).

## Environments

- **Production**: `main` branch deploys to `www.promptraise.com` using Sanity `production` dataset.
- **Staging**: `staging` branch deploys to `staging.promptraise.com` using Sanity `staging` dataset.
- **Safety rule**: staging is never indexable (`noindex`, disallow all robots), excluded from production sitemap/llms surfaces.
- **Cutover rule**: validate full behavior on staging, then perform production switch in the final cutover unit.

## Invariants

1. **Content is always server-rendered or statically generated.** No content page may rely on client-only rendering; meaningful HTML must be present in the initial response (crawlers and AI agents must read it without executing JS).
2. **No visitor PII is stored.** Forms deliver via email only. No application database, cache, or KV is introduced into this repo; submissions are never persisted.
3. **Required structured data is never omitted for its page type.** Every Article emits `Article`; every author page `Person`; the org `Organization`; Q&A `FAQPage`; glossary `DefinedTerm`; navigable pages `BreadcrumbList`. JSON-LD is generated from typed CMS fields, never hand-pasted.
4. **This site is always the canonical source.** Every page sets a correct `<link rel="canonical">`; syndicated copies point back here. Canonical discipline is never broken for a syndication convenience.
5. **AI crawlers are never blocked.** `robots.txt` always allows `GPTBot`, `ClaudeBot`, `CCBot`, and `Google-Extended`, and never disallows `/llms.txt`.
6. **No tracking cookies are set.** Analytics stays cookieless so the site requires no consent banner; introducing GA4/pixels is a deliberate, separately-approved decision, not an incidental one.
7. **Design values come only from tokens.** No hardcoded hex colors, font sizes, or spacing in components; all derive from the Tailwind token layer sourced from Figma.
8. **External apps are linked, never imported.** Code from `audit.promptraise.com` or the Telegram bot is never imported into this repo; integration is via outbound links only.
9. **Request handlers do no long-lived work.** Functions are stateless/ephemeral; post-response work uses `waitUntil`; no background daemons or durable in-process state.
10. **No runtime AI for visitors.** The website never makes LLM/AI calls on behalf of visitors; all AI usage is confined to the private authoring workflow outside this app.
11. **Every page is semantically structured.** Exactly one `<h1>`, a real heading hierarchy, and 3+ headings on content pages — required for both accessibility and agent readability.
