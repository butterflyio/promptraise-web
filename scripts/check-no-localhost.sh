#!/usr/bin/env bash
# Guardrail: fail CI if source references a local dev server.
# The 17 broken images from the scope doc (localhost:3845) would have been
# caught by this at PR time. Run: scripts/check-no-localhost.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

# Ignore: node_modules, .next, .git, lockfiles, and generated types.
MATCHES="$(grep -rn --include='*.ts' --include='*.tsx' --include='*.js' --include='*.jsx' --include='*.json' --include='*.css' --include='*.html' \
  -E 'https?://(localhost|127\.0\.0\.1)(:[0-9]+)?' \
  . \
  --exclude-dir=node_modules --exclude-dir=.next --exclude-dir=.git \
  2>/dev/null || true)"

if [ -n "$MATCHES" ]; then
  echo "❌ Localhost references found in source (broken for real visitors):"
  echo "$MATCHES"
  exit 1
fi

echo "✅ No localhost references in source."