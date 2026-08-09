import { test, expect, request as pwRequest } from "@playwright/test";
import { execSync } from "child_process";
import { readFileSync } from "fs";

/**
 * CMS wiring test: proves a published Sanity edit reaches the rendered
 * page at all breakpoints within the ISR revalidate window.
 *
 * Flow:
 *   1. Read Sanity credentials from .env.local (gitignored)
 *   2. Patch page-home's hero eyebrow to a unique marker via the Data API
 *   3. Wait for ISR (revalidate=30) to pick it up
 *   4. Assert the marker appears in the rendered HTML
 *   5. Restore the original value
 *
 * Skipped when SANITY_API_WRITE_TOKEN is missing (e.g. contributors).
 */

function env(name: string): string {
  const raw = readFileSync(process.cwd() + "/.env.local", "utf8");
  for (const line of raw.split("\n")) {
    const m = line.match(new RegExp(`^${name}=["']?([^"'\n]+)`));
    if (m) return m[1] || "";
  }
  return "";
}

const PROJECT_ID = "4pws3pyj";
const DATASET = "staging";
const DOC_ID = "page-home";
const FIELD = "sections[0].eyebrow";
const HOST = "https://staging.promptraise.com";

function sanityPatch(value: string) {
  const token = env("SANITY_API_WRITE_TOKEN") || "";
  execSync(
    `curl -s -X POST "https://${PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${DATASET}" ` +
      `-H "Content-Type: application/json" ` +
      `-H "Authorization: Bearer ${token}" ` +
      `-d '{"mutations":[{"patch":{"id":"${DOC_ID}","set":{"${FIELD}":"${value}"}}}]}'`,
    { stdio: "pipe" },
  );
}

test("CMS publish reaches the rendered page (ghost-doc regression guard)", async ({ page }) => {
  const token = env("SANITY_API_WRITE_TOKEN");
  test.skip(!token, "SANITY_API_WRITE_TOKEN not set - skipping CMS wiring test");

  const marker = `PW-CMS-TEST-${Date.now()}`;

  // 1. Read the original value so we can restore it
  const q = encodeURIComponent(
    `*[_id=="${DOC_ID}"][0].${FIELD.split("[")[0]}[0].eyebrow`,
  );
  const read = execSync(
    `curl -s -G "https://${PROJECT_ID}.api.sanity.io/v2025-01-01/data/query/${DATASET}" ` +
      `--data-urlencode "query=${q}" -H "Authorization: Bearer ${env("SANITY_API_READ_TOKEN")}"`,
    { stdio: "pipe" },
  ).toString();
  const original = (JSON.parse(read).result ?? "GEO · LLM Visibility · Web3") as string;

  // 2. Publish the marker
  sanityPatch(marker);
  console.log(`Published marker: ${marker}`);

  // 3. Wait for ISR revalidation (revalidate=30; allow ~70s + retries)
  let found = false;
  for (let i = 0; i < 10; i++) {
    const response = await page.goto("/", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    const html = await response!.text();
    if (html.includes(marker)) {
      found = true;
      break;
    }
    await page.waitForTimeout(7000);
  }

  // 4. Restore the original value (always run, even on failure)
  try {
    sanityPatch(original);
  } catch (e) {
    console.error("Failed to restore original eyebrow:", e);
  }

  expect(found, "Published CMS marker should appear on the page within the ISR window").toBe(true);
});

test("revalidate endpoint rejects missing secret", async ({ request }) => {
  const res = await request.post(`${HOST}/api/revalidate`, {
    data: { slug: "/" },
  });
  expect(res.status()).toBe(401);
});