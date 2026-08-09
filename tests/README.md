# Playwright Smoke Suite

Automated browser checks for the PromptRaise marketing site. Runs the same
tests across **desktop (1440px)**, **tablet (768px)**, and **mobile (393px)**.

## What it covers

- **All 11 homepage sections render** (each viewport)
- **Section anchors** resolve (`#features`, `#how-it-works`, `#company`)
- **Hero CTA** points at the audit URL
- **Team social links** are real profiles (not placeholder domains)
- **No console errors** on load
- **No horizontal overflow** (mobile/tablet layout regression guard)
- **CMS wiring** (`cms-wiring.spec.ts`): publishes a unique marker via the
  Sanity API, waits for ISR, verifies it renders, then restores the original

## Run against staging (default)

```bash
npm run test:smoke        # smoke tests only, 3 viewports
npm run test:e2e          # smoke + CMS wiring
```

## Run against a local build

```bash
npm run build
npm run start -- -p 3101
# in a second terminal:
npm run test:e2e:local
```

## Configuration

| Env var | Default | Purpose |
|---------|---------|---------|
| `BASE_URL` | `https://staging.promptraise.com` | Site under test |
| `SANITY_API_READ_TOKEN` / `SANITY_API_WRITE_TOKEN` | from `.env.local` | CMS wiring test |

## Notes / known quirks

- **Vercel Security Checkpoint** can 403 automated traffic from a single IP if
  it receives bursts of requests (it flagged our server IP during testing).
  It does **not** affect real users. Re-running after a cooldown, or testing
  against a local build, avoids it. Playwright uses the full Chromium
  (`channel: "chromium"`) instead of headless-shell to minimize fingerprinting.
- Sections may render both a mobile and desktop variant in the DOM (e.g. the
  stats section); tests filter to the *visible* instance.
- `tests/cms-wiring.spec.ts` writes a marker to the **staging** dataset during
  the run and restores it afterwards. Needs a write token.