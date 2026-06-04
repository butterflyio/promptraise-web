# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Unit 5 blocked on Figma extraction. Units 3 and 4 are complete with noted DNS caveat.

## Current Goal

- Unblock Unit 5 by extracting Figma node `63-93` and finalizing `ui-context.md`.

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

## In Progress

- DNS propagation verification for `staging.promptraise.com` from this local resolver.

## Next Up

- Unit 5: Figma extraction + `ui-context.md` population.
- Unit 5 implementation: design system and base layout from tokens.

## Open Questions

- `ui-context.md` depends on Figma extraction (Dev Mode MCP + node `63-93` selected).
- Final social URLs/handles and org metadata for `SiteSettings` (use placeholders until provided).
- Final analytics pick: Vercel Web Analytics vs Plausible.
- `staging.promptraise.com` still does not resolve via this local resolver; forced mapping and Vercel alias checks pass. Re-check global DNS propagation later.
- Confirm whether staging dataset can remain public on current Sanity plan or if plan upgrade/private dataset is required.

## Architecture Decisions

- Staging-first rollout: validate on `staging.promptraise.com`, then switch production in cutover unit.
- Keep Unit order 3 -> 4 (prove deploy target before adding CMS).
- Use enhanced verification checklist in `ai-workflow-rules.md`.
- Include Security and Secrets section in `code-standards.md`.
- Keep AI and Background Task section in `architecture.md`.
- Sanity setup is in Phase 0 (foundation), not deferred.

## Session Notes

- Replacing a live website at `www.promptraise.com`; redirects and DNS cutover are explicit units.
- Use placeholders for missing external values and resolve during relevant unit.
- Use Sanity MCP or CLI at implementation time; choose pragmatically.
- Vercel CLI deploy succeeds, but live staging URL checks are blocked until DNS propagation completes.
- Unit 4 account-side provisioning is complete; only staging DNS resolver lag remains.

## Housekeeping

- [ ] Rotate the Sanity API token currently stored in local opencode config.
- [ ] Ensure all secrets live in env vars/secret stores only.
- [ ] Enable and keep CI secret scanning active.
