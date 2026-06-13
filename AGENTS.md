# PromptRaise — Agent Entry Point

## Application Building Context

Read the following files in order before implementing or making any
architectural decision:

1. `context/docs/project-overview.md` — product definition, goals, features, and scope
2. `context/docs/architecture.md` — system structure, boundaries, storage model, and invariants
3. `context/docs/ui-context.md` — theme, colors, typography, and component conventions
4. `context/docs/design-system-code-map.md` — design-system component/token map and verification commands
5. `context/docs/code-standards.md` — implementation rules and conventions
6. `context/docs/ai-workflow-rules.md` — development workflow, scoping rules, and delivery approach
7. `context/docs/ai-visibility.md` — discoverability surface and structured-data requirements
8. `context/docs/progress-tracker.md` — current phase, completed work, open questions, and next steps

## Rules

- Update `context/docs/progress-tracker.md` after each meaningful implementation change.
- If implementation changes architecture, scope, standards, or discoverability rules, update the relevant context file before continuing.
- Invariants in `architecture.md` are hard stops. If a task would violate one, stop and report it.
- Build version by version (V1 -> 48h validation -> V2 -> V3); do not pull future work forward.
- This repo links to external audit/bot systems but never imports their code.
- Secrets must live only in environment variables; never commit or paste secrets into docs.

## Notes

- Canonical entry file is `AGENTS.md`.
- If `CLAUDE.md` exists, it should reference this file to avoid drift.
