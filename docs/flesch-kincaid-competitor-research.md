# Flesch-Kincaid Calculator - Competitor Research

Date: 2026-08-18
Scope: distinct features of existing FK/readability calculators, what we should
include, and why (tied to Promptraise's Web3 + AI-citation strategy).

## Competitors reviewed (live checks)

### 1. Good Calculators - goodcalculators.com/flesch-kincaid-calculator/

- Shows the exact formula equations for both FK scores (educational).
- Score -> US school grade conversion table.
- Static educational copy (what scores mean, who uses them).
- Community rating widget on the tool page.
  Distinct: education-as-feature. Formulas + conversion tables make the page
  citable and trusted without any "AI" gimmicks.

### 2. flesch-kincaid-calculator.com (all-in-one family)

- Runs all 9 common formulas (FK, SMOG, Gunning Fog, Dale-Chall, ARI,
  Coleman-Liau, Linsear, Lix, Rix) across dedicated sub-pages that all feed
  one combined checker.
- "Copy sharable link" for the analysis.
- No signup; text processed in-browser (privacy note).
- How-it-works steps + "why choose us" sales sections on the tool page.
  Distinct: formula suite breadth + share links + a sub-page per formula
  (readability SEO hub).

### 3. Character Calculator - charactercalculator.com/flesch-reading-ease/

- Paste or file upload.
- Score + grade level + a plain-language "reading note".
- Character/word/sentence/syllable counts.
- Explicit client-side privacy notice.
- Score interpretation table + improvement tips (shorter sentences, fewer
  syllables, break up text, avoid passive voice).
  Distinct: interpretation table + concrete improvement tips; counts as a
  secondary metric layer.

### 4. ClearPen / readabilitygrader.com (the benchmark for action-oriented UX)

- Live inline markup as you type (no analyze button): passive voice, filler
  words, adverbs, long words, over-long sentences.
- Ordered rewrite agenda ranked by impact: "split this sentence", "cut these
  filler words", "rewrite passive as active".
- Consensus grade: average of several formulas, so no single formula rules.
- Fully client-side, offline after first load, no signup, no word limit.
  Distinct: the closest model for "turn a calculator into an editor". This is
  exactly what our "How to make this more citable" section should become.

### 5. WebFX Readability Test - webfx.com/tools/read-able/

- Analyze text by URL: whole page OR a specific container (#mainContent),
  which strips nav noise from the score.
- File upload (TXT/DOC/DOCX).
- "Refer from website" embed: paste a snippet on your page and you get a
  link-back widget that scores visitors' text.
- Inline highlighting of hard sentences, passive voice, adverbs.
  Distinct: URL-based analysis turns a calculator into a funnel (WebFX charges
  for SEO services). The embed widget is a backlink engine.

### 6. Readable.com (pro tier)

- Every notable formula + a proprietary algorithm.
- Imports: URL, PDF, Word, ODF, Markdown, spreadsheets, email, whole sites; API.
- Real-time editing with scores updating while you type.
- Actionable highlights + spelling/grammar/style checks; data retention controls.
  Distinct: the pro/API ceiling. Do not mirror in v1 (no revenue model yet), but
  it defines the "full suite" direction.

### 7. Hemingway App (context reference)

- Color-coded inline markup (adverbs, passive, hard-to-read, very hard).
- Counters for words/characters/reading time per paragraph.
  Distinct: visual edit-in-place UX done best; our HighlightedText block is the
  Web3-flavored equivalent and should stay.

## What we should include, in priority order

### P1: Analyze by URL

What: add a URL input next to the text area; fetch + strip boilerplate, then
run the same analysis.
Why: it is the single biggest funnel lever. WebFX proves demand, and it maps
1:1 onto our lead CTA ("Get free audit") - someone pastes their protocol URL,
gets a readability + citation score, and the natural next step is the full AI
audit. Paste-only tools cannot do this; it is our differentiator against the
generic SEO calculators.

### P1: Live scoring as you type

What: drop the "Analyze" gate for the headline scores (keep it for the longest
panels); recalc on input like ClearPen.
Why: we already compute highlights live; showing the full result removes a
click and increases retesting (people edit and re-check, staying on the page).
ClearPen and Readable both converged on this - it is table stakes for the
serious writer audience.

### P1: Consensus grade

What: show the average of the six formulas as one "reading level" headline with
the individual formula grid underneath.
Why: six numbers with no takeaway = confusion; ClearPen's consensus grade
answers "which number should I trust?" and reduces bounce. Cheap to add -
we already compute all six.

### P2: Shareable result link

What: "Copy report link" that encodes the text (or a hash) and re-runs the
analysis for whoever opens it.
Why: this is the same muscle as the audit tool's shareable report URL backlog
item, and flesch-kincaid-calculator.com proves free tools grow through shared
links. Also turns every Web3 docs writeup into a potential backlink.

### P2: Action-to-sentence linking (next step of item 5)

What: make each numbered action in "How to make this more citable" clickable to
the exact sentence/word it refers to (we already flag complex words and long
sentences inline).
Why: ClearPen's ranked fix list is its standout feature; we have the numbered
list now, linking it to the inline highlights turns the tool into an editor.

### P3: Per-formula explainer pages (SEO hub)

What: sub-pages per formula (like flesch-kincaid-calculator.com) later, feeding
internal links to the tool.
Why: long-tail "smog index calculator" style queries are cheap to own and feed
the main calculator. Not urgent - one page can wait until traffic justifies it.

## What to skip (for now)

- Spelling/grammar/style checks (Readable, Hemingway): out of scope, heavy, and
  does not feed the audit funnel.
- File upload (WebFX): low usage for Web3 docs copy; add only if URL analysis
  takes off.
- API + pro accounts (Readable): no revenue model yet; revisit after the audit
  product matures.
- Refer/embed widget (WebFX): clever backlink play, but it competes with the
  audit tool as the CTA destination - decide after URL analysis ships.

## Net recommendation

Ship P1 (URL analysis + live scoring + consensus grade) as the next iteration
of this tool. They are the features competitors with traffic already have, they
directly feed the audit funnel, and they are cheap (all client-side or
Vercel-edge fetch, no new infra).
