# PromptRaise — Code Standards

## General

- Keep modules small and single-purpose; one responsibility per file.
- Fix root causes; do not layer workarounds or dead code.
- Do not mix unrelated concerns in one component, route, or change.
- Build spec-driven and server-first; meaningful HTML is present without client JS.
- Design values come only from tokens (see `ui-context.md`); a raw hex in a component is a defect.

## TypeScript

- `strict` mode on. `noUncheckedIndexedAccess` and `noImplicitOverride` enabled.
- No `any`. Use `unknown` + narrowing at boundaries. `// @ts-expect-error` requires an inline reason.
- Explicit return types on all exported functions and route handlers.
- `type` for unions/aliases/props; `interface` only for extendable object contracts.
- Model content variants as discriminated unions (e.g., Portable Text blocks keyed by `_type`).
- Validate all external input (form payloads, query params) with Zod at the boundary; infer types from schemas.
- Sanity query results are typed; never cast GROQ results to `any`.
- Prefer `const`, immutability, and pure functions in `/lib`. No default exports except Next.js route/page files that require them.

## Next.js (App Router)

- **Server Components by default.** Add `"use client"` only when a component needs state, effects, or browser APIs — keep client components small and leaf-level.
- **No data fetching in components.** All Sanity/GROQ access lives in `/lib` and is called from Server Components or route handlers.
- Use `generateMetadata` for every route's SEO/OG/canonical; never set meta tags ad hoc in markup.
- JSON-LD is produced by centralized generators in `/lib` and injected in the route; never hand-written in a component.
- Use `next/image` for all raster images and `next/font` for fonts. No raw `<img>` for content images.
- Data freshness via ISR (`revalidate`) and tag-based revalidation on Sanity publish — not client polling.

## Styling

- **Tokens only.** No hardcoded hex, font sizes, line-heights, or spacing in components — all values come from the Tailwind token layer sourced from Figma.
- Tailwind utility classes in markup; extract to a component (not `@apply` soup) when a pattern repeats.
- Consistent class ordering (layout -> box -> typography -> color -> state), enforced by the Tailwind Prettier plugin.
- Use shadcn/Radix primitives for interactive behavior (menus, dialogs, disclosure); build bespoke marketing components by hand from Figma.
- Mobile-first responsive design; use the token breakpoints, no arbitrary pixel media queries.
- Semantic HTML required: exactly one `<h1>` per page, correct heading order, landmarks (`<nav>`, `<main>`, `<footer>`), and `alt` text on meaningful images.
- Follow the border-radius, spacing, and type scales defined in `ui-context.md`.

## API Routes

- All handlers live in `/app/**/route.ts` and are stateless and ephemeral.
- Standard handler order: parse -> validate (Zod) -> authorize (if any) -> do work -> respond. Return typed `NextResponse` with a consistent, predictable shape.
- The contact/free-audit handler: validate input, rate-limit at the edge, send via Resend, persist nothing. On success return a minimal JSON ack.
- Deferred work (e.g., IndexNow ping on publish) uses `waitUntil`; never block the response, never spawn background daemons.
- Machine-readable endpoints (`robots.txt`, `sitemap.xml`, `sitemap.md`, `llms.txt`, `llms-full.txt`, markdown mirrors, RSS, OG images) follow one shared pattern: generate from Sanity data, set the correct `Content-Type`, and set caching headers.
- Markdown mirrors set `Content-Type: text/plain;charset=UTF-8`, include frontmatter, a `## Sitemap` section, and a canonical `Link` header.
- Never echo secrets, tokens, or raw internal errors in a response body.

## Data and Storage

- Content (articles, authors, categories, tags, glossary, FAQ, roadmap items, brand assets, site settings) lives in **Sanity** — the single source of content truth.
- Rendered pages are cached via **Vercel ISR**; treat this as a cache, never as a database.
- Form submissions are **delivered via email (Resend)** and never persisted; no PII is stored.
- **No application database or cache** (no Postgres, Supabase, Redis, or KV) in this repo.
- Telegram bot data and audit results belong to external apps only; never read/write them from here.

## File Organization

- `/app` — routes, layouts, `generateMetadata`, JSON-LD injection, and machine-readable route handlers.
- `/components` — presentational, token-driven UI components (one component per file, `PascalCase.tsx`).
- `/lib` — Sanity client, GROQ queries (`/lib/queries/*`), JSON-LD generators (`/lib/jsonld/*`), and pure utilities (`camelCase.ts`).
- `/sanity` — schema type definitions, Studio config, desk structure.
- `/public` — static assets and static machine-readable artifacts where applicable.
- `/context/docs` — internal documentation, roadmap, decision log.
- Do not cross folder boundaries. No barrel `index.ts` re-export files; import from explicit paths. Colocate component-only subparts; promote to `/components` only when shared.

## Security and Secrets

- All secrets live in environment variables (Vercel Env Vars in prod, `.env.local` locally). `.env*` is git-ignored and never committed.
- **Never put a secret in a `NEXT_PUBLIC_*` variable** — those are inlined into the browser bundle. Only genuinely public values (e.g., Sanity `projectId`, `dataset`) may use that prefix.
- Sanity: read public content via the CDN with public, read-only access; any **write/preview token is server-only** (route handlers / server components), never imported into a client component.
- Resend API key is server-only; never referenced client-side.
- IndexNow key is intentionally public (served as a key file at the site root) — this is the one deliberate exception and must contain no other sensitive data.
- Anything imported into a `"use client"` module is effectively public; treat it accordingly and review the client bundle for leakage.
- Never log secrets, tokens, or PII. Never paste tokens into `context/docs/`, `AGENTS.md`, commits, issues, or chat.
- Rotate any credential that has ever been shared outside a secret store, screenshotted, or committed.
- `.gitignore` must cover `.env*`, `.vercel`, and any local key files; verify before the first commit.

## Content and Portable Text

- Each custom Portable Text block (callout, image+caption, quote, FAQ, code) has a matching typed renderer in `/components`; the renderer map is centralized and exhaustive over `_type`.
- Code blocks always carry a language identifier (required for agent readability).
- Author, dates (`datePublished`/`dateModified`), TL;DR, and reading time are derived/validated consistently for every article.

## Quality Gates

- `tsc --noEmit`, ESLint, and Prettier (with Tailwind plugin) must pass before commit; CI blocks on failure.
- No `console.log` in committed code; use a small typed logger if needed.
- Accessibility and agent-readability checks run in CI (Lighthouse + `@vercel/agent-readability`).
- Commit messages follow Conventional Commits; one logical change per PR.
- CI secret-scanning (e.g., gitleaks) runs on every PR; a detected secret fails the build.
