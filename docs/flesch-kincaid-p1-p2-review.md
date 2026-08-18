# Flesch-Kincaid Calculator - P1 & P2 Feature Review Examples

Date: 2026-08-18
Purpose: give Zain concrete, reviewable examples of the P1/P2 features from the
competitor research before any build starts. Each entry: what it is, the
problem it solves, a concrete example of the user experience, and effort.

---

## P1-1: Analyze by URL

WHAT
A URL field next to the text area. Paste a protocol URL (or any page), the tool
fetches the page, strips nav/footer boilerplate, and runs the same analysis.

PROBLEM IT SOLVES
Paste-only tools die after one use. A URL check is the natural bridge to the
audit product: someone who pastes their protocol page is already asking "is my
site good" - that is the audit persona. WebFX proves this pattern works; none
of the generic FK calculators do it.

EXAMPLE (exact user flow)

1. User opens the tool and sees two inputs: "Paste text" | "Or paste a URL".
2. User enters https://aave.com/docs and clicks Analyze.
3. Tool fetches the page (server-side edge function), extracts main content,
   and shows a banner: "Analyzed aave.com/docs - 412 words extracted".
4. Full result renders: six formulas, Citation Readiness score, verdicts,
   complex words, same as text mode.
5. CTA box below reads: "Want the full AI visibility audit for aave.com? Get
   the free audit" with the URL pre-filled into audit.promptraise.com.

RISK / NOTES

- Some sites block fetches (Cloudflare 403 - we already hit this scanning
  promptraise.com from the audit tool). Fallback: "Couldn't fetch this URL -
  paste the text instead" with the text area pre-selected.
- Keep it 100% server-side so no CORS issues.

EFFORT: Medium (one edge route + content extraction + UI state). Biggest
funnel win of the set.

---

## P1-2: Live scoring as you type

WHAT
Remove the Analyze gate for headline scores. Citation Readiness + Flesch number
update in real time as the user types/edits. The heavy detail panels (complex
words list, longest sentences, verdicts) still need a click, but scores are
always live.

PROBLEM IT SOLVES
We already highlight complex words live in the textarea. ClearPen and Readable
both converged on full live scoring because writers edit -> recheck -> edit.
A click between each check kills that loop and kills time-on-page.

EXAMPLE (exact user flow)

1. User starts typing: "Our protocol is a liquid staking platform..."
   Citation Readiness: 61 (amber) appears immediately under the box.
2. They add "...with over three billion dollars in total value locked which
   keeps growing every quarter across a wide range of integrations" - the
   score ticks down to 43 (red) live, Flesch drops from 62 to 51.
3. No button pressed. The top of the results updates; "Analyze text" button
   remains for the full detail pass.

RISK / NOTES

- Cheap: the analyzer is pure TS and already runs on every keystroke for
  highlighting. We just surface the headline result.

EFFORT: Small. Makes the tool feel instant.

---

## P1-3: Consensus grade

WHAT
One headline "reading level" that averages the six formulas, plus a mini
spread indicator so users see where formulas agree or disagree.

PROBLEM IT SOLVES
Six numbers and no takeaway = "which one do I trust?". ClearPen's consensus
grade removes that friction. It also matches the FAQ answer we already ship
("disagreement between formulas is normal" - now visualized).

EXAMPLE (exact output)
Headline card:
Reading level: Grade 9 (consensus of 6 formulas)
Flesch 48.8 FK 9.7 Fog 12.2 SMOG 11.3 Coleman 10.4 ARI 9.1
Status: "Formulas mostly agree" (green) - or when spread > 4 grades:
"Formulas disagree - the grid below shows why" (amber)
Formula grid stays as-is under it.

RISK / NOTES

- No new computation: we already have all six values. Just average + spread.

EFFORT: Small.

---

## P2-1: Shareable result link

WHAT
"Copy report link" after analysis. The link encodes the analyzed text and
re-runs the same client-side analysis for whoever opens it - no server state,
no account.

PROBLEM IT SOLVES
flesch-kincaid-calculator.com grows through shared links. Every protocol docs
writeup or LinkedIn post that includes a "here's my readability report" link
is a backlink + branded impression. It also builds the same muscle as the
audit tool's shareable report URL backlog item.

EXAMPLE (exact output)
After analysis, a button appears: "Copy report link".
Copied: https://promptraise.com/free/flesch-kincaid-calculator?r=Ab3x... (a
compressed, signed-ish token of the text).
Recipient opens it: the same text loads read-only into the box, analysis runs
automatically, and they see the same scores. Above the results a small strip:
"Report shared from promptraise.com".

RISK / NOTES

- Keep the token short (compressed + maybe length-capped, e.g. 2,000 chars).
- Don't store anything server-side. Client-only is the privacy story.
- Reuse the codec later for the audit tool's shareable reports.

EFFORT: Medium.

---

## P2-2: Action-to-sentence linking

WHAT
Each numbered action in "How to make this more citable" becomes clickable and
jumps to the exact sentence/word it refers to in the review panel (scroll +
flash highlight).

PROBLEM IT SOLVES
ClearPen's ranked fix list is its standout feature because every item is tied
to the actual text. Our numbered list is currently generic (the information is
there: we flag complex words and long sentences inline) - linking them turns
the tool from "calculator" into "editor".

EXAMPLE (exact user flow)

1. Result shows actions:
   1. "Open with your protocol's name: <Protocol> is a <category>..."
   2. "Split sentences over 20 words - yours average 23."
2. User clicks action 2 -> page scrolls to the sentence preview panel, the
   longest sentence flashes amber, and a thin "23 words" tag sits next to it.
3. They edit the sentence in the textarea -> live score (P1-2) recalculates
   -> the action disappears from the list.

RISK / NOTES

- We already compute longestSentences + complexWordList - the anchors exist.
- Keep one highlight color per action type so it isn't visually noisy.

EFFORT: Small-Medium.

---

## Recommended build order

1. P1-2 Live scoring (smallest, biggest feel-good) + P1-3 Consensus grade
   (smallest, kills confusion) - one sitting.
2. P1-1 URL analysis (the funnel play) - one sitting.
3. P2-2 Action-to-sentence linking - one sitting.
4. P2-1 Shareable report link - one sitting.

Total: about 4 focused sessions, all client-side or one edge route, no new
infra, no data storage.

## What this does NOT include (deliberately skipped)

- Grammar/spelling/style checks (Readable/Hemingway territory) - out of scope.
- File upload - low value for Web3 docs copy.
- API/pro accounts - no revenue model yet.
- Per-formula SEO sub-pages - only after traffic justifies.
