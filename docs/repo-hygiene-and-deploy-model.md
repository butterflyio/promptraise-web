# REPO HYGIENE + DEPLOY MODEL (Promptraise Web)

Status: ratified 2026-08-23. This is the source of truth for how the repo
stays clean and rollback-capable. Read before any new feature work.

## The environment model

There are THREE runtime environments, driven by ONE code line (main) + the
deploy preview system:

| Env / domain            | What it is                         | How it updates                       |
|-------------------------|------------------------------------|--------------------------------------|
| dev.promptraise.com     | Your working / eyeball surface     | Deploy a feature-branch preview here while iterating |
| staging.promptraise.com | Reference that mirrors production  | Alias it to whatever build you are validating before release |
| promptraise.com (prod)  | Live customer site                 | Explicit chat-approved prod deploy ONLY |

Rule: all NEW work lands on a short-lived feature branch, gets eyeballed on
dev.promptraise.com, then merged to main, then deployed to prod on explicit
authorization. dev is for iteration, staging is the release check, prod is
the gated release.

Git branch model
- ONE long-lived branch: `main`. It is the release + rollback line.
- `staging` and `dev` branches exist but are NOT long-lived work branches:
  they are deployment aliases (see below). Feature branches
  (`feat/x`, `fix/y`) are short-lived, created off main, merged + deleted.
- Keep branches merged-and-deleted. Do not accumulate long-lived feature
  branches (that is what caused the 456-file staging/main divergence).

## Sanity CMS model

- ONE dataset: `production`. There is intentionally no second dataset; the
  earlier experiment with a staging dataset caused sync/studio friction and
  was collapsed back. Do not reintroduce a second dataset.
- Content safety net = tar.gz exports (backups/) + Sanity Studio doc-revert.
- All envs read the SAME production dataset. dev/staging/prod therefore show
  identical CMS content; differences between domains are CODE (deploy) only.

## Deploy + rollback (the drill)

Every production deploy:
1. `python3 scripts/prod_rollback.py snapshot` (records known-good state to
   docs/prod-state-history.jsonl)
2. Build a clean archive of the EXACT approved SHA (git archive), never a
   dirty working tree - other tooling may hold uncommitted changes.
3. `vercel link --project promptraise-web` + `vercel deploy --prod` from the
   clean dir.
4. Verify the live domain (content markers, no next-error, expected build).

Rolling back:
- Code: `python3 scripts/prod_rollback.py rollback` (repoints prod aliases) -
  or `--sha <prefix>` for a specific commit, `--deploy` to rebuild if pruned.
- CMS/content: revert in Sanity Studio, never redeploy code.
- Full runbook: docs/rollback-runbook.md.

## CI

- `quality` job = typecheck + lint + alt-text + format + no-localhost +
  build. Keep it GREEN. Fix lint/format issues in the PR, don't ship red.
- CodeQL should stay green too (security).
- Tooling scripts (.cjs/.mjs/.ts helpers) may carry eslint-disable/ignore
  where the pattern is intentional; Termly-generated legal HTML and TS-typed
  .mjs helpers are in .prettierignore by design.

## URL slug changes For any live URL slug change, follow the full protocol doc
(seo/url-slug-change skill summary lives in the repo docs):
backup -> baseline -> inventory -> 301/308 -> update sitemap/llms/canonicals ->
IndexNow ping -> 2-4 week equity-consolidation monitoring. Never ship a slug
change without the redirect + sitemap updates in the same release.

---
Last reviewed: 2026-08-23 (phase 1-3 ratified; repo cleaned to main,
staging, dev only; CI quality + CodeQL green).