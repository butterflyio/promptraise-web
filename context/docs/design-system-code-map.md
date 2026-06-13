# PromptRaise — Design System Code Map

This file defines where the design system is implemented in code and how to
verify it before shipping.

## Tokens and Breakpoints

- Global tokens: `app/globals.css` (`:root` + `@theme inline`)
- Runtime token contract: `components/design-system/tokens.ts`
- Figma frame breakpoints in code:
  - mobile: `393`
  - tablet: `768`
  - desktop: `1024`
  - wide: `1440`

## Reusable Components

- `components/design-system/button.tsx` — shared CTA/button variants
- `components/design-system/badge.tsx` — badge/pill variants
- `components/design-system/card.tsx` — shared surface/card wrapper
- `components/design-system/section.tsx` — section and container wrappers
- `components/design-system/icons.tsx` — shared icon set
- `components/design-system/assets.ts` — shared asset registry

## Verification

Run both checks:

1. `npm run design:verify`
2. `npm run build && npm run lint`

`design:verify` is a contract check that fails if required design-system files,
Figma gate markers, or breakpoint tokens drift.

