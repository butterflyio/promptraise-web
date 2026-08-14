# PRD — PromptRaise Blog: Regular Publishing + Internal Linking (Topical Authority Engine)

**Status:** Draft for approval
**Date:** 2026-08-12
**Owner:** Zain Khan / PromptRaise
**Prepared by:** Zack (Hermes Agent)

---

## 1. Problem

1. **Blog posts have no URLs.** `blog.promptraise.com` is a static Vite SPA
   where `src/App.tsx` swaps `ArticlePage` via React state — no router, no
   slugs, no crawlable URLs. Posts cannot be linked to, cannot be indexed,
   and cannot be cited by answer engines.
2. **No regular publishing workflow.** Content is hardcoded in
   `src/pages/BlogPage.tsx` (`POSTS` array) and `src/pages/ArticlePage.tsx`
   (`SECTIONS`). Publishing a post requires editing code, rebuilding, and
   redeploying — nobody does that weekly.
3. **Internal linking cannot happen.** The glossary (now 40 terms, live at
   `promptraise.com/academy/glossary`) has Phase 0 related-term chips, but
   Phase 1/2 (glossary ↔ blog posts, tool pages, service pages) is blocked
   because the blog has no stable URLs to link to.
4. **Topical authority is capped.** AI engines build authority by crawling a
   dense, interlinked body of content. Without crawlable posts + a
   bidirectional link graph to the glossary, PromptRaise cannot compound
   topical authority around "Web3 AI visibility / GEO".

## 2. Goal

Give PromptRaise a **CMS-driven blog with real URLs** (`promptraise.com/blog`)
that supports **regular publishing** (non-technical editor) and is wired into
the **glossary internal-link graph** — turning the site into a topical-
authority engine for AI visibility in Web3.

## 3. Non-goals (out of scope for V1)

- Migrating the old SPA blog content (we will copy the 6 existing posts in,
  not build a migration framework).
- Social sharing features, comments, author pages, newsletters.
- AI-writing automation inside the CMS (post-writing workflow stays manual;
  agent-assisted drafting is a separate project).
- Redirects from `blog.promptraise.com` URLs (they never had real URLs, so
  nothing to redirect).

## 4. Current state (verified)

| Asset                | Location                               | State                                                                                                                |
| -------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Sanity `post` schema | `sanity/schemaTypes/postType.ts`       | ✅ Exists (title, slug, excerpt, coverImage, categories, body blocks, authorName, publishedAt, status, SEO, noindex) |
| Sanity blog queries  | `sanity/lib/queries.ts`                | ❌ None — only pages/siteSettings                                                                                    |
| Blog routes          | `app/blog/*`                           | ❌ None                                                                                                              |
| Glossary data        | `lib/glossary-terms.ts`                | ✅ 40 terms + GLOSSARY_RELATED graph + relatedFor()/termAnchor()                                                     |
| Glossary pages       | `app/academy/glossary`, `app/glossary` | ✅ Live, Phase 0 chips shipped                                                                                       |
| Old blog content     | `/root/promptraise-blog/src`           | 6 posts + 1 featured, hardcoded                                                                                      |

## 5. Proposed architecture

**Option A (recommended): Sanity-backed blog on the main site**

- New routes on `promptraise.com`:
  - `app/blog/page.tsx` — list page (all published posts, newest first)
  - `app/blog/[slug]/page.tsx` — post detail (SSG with `generateStaticParams`
    - ISR revalidate, matching the site's existing Sanity pattern)
- New Sanity queries in `sanity/lib/queries.ts`:
  - `getAllPosts()` (published, `status == "published"`, `publishedAt <= now`)
  - `getPostBySlug(slug)` + draft-aware preview variant
- Post body rendered from Sanity portable text blocks (reuse existing
  portable-text components if present, else add a minimal renderer).
- Blog list/detail get added to `sitemap.xml` and `llms.txt` automatically.
- Draft mode via existing `/api/draft` pattern (extend for posts).

**Why Option A over keeping the Vite blog:** one domain (authority
concentration), one CMS (Sanity already powers the site), SSR (crawlable),
ISR (instant publishes), and the glossary can deep-link to
`promptraise.com/blog/[slug]` — all on the same origin.

## 6. Internal linking requirements (built into V1)

1. **Glossary → blog**: add a `seeAlso: { label, href }[]` field to
   `GlossaryTerm`; populate for the terms that have a natural post
   (e.g. "AI visibility" → the "Why ChatGPT Ignores Your Protocol" post).
   Render as "Related resources" on the term card (both glossary pages).
2. **Blog → glossary**: in post body copy, link the first use of any
   glossary-covered term to `promptraise.com/academy/glossary#term-<slug>`.
   Enforce via an editorial checklist (see §8) rather than auto-linking
   (auto-linkers produce bad anchor text).
3. **Blog ↔ blog**: each post links to 2 related posts ("Keep reading") —
   done manually in the CMS body or via a related-posts query by category.
4. Anchor text = exact term name (matches DefinedTerm name — sameAs
   consistency is what engines reward).

## 7. Publishing workflow (the "regular publishing" part)

1. Editor writes post in Sanity Studio (`/studio`), status = Draft.
2. Preview via Draft Mode (`/api/draft?slug=...`) — see it live.
3. Editor flips status to Review → someone approves → flips to Published
   with `publishedAt`.
4. ISR revalidation (`revalidate: 30` or `revalidateTag` on post publish)
   makes it live within ~30s; sitemap + llms.txt regenerate.
5. Optional: IndexNow ping on publish (site already has this pattern for
   revalidate — extend to posts).

**Cadence target:** 1-2 posts/week. Content themes aligned to glossary
categories (GEO, grounding, structured data, measurement, Web3-AI).

## 8. Editorial internal-link checklist (enforced per post)

- [ ] First use of each glossary term is linked to its `#term-<slug>` anchor
- [ ] At least 2 "related posts" linked inline or in a keep-reading block
- [ ] One link back to the glossary page itself
- [ ] One answer-capsule sentence at the top (quotable, 1 first-party number)
- [ ] Meta title ≤ 60 chars, meta description ≤ 160 chars

## 9. Acceptance criteria

1. `promptraise.com/blog` lists published posts; each post has a crawlable
   URL `promptraise.com/blog/<slug>` returning 200 with SSR content.
2. A post published in Sanity goes live without a code deploy, within ~1 min.
3. sitemap.xml + llms.txt include blog URLs.
4. At least 6 legacy posts migrated with proper internal links.
5. Glossary "Related resources" links render on the live glossary.
6. `curl` of any blog URL with JS disabled shows full article text
   (AI Eyes test — crawlable without JS).

## 10. Risks / mitigations

- **Sanity dataset mismatch** (studio paused previously): re-verify datasets
  before build; if the studio is still paused, unblock it as part of this
  work.
- **Portable-text renderer missing**: check for existing components; if none,
  add a minimal block renderer (heading/para/code/image/link) — small.
- **Old posts have images on Unsplash**: reuse as-is, no migration needed.
- **Scope creep**: keep V1 to list + detail + links + publish flow. No
  categories/tags pages, no search, no authors.

## 11. Deliverables

- Blog list + detail routes (SSR/SSG, ISR)
- Sanity post queries + draft-mode wiring
- Blog URLs in sitemap + llms.txt
- Glossary `seeAlso` field + rendering (Phase 1 of the linking plan)
- 6 legacy posts migrated + internal links applied
- This PRD's acceptance criteria verified on staging

## 12. Approval gate

Per workflow: PRD approval (chat or PDF via email) → staging development
(`staging.zainkhan.me` staging env) → Zain alone publishes to production.
