# Figma Make Design Handoff - Web3 Readability & AI Citation Checker

**Project:** PromptRaise free tool page
**Route:** `/tools/readability`
**Live interactive reference:** https://calm-mosaic-7z9q.here.now/
**Design system:** PromptRaise Brand Design System v1.0 (dark theme only - NO light mode)
**Goal:** Redesign the tool UI to match the PromptRaise Figma theme (dark, neon-green accent, the same visual language as the glossary + audit pages).

---

## 1. Purpose & framing (designer should read this)

This is a **free Web3-focused readability + AI-citation tool**. Unlike a generic Flesch calculator, it is built for _AI visibility_: it tells a Web3 founder how readable their copy is AND how likely answer engines (ChatGPT, Perplexity, Claude, Gemini) are to cite them. It is a top-of-funnel **lead-capture tool** - the "Get free audit" CTA at the bottom is the conversion point.

The design should feel premium, technical, and "crypto-native" but stay on-brand with the existing dark + `#67ff67` green aesthetic. It must be **fast and static** (all scoring runs client-side - no API calls), so the design should not imply heavy loading states.

---

## 2. Color system (from the PromptRaise design system)

| Token                               | Hex       | Usage                                             |
| ----------------------------------- | --------- | ------------------------------------------------- |
| Near Black `--bg-base`              | `#0F0F0F` | Page background, deep surfaces                    |
| Dark Charcoal `--bg-surface`        | `#242628` | Cards, elevated surfaces, textarea                |
| Surface hover `--bg-surface-hover`  | `#2A2D2F` | Card/hover states                                 |
| White `--text-primary`              | `#FFFFFF` | Headings, primary text, big numbers               |
| Warm Gray `--text-secondary`        | `#DEDCD7` | Body text                                         |
| Light Gray `--text-muted`           | `#C9CDD2` | Labels, captions, notes                           |
| **Accent Green `--accent-primary`** | `#67FF67` | Primary CTA, active states, key highlights, links |
| Muted Green `--accent-secondary`    | `#3D6944` | Web3 tags/badges (border)                         |
| Accent foreground                   | `#0F0F0F` | Text ON green buttons                             |
| Border `--border-default`           | `#242628` | Card borders                                      |
| Border subtle                       | `#1A1A1A` | Very subtle separators                            |

**Score-state colors** (already used in current UI - keep or refine):

- Good / High: `#67FF67` (green)
- Medium / Off-target: `#E8C766` (amber)
- Low / Hard: `#FF7A6E` (red)

**Inline-highlight colors (in the text review box):**

- Complex word: red `#FF7A6E` at ~22% bg tint
- Long sentence (20+ words): amber `#E8C766` at ~18% tint
- Web3 term: green `#67FF67` at ~15% tint

---

## 3. Typography

- **Primary font:** Neutral Sans (fallback Geist Sans / Inter)
- **Weights:** 400 regular, 500 medium, 600 semibold, 700 bold
- **Base:** 16px, line-height 1.5, tight letter-spacing on headings
- **Scale to design:**
  - H1 (page title): ~34-36px, semibold, tight tracking
  - Section titles (H2): ~24px, semibold
  - Card sub-heads: ~12px, uppercase, letter-spaced, muted - used as small labels
  - Big score numbers: 48px bold (the two hero gauges)
  - Metric values: 22px semibold (formula grid), 18px semibold (metric cards)
  - Body/notes: 14px, secondary/muted

---

## 4. Layout & breakpoints

- **Max content width:** 1248px (primary band); this page uses a narrower content column `max-w-4xl` (~896px) like the glossary page. Designer may keep or widen.
- **Figma frame widths:** Mobile 393 · Tablet 768 · Desktop 1024 · Wide 1440. Provide at least 393 / 768 / 1440.
- **Section vertical rhythm:** 64px mobile → 80px+ desktop
- **Card radius:** `rounded-2xl` = 16px (border-radius). Pills = `rounded-full`.
- **Grids:**
  - Hero score cards: 2 columns (stack to 1 on mobile)
  - Formula grid: 3 columns (2 on mobile)
  - Answer-verdict cards: 2 columns (1 on mobile)
  - Metric cards: 4 columns (2 on mobile)
  - Breakdown panels (complex words + longest sentences): 2 columns (1 on mobile)

---

## 5. Page anatomy (top to bottom) - the sections to design

**A. Page header**

- Eyebrow label: "Free tool" (uppercase, ~12px, letter-spaced, muted)
- H1: "Web3 Readability & AI Citation Checker"
- Sub: 2-3 sentence value prop about readability + AI citation for Web3

**B. Genre selector (controls)**

- Label "Genre:" + 4 pill toggles: **General audience / Web3 explainer / Whitepaper / Tutorial**
- Active pill = green border + green text; inactive = default border + secondary text
- Below: a one-line note showing the target Flesch range for the selected genre (e.g. "Flesch 45-60")

**C. Text input**

