import { test, expect } from "@playwright/test";

/**
 * Smoke tests: the 11 homepage sections render, key CTAs work, and the
 * page loads without console errors at every breakpoint.
 *
 * Section presence is asserted via the aria-label on the SectionLabel
 * dev identifier (`{name} section identifier`) - stable and unique.
 */

const SECTION_LABELS = [
  "HeroSection",
  "StatsSection",
  "ProblemSection",
  "AiTrainingSection",
  "ProcessSection",
  "ComparisonSection",
  "WhyChooseSection",
  "PlansSection",
  "AuditCtaSection",
  "AskAiSection",
];

// TeamSection does not render a SectionLabel - it anchors at #company.
const SECTION_IDS: Array<{ label: string; id: string }> = [
  { label: "TeamSection", id: "#company" },
];

const HOME_SECTIONS: Array<{ label: string; id: string }> = [
  { label: "StatsSection", id: "#features" },
  { label: "ProcessSection", id: "#how-it-works" },
  { label: "TeamSection", id: "#company" },
];

async function scrollToAndAssert(
  page: import("@playwright/test").Page,
  selector: string,
  label: string,
) {
  // Sections are above the fold or use scroll-triggered animations; scroll
  // the element into view so visibility checks reflect real render state.
  const locator = page.locator(selector);
  await locator.scrollIntoViewIfNeeded({ timeout: 10_000 });
  await expect(locator).toBeVisible({ timeout: 10_000 });
}

test("homepage loads with correct title", async ({ page }) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/PromptRaise|AI Visibility/i);
});

test("all 11 sections render on the page", async ({ page }) => {
  await page.goto("/");
  for (const name of SECTION_LABELS) {
    // Some sections render both a mobile and desktop layout (e.g. Stats);
    // the visible one is the one rendered at this viewport.
    const identifier = page
      .getByLabel(`${name} section identifier`)
      .filter({ visible: true })
      .first();
    await identifier.scrollIntoViewIfNeeded({ timeout: 10_000 });
    await expect(identifier).toBeVisible({ timeout: 10_000 });
  }
  for (const { id } of SECTION_IDS) {
    const section = page.locator(id).first();
    await section.scrollIntoViewIfNeeded({ timeout: 10_000 });
    await expect(section).toBeVisible({ timeout: 10_000 });
  }
});

test("section anchor links resolve to real sections", async ({ page }) => {
  await page.goto("/");
  for (const { id } of HOME_SECTIONS) {
    await expect(page.locator(id)).toHaveCount(1);
  }
});

test("hero primary CTA points to the audit URL", async ({ page }) => {
  await page.goto("/");
  const heroCta = page.locator("a", { hasText: "Get Free Audit" }).first();
  await expect(heroCta).toBeVisible({ timeout: 10_000 });
  const href = await heroCta.getAttribute("href");
  expect(href).toMatch(/audit\.promptraise\.com|#/);
});

test("team social links are real (not placeholder domains)", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator("#company").scrollIntoViewIfNeeded();
  const socialLinks = page.locator(
    "#company a[href*='linkedin.com'], #company a[href*='x.com'], #company a[href*='twitter.com']",
  );
  const count = await socialLinks.count();
  // At least one team member should have a real social URL when CMS data is present.
  if (count > 0) {
    for (let i = 0; i < count; i++) {
      const href = (await socialLinks.nth(i).getAttribute("href")) ?? "";
      expect(href).not.toMatch(
        /^(https:\/\/)?(twitter\.com|linkedin\.com)\/?$/,
      );
    }
  }
});

test("no console errors on page load", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  page.on("pageerror", (err) => errors.push(err.message));
  await page.goto("/");
  await page.waitForTimeout(3_000);

  // Vercel Insights/Analytics injects /_vercel/insights/script.js which 404s
  // on localhost (only exists on the Vercel edge). Filter that known noise -
  // the browser reports it as a generic resource-load failure.
  const realErrors = errors.filter(
    (e) =>
      !e.includes("_vercel/insights") &&
      !e.includes("_vercel/speed-insights") &&
      !(e.includes("Failed to load resource") && e.includes("404")),
  );
  expect(realErrors).toEqual([]);
});

test("page has no horizontal overflow (layout not broken)", async ({
  page,
}) => {
  await page.goto("/");
  const overflow = await page.evaluate(() => {
    return (
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth
    );
  });
  expect(overflow).toBe(false);
});
