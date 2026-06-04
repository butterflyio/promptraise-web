# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Unit 5 visual fidelity correction completed. Ready for Unit 6 landing content.

## Current Goal

- Implement Unit 6: landing page content with exact brand fidelity (hero animation, stats, audit container, comparison table, pricing tiers, team).

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
  - All quality gates pass: typecheck, lint, format:check, build

## In Progress

- Unit 6 landing page content implementation.

## Next Up

- Implement exact landing page sections with brand fidelity (hero animation, stats, audit container, comparison table, pricing tiers, team).
- Obtain Neutral Sans font file + web license to replace Geist fallback.

## Open Questions

- Final social URLs/handles and org metadata for `SiteSettings` (use placeholders until provided).
- Final analytics pick: Vercel Web Analytics vs Plausible.
- `staging.promptraise.com` still does not resolve via this local resolver; forced mapping and Vercel alias checks pass. Re-check global DNS propagation later.
- Confirm whether staging dataset can remain public on current Sanity plan or if plan upgrade/private dataset is required.
- Figma MCP tool access in this environment is still unavailable, so exact token extraction must be provided via MCP/screenshot export.

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

## Housekeeping

- [ ] Rotate the Sanity API token currently stored in local opencode config.
- [ ] Ensure all secrets live in env vars/secret stores only.
- [ ] Enable and keep CI secret scanning active.
