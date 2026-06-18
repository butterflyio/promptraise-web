# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Sanity backend is wired; work is currently design-system materialization + hero-first visual fidelity lock to Figma desktop frame `102:297`, followed by staging parity checks.

## Current Goal

- Execute section-by-section Figma DS implementation from section `11 -> 1`; section 10 now includes slice 1 (background parity + animation #1), with animation #2 pending spec.

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
- **Team section Figma parity update completed (latest):**
  - Pulled Team section from Figma desktop nodes (`353:10844`, card instances `350:10710` and `353:10814`) and applied node-accurate card media positioning in code.
  - Materialized Team media assets in-repo under `public/images/team/`:
    - portraits: `maxim-moris.png`, `zain-khan.png`
    - vectors/logos: `team-card-grid.svg`, `team-card-overlay-light.svg`, `team-card-overlay-plus.svg`, `team-badge-ellipse.svg`, `cicada-logo.svg`, `oxd-logo.svg`
  - Replaced Team-section `http://localhost:3845/assets/...` references with stable local asset paths via `components/design-system/assets.ts`.
  - Updated Team section desktop/tablet layout behavior to match Figma composition (two 405px cards side-by-side on wider breakpoints; stacked on narrow/mobile).
- **Team section CMS configurability pass completed (latest):**
  - Added editable `teamSection` fields to `homePage` Sanity schema:
    - section copy (`badgeLabel`, `heading`, `backedByTitle`)
    - team cards (`name`, `roleLabel`, `description`, `image`, `social.x`, `social.linkedin`)
    - backed-by items (`label`, `subtitle`, `logo`)
  - Updated home-page query projection to resolve Team image assets (`asset->url`) for both card portraits and backed-by logos.
  - Wired frontend Team section to Sanity `homePage.teamSection` with safe Figma defaults when CMS fields are empty.
  - Updated `app/page.tsx` to pass Team CMS content into `TeamSection`.
  - Deployed preview `dpl_71r9PzS6MmiFX9JonrqjLS51yGYW` and re-pointed `staging.promptraise.com` to this build.
- **Final CTA section Figma parity + CMS configurability pass completed (latest):**
  - Pulled Figma desktop node context and screenshot for CTA banner (`411:6768`) before coding.
  - Rebuilt `AuditCtaSection` to match Figma section structure (left CTA copy + right preview window composition) with responsive behavior.
  - Added editable `auditCtaSection` fields to `homePage` Sanity schema:
    - headline parts (`headlinePrefix`, `headlineHighlight`, `headlineSuffix`)
    - body copy (`body`)
    - CTA (`primaryCta.label`, `primaryCta.href`)
    - right-side preview copy (`previewPrompt`, `previewHeadingHighlight`, `previewHeadingSuffix`, `previewItems[4]`)
  - Extended home-page query projection and typed contracts to include `auditCtaSection`.
  - Wired `app/page.tsx` and `AuditCtaSection` to consume `homePage.auditCtaSection` with safe Figma fallback defaults when CMS fields are empty.
  - Deployed preview `dpl_233zbQa72qgbG8K1PYun66yDEof5` and re-pointed `staging.promptraise.com` to this build.
- **Final CTA section visual refinement pass completed (latest):**
  - Updated CTA desktop frame to align closer to Figma composition dimensions (`1248x500`) with fixed-position left copy (`x=96`) and right visual panel (`x=648`).
  - Tuned heading/body/button scale and spacing to match the supplied reference screenshot and Figma node proportions.
  - Refined right-side preview window sizing/offset and background treatment to better match the Figma structure while preserving CMS-editable content fields.
  - Deployed preview `dpl_7YhvbgzJrNKBBWQns4DQgvyb5Rrs` and re-pointed `staging.promptraise.com` to this build.
- **Figma section-structure alignment pass completed (latest):**
  - Mapped Figma `Main` frame (`102:148`) sections to staging/component structure in `context/docs/figma-section-mapping.md`.
  - Added missing structure sections to match Figma flow:
    - `DecisionSection` (`components/sections/decision-section.tsx`) for the "You&apos;re invisible where decisions are made" block.
    - `PlansSection` (`components/sections/plans-section.tsx`) for the "Plans That Scale With You" block.
  - Reordered `app/page.tsx` sections to follow Figma sequence and moved Team after final CTA.
  - Remapped section intent:
    - `PricingSection` now carries the "We create content that trains AI" section (`id=\"content-engine\"`).
    - `CaseStudiesSection` now carries the "Why Choose PromptRaise" section (`id=\"resources\"`).
  - Deployed preview `dpl_9eSQtzA8FAgtuy5MmVbQtCHJYRiW` and re-pointed `staging.promptraise.com` to this build.
- **Section 11 footer DS parity refresh completed (latest):**
  - Re-pulled Figma desktop footer component contexts/screenshots for desktop and mobile (`344:10138`, `416:12881`) before implementation.
  - Updated `components/site-footer.tsx` to match Figma DS footer structure:
    - text-only brand lockup (`PromptRaise · powered by Cicada`) in footer (removed footer icon mark),
    - desktop legal/copyright stack and mobile centered stacked order aligned to component variants,
    - legal-link typography aligned to DS intent (`12px`, medium, white).
  - Preserved CMS editability via `siteSettings` fields:
    - `footerPoweredByText`, `footerCopyrightText`, `footerLegalLinks`.
  - Current command snapshot after section 11 pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- **Frame `102:148` implementation pass (current):**
  - Ran `get_design_context` on exact frame `102:148`; response was sparse/truncated due frame size.
  - Ran `get_metadata` for `102:148` to map node hierarchy and section coordinates.
  - Ran `get_screenshot` on exact frame variant `102:148` and section references (`102:388`, `344:7724`) before edits.
  - Updated `components/sections/decision-section.tsx` to match frame composition more closely:
    - desktop-centered 721px window with `theProblem.exe` header bar and 3-dot controls,
    - four floating side cards positioned to Figma layout pattern,
    - updated copy and CTA label (`Go to Solution`) from screenshot context.
  - Current command snapshot after frame pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- **Hero background video replacement completed (latest):**
  - Added user-provided media asset `BG Video PromptRaise.mp4` to `public/videos/bg-video-promptraise.mp4`.
  - Updated hero media mapping to use the new video (`components/design-system/assets.ts`).
  - Removed hero image-style fallback/overlay layers in hero-only implementation:
    - removed `poster` usage from `HeroSection` video element,
    - removed extra hero texture/vignette layers from `app/globals.css`.
  - Current command snapshot after hero video pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes, `npm run design:verify` passes.
- **Features/Stats section parity pass completed (latest):**
  - Pulled exact Figma metadata/screenshot for the section after hero (`314:4272`) and re-aligned section geometry to that node:
    - heading position/width,
    - 300px center medallion placement,
    - corrected stat-card placement order (`58%` top-left, `3-5x growth` top-right, `2-7 projects` bottom-left, `+40%` bottom-right).
  - Updated visual treatment of cards and center medallion to match the latest Figma screenshot target while preserving existing CMS text wiring.
  - Current command snapshot after stats pass: `npm run lint` passes with warnings only (0 errors), `npm run design:verify` passes, `npm run build` passes.
- **Features section slice 1 animation pass completed (latest):**
  - Re-ran MCP extraction gate for exact features nodes (`314:4272`, `102:354`, `102:367`); `get_design_context` write-to-disk is still blocked by Figma allowed-directory settings, so this pass used MCP screenshots + metadata as source of truth.
  - Implemented scroll-driven animation #1 inside features section:
    - background video compresses into center circle during section-local scroll progress,
    - logo fades in smoothly in late compression phase,
    - animation active on desktop/tablet and disabled for mobile/reduced-motion (static final circle state).
  - Rebuilt section background layering in code (dark base + glow field + concentric ellipses + decorative vector arcs) to remove dependency on runtime localhost asset rendering for this slice.
  - Added direct dependency: `framer-motion` in `package.json`.
  - Current command snapshot after slice 1 pass: `npm run lint` passes with warnings only (0 errors), `npm run design:verify` passes, `npm run build` passes.

## In Progress

- Replacing remaining localhost-backed Figma asset references (`http://localhost:3845/assets/...`) with stable in-repo assets for full portability.
- Verifying staging.promptraise.com parity after features slice 1 deployment.
- Animation #2 spec + implementation for features section is pending user-provided interaction details.
- `get_design_context` for subnodes currently returns `Path for asset writes as tool argument is required for write-to-disk option`; frame-level context/screenshot path is still usable, but fine-grained node extraction is partially blocked until tool behavior is resolved.

## Next Up

- Re-run visual checks at 393 / 768 / 1440 and compare against Figma screenshots.
- Localize remaining Figma-exported asset dependencies to repo-hosted files under `public/`.

## Open Questions

- Final social URLs/handles and org metadata for `SiteSettings` (currently using placeholder URLs in Sanity).
- Confirm whether staging dataset can remain public on current Sanity plan or if plan upgrade/private dataset is required.
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
- Pulled fresh Figma desktop MCP context/screenshot for Team (`353:10844`) and both card instances (`350:10710`, `353:10814`) before implementing Team parity patch.
- Current command snapshot after Team patch: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Current command snapshot after Team CMS pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Staging deployment check after Team CMS pass: `https://staging.promptraise.com` returns `200` and `https://staging.promptraise.com/studio` returns `200`.
- Pulled fresh Figma desktop MCP context/screenshot for final CTA (`411:6768`) before implementing the CTA parity patch.
- Current command snapshot after CTA CMS pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Staging deployment check after CTA CMS pass: `https://staging.promptraise.com` returns `200` and `https://staging.promptraise.com/studio` returns `200`.
- Current command snapshot after CTA refinement pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Pulled fresh Figma desktop MCP metadata/screenshot for Features section (`314:4272`) and applied next-section (post-hero) parity update before staging publish.
- Staging deployment check after CTA refinement pass: `https://staging.promptraise.com` returns `200` and `https://staging.promptraise.com/studio` returns `200`.
- Current command snapshot after section-structure alignment pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Staging deployment check after section-structure alignment pass: `https://staging.promptraise.com` returns `200` and `https://staging.promptraise.com/studio` returns `200`.
- Pulled fresh Figma desktop MCP context/screenshot for section 11 footer variants (`344:10138`, `416:12881`) before patching.
- Current command snapshot after section 11 footer pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Pulled frame-level Figma context/metadata/screenshot for `102:148` and screenshot references for `102:388` + `344:7724` before current section updates.
- Current command snapshot after frame `102:148` pass: `npm run lint` passes with warnings only (0 errors), `npm run build` passes.
- Wired user-provided hero video asset (`/Users/zkhan/Downloads/BG Video PromptRaise.mp4`) into app as `public/videos/bg-video-promptraise.mp4`.
- Removed hero poster usage and hero-only image/texture overlays to keep background driven by video media only.
- Current command snapshot after hero video replacement: `npm run lint` passes with warnings only (0 errors), `npm run build` passes, `npm run design:verify` passes.

## Housekeeping

- [ ] Rotate the Sanity API token currently stored in local opencode config.
- [ ] Ensure all secrets live in env vars/secret stores only.
- [ ] Enable and keep CI secret scanning active.
- [ ] Add Google Search Console and Bing Webmaster verification codes to Vercel env vars when available.
- [ ] Update DNS A record for `www.promptraise.com` to `76.76.21.21` (or CNAME to `cname.vercel-dns.com`).
- [ ] Update Sanity site settings with real social URLs when available.
