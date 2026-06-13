# Unit 05: Design System and Base Layout (Figma)

## Goal

Implement the Figma-aligned design foundation and shared layout primitives so all
subsequent pages use the same tokenized visual system and navigation structure.

## Design

This unit defines shared UI foundation, not page-specific business logic.

- Dark-theme token system from Figma (`63-93`) mapped to project styles.
- Global shell: header, footer, and base layout wrappers.
- Core site chrome for desktop, tablet, and mobile breakpoints.

## In Scope

- Finalize/update `ui-context.md` token and component guidance from Figma.
- Implement global styles and semantic token usage in app shell.
- Implement site header and footer aligned to Figma baseline.
- Implement `not-found` and base metadata assets (favicon/manifest wiring).
- Ensure shared CTAs and nav labels are wired for CMS-driven values where defined.

## Out of Scope

- Full landing-page section implementation (Unit 06).
- AI visibility/machine-readable endpoint implementation (Unit 07).
- Production cutover/DNS actions (Unit 08).

## Implementation

### Token and style foundation

- Map color, typography, spacing, radius, and breakpoint decisions from Figma into
  the project styling layer.
- Remove scaffold-era visual values that conflict with approved tokens.
- Materialize reusable design-system code under `components/design-system/`
  (button, badge, card, section wrappers, icons, assets, token contract).

### Base layout components

- Implement and integrate global shell components:
  - `SiteHeader`
  - `SiteFooter`
  - shared layout wrapper in root layout
- Keep component logic presentation-focused and token-driven.
- Ensure shared sections consume design-system primitives instead of one-off
  styling where possible.

### Core route-level UX baseline

- Ensure `app/not-found.tsx` matches design intent.
- Ensure manifest metadata and favicon wiring are production-safe.

## Dependencies

- Unit 04 completed (Sanity wiring for site settings and global CTA links).
- Figma Dev Mode/MCP access for layout and token reference.

## Verify when done

- [ ] Header/footer/base shell render correctly on 393 / 768 / 1440 widths.
- [ ] No hardcoded off-token visual values in shared components.
- [ ] `npm run design:verify` passes.
- [ ] Navigation labels and CTA targets align with approved content model.
- [ ] `not-found` route and manifest assets resolve correctly.
- [ ] `npm run build` passes.
- [ ] `npm run lint` has no new errors introduced by this unit.
