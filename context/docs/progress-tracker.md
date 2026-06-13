# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Sanity backend is wired; work is currently design-system materialization + hero-first visual fidelity lock to Figma desktop frame `102:297`, followed by staging parity checks.

## Current Goal

- Keep full design-system code coverage in-repo (tokens + primitives + contracts + specs) while closing the remaining hero/media fidelity gap against Figma frame `102:297`.

## Completed

- Planning and architecture decisions finalized.
- Build order validated against dependency/security/JIT rules.
- Unit specs drafted for Unit 1, Unit 2, and Unit 3.
- Unit 1 completed: repository initialized; context docs, build plan, and agent entry files written to disk.
- Unit 2 completed: Next.js scaffolded; strict TypeScript, Tailwind, lint/format/typecheck scripts, CI workflow, and baseline security headers/CSP implemented and validated.
- Unit 3 code-side controls completed: staging-only `X-Robots-Tag: noindex, nofollow`, staging `robots.txt` disallow-all, `.env.example` environment contract, and updated Unit 3 spec env requirements.
- Vercel CLI authenticated and project linked (`zeds-projects-4a4386a5/promptraise-web`).
- GitHub repository created and pushed: `butterflyio/promptraise-web` (branch `main`).
- `staging` branch created and pushed to GitHub (`butterflyio/promptraise-web:staging`).
- Vercel project connected to GitHub with preview env vars scoped to `staging` branch:
  - `SITE_ENV=staging`
  - `NEXT_PUBLIC_SITE_URL=https://staging.promptraise.com`
- Production environment variables set in Vercel: `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://www.promptraise.com`.
- Development environment variables set in Vercel: `SITE_ENV=development`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- `staging.promptraise.com` added to Vercel project and aliased to staging deployment (direct resolver checks still lag in this environment).
- Unit 4 foundation implemented locally:
  - Sanity packages installed,
  - `sanity.config.ts` and `sanity.cli.ts` added,
  - `siteSettings` schema created,
  - typed Sanity client/env modules added,
  - Studio route mounted at `/studio` with `noindex` metadata,
  - `.env.example` extended with Sanity variables,
  - Unit 4 spec added (`context/docs/specs/04-sanity-foundation.md`).
- Unit 3 operational checks completed:
  - created preview deployment from `staging` branch,
  - aliased `staging.promptraise.com` to the staging preview deployment,
  - verified staging behavior via forced host mapping (`--resolve`):
    - `x-robots-tag: noindex, nofollow`,
    - `robots.txt` returns `Disallow: /`.
- Unit 4 account-side setup completed:
  - Sanity project identified: `4pws3pyj`,
  - datasets confirmed/created: `production` and `staging` (staging created as public due plan limits),
  - Vercel env vars set for production, preview(`staging`), and development:
    - `NEXT_PUBLIC_SANITY_PROJECT_ID`,
    - `NEXT_PUBLIC_SANITY_DATASET`,
    - `SANITY_API_VERSION`,
  - local `.env.local` pulled from Vercel.
- Unit 5 structural implementation completed:
  - site shell (`SiteHeader`, `SiteFooter`, `SiteShell`) integrated into root layout,
  - landing page section structure added,
  - `app/not-found.tsx` and `app/manifest.ts` added,
  - `ui-context.md` updated with implemented structure and required Figma extraction checklist.
- **Unit 5 visual fidelity correction completed:**
  - Replaced light scaffold tokens with brand dark tokens (`--bg-base: #0F0F0F`, `--accent-primary: #67FF67`, etc.)
  - Updated all components to use new semantic token names
  - Header CTA changed to **"Get Audit"** (green pill)
  - Primary nav updated: Solutions, Pricing, Company, Resources
  - Footer restyled with dark theme, legal links, "powered by Pencil" attribution
  - Manifest updated: `background_color: #0F0F0F`, `theme_color: #67FF67`
  - At that checkpoint, all quality gates passed: typecheck, lint, format:check, build
- **Unit 6 landing page content completed:**
  - Hero section with rotating AI surface names (ChatGPT, Perplexity, Claude, Gemini, AI Search)
  - Stats section (50+ projects, 12 LLM surfaces, 3.2x improvement, 94% retention)
  - How It Works section (4-step process: Audit → Optimize → Monitor → Rank)
  - Comparison table (PromptRaise vs Traditional SEO vs DIY)
  - Pricing tiers (Starter $2,500/mo, Growth $5,000/mo, Enterprise custom)
  - Case studies section (3 cards: DeFi Protocol X, Layer 2 Network Y, NFT Marketplace Z)
  - Team section (3 members with initials avatars)
  - Final Audit CTA section
  - All sections use brand dark tokens and green accent
  - At that checkpoint, all quality gates passed: typecheck, lint, format:check, build
