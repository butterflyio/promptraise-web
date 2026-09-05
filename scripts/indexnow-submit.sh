#!/usr/bin/env bash
# IndexNow bulk submit for promptraise.com.
# Usage: ./scripts/indexnow-submit.sh [site_url]
set -euo pipefail

SITE_URL="${1:-https://promptraise.com}"
HOST="promptraise.com"
KEY="1f21b681038044f2a4c57298cda88cb8"
KEY_FILE="public/${KEY}.txt"

echo "=== IndexNow Submission ==="
echo "Host: ${HOST} | Key file: ${SITE_URL}/${KEY}.txt"

echo "Fetching URLs from sitemap..."
URL_LIST=$(curl -sL "${SITE_URL}/sitemap.xml" \
  | grep -oP '<loc>\K[^<]+' \
  | head -100 \
  | jq -R -s -c 'split("\n")[:-1]' 2>/dev/null || echo "[]")

COUNT=$(echo "$URL_LIST" | jq 'length')
echo "Submitting ${COUNT} URLs..."

PAYLOAD=$(jq -nc \
  --arg host "$HOST" \
  --arg key "$KEY" \
  --argjson urls "$URL_LIST" \
  '{host:$host, key:$key, keyLocation:("'"${SITE_URL}"'/'"${KEY}"'.txt"), urlList:$urls}')

RESPONSE=$(curl -s -w "\n%{http_code}" -X POST \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  "https://api.indexnow.org/indexnow")

HTTP_CODE=$(echo "$RESPONSE" | tail -1)
BODY=$(echo "$RESPONSE" | head -n -1)

echo "HTTP ${HTTP_CODE}"
echo "Response: ${BODY:-<empty>}"

if [ "$HTTP_CODE" -eq 200 ]; then
  echo "IndexNow accepted. OK"
else
  echo "IndexNow returned non-200. See https://www.indexnow.org/documentation#submitting-an-alternative"
  exit 1
fi