# Unit 02: App Scaffold, Tooling, CI and Baseline Security Headers

## Goal

Scaffold the Next.js (App Router) + TypeScript project with Tailwind,
linting/formatting, CI quality gates, and baseline security headers so the app is
buildable and governed before feature work begins.

## Design

No product UI. Minimal placeholder shell only. No tokenized design decisions in
this unit.

## Implementation

### Next.js scaffold

Initialize Next.js App Router + TypeScript with a minimal root layout and home
route.

### Tooling

Configure ESLint, Prettier (+ Tailwind plugin), strict TypeScript checks, and
scripts for lint/format/typecheck/build.

### CI

Add CI checks for typecheck, lint, formatting, build, and secret scanning.

### Security baseline

Set baseline security headers and CSP skeleton; finalize allowlists in later
units when integrations are live.

## Dependencies

- `next`, `react`, `react-dom` (framework)
- `typescript`, `@types/react`, `@types/node` (types)
- `tailwindcss`, `postcss`, `autoprefixer` (styling)
- `eslint`, `eslint-config-next` (linting)
- `prettier`, `prettier-plugin-tailwindcss` (formatting)

## Verify when done

- [ ] `npm run build` passes.
- [ ] Typecheck, lint, and format checks pass.
- [ ] Security headers present in local response headers.
- [ ] CI pipeline executes all configured checks.
- [ ] No TypeScript errors.
- [ ] No console errors.
- [ ] Responsive at mobile and desktop.
- [ ] `npm run build` passes.
