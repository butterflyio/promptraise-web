#!/usr/bin/env python3
"""
PROD STATE SNAPSHOT + ROLLBACK for promptraise.com (Vercel).

Two operations:

  SNAPSHOT  scripts/prod-rollback.py snapshot
      Resolve what each custom domain actually serves (SHA + dpl_id + url) and
      append a read-only fact entry to the history log. Run BEFORE every prod
      deploy so the pre-rollout known-good is always on record.

  ROLLBACK  scripts/prod-rollback.py rollback [--sha <prefix>] [--deploy]
      Return production to a prior state.
        - default: roll back to the last snapshot entry (previous known-good)
        - --sha: roll back to a specific commit SHA
        - --deploy: also re-deploy that SHA via vercel deploy --prod (use when
          the target deployment no longer exists in Vercel)
      Without --deploy, only the domain aliases are re-pointed to the target
      deployment (instant rollback; for the default path it needs the previous
      deployment uid to still be resolvable).

Env: VERCEL_TOKEN (or /root/.hermes/vercel.token), VERCEL_TEAM_ID, VERCEL_PROJECT_ID.
"""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
import urllib.request

TEAM_ID    = os.environ.get("VERCEL_TEAM_ID", "zeds-projects-4a4386a5")
PROJECT_ID = os.environ.get("VERCEL_PROJECT_ID", "prj_svIuaOSWQQixnZAVOdDlCOoVBfvP")
TOKEN_FILE = "/root/.hermes/vercel.token"
VC         = "/root/.hermes/node/lib/node_modules/vercel/dist/vc.js"
NODE       = "/usr/bin/node"
PROD_DOMAINS = ["promptraise.com", "www.promptraise.com"]
HISTORY_FILE = os.environ.get("PROD_STATE_HISTORY", os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "docs", "prod-state-history.jsonl"))


def tok() -> str:
    t = os.environ.get("VERCEL_TOKEN")
    return t.strip() if t else open(TOKEN_FILE).read().strip()


def api(method: str, path: str, body: dict | None = None) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        f"https://api.vercel.com{path}",
        headers={"Authorization": f"Bearer {tok()}", "Content-Type": "application/json"},
        method=method, data=data)
    with urllib.request.urlopen(req, timeout=30) as r:
        raw = r.read()
        return json.loads(raw) if raw else {}


def resolve_prod() -> dict:
    """Return {domain: {url, dpl, sha, branch}} for each PROD domain."""
    aliases = api("GET", f"/v3/aliases?projectId={PROJECT_ID}&limit=50")
    info = {}
    for a in aliases.get("aliases", []):
        dep = a.get("deployment") or {}
        if a["alias"] in PROD_DOMAINS and dep.get("url"):
            info[a["alias"]] = {"url": dep["url"], "dpl": dep.get("id"), "sha": None, "branch": None}
    if not info:
        return {}
    deploys = api("GET", f"/v6/deployments?projectId={PROJECT_ID}&teamId={TEAM_ID}&limit=200")
    by_uid = {d["uid"]: d for d in deploys.get("deployments", [])}
    for alias, entry in info.items():
        d = by_uid.get(entry["dpl"]) or {}
        m = d.get("meta") or {}
        entry["sha"] = (m.get("githubCommitSha") or "")[:12]
        entry["branch"] = m.get("githubCommitRef")
    return info


def snapshot() -> dict:
    live = resolve_prod()
    dpls = {e["dpl"] for e in live.values() if e.get("dpl")}
    stat = "DIVERGED" if len(dpls) > 1 else ("single" if len(dpls) == 1 else "empty")
    entry = {"ts": int(time.time()), "state": stat, "domains": live}
    os.makedirs(os.path.dirname(HISTORY_FILE) or ".", exist_ok=True)
    # Ensure each entry is its own JSON line: trim any trailing whitespace from
    # a previously written file, then write entry + newline.
    data = ""
    if os.path.exists(HISTORY_FILE):
        data = open(HISTORY_FILE).read().strip()
    lines = [l for l in data.split("\n") if l.strip()]
    with open(HISTORY_FILE, "w") as f:
        if lines:
            f.write("\n".join(lines) + "\n")
        f.write(json.dumps(entry) + "\n")
    print(json.dumps(entry, indent=2))
    return entry


