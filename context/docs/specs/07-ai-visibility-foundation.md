# Unit 07: AI Visibility Foundation

## Goal

Implement the V1 machine-readable and metadata foundation so PromptRaise is
discoverable and citable across search engines and AI surfaces.

## Design

This unit is infrastructure and semantic output work; visible UI changes should be
minimal and support discoverability requirements.

## In Scope

- Implement/verify V1 machine-readable endpoints:
  - `robots.txt`
  - `sitemap.xml`
  - `llms.txt`
- Implement/verify site-level metadata and structured data:
  - canonical links and core OG/Twitter metadata
  - `Organization` + `WebSite` JSON-LD
  - search console verification tags (env-driven)
- Add minimal legal/privacy surface required by V1.
- Ensure staging remains non-indexable while production is indexable.

## Out of Scope

- V2 machine-readable expansion (`sitemap.md`, `llms-full.txt`, RSS, IndexNow
  automation).
- Public content API (V3 scope).
- Runtime AI experiences for visitors.

## Implementation

### Endpoint and metadata work

- Add/verify route handlers for required V1 artifacts and content types.
- Ensure canonical and social metadata are generated consistently via app routing.
- Inject required JSON-LD in a centralized, typed manner.

### Environment behavior

- Ensure staging protections remain active (`noindex` / robots disallow patterns
  as defined in project docs).
- Ensure production paths are indexable and correctly linked from machine-readable
  surfaces.

### Compliance with AI visibility rules

- Align implementation with `context/docs/ai-visibility.md` V1 checklist and
  architecture invariants.

## Dependencies

- Unit 06 completed (core landing surface in place).
- Unit 03 environment setup completed (staging vs production separation).

## Verify when done

- [ ] `robots.txt`, `sitemap.xml`, and `llms.txt` resolve with correct content type.
- [ ] Organization/WebSite JSON-LD present and valid on root layout/pages.
- [ ] Canonical/OG/Twitter metadata is present on key routes.
- [ ] Staging is non-indexable; production behavior is indexable.
- [ ] Privacy/legal baseline route(s) are reachable.
- [ ] `npm run build` passes.
- [ ] `npm run lint` has no new errors introduced by this unit.
