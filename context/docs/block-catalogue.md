# Block Catalogue

Every page section available in the composition layer. A block exists only
when it is present in BOTH:

1. `sanity/schemaTypes/sectionBlocks.ts` (Sanity schema `_type`)
2. `components/sections/registry.tsx` (renderer mapping)

If a block is missing from either, it will not render. This is a deliberate
guardrail: unknown `_type` values are ignored, never silently invented.

Screenshots live next to the Figma design (Breakpoints frames); the
Component column points at the source that implements the visuals.

| `_type`      | Component                 | Section in design                | Editable fields (CMS)                                                                                            | Visual fixed in code                  |
| ------------ | ------------------------- | -------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `hero`       | `hero-section.tsx`        | Header + Hero                    | eyebrow, headline prefix/highlight/suffix, body[], primary CTA, secondary CTA, trust bar (label, badge, logos[]) | layout, background video, badge       |
| `visibility` | `stats-section.tsx`       | Visibility / Stats               | headline (2 lines), stat cards (value + label x4)                                                                | medallion orbit, ellipses, animation  |
| `problem`    | `problem-section.tsx`     | theProblem.exe                   | window title, heading, subtext, CTA label, floating problem cards[]                                              | window art, glows, diagonal grid      |
| `aiTraining` | `ai-training-section.tsx` | We create content that trains AI | badge, heading, subtext, layers[] (number, title, description, benefits[])                                       | background panels, pill styling       |
| `process`    | `process-section.tsx`     | Process / Audit                  | badge, heading, subtext, steps[] (title + desc)                                                                  | slider mechanic, waveform, step icons |
| `comparison` | `comparison-section.tsx`  | PromptRaise vs Competitors       | heading, subtext, features[]                                                                                     | checkmark matrix, highlighted column  |
| `whyChoose`  | `why-choose-section.tsx`  | Why Choose PromptRaise           | badge, heading, subtext, cards[] (title + desc)                                                                  | card illustrations, 3+3 grid          |
| `plans`      | `plans-section.tsx`       | Plans That Scale With You        | badge, heading, subtext, CTA label                                                                               | form styling (fields are code-fixed)  |
| `auditCta`   | `audit-cta-section.tsx`   | Final CTA                        | heading, subtext, CTA label, checklist heading, checklist[]                                                      | banner art stack, glass panels        |
| `team`       | `team-section.tsx`        | Team + Backed by                 | badge, heading, subtext, members[] (name, role, bio)                                                             | portraits, social icons, logos        |
| `askAi`      | `ask-ai-section.tsx`      | Ask AI                           | badge, heading, subtext, prompt                                                                                  | button art, background visual         |

## Settings-dependent props

Two blocks receive URLs from `siteSettings` at render time (not stored in
the page doc):

- `hero` gets `telegramUrl` + `auditUrl` (primary/secondary CTA fallbacks)
- `auditCta` gets `telegramUrl` + `auditUrl` (CTA button destinations)

## Conventions for adding a new block

1. Add the `defineType` block to `sanity/schemaTypes/sectionBlocks.ts` and
   export it from `sectionBlockTypes`.
2. Add the component mapping to `components/sections/registry.tsx`.
3. Add the row to this catalogue.
4. Update `context/docs/progress-tracker.md` in the same PR.

## Reserved slugs

Static file routes win over the catch-all. Do NOT create page docs with
these slugs: `studio`, `privacy`, `terms`, `cookies`, `api`, `feed`,
`robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `llms.txt`.
