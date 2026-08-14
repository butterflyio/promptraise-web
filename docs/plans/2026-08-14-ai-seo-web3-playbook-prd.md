# PRD + Design Handoff - Free Playbook: "AI SEO for Web3"

**Route:** `/ai-seo-for-web3/` (canonical: https://promptraise.com/ai-seo-for-web3)
**Project:** PromptRaise free lead magnet
**Type:** Marketing funnel / lead-capture landing page
**Status:** PLAN - awaiting PRD approval before Figma Make + code
**Date:** 2026-08-14

---

## 1. Naming / Purpose / Output (problem-first)

**NAME:** AI SEO for Web3 - free playbook lead-capture page.

**PURPOSE:** A top-of-funnel marketing page that gives away a free playbook
("AI SEO for Web3") in exchange for a viewer's contact info. It is a
transparent lead magnet: the visitor sees the value first, then opts in. The
page must feel premium and technical to reinforce PromptRaise as the credible
authority on AI visibility for Web3 (E-E-A-T + the "measurement moat").

**OUTPUT (acceptance criteria):**

1. Page renders at `/ai-seo-for-web3/` with the site chrome (header/footer), dark theme, on-brand.
2. A visible, converting lead form captures the minimum lead data.
3. On submit: form validates, posts to the lead endpoint, and the visitor gets the playbook (delivery mechanic TBD - see decisions).
4. The lead lands in the target CRM (Trello vs. Supabase - see decisions) as a qualified "hot lead."
5. Page is SEO/E-E-A-T wired: unique title, canonical, meta, FAQ/Book JSON-LD, indexable, in sitemap.
6. Conversion is measurable (Ahrefs analytics is already installed sitewide).

---

## 2. What the playbook actually is (content brief)

The playbook must be real and worth the email, or the funnel produces junk
"leads" (people who unsubscribe / never engage = poison for a hot-lead list).
Recommendation: reuse the existing E-E-A-T/AEO research already in the repo
(Web3 AI-visibility content, GEO positioning, the comparison/audit material)
to write a genuinely useful ~10-15 page playbook. It is NOT a thin listicle.

Proposed playbook angle (ties to Measurement Moat):

- Why Web3 projects are invisible to ChatGPT/Perplexity/Claude/Gemini
- The difference between SEO, AEO and GEO (and why LLMs matter)
- How answer engines pick and cite sources (grounded, verifiable, structured)
- A repeatable 30-day "show up in AI answers" framework
- Real PromptRaise audit-method principles (first-hand numbers, not theory)

Deliverable ownership: playbook content is a SEPARATE workstream from the page
UI. The page can design + ship the lead capture around a placeholder/coming-soon
delivery, but the playbook PDF should be drafted before launch so delivery is real.

---

## 3. Funnel mechanics (the loop)

Flow: Visitor lands -> sees value prop -> reads signal/credibility sections ->
enters email (min fields) -> submits -> receives playbook -> joins hot-lead list.

**Form fields (recommended):**

- Email (required, validated)
- Name (required, short)
- Website / protocol URL (optional but strongly recommended - it is the hottest qualification signal for a Web3 B2B funnel)
- Consent checkbox (required) - "Send me the playbook + occasional AI-visibility insights"

Minimum friction for conversion vs. lead quality is a real trade-off. Recommend
email+name+website as the default balanced middle ground.

**On submit:**

1. Client validates + posts to `POST /api/leads` (reuse existing endpoint; currently placeholder).
2. Success -> confirmation state: playbook delivery (email/instant link) + "check your inbox."
3. Failure -> clear inline error, no lead loss.
4. Analytics conversion event fires (Ahrefs already installed; add a conversion/goal marker for submit).

---

## 4. Page anatomy (sections for Figma Make to design)

Follow the dark, `#67ff67`-green PromptRaise design system. Frames: mobile 393 /
tablet 768 / desktop 1440.

**A. Hero** - "The playbook that gets your Web3 project cited by AI."

- Eyebrow pill: "Free playbook"
- H1 + green highlight
- Sub: 1-2 sentence value prop
- Primary form capture ABOVE the fold (top-of-funnel: don't make them scroll to convert)
- AI logos strip (ChatGPT / Perplexity / Claude / Gemini) - trust signal

**B. Value / what's inside** - 3-6 card grid: "What you'll learn" (chapters).
Each card: icon + title + 1-line. Makes the free offer feel substantial.

**C. Problem/why-now** - "Why your protocol is invisible to AI answers" -
pain point section. Short stats or contrast (generic vs. first-hand research).

**D. Credibility / social proof** (for E-E-A-T trust before the ask):

- Author byline (named author - Zain Khan / PromptRaise Research Team) with avatar + short bio + Person JSON-LD
- "Backed by" logos / data / real audit method
- Optional: testimonial or proof-of-method card

**E. Form / conversion panel (repeated - sticky on desktop?)**

- Heading, sub, fields, CTA button ("Get the free playbook")
- Small privacy assurance line ("No spam. Unsubscribe anytime.")
- This is the lead magnet; it can appear once in hero + once before footer.

**F. Journey / how it works** - 3 steps: "Enter email -> Read + apply the framework -> Get found by AI."

**G. FAQ** - 4-6 questions (accordion safe for this static page) + FAQPage JSON-LD.
Helps SEO/AEO and pre-empts "is this really free?" objections.

**H. Final CTA + footer** - one last "Get the playbook" + the standard site footer.

---

## 5. SEO / E-E-A-T wiring (reuse established patterns)

- `app/ai-seo-for-web3/page.tsx` - server component.
- `export const metadata`: unique `<title>` (do NOT repeat "| PromptRaise" - layout appends it), description, `alternates.canonical` using NEXT_PUBLIC_SITE_URL.
- **Book JSON-LD** (`@type: Book` or `WebPage` with `about`/`mentions` of Web3 entities) - the natural schema for a playbook.
- FAQPage JSON-LD (already a proven pattern on /tools/readability and glossary).
- Person/Organization `@graph` reuse (site-level Organization sameAs already global; add Person for the byline).
- Add route to `app/sitemap.ts` static entries (priority ~0.7), indexable, no noindex.
- Only select content above/near fold visible to crawlers - do NOT hide the value prop + FAQ in disclosure widgets.

---

## 6. Deliverables expected back from Figma Make

- Frames at 393 / 768 / 1440 for the full page (sections A-H).
- Component set: hero, value cards, form input group (email/name/website/checkbox), primary + ghost pill buttons, FAQ accordion, AI-logo strip, author card, sticky form treatment on desktop.
- Mobile + desktop treatment for hero and the form panel.
- A static error/success state for the form.

---

## 7. Infrastructure work needed (code, separate from design)

1. **Route page component** `app/ai-seo-for-web3/page.tsx` + `app/sitemap.ts` entry.
2. **Form component** (reuse `plans-section` pattern / `audit-cta-section`) posting to `/api/leads`.
3. **Wire `/api/leads` to a real destination** (currently returns `ok`, writes nowhere). This is THE gating dependency for "hot lead list."
4. **Playbook delivery mechanic** - email send (zack@barakah.quest SMTP) and/or a signed/in-line download URL, gated by successful form submit.
5. **CMS editable copy (optional)** - a `playbookLanding` Sanity doc (mirrors `auditLandingType`) if you want the page copy non-code editable; else hardcode in the component like static routes.

---

## 8. Key decisions needed from you (gates the build)

**D1. CRM destination - "Trello CRM" is not yet wired. No Trello creds exist.**
a) Wire real Trello: create/find the Trello list + API key + a `POST /api/leads` path that creates a card per lead. (I'd need the Trello API token & list-id from you.)
b) Reuse the existing audit Supabase leads store (already in the stack, headless-ready, no new creds).
c) Both: Trello card + Supabase row (Trello = active hot list, Supabase = canonical log).
This is the load-bearing fork - recommend (a) Trello since you asked for it, with Supabase as a canonical log if you want redundancy.

**D2. Playbook delivery mechanic:**
a) Email the PDF after submit (real delivery, uses zack@barakah.quest SMTP, one clean attachment).
b) Instant download link revealed on the success state (no email send; lower effort, but a bad email = no lead recovery).
c) Both (recommended): capture email, show instant link, AND email a copy.

**D3. Form field set:** email+name+website (recommended) vs. email-only (max conversion).
**D4. CMS-editable copy** vs. hardcoded static (affects whether we add a Sanity doc).
**D5. Playbook content source** - reuse existing Web3/AEO research to write it (recommended) vs. you'll supply the PDF.

---

## 9. Suggested build sequence (after this PRD is approved)

1. Decide D1-D5 (this doc).
2. Figma Make designs the page (this handoff doc is the input).
3. While design is in progress, I can (parallel, zero-risk): write `/api/leads` real wiring to the chosen CRM, and draft the playbook outline/PDF from existing research.
4. Code the route + form + meta + sitemap on `staging` branch.
5. Review on staging -> deploy to prod (your call).