- **Unit 7 AI visibility foundation completed:**
  - `robots.txt` updated: explicitly allows GPTBot, ClaudeBot, CCBot, Google-Extended, PerplexityBot, ChatGPT-User
  - `sitemap.xml` created with homepage, privacy, and studio routes
  - `llms.txt` endpoint created at `/llms.txt` (text/plain, lists pages and contact info)
  - `Organization` + `WebSite` JSON-LD structured data added to root layout
  - Enhanced metadata: OG tags, Twitter cards, keywords, authors, canonical URLs
  - Search console verification meta tags ready (Google + Bing, env-var driven)
  - Privacy notice page created at `/privacy`
  - `@vercel/analytics` installed and configured (cookieless)
  - `ai-visibility.md` checklist updated with V1 items marked complete
  - At that checkpoint, all quality gates passed: typecheck, lint, format:check, build
- **Unit 8 production cutover completed:**
  - `staging` branch merged into `main` (fast-forward)
  - `main` pushed to GitHub, triggering production deployment
  - `www.promptraise.com` added to Vercel project domains
  - Redirect configuration added to `next.config.ts` (placeholder for legacy URLs)
  - Footer cleaned to only show existing V1 pages
  - Production cutover document created: `context/docs/specs/08-production-cutover.md`
  - DNS cutover steps documented (A record or CNAME to Vercel)
- **Sanity backend deployed and wired:**
  - Deployed `siteSettings` schema to both staging and production datasets
  - Created initial site settings document with real URLs (Telegram, audit, social links)
  - Added `sanity/lib/queries.ts` for type-safe data fetching
  - Updated `SiteHeader` to fetch site name and CTA URLs from Sanity
  - Updated `SiteFooter` to fetch social links from Sanity (with fallbacks)
  - Updated `HeroSection` and `AuditCtaSection` to accept CTA URLs as props
  - Updated `page.tsx` to fetch settings server-side and pass to components
  - At that checkpoint, all quality gates passed: typecheck, lint, format:check, build
- **Figma-backed landing page refinement baseline completed:**
  - Hero and visibility sections converted to Figma-backed layouts
  - Middle landing-page sections replaced from generic SaaS scaffolds toward Figma-aligned copy/layout
  - Local quality gates passed at that checkpoint after section replacement
- **Latest hero fidelity cycle completed (partial):**
  - Figma desktop MCP usage confirmed with `get_design_context` and `get_screenshot` for hero frame `102:297`
  - Hero spacing, typography, and layout structure were aligned to the Figma node structure
  - Local hero media assets were wired and iterated: `public/videos/hero-loop.mp4`, `public/images/hero-poster.png`
- **Design-system materialization pass completed (6 missing parts):**
  - Added reusable design-system layer in code:
    `components/design-system/{button,badge,card,section,icons,assets,tokens,index}.tsx`
  - Added utility and contract files: `lib/cn.ts`, `scripts/verify-design-contract.mjs`, `context/docs/design-system-code-map.md`
  - Added and verified Design-to-Code contract check: `npm run design:verify`
  - Expanded token coverage in `app/globals.css` (semantic backgrounds/borders/radii/shadows + DS utility classes)
  - Standardized breakpoint contract to include `393 / 768 / 1440` across docs and code (`ui-context.md`, `tokens.ts`, CSS token map)
  - Migrated core landing sections to DS primitives and added 500/error surfaces (`app/error.tsx`, `app/global-error.tsx`)
  - Current command snapshot: `npm run design:verify` passes, `npm run build` passes, `npm run lint` has warnings only (0 errors)
- **Header/Footer Figma parity + CMS configurability pass completed (latest):**
  - Implemented Figma-aligned header spacing and behavior across breakpoints:
    - mobile (393): menu icon + logo + `Get Audit` CTA
    - tablet (768): desktop nav variant with tablet-specific side padding
    - desktop (1440): desktop nav variant with Figma padding/typography
  - Implemented Figma-aligned footer structure and typography:
    - desktop/tablet: left brand lockup + right legal links/copyright
    - mobile: centered stacked footer layout matching mobile component
  - Added CMS-configurable header/footer fields in `siteSettings`:
    - `headerCtaLabel`, `headerCtaUrl`
    - `footerPoweredByText`, `footerCopyrightText`, `footerLegalLinks`
  - Extended typed query contract (`sanity/lib/queries.ts`) and wired header/footer components to use CMS values with safe defaults.
  - Current command snapshot after header/footer pass: `npm run design:verify` pass, `npm run lint` pass (warnings only), `npm run build` pass.

