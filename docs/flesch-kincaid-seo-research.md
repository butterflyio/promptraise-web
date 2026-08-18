# Readability Formulas, SEO & AI Visibility - Research Summary

Date: 2026-08-18
Scope: how the 6 formulas help SEO, what content types the calculator suits,
and whether to add Rix/Lix/Linsear Write/Dale-Chall.

## 1. How the 6 formulas help SEO (honest framing)

Search engines do NOT use readability formulas directly as ranking factors.
They never have. What actually matters:

1. UX signals: readable content keeps people on the page (dwell time, lower
   bounce), which engines interpret as satisfaction. Grade 8-9 plain English
   is the historical sweet spot for general web content.
2. AI citation (the bigger lever for us): answer engines quote clean,
   self-contained sentences. Shorter sentences + plain words = higher chance
   a passage is pulled verbatim. Our Citation Readiness score is the Web3
   version of this; readability is its foundation.
3. Content quality bar: readability is a cheap proxy for "did the writer
   think about the reader" - Google's quality rater guidelines reward clear,
   accessible writing.

What each formula is best at (as a diagnostic):

- Flesch Reading Ease: the 0-100 overall gauge. Quick sanity check.
- Flesch-Kincaid Grade Level: the de-facto "how hard is this" number (the one
  Microsoft Word shows). Best single default.
- Gunning Fog: punishes jargon (3+ syllable words) + long sentences. Best at
  catching "too many big words".
- SMOG: strictest; best at catching text that overestimates its readability.
- Coleman-Liau: character-based - zero syllable counting. Best at catching
  word-length problems when syllable estimates are noisy (Web3 terms).
- ARI: character + sentence based - simple, stable. Good for technical text.

The real SEO win is not any single formula: it is the SCORE SPREAD. When
formulas disagree, the spread tells you what to edit (Gunning Fog spike =
jargon; FK jump alone = sentence length; Coleman/ARI spike = word characters).
That is the educational content angle the blog series (BUZ-5/6/7) uses.

## 2. Content types this calculator is for

- Whitepapers & docs: the core Web3 use case - before publishing, score the
  readable summary so answer engines can cite it.
- Landing pages: plain-English check against conversion copy.
- Blog posts / articles: grade-level targeting for general vs technical
  audiences.
- Tutorials / guides: step-following readability (5th-7th grade works best).
- Documentation / API guides: developer docs read better at grade 10-12.
- Social media posts: very short, punchy copy (grade 5-7).
- Emails / newsletters / announcements: reply-ability and clarity.
- Legal / compliance pages (bonus): plain-language requirements.
- AI-facing summaries: llms.txt-friendly pages, "answer capsules" - already
  our differentiator.

## 3. Should we add Rix, Lix, Linsear Write, Dale-Chall?

Recommendation: YES for the glossary/SEO pages, LOW priority inside the
calculator itself.

Why add them (SEO/AI visibility argument):

- Each formula name is a search query people already use ("gunning fog index
  calculator", "smog index calculator", "coleman liau calculator"). Every
  competitor with traffic (flesch-kincaid-calculator.com) runs a SEPARATE
  page per formula. That is pure long-tail SEO, and feeds the main tool.
- We already built the glossary terms for Dale-Chall, Linsear Write, and the
  6 core formulas. Lix and Rix are less known (Scandinavian heritage) - two
  more cheap glossary entries.

Why keep them OUT of the calculator UI for now:

- 6 metrics already risk overwhelm; the consensus-grade feature (PR-24) will
  fix interpretation. Adding 4 more numbers before that is clutter.
- No evidence Lix/Rix/Linsear/Dale-Chall change AI-citation behavior; the
  core six already cover sentence length, syllables, characters and familiar
  words.

Recommended sequencing:

1. Add the calculator's six + Dale-Chall + Linsear Write + Lix + Rix as
   glossary terms (done for Dale-Chall/Linsear; add Lix + Rix terms).
2. Build ONE "readability formulas explained" hub page (or per-formula pages
   later) targeting "<formula> calculator" keywords - internal-link to the
   free tool. This is the per-formula SEO farm play.
3. If the calculator data shows users staying, add optional "advanced
   formulas" in a collapsible section (Dale-Chall, Linsear, Lix, Rix) -
   low effort, no layout risk.
4. Ship the consensus grade (PR-24) first - it makes all formulas readable
   at a glance.

## Net answer

The 6 formulas help SEO indirectly (UX + AI-citability + content quality),
and the spread between them is the editorial hook. The calculator fits every
Web3 content type. Adding Rix/Lix/Dale-Chall/Linsear is worth doing as
glossary + keyword pages (cheap SEO surface) and optionally in a collapsible
"advanced" section - not as headline metrics.
