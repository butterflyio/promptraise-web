# Production Rollback Runbook - promptraise.com

Practical, executable process for rolling back a production change on the
promptraise.com Next.js site (hosted on Vercel). Covers the two rollback
classes - code/feature rollback and CMS-only rollback - plus the mandatory
pre-deploy snapshot so a rollback always has a recorded target.

## When to use this

- A deploy or CMS change introduced a regression (broken page, wrong behavior,
  SEO regression, layout break like the announcement-bar/header overlap).
- You want to undo the LAST deploy and return to the last known-good state.
- You want to undo a SPECIFIC deploy (either the latest or an older one).

## Operating rule (unchanged)

Production is explicit. The user authorizes a prod deploy in chat
("deploy X to production"). A Linear/watcher comment approving a change is
staging-only and does NOT authorize prod. Rollback does NOT need the same
gate - the user is asking to undo something already shipped - but confirm the
target is really intended before flipping it.

## The mechanism (why rollback works)

Production = a deployment URL, pinned to an approved commit SHA, aliased to
custom domains. Every known deployment stays in Vercel. So rolling back is
one of two things:

1. **Alias flip (instant, no build)** - point the custom domains at a PRIOR
   deployment that still exists in Vercel. Seconds to execute.
2. **Re-deploy a prior SHA (build, ~1-2 min)** - when the target deployment
   was pruned or you want a clean build of the SHA, re-run the commit-pinned
   prod deploy.

Both are scripted in `scripts/prod_rollback.py`.

## BEFORE EVERY PROD DEPLOY (mandatory, 5 seconds)

Run snapshot so the pre-rollout state is on record as "known-good":

```bash
cd <repo> && python3 scripts/prod_rollback.py snapshot
```

This writes one JSON line to `docs/prod-state-history.jsonl`:
the SHA, dpl_id, and URL each prod domain currently serves. The rollback
script uses this to know what to go back to.

## ROLLBACK - step by step

### Step 1 - confirm what is live right now

```bash
python3 scripts/prod_rollback.py rollback
```

This prints the CURRENT live state (each domain -> SHA + dpl) plus the last
known-good. Do not skip this - a domain can be pinned to an older deploy than
the branch tip (aliases are snapshots, not follows).

### Step 2 - undo

**Last known-good (default):** with no flags, rollback re-points aliases to the
deployment recorded in the last snapshot.

```bash
python3 scripts/prod_rollback.py rollback
```

**Specific SHA:** roll back to a particular commit.

```bash
python3 scripts/prod_rollback.py rollback --sha 35ca4aff
```

If that deployment no longer exists in Vercel (pruned), add `--deploy` to
rebuild it from the SHA:

```bash
python3 scripts/prod_rollback.py rollback --sha 35ca4aff --deploy
```

`--deploy` needs the SHA to resolve locally (`git rev-parse`). The script
checkouts a throwaway `deploy-rollback` branch, runs `vercel deploy --prod`,
then re-points both aliases. Confirm you have the token/credentials (see
Requirements).

### Step 3 - verify

The script resolves the aliases again and prints the post-rollback state.
Then confirm live:

```bash
curl -s -I https://promptraise.com | grep -i x-vercel-id
# and check the rolled-back page state is served (no regression markers)
```

Because the SHAs differ, the served content should differ. If the site uses
Vercel Security Checkpoint you may get a 403 challenge from curl - wait
~1 min and check from a browser.

### Step 4 - record

Re-run `snapshot` to capture the rolled-back state as the new baseline.

```bash
python3 scripts/prod_rollback.py snapshot
```

## CMS (Sanity) rollback - different, no code deploy

CMS-controlled content (Sanity documents - site settings, footer links, page
content, flags) is NOT in the git repo. Rolling back a CMS change is:

1. Open Sanity Studio (`promptraise.com/studio` or the studio project).
2. Revert the affected document(s), or restore the previous value (e.g. flip
   `announcement.enabled` back, restore footer links, restore a page body).
3. Sanity changes propagate to the live site automatically once published (the
   revalidation hook fires). No Vercel redeploy needed for content.
4. If a CMS change broke something globally (e.g. bad site-setting) and you
   cannot reach the studio, restore the document via the Sanity API history /
   serialized snapshot if you keep one.

Rule: a broken CODE change is undone by rollback above. A broken CMS change is
undone by reverting the document in Sanity. Do not redeploy code to fix CMS.

## Reverse / "roll forward"

If the regression is caused by a config/flag rather than actual broken code,
fix forward instead of rolling back: change the CMS value on staging, verify,
then publish. Rolling back code loses the approved work; roll-forward keeps it.

## Requirements

- Vercel token at `/root/.hermes/vercel.token` (or `VERCEL_TOKEN` env).
- `VERCEL_TEAM_ID` / `VERCEL_PROJECT_ID` (defaults are set to the
  promptraise-web project; override if run from a different host).
- Node + Vercel CLI (see `devops/vercel-deployment-operations` skill).
- The repo checkout with the rollback SHA resolvable when using `--deploy`.

## Append-only history

`docs/prod-state-history.jsonl` is the ledger. It is the authoritative "which
SHA was live when" record and feeds `last_known_good()`. Keep it committed in
the repo so any session/agent that operates prod can see the history and
roll back to a real prior state.

## Example - undoing the announcement-bar deploy (hypothetical)

You deployed announcement-bar work and it regressed the header on mobile.
Known-good is the state BEFORE that deploy: in `docs/prod-state-history.jsonl`,
the second-to-last entry (pre-deploy snapshot). Run:

```bash
python3 scripts/prod_rollback.py rollback
```

It re-points `promptraise.com` + `www` to the pre-deploy deployment, then you
re-snapshot. The site is back to the prior approved build in seconds.
