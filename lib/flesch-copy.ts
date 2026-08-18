// ---------------------------------------------------------------------------
// Editable copy for the Flesch-Kincaid calculator page.
//
// Source of truth: the `fleschKincaidLanding` singleton document in Sanity.
// The values below are the in-code FALLBACK defaults, used whenever the CMS is
// unreachable or a field is left blank. The server page merges the CMS doc over
// these defaults, so shipping this module never breaks the page.
// ---------------------------------------------------------------------------

export interface FleschCopyFormulaDef {
  key: string; // matches ReadabilityResult key
  description: string;
}

export interface FleschCopyFaq {
  question: string;
  answer: string;
}

export interface FleschCopy {
  heroTitle: string;
  heroSubtitle: string;

  privacyBadge: string;
  privacyTitle: string;
  privacyBody: string;

  contentTypeLabel: string;

  sampleText: string;

  introSectionTitle: string;
  introBody1: string;
  introBody2: string;

  formulasTitle: string;
  formulasSubtext: string;
  formulaDefinitions: FleschCopyFormulaDef[];

  engineVerdictTitle: string;
  engineVerdictIntro: string;

  citationSectionTitle: string;
  citationSectionIntro: string;

  faq: FleschCopyFaq[];

  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
}

export const DEFAULT_FORMULA_DEFINITIONS: FleschCopyFormulaDef[] = [
  {
    key: "readingEase",
    description:
      "Score 0-100 from sentence length and syllables. Higher = easier. 60-70 is plain English most adults read easily.",
  },
  {
    key: "gradeLevel",
    description:
      "U.S. school grade a reader needs. Uses the same inputs as Reading Ease, converted to a grade level.",
  },
  {
    key: "gunningFog",
    description:
      "Grade level weighted toward long words (3+ syllables), which tend to slow readers down the most.",
  },
  {
    key: "smog",
    description:
      "Grades text by counting polysyllable words near sentence ends. Strictest of the common formulas.",
  },
  {
    key: "colemanLiau",
    description:
      "Grade level based on characters per word and sentences - no syllable counting needed.",
  },
  {
    key: "ari",
    description:
      "Uses characters per word and words per sentence to estimate a grade level. Good for technical text.",
  },
];

export const DEFAULT_FAQ: FleschCopyFaq[] = [
  {
    question: "What is a good Flesch Reading Ease score?",
    answer:
      "A score of 60-70 is generally regarded as plain English that most adults can read easily. Higher scores are easier to read; lower scores are harder. For Web3 content, a 45-60 range is often appropriate for technical explainers.",
  },
  {
    question: "Why does this tool differ from a normal Flesch calculator?",
    answer:
      "PromptRaise's checker is Web3-aware: protocol and chain names (DeFi, ethereum, tokenomics, TVL) are scored with a custom dictionary so legitimate industry terms are not falsely flagged as complex. It also adds a Citation Readiness score for AI visibility.",
  },
  {
    question: "What is the Citation Readiness score?",
    answer:
      "It is a 0-100 PromptRaise signal estimating how likely answer engines are to pull a clean, grounded, citable sentence from your text, based on entity clarity, defined terms, groundable statements and sentence structure.",
  },
  {
    question: "Which readability formulas are included?",
    answer:
      "The calculator runs six formulas at once: Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau and the Automated Readability Index (ARI). Seeing them together shows where they disagree, which is usually more informative than any single figure.",
  },
  {
    question: "What does each formula actually measure?",
    answer:
      "Flesch Reading Ease scores readability out of 100 using sentence length and syllable count. Flesch-Kincaid Grade Level converts that into a U.S. school grade. Gunning Fog focuses on long words and sentence length. SMOG counts hard words to estimate an education level. Coleman-Liau uses characters instead of syllables. ARI counts characters per word and words per sentence to give a grade.",
  },
  {
    question: "Is my text sent to a server?",
    answer:
      "No. The calculator runs 100% in your browser. Your text is analyzed on your device, never uploaded or stored - it works even offline after the page loads.",
  },
];

export const DEFAULT_COPY: FleschCopy = {
  heroTitle: "Flesch-Kincaid Calculator for Web3",
  heroSubtitle:
    "Paste your copy and see two things: how hard it is to read (Flesch + 5 more formulas), and how likely answer engines are to actually cite your protocol. Built for Web3 writing - no false \u201ccomplex word\u201d penalties on industry terms.",

  privacyBadge: "Runs 100% in your browser - fully offline",
  privacyTitle: "Runs 100% in your browser - fully offline",
  privacyBody:
    "Your text is analyzed on this device only. Nothing is uploaded, stored, or sent to a server - the calculator works even if you lose your connection after the page loads.",

  contentTypeLabel: "Content type:",

  sampleText:
    "Promptraise helps Web3 projects get cited by AI. It is a visibility platform that measures how often ChatGPT, Perplexity and Claude mention your protocol. Protocol teams paste their docs or landing page and get a 0-100 AI Visibility score in seconds, plus a clear list of exactly what to fix. As of this quarter, Promptraise tracks how over 40 leading answer engines refer to projects across DeFi and Web3.",

  introSectionTitle: "Why readability and AI citation matter for Web3",
  introBody1:
    "Answer engines like ChatGPT, Perplexity, Claude and Gemini favor content that is easy to parse and grounded in verifiable facts. When your protocol documentation is clearly written and defines its terms, these engines are far more likely to quote it directly - turning your docs into a source of AI referral traffic.",
  introBody2:
    "PromptRaise's Flesch-Kincaid calculator for Web3 is Web3-aware: it recognizes protocol and chain vocabulary (DeFi, TVL, AMM, tokenomics, liquidity) so legitimate industry language is not falsely counted as complex. The Citation Readiness score layers on top of classic readability to estimate how likely each answer engine is to cite your text.",

  formulasTitle: "Readability formulas",
  formulasSubtext:
    "Higher ease = easier \u00b7 grades = reading level. Disagreement between formulas is normal.",
  formulaDefinitions: DEFAULT_FORMULA_DEFINITIONS,

  engineVerdictTitle: "Answer engine verdict",
  engineVerdictIntro:
    "How each major answer engine is likely to treat your text, estimated from the same citation signals above. It is a heuristic - not a live retrieval check - but it shows where each engine is easiest to satisfy.",

  citationSectionTitle: "How to make this more citable",
  citationSectionIntro:
    "These are the concrete, ordered actions that will move your Citation Readiness score the most. Do them, re-run, and watch the verdicts climb.",

  faq: DEFAULT_FAQ,

  ctaHeading: "Want AI to actually cite your protocol?",
  ctaBody:
    "Get a free AI-viability audit and see how ChatGPT, Perplexity and Claude currently talk about your project - and how to become the answer instead of the rumor.",
  ctaLabel: "Get free audit",
  ctaHref: "https://audit.promptraise.com",
};
