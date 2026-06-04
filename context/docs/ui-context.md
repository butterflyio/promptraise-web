# PromptRaise — UI Context

> STATUS: Partially populated for Unit 5 structure. Final token values and
> component fidelity are blocked until Figma node `63-93` is extracted via Dev
> Mode MCP.

## Status

- Structural shell is implemented (header/footer/layout + section scaffolding +
  404 + manifest).
- Temporary scaffold tokens are in `app/globals.css` and must be replaced after
  Figma extraction.
- Do not treat current colors/spacing/type values as final design decisions.

## Implemented Structure (Unit 5)

- Sticky header with primary navigation and Telegram CTA
- Footer with brand links and social placeholders
- Landing page section order:
  1. Hero
  2. Case study highlights
  3. Resources and guides
  4. Free audit CTA section
- 404 page and web manifest route included

## Required From Figma (node `63-93`)

- Final color system (semantic + raw tokens)
- Typography stack, sizes, weights, line-heights, letter spacing
- Spacing, radius, and shadow scales
- Layout/grid behavior at mobile/tablet/desktop breakpoints
- Exact component specs (hero, nav, CTA buttons, section cards, footer)
- Motion/interaction guidance (if any)

## Token Mapping Contract

When Figma extraction is available, map design tokens into CSS variables and
Tailwind theme aliases without hardcoded values in components:

- `--color-background`
- `--color-surface`
- `--color-surface-muted`
- `--color-text`
- `--color-text-muted`
- `--color-border`
- `--color-primary`
- `--color-primary-foreground`
