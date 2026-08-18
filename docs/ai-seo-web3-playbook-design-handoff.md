# Figma Make Design Handoff - "AI SEO for Web3" Free Playbook Landing Page

**Project:** PromptRaise - free lead-magnet marketing funnel
**Route:** `/ai-seo-for-web3` (canonical: https://promptraise.com/ai-seo-for-web3)
**Live brand reference:** https://promptraise.com (dark theme, neon-green accent)
**Design system:** PromptRaise Brand Design System v1.0 (dark theme ONLY - NO light mode)
**Goal:** A top-of-funnel landing page that gives away a free playbook in exchange for contact info, building a hot-lead list. The visitor sees the value first, then opts in. Design it to convert.

---

## 1. Purpose & framing (designer should read this)

This is a **marketing funnel / lead-capture page**, not a product or documentation page. The single conversion action is the lead form. Everything above the fold should pull the visitor toward entering their email.

The offer is a **free playbook titled "AI SEO for Web3"** - a genuinely useful guide about how Web3 projects can rank inside AI answers (ChatGPT, Perplexity, Claude, Gemini). The brand angle is authoritative, technical, and "crypto-native" - consistent with the rest of PromptRaise and with Google E-E-A-T credibility (a named author signs this).

Two "moat" ideas to lean into visually:

- **Measurement moat** - first-hand audit data / real numbers, not generic marketing
- **AI-native trust** - the AI logos strip (ChatGPT / Perplexity / Claude / Gemini) shows the problem being solved is "getting cited by these"

The form is functional (submits to the PromptRaise lead pipeline), so design real input states: idle, focus, filled, submitting, error, success.

---

## 2. Site chrome (REQUIRED - the page lives inside the site header + footer)

This is a normal public page on promptraise.com, so it is wrapped by the global site chrome. Design the page body only; the header and footer are shared components the site already renders around every page. Reuse them, do not redesign them.

**Announcement bar (top, sitewide):** a slim full-width bar above the header, glass-morphism (translucent + backdrop blur), CMS-driven text (currently "We are now on X. Follow Us" style). Fixed at the very top. It sits ABOVE the header with ~no gap.

**Header (below announcement bar):**

- Left: PromptRaise logo (`/brand/promptraise-mark.svg` or CMS logo)
- Center/right: nav links - **Solutions / Pricing / Company / Resources**
- Right: pill CTA button **"Get Audit"** (light variant, routes to https://audit.promptraise.com)
- Mobile: hamburger menu (slide-in), same links + CTA

**Footer (bottom, sitewide):**

- Logo + copyright line: "© 2026 · cicada-mm.com · Dubai, UAE"
- Right: footer links - **Academy / Glossary / Privacy Policy / Terms of Service / Cookie Usage** + a "Do Not Sell / Cookie preferences" link
- Below name: "powered by Cicada"
- Single row, centered on mobile, brand-dark background, subtle top border

Layout consequence for the design: the page body sits between the header and footer with its own background. Do NOT design a custom header/footer - leave space for the standard chrome.

---

## 3. Color system (from the PromptRaise design system)

| Token                               | Hex                    | Usage                                             |
| ----------------------------------- | ---------------------- | ------------------------------------------------- |
| Near Black `--bg-base`              | `#0F0F0F`              | Page background, deep surfaces                    |
| Dark Charcoal `--bg-surface`        | `#242628`              | Cards, elevated surfaces, form fields             |
| Surface hover `--bg-surface-hover`  | `#2A2D2F`              | Card/hover states                                 |
| White `--text-primary`              | `#FFFFFF`              | Headings, primary text, big numbers               |
| Warm Gray `--text-secondary`        | `#DEDCD7`              | Body text                                         |
| Light Gray `--text-muted`           | `#C9CDD2`              | Labels, captions, notes, placeholders             |
| **Accent Green `--accent-primary`** | `#67FF67`              | Primary CTA, active states, key highlights, links |
| Muted Green `--accent-secondary`    | `#3D6944`              | Web3 tags/badges (border)                         |
| Accent foreground                   | `#0F0F0F`              | Text ON green buttons                             |
| Border `--border-default`           | `#242628`              | Card borders                                      |
| Border subtle `--border-soft`       | `#1A1A1A`              | Very subtle separators                            |
| Gradient green (hero highlight)     | `#67FF67` -> `#3D6944` | hero featured text / glow accents                 |

**Status/semantic colors (for the form and any score UI):**

- Success / valid: `#67FF67`
- Error: `#FF7A6E`
- Warning / in-progress: `#E8C766`

---

## 4. Typography

- **Primary font:** Neutral Sans (fallback Geist Sans / Inter)
- **Weights:** 400 regular, 500 medium, 600 semibold, 700 bold
- **Base:** 16px, line-height 1.5, tight letter-spacing on headings
- **Scale to design:**
  - H1 (page title): ~44-48px desktop / ~32px mobile, semibold, tight tracking, can run 2 lines
  - Section titles (H2): ~28-32px, semibold
  - Card sub-heads / eyebrows: ~12px, uppercase, letter-spaced, muted
  - Form CTA button: ~16px, medium
  - Body / notes: 14-16px, secondary/muted
- All headings white; body carries the grays above.

---

## 5. Layout & breakpoints

- **Max content width:** 1248px primary band; inner text columns `max-w-4xl`-style (~896px) for readability on copy-heavy sections (same as glossary / blog).
- **Figma frame widths:** Mobile 393 · Tablet 768 · Desktop 1024 · Wide 1440. Provide at least 393 / 768 / 1440.
- **Section vertical rhythm:** 64px mobile -> 88px+ desktop.
- **Card radius:** `rounded-2xl` = 16px. Pills = `rounded-full`.
- **Grids:**
  - "What's inside" chapter cards: 3 columns (2 on mobile, 1 on narrowest if needed)
  - Value/why-now content: single centered column with a wide reveal
  - Credibility row: 3-4 up (author card + logos/data)
  - Form panel: single centered column, max ~520px wide
  - Journey steps: 3 columns (stack on mobile)
  - FAQ: single column accordion, ~768px max
- **Sticky form (desktop only, optional but recommended):** keep a compact form/CTA reachable as the user scrolls a long page, or repeat a slim CTA band before the footer. Do not make the sticky element cover content.

---

## 6. Page anatomy (top to bottom) - the sections to design

> Order is deliberate: value first, credibility second, ask third and final. Keep the form high (hero) AND low (final CTA).

**A. Hero (form ABOVE the fold - the conversion anchor)**

- Eyebrow pill: "FREE PLAYBOOK" (uppercase, muted, letter-spaced)
- H1: e.g. "The playbook that gets your Web3 project cited by AI." with a green-highlighted phrase
- Sub: 1-2 sentence value prop: who it's for + the outcome ("rank inside ChatGPT, Perplexity, Claude and Gemini - without waiting on agencies")
- **Lead form card** (primary CTA, prominent, green): fields below in Section 8. Place the form IN the hero, not below the scroll.
- Small privacy assurance line under the form: "No spam. Unsubscribe anytime." + a lock/shield icon
- AI logos strip: ChatGPT / Perplexity / Claude / Gemini logos in a muted row (trust signal: "this is about being found by these")
- Decorative: radial green glow / subtle grid, consistent with other PromptRaise sections

**B. "What's inside" - value cards (the 'it's worth my email' proof)**

- Section label eyebrow: "WHAT YOU'LL GET" / heading like "Inside the playbook"
- 3-6 chapter cards, each: icon + title + 1-line description. Content so the reader sees the playbook is substantial (chapters on GEO/AEO, answer-engine citation mechanics, a 30-day framework, real data, no-fluff).

**C. Problem / "why now" (pain → relevance)**

- Eyebrow + heading like "Why your protocol is invisible to AI answers"
- Short, punchy copy: bottom-funnel pain (protocols get ignored by LLMs; most guidance is theory; the gap is measurable)
- Optional: a 1-2 number stat callout strip (real, from PromptRaise audit data - the measurement moat)

**D. Credibility (E-E-A-T trust - who is giving this away)**

- **Author card:** named author with avatar (round), name, role (e.g. "Zain Khan, Co-founder, PromptRaise"), short bio line, and a link to their author page (`/blog/authors/zain-khan`). Use one of the three authors already on the site: Zain Khan / Maxim Moris / PromptRaise Research Team.
- Small "who we've done this for" or "backed by" logos / a real-audit proof card (method, not marketing)

**E. Form / conversion panel (the ask - repeated here before footer)**

- Same form as the hero (Section 8). Heading like "Get the free playbook" + sub.
- Privacy assurance + consent line (required checkbox - Section 8).

**F. How it works (3 steps)**

- 3 numbered steps: "Enter your email -> Get the playbook instantly -> Apply the 30-day framework and get found by AI."

**G. FAQ (objection handling + SEO/AEO)**

- 4-6 questions, accordion, each a short answer. Common ones: "Is it really free?" / "Who is it for?" / "How is this different from generic SEO advice?" / "How do I get it delivered?"
- Keep the FAQ content in the page markup (crawlable) - the accordion is fine here, don't hide it behind a disclosure that blocks crawlers.

**H. Final CTA + close**

- Slim centered band: repeat the pitch + a compact "Get the free playbook" button linking to the form (or the hero form anchor `#lead-form`).

---

## 7. Lead-capture form - the fields and the funnel

**Fields (the exact data the funnel captures):**

1. **Email** (required, validated) - the primary lead identifier
2. **Name** (required) - personalizes delivery and follow-up
3. **Website / protocol URL** (optional but strongly recommended) - THE hot-lead signal for a Web3 B2B funnel; shows intent and gives a target to audit
4. **Consent checkbox** (required) - "Send me the playbook and occasionally useful AI-visibility insights. I can unsubscribe anytime."

**Field states to design:** idle / focus (green border) / filled / invalid (red border + inline message) / submitting (button shows loading) / success (form swaps to a thank-you state) / error (inline, no lead loss).

**Success state (design this):** form disappears, replaced by a confirmation card - e.g. a green check, "Check your inbox" message, and a note that the playbook is on its way. The visitor should not hit a dead end.

**Anti-spam honeypot:** a hidden field (e.g. the homepage form uses a hidden "company" field); when a bot fills it, the form pretends success and sends nothing. Design an invisible field (not visible to humans) plus a front-end-only first field if it helps layout - keep it invisible.

**What happens on submit (so the designer knows it's real):**

- Client validates -> POST to `/api/leads`
- Server writes the lead to the PromptRaise Supabase `audit_leads` table tagged `source=playbook`, `campaign=ai-seo-for-web3`, with email/name/website/consent stored
- Lead becomes a "hot lead" in the PromptRaise pipeline (Trello is the follow-on target)
- Row is queryable + auditable (Measurement Moat - we can report how many leads the page produced)

---

## 8. SEO / AEO wiring to keep in mind (affects copy + structure)

- Single clean `<title>` - do NOT repeat the brand ("... | PromptRaise" is appended by the layout automatically)
- `alternates.canonical` = https://promptraise.com/ai-seo-for-web3
- **Book JSON-LD** (`@type: Book`) for the playbook - the natural schema
- FAQPage JSON-LD matching the on-page FAQ
- Person/Organization `@graph` reuse (author -> the named author; publisher -> PromptRaise)
- Indexable (no noindex), added to sitemap (priority ~0.7)
- Keep primary value copy + FAQ crawlable; do not hide content behind click-to-expand that blocks indexing
- Conversion measurable via Ahrefs analytics (already sitewide)

---

## 9. Non-negotiable constraints (do not break)

1. **Dark theme only** - no light mode anywhere
2. **Page lives inside the standard site header + footer + announcement bar** - design the body only; reuse the chrome (Section 2). Do not invent a new header/footer.
3. **Form appears high (hero) and again low (final CTA)** - the lead form is the entire point; it must be reachable above the fold and at the end.
4. **Keep the lead form as the visual anchor** - green pill submit, clear fields, real states (idle/focus/error/success/submitting)
5. **Keep the AI logos strip (ChatGPT / Perplexity / Claude / Gemini)** in the hero - it states the problem (getting cited by these)
6. **Keep the named-author credibility card** - E-E-A-T is a real ranking signal for this page
7. **FAQ content stays crawlable** - accordion OK, but the questions/answers must be in the page (not loaded only on click behind a crawler-blocking wall)
8. All interactive labels styled per design system (rounded-full pills, 16px card radius, green accent, `#67FF67`)
9. Fonts: Neutral Sans / Inter only
10. Fast and static-ish: form submits to the API, but the page itself should prerender as static content with no heavy client state on first paint.

---

## 10. Content building blocks (verbatim scaffold - final copy TBD)

**H1:** The playbook that gets your Web3 project cited by AI.
**Sub:** A no-fluff guide to showing up inside ChatGPT, Perplexity, Claude and Gemini - for Web3 teams that are done being invisible to AI answers.
**Playbook chapters (draft - 6 cards):** "Why Web3 is invisible to AI" / "How answer engines pick their sources" / "GEO vs SEO vs AEO - what actually matters" / "A 30-day 'get found by AI' framework" / "Real audit data, not theory" / "A reusable citation checklist"
**Lead CTA:** Get the free playbook
**Form heading:** Get the free playbook
**Form sub:** Enter your email and we'll send it straight to your inbox.
**Privacy line:** No spam. Unsubscribe anytime.
**Author (choose one):** Zain Khan, Co-founder, PromptRaise (links to /blog/authors/zain-khan)
**How it works (3):** "Enter your email" / "Get the playbook instantly" / "Apply the framework and get found by AI"
**FAQ (draft):** "Is it really free?" / "Who is this for?" / "How is this different from generic SEO advice?" / "How do I get it?" / "Do you sell my data?"

---

## 11. Deliverables expected back from Figma Make

- Frames at 393 / 768 / 1440 for the full page (sections A-H)
- The full page layout with all sections
- A component set for: hero + AI logos strip, lead form (all field/state variants), value cards, credibility/author card, journey steps, FAQ accordion, final CTA
- Mobile + desktop treatment for the hero and the lead form (the two places that must not break)
- Explicit success + error states for the form
- Note where the page body boundary falls so it aligns with the existing header/footer