## In Progress

- Exact hero background/video asset extraction and replacement is still ongoing.
- Replacing remaining localhost-backed Figma asset references (`http://localhost:3845/assets/...`) with stable in-repo assets for full portability.
- Verifying staging.promptraise.com parity after hero media replacement and latest header/footer deployment.

## Next Up

- Obtain exact hero background media source matching Figma `102:297` and replace the current loop asset.
- Re-run visual checks at 393 / 768 / 1440 and compare against Figma screenshots.
- Localize remaining Figma-exported asset dependencies to repo-hosted files under `public/`.

## Open Questions

- Final social URLs/handles and org metadata for `SiteSettings` (currently using placeholder URLs in Sanity).
- `staging.promptraise.com` still does not resolve via this local resolver; forced mapping and Vercel alias checks pass. Re-check global DNS propagation later.
- Confirm whether staging dataset can remain public on current Sanity plan or if plan upgrade/private dataset is required.
- Exact hero background media export/source (clean asset matching Figma frame `102:297`) is not yet retrieved in this environment; decide final source handoff path (direct export, MCP asset endpoint, or desktop cache extraction).
- Some design-context URLs returned by Figma MCP currently resolve to `http://localhost:3845/assets/...` paths that return `404` in this environment; confirm the stable export path for those assets.
- Need existing URL inventory from live `www.promptraise.com` for redirect mapping (currently using placeholder config).

## Architecture Decisions

- Staging-first rollout: validate on `staging.promptraise.com`, then switch production in cutover unit.
- Keep Unit order 3 -> 4 (prove deploy target before adding CMS).
- Use enhanced verification checklist in `ai-workflow-rules.md`.
- Include Security and Secrets section in `code-standards.md`.
- Include AI and Background Task section in `architecture.md`.
- Sanity setup is in Phase 0 (foundation), not deferred.

## Session Notes

- Replacing a live website at `www.promptraise.com`; redirects and DNS cutover are explicit units.
- Use placeholders for missing external values and resolve during relevant unit.
- Use Sanity MCP or CLI at implementation time; choose pragmatically.
- Vercel CLI deploy succeeds, but live staging URL checks are blocked until DNS propagation completes.
- Unit 4 account-side provisioning is complete; only staging DNS resolver lag remains.
- Unit 5 now uses brand dark tokens; no temporary scaffold values remain.
- Unit 6 landing page is content-complete for V1; visual polish from Figma extraction can be applied later.
- Unit 7 AI visibility foundation is live: all V1 machine-readable surfaces implemented.
- Unit 8 production cutover: code is on `main` and deployed, DNS update is the remaining step.
- Sanity backend is now live with real data: site settings document created in both staging and production datasets.
- Reviewed attached screen recording (`Screen Recording 1447-12-28 at 02.53.07`) to baseline hero visual fidelity and motion feel.
- Compared Figma hero screenshots (node `102:297`) against local/staging captures to isolate remaining mismatch.
- Remaining parity gap is primarily the exact hero media source quality, not headline/button/trust-bar layout structure.
- Current verification snapshot: `npm run design:verify` and `npm run build` pass; `npm run lint` has warnings only (no errors).
- Added a mandatory docs-sync checklist to `context/docs/ai-workflow-rules.md` to enforce same-turn documentation updates and reduce plan/spec/tracker drift.
- Updated `context/docs/specs/00-build-plan.md` with a mandatory Figma Design-to-Code Gate: Layer 1 entry check (`get_design_context` before coding) and Layer 2 functional-parity verification (not screenshot-only matching).
- Materialized missing unit specs as dedicated files:
  `context/docs/specs/05-design-system-and-base-layout.md`,
  `context/docs/specs/06-landing-page.md`,
  `context/docs/specs/07-ai-visibility-foundation.md`.
- Materialized design-system code coverage across tokens/primitives/contracts and added automated design-contract verification (`npm run design:verify`).
- Pulled fresh Figma desktop MCP contexts and screenshots for header/footer components (`312:4199`, `415:9170`, `344:10138`, `416:12881`, `417:21098`) before implementing latest header/footer parity changes.

## Housekeeping

- [ ] Rotate the Sanity API token currently stored in local opencode config.
- [ ] Ensure all secrets live in env vars/secret stores only.
- [ ] Enable and keep CI secret scanning active.
- [ ] Add Google Search Console and Bing Webmaster verification codes to Vercel env vars when available.
- [ ] Update DNS A record for `www.promptraise.com` to `76.76.21.21` (or CNAME to `cname.vercel-dns.com`).
- [ ] Update Sanity site settings with real social URLs when available.
