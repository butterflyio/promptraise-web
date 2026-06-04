# Unit 04: Sanity Foundation (Project, Datasets, SiteSettings, Client Wiring)

## Goal

Establish the CMS foundation by wiring Sanity into the app with production/staging
dataset support, a Studio route, and a `siteSettings` schema that controls global
CTAs/social links/organization metadata.

## Design

No public-facing UI changes. This unit adds CMS infrastructure only:

- Sanity Studio mounted at `/studio`.
- Noindex behavior for Studio route.
- Environment-driven dataset selection (`production` vs `staging`).

## Implementation

### Sanity runtime and CLI wiring

- Add `sanity.config.ts` and `sanity.cli.ts`.
- Add environment contract in `.env.example`:
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_VERSION`, optional server token.
- Add scripts for dataset creation and local Studio.

### Schema foundation

- Add `siteSettings` schema with fields for:
  - site name,
  - organization legal name and logo,
  - primary Telegram CTA URL,
  - free-audit CTA URL,
  - social links (X, Telegram, Discord, Reddit, YouTube).

### App integration

- Add typed Sanity client in `sanity/lib/client.ts`.
- Add `/studio/[[...tool]]` route with `NextStudio`.
- Mark Studio route metadata as `noindex`.

## Dependencies

- `sanity` (Studio + schema tooling)
- `next-sanity` (Next.js integration)
- `@sanity/client` (typed client)
- `@sanity/vision` (optional query debugging in Studio)

## Verify when done

- [ ] `/studio` route renders Sanity Studio.
- [ ] Studio route is marked `noindex`.
- [ ] `siteSettings` schema exists and compiles.
- [ ] Env contract includes all Sanity variables in `.env.example`.
- [ ] Dataset scripts exist for `production` and `staging`.
- [ ] No TypeScript errors.
- [ ] No console errors.
- [ ] Responsive at mobile and desktop (N/A in this unit).
- [ ] `npm run build` passes.
