import { defineConfig, devices } from "@playwright/test";

/**
 * Smoke suite for the PromptRaise marketing site.
 *
 * Targets staging by default (override with BASE_URL). Runs the same
 * checks at desktop / tablet / mobile viewports. A CMS-wiring test
 * (playwright-cms) mutates a sandboxed copy field and verifies the
 * published change reaches the rendered page via ISR.
 */
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  timeout: 90_000,
  expect: { timeout: 15_000 },
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  use: {
    baseURL: process.env.BASE_URL ?? "https://staging.promptraise.com",
    // Use the full Chromium build in new-headless mode instead of the
    // detectable headless-shell (Vercel Security Checkpoint blocks the shell).
    channel: "chromium",
    launchOptions: {
      args: ["--disable-blink-features=AutomationControlled"],
    },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "tablet",
      use: {
        ...devices["iPad (gen 7)"],
        viewport: { width: 768, height: 1024 },
        defaultBrowserType: "chromium",
      },
    },
    {
      name: "mobile",
      use: {
        ...devices["iPhone 13"],
        viewport: { width: 393, height: 852 },
        defaultBrowserType: "chromium",
      },
    },
  ],
});