- Large rounded textarea (min ~200px tall), charcoal surface bg, green focus border
- Placeholder text prompting to paste Web3 copy

**D. Inline highlight preview** (unique feature - design this nicely)

- A surface panel below the textarea that shows the pasted text with:
  - complex words highlighted red
  - sentences 20+ words highlighted amber
  - Web3 terms highlighted green
- A small legend row explaining the 3 colors

**E. Action row**

- **Primary pill button:** "Analyze text" (green bg, dark text)
- **Ghost pill button:** "Try Web3 example"
- **Text link:** "Clear" (muted, appears when text present)

**F. Hero score cards (2-up)**

1. **Citation Readiness** - the PromptRaise differentiator
   - Big 0-100 number + High/Medium/Low tag (colored by score)
   - Note: "How likely answer engines are to pull a clean, grounded, citable sentence from your text"
2. **Flesch Reading Ease**
   - Big 0-100 number + target status ("In target / Off target for [genre]")
   - Sub-line: ease label + grade level

**G. Readability formulas grid (3-up)** - 6 tiles:

- Flesch Reading Ease (with target range + green/amber target indicator)
- Flesch-Kincaid Grade · Gunning Fog · SMOG · Coleman-Liau · ARI
- Small label + big number each. Caption: "disagreement between formulas is normal"

**H. Answer engine verdict (2-up cards)** - the moat feature

- 4 cards: **ChatGPT · Perplexity · Claude · Gemini**
- Each: emoji/engine name, score + High/Medium/Low tag, one-line reasoning, and a "Tip:" line
- Footer disclaimer: "Heuristic estimate from PromptRaise citation signals - not a live API check"

**I. "How to make this more citable" panel**

- List of auto-generated improvement tips with green "+" bullets (only if any exist)

**J. Metric cards (4-up):** Words · Sentences · Syllables · Characters · Complex words · Avg sentence · Avg syllables/word · Reading time

**K. Breakdown panels (2-up):**

- "Complex words" - chips of complex words found
- "Longest sentences" - list with word-count badges (amber if 20+ words)

**L. Web3 terms detected panel**

- Cyan/green-tinted tags of detected Web3 terms + note about Web3-aware scoring

**M. Lead-capture CTA** (the conversion - design as the visual anchor)

- Green-border card: "Want AI to actually cite your protocol?"
- Sub-copy + green pill "Get free audit" → https://audit.promptraise.com

---

## 6. Optional sub-pages / parts

Design optional supporting views so the push to prod is complete:

- **"How the scores work"** explainer block (educational section below the tool - answers FAQ: what is Flesch, what is Citation Readiness)
- **Empty state** (before any text): muted hint text
- **Loading/hover states**: green `--bg-surface-hover` on cards, `hover:opacity-90` on primary CTA, border turns green on hover for pills

---

## 7. Non-negotiable constraints (do not break)

1. **Dark theme only** - no light mode anywhere
2. **Client-side only** - all calculations run in the browser; no server calls. No spinner/loading animation for "analysis" expected beyond a trivial local recompute - the design should feel instant.
3. **Keep the two hero scores** (Citation Readiness + Flesch) prominent - they are the product
4. **Keep the inline highlight 3-color legend** - it is a key differentiator
5. **Keep the "Get free audit" CTA** and route it to audit.promptraise.com
6. Keep the genre selector + target range concept
7. All interactive labels styled per design system (rounded-full pills, 16px card radius, green accent)
8. Fonts: Neutral Sans / Inter only

---

## 8. Content to keep (verbatim building blocks)

**H1:** Web3 Readability & AI Citation Checker
**Sub:** "Paste your copy and see how hard it is to read (Flesch + 4 more formulas) and how likely answer engines are to actually cite your protocol. Built for Web3 - no false 'complex word' penalties on industry terms."
**Primary CTA:** Analyze text
**Ghost:** Try Web3 example
**Lead CTA:** Get free audit
**Lead heading:** Want AI to actually cite your protocol?
**Lead body:** "Get a free AI-viability audit and see how ChatGPT, Perplexity and Claude currently talk about your project - and how to become the answer instead of the rumor."

**Genre presets:**

- General audience → Flesch 60-70
- Web3 explainer → Flesch 45-60
- Whitepaper → Flesch 30-50
- Tutorial / docs → Flesch 55-70

**Answer engines:** ChatGPT (💬) · Perplexity (🔍) · Claude (🟠) · Gemini (✨)

---

## 9. Deliverables expected back from Figma Make

- Frames at 393 / 768 / 1440
- The full page layout with all sections A-M
- A component set for: pill buttons (primary/ghost), metric cards, formula tiles, verdict cards, genre pills, textarea with highlight styles, tags/chips
- Mobile + desktop treatment for the two hero scores and the grids

---

## Questions for design (optional, designer's discretion)

- Whether to keep the current narrow (~896px) content column or go full 1248px band
- Whether score hero cards should get decorative accents (glow, grid, orbit) in line with other PromptRaise sections - or stay clean/minimal
