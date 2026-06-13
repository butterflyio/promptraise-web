# PromptRaise — Build Plan (00)

Each unit is single-boundary, visible, and verifiable. Dependencies are introduced
just in time. Global Definition of Done is the enhanced checklist in
`context/docs/ai-workflow-rules.md`.

## Prerequisites (not build units)

- P1 Access: DNS access, Vercel project access, GSC/Bing access.
- P2 Inputs: social URLs/handles, organization name/logo, CTA URLs (placeholders allowed until provided).
- P3 Existing URL inventory from the live `www.promptraise.com`.
- P4 Figma Dev Mode MCP running with node `63-93` selected.

## Design-to-Code Gate (Mandatory for Figma-backed Units)

### Entry Check (Layer 1: Design Context Required Before Coding)

- For every Figma-backed section/component, pull structured design context from Figma MCP (`get_design_context`) for the exact target node(s) before implementation.
- Screenshots (`get_screenshot`) are reference-only and cannot be used as the sole implementation source.
- Capture and apply node-level design data: hierarchy, spacing, typography, tokens, states, assets, and breakpoint variants (minimum: mobile/tablet/desktop frames defined in the design).
- Do not start coding until this context is retrieved and the target node IDs are identified.

### Second-Layer Verification (Layer 2: Functional Parity, Not Visual Approximation)

- Verify parity at design breakpoints against Figma outputs after implementation.
- Verify behavior/functionality from design context is implemented in code (not screenshot-matched by eye): interactive states, motion/video behavior, CTA/link wiring, and CMS bindings where applicable.
- A unit cannot be marked complete until both Layer 1 and Layer 2 checks pass and are recorded in `context/docs/progress-tracker.md`.

## Unit 1 — Repository and context docs

- Create repository structure and write all context docs + `AGENTS.md`.
- Add `context/docs/specs/` and this build plan.

## Unit 2 — App scaffold, tooling, CI, baseline security headers

- Scaffold Next.js + TypeScript + Tailwind.
- Configure linting, formatting, type checking, CI checks, and baseline headers/CSP.

## Unit 3 — Vercel environments

- Configure production and staging deployments.
- Keep staging non-indexable.
- Validate preview deployments.

## Unit 4 — Sanity foundation

- Create/attach Sanity project and datasets (`production`, `staging`).
- Define `SiteSettings` and foundation schemas.
- Configure typed Sanity client and environment wiring.

## Unit 5 — Design system and base layout (Figma)

- Extract tokens from node `63-93` and populate `ui-context.md`.
- Implement base layout, nav, footer, 404/500, favicon/manifest.
- Apply the Design-to-Code Gate (Layer 1 + Layer 2) to all Figma-derived outputs.

## Unit 6 — Landing page

- Implement all V1 landing sections from Figma.
- Wire CTAs and placeholder-driven external links.
- Apply the Design-to-Code Gate (Layer 1 + Layer 2) to every landing-page section.

## Unit 7 — AI visibility foundation

- Implement V1 machine-readable surfaces and metadata:
  `robots.txt`, `sitemap.xml`, `llms.txt`, canonical/meta/OG, Organization/WebSite JSON-LD,
  minimal privacy notice, and search console verifications.

## Unit 8 — Redirects and production cutover

- 8a: verify redirect map on staging.
- 8b: execute production switch and DNS cutover once staging is validated.

## Unit 9 — V1 validation and 48-hour observation

- Run final Lighthouse and agent-readability checks.
- Confirm V1 success criteria.
- Observe 48 hours and refine V2 scope from real data.

## Deferred after V1 gate

- V2 detailed decomposition (content engine + additional pages + discoverability expansion).
- V3 detailed decomposition (public content API + build-in-public score page + interactive framework).
