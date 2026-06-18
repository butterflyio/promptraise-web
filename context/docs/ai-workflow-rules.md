# PromptRaise — AI Workflow Rules

These are rules, not suggestions. Follow them exactly while building this project.

## Approach

Build PromptRaise incrementally using a spec-driven workflow. The files in `context/docs/` define what to build (`project-overview.md`), how to build it (`architecture.md`, `code-standards.md`, `ui-context.md`), the discoverability surface (`ai-visibility.md`), and the current state (`progress-tracker.md`). Always implement against these specs — never infer or invent behavior from scratch. Work version by version: V1 (landing) -> 48-hour validation -> V2 (full site) -> V3 (differentiation), and never pull future-version work into the current version. Resolve intent against `project-overview.md`, structure against `architecture.md`, and design values against `ui-context.md`; these files win over your own judgment. Treat the invariants in `architecture.md` as hard stops — if a task requires violating one, stop and report it instead of proceeding.

## Scoping Rules

- Work on one unit at a time. A unit is one page, one component, one schema type, or one handler — not a mix.
- Prefer small, verifiable increments over large speculative changes. Make the smallest change that satisfies the unit — no speculative abstractions, no "while I'm here" edits, no unrequested refactors.
- Do not combine unrelated system boundaries in a single implementation step.
- Stay within folder ownership defined in `architecture.md`. Do not reach across boundaries to "fix" something out of scope.
- Never implement, scaffold, or add dependencies for anything listed as out-of-scope in `project-overview.md`. If you believe an out-of-scope item is needed, stop and ask.

## When to Split Work

Split an implementation step if it combines:

- Schema (Sanity) changes and rendering changes.
- More than one page, or multiple unrelated components.
- Multiple unrelated routes or machine-readable endpoints.
- Behavior not clearly defined in the context files.

Build vertically: complete one page or feature end-to-end (data -> render -> SEO/JSON-LD -> styling -> verification) before starting the next. If a single prompt contains multiple deliverables, enumerate them, confirm the order, and execute them as separate units in sequence. If a change cannot be verified end to end quickly, the scope is too broad — split it.

## Handling Missing Requirements

- Do not assume or invent product behavior, content, copy, URLs, or data not defined in the context files. Use placeholders explicitly labeled as such and flag them.
- Never invent design values (colors, spacing, type, layout). If a value is not in `ui-context.md` or the Figma source, request it.
- If a requirement is ambiguous but resolvable from `context/docs/`, resolve it there and state which file and rule you used.
- If a requirement is missing or cannot be resolved, add it as an open question in `progress-tracker.md` before continuing, and ask the user.

## Protected Files

Do not modify the following unless explicitly instructed:

- Generated/vendored UI primitives (shadcn/Radix components added via CLI) — wrap or compose them instead.
- Sanity-generated types, lockfiles, or build output.
- `tailwind.config` tokens, `architecture.md` invariants, or any file in `context/docs/`.
- CI, deployment, or environment configuration.
- Code from `audit.promptraise.com` or the Telegram bot — these are linked to, never imported.

## Keeping Docs in Sync

Update the relevant context file in the same change whenever implementation changes:

- System architecture or boundaries (`architecture.md`).
- Storage model decisions (`architecture.md`).
- Code conventions or standards (`code-standards.md`).
- Feature scope (`project-overview.md`).
- Content types, pages, or machine-readable endpoints (`ai-visibility.md`).

Update `progress-tracker.md` when a unit is completed (what was done, status, new open questions). Do not let docs and code drift — if they conflict, stop and reconcile before continuing.

## Docs-Sync Checklist (Mandatory Every Implementation Turn)

Before closing any implementation task:

1. Run a quick changed-files check (`git diff --name-only` or equivalent) and list what changed.
2. Update `progress-tracker.md` in the same turn whenever any meaningful code or config change was made.
3. If the change affects architecture, scope, standards, UI tokens/patterns, or discoverability surfaces, update the corresponding context doc in the same turn.
4. Reconcile contradictions between `progress-tracker.md` and the spec/build-plan docs before finishing.
5. In the completion message, explicitly state docs-sync status and which docs were updated.

If any checklist item cannot be satisfied, stop and report the blocker instead of marking the task complete.

## Before Moving to the Next Unit

1. The current unit works end to end within its defined scope, and `npm run build` passes (with `tsc --noEmit`, ESLint, and Prettier clean).
2. No invariant defined in `architecture.md` was violated (SSR/static HTML present; no stored PII; no tracking cookies; AI crawlers not blocked; canonical correct).
3. The unit matches its spec and the Figma design (where applicable) at mobile, tablet, and desktop; metadata via `generateMetadata` and required JSON-LD for the page type emitted and validating.
4. Relevant machine-readable artifacts still generate, and accessibility + agent-readability checks pass (Lighthouse >= 95; `@vercel/agent-readability`).
5. `progress-tracker.md` reflects the completed work.

Do not start the next unit until every item above passes. If something fails, fix it or report it — do not proceed.
