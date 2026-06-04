# Progress Tracker

Update this file after every meaningful implementation change.

## Current Phase

- Unit 3 in progress (Vercel environments): code-side complete, waiting on external Vercel/Git/DNS actions.

## Current Goal

- Finalize Vercel branch/domain behavior for staging and then start Unit 4 (Sanity foundation).

## Completed

- Planning and architecture decisions finalized.
- Build order validated against dependency/security/JIT rules.
- Unit specs drafted for Unit 1, Unit 2, and Unit 3.
- Unit 1 completed: repository initialized; context docs, build plan, and agent entry files written to disk.
- Unit 2 completed: Next.js scaffolded; strict TypeScript, Tailwind, lint/format/typecheck scripts, CI workflow, and baseline security headers/CSP implemented and validated.
- Unit 3 code-side controls completed: staging-only `X-Robots-Tag: noindex, nofollow`, staging `robots.txt` disallow-all, `.env.example` environment contract, and updated Unit 3 spec env requirements.
- Vercel CLI authenticated and project linked (`zeds-projects-4a4386a5/promptraise-web`).
- GitHub repository created and pushed: `butterflyio/promptraise-web` (branch `main`).
- Production environment variables set in Vercel: `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://www.promptraise.com`.
- Development environment variables set in Vercel: `SITE_ENV=development`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- `staging.promptraise.com` added to Vercel project (DNS record still needs to be pointed to Vercel).

## In Progress

- Unit 3 account-side setup in Vercel:
  - connect a Git repository to the Vercel project (required for branch-based preview envs and automatic preview deployments),
  - add preview-scoped env vars for `staging` branch,
  - update DNS with `A staging.promptraise.com 76.76.21.21`,
  - verify live `staging.promptraise.com` behavior.

## Next Up

- Finish Unit 3 account-side steps listed above.
- Unit 4: set up Sanity foundation (`production` + `staging` datasets and `SiteSettings`).

## Open Questions

- `ui-context.md` depends on Figma extraction (Dev Mode MCP + node `63-93` selected).
- Final social URLs/handles and org metadata for `SiteSettings` (use placeholders until provided).
- Final analytics pick: Vercel Web Analytics vs Plausible.
- Connect Vercel project to GitHub repo `butterflyio/promptraise-web` in Vercel dashboard (required for branch previews and preview-scoped env vars).

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

## Housekeeping

- [ ] Rotate the Sanity API token currently stored in local opencode config.
- [ ] Ensure all secrets live in env vars/secret stores only.
- [ ] Enable and keep CI secret scanning active.