def last_known_good():
    try:
        with open(HISTORY_FILE) as f:
            lines = [json.loads(l) for l in f if l.strip()]
        return lines[-1] if lines else None
    except FileNotFoundError:
        return None


def re_alias(dpl_id: str) -> None:
    for dom in PROD_DOMAINS:
        r = api("POST", f"/v10/deployments/{dpl_id}/aliases?teamId={TEAM_ID}", {"alias": dom})
        print(f"  {dom}  (was {r.get('oldDeploymentId')}) -> {r.get('uid')}")


def deploy_sha(sha: str) -> str:
    """Commit-pinned vercel prod deploy; return the new deployment uid."""
    subprocess.run(["git", "checkout", "-B", "deploy-rollback", sha], check=True)
    subprocess.run(["git", "reset", "--hard", sha], check=True)
    r = subprocess.run(
        [NODE, VC, "deploy", "--prod", "--token", tok(), "--yes"],
        env={**os.environ, "VERCEL_TOKEN": tok()}, capture_output=True, text=True,
        cwd=os.getcwd())
    print((r.stdout or r.stderr)[-900:])
    time.sleep(3)
    deploys = api("GET", f"/v6/deployments?projectId={PROJECT_ID}&teamId={TEAM_ID}&limit=3")
    return deploys["deployments"][0]["uid"]


def main() -> None:
    ap = argparse.ArgumentParser(description="Prod state snapshot/rollback for promptraise.com")
    ap.add_argument("action", choices=["snapshot", "rollback"])
    ap.add_argument("--sha", help="target commit SHA (prefix ok)")
    ap.add_argument("--deploy", action="store_true",
                    help="also re-deploy the target SHA to production")
    args = ap.parse_args()

    if args.action == "snapshot":
        snapshot()
        return

    # ---- rollback ----
    print("CURRENT live prod state:")
    for alias, e in sorted(resolve_prod().items()):
        print(f"  {alias}  sha={e.get('sha')} dpl={e.get('dpl')} url={e.get('url')}")

    full_sha = None
    if args.sha:
        r = subprocess.run(["git", "rev-parse", "--verify", args.sha + "^{commit}"],
                           capture_output=True, text=True)
        if r.returncode != 0:
            sys.exit(f"git cannot resolve sha '{args.sha}' - refusing to guess.")
        full_sha = r.stdout.strip()
        print(f"\nTarget SHA: {full_sha}")
    elif not args.deploy:
        prev = last_known_good()
        if not prev:
            sys.exit("No prior snapshot on record. Run 'snapshot' before first deploy, or pass --sha.")
        full_sha = (prev.get("domains", {}).get("promptraise.com") or {}).get("sha")
        print(f"\nLast known-good SHA: {full_sha}")

    if args.deploy:
        if not full_sha:
            sys.exit("--deploy rollback needs --sha=<target commit>.")
        print(f"\nRe-deploying {full_sha} to production...")
        dpl = deploy_sha(full_sha)
        print(f"  new deployment uid: {dpl}")
        re_alias(dpl)
    else:
        # Find an existing deployment whose commit matches the target SHA.
        deploys = api("GET", f"/v6/deployments?projectId={PROJECT_ID}&teamId={TEAM_ID}&limit=200")["deployments"]
        match = next((d["uid"] for d in deploys
                      if (d.get("meta") or {}).get("githubCommitSha", "").startswith(full_sha or "")), None)
        if not match:
            sys.exit("No existing deployment for that SHA - rerun with --deploy.")
        print(f"\nRe-pointing aliases to existing deployment {match} (sha {full_sha})...")
        re_alias(match)

    print("\nVerifying...")
    time.sleep(4)
    after = resolve_prod()
    print(json.dumps(after, indent=2))


if __name__ == "__main__":
    main()