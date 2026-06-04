# Unit 01: Repository and Context Docs

## Goal

Create the `promptraise-web` repository containing all context documentation,
entrypoint instructions, and the build plan so implementation can start without
ambiguity.

## Design

No product UI. Structural file-system output only.

## Implementation

### Repository structure

Create the root repository and `context/docs/` hierarchy.

### Context documents

Write approved content for:

- `project-overview.md`
- `architecture.md`
- `code-standards.md`
- `ai-workflow-rules.md`
- `ui-context.md` (placeholder)
- `ai-visibility.md`
- `progress-tracker.md`

### Entrypoint

Create root `AGENTS.md` pointing to context docs in read order.

### Build plan

Create `context/docs/specs/00-build-plan.md`.

## Dependencies

- None

## Verify when done

- [ ] All required files exist at correct paths.
- [ ] File contents match approved planning outputs.
- [ ] `AGENTS.md` read order references valid paths.
- [ ] `.env*` and local secret files are excluded from version control.
- [ ] No TypeScript errors (N/A in this unit).
- [ ] No console errors (N/A in this unit).
- [ ] Responsive at mobile and desktop (N/A in this unit).
- [ ] `npm run build` passes (N/A in this unit).
