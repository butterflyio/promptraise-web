# Unit 06: Landing Page (Figma V1)

## Goal

Implement the complete V1 landing experience from Figma, connected to CMS-backed
settings/content fields defined for V1.

## Design

Landing page should be visually faithful to Figma and built mobile-first with
explicit tablet and desktop behavior.

## In Scope

- Implement all V1 landing sections and ordering from Figma.
- Wire CTAs and editable copy to Sanity where fields are defined.
- Ensure responsive behavior for mobile/tablet/desktop breakpoints.
- Replace scaffold/generic SaaS placeholders with PromptRaise-specific content and
  layouts.

## Out of Scope

- Additional non-landing content pages (V2 scope).
- Public API, markdown mirrors, RSS, IndexNow automation (V2+ scope).
- Production DNS/cutover operations (Unit 08).

## Implementation

### Landing section build

- Implement hero section with intended visual treatment and CTA behavior.
- Implement all downstream V1 sections (stats, process/how-it-works, comparison,
  pricing, case studies, team, final CTA) per approved design intent.
- Keep section components isolated and reusable where practical.

### CMS integration

- Use `SiteSettings` and existing homepage query structures for editable values.
- Keep design-system-only visual primitives non-editable unless explicitly modeled
  in CMS.

### Responsive and fidelity checks

- Validate each section at 393 / 768 / 1440.
- Compare local/staging captures against Figma nodes for spacing and typography
  fidelity.
- Verify interaction parity from Figma design context (states, CTA behavior,
  media behavior) and not just visual approximation from screenshots.

## Dependencies

- Unit 05 completed (base layout and design tokens in place).
- Unit 04 completed (Sanity client/query foundation available).

## Verify when done

- [ ] All V1 landing sections are implemented and visible in final order.
- [ ] CMS-driven values render with safe fallbacks.
- [ ] CTA links behave correctly (including external audit/Telegram targets).
- [ ] Visual checks pass at 393 / 768 / 1440 without layout breakage.
- [ ] Design-to-Code Gate Layer 1 + Layer 2 checks are recorded in `progress-tracker.md`.
- [ ] `npm run build` passes.
- [ ] `npm run lint` has no new errors introduced by this unit.
