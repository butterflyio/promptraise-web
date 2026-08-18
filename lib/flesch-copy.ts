// ---------------------------------------------------------------------------
// Editable copy for the Flesch-Kincaid calculator page.
//
// Source of truth: the `fleschKincaidLanding` singleton document in Sanity.
// The values below are the in-code FALLBACK defaults, used whenever the CMS is
// unreachable or a field is left blank. The server page merges the CMS doc over
// these defaults, so shipping this module never breaks the page.
//
// Every user-facing string on the page should live here so the whole page is
// editable from Sanity. The only strings that stay code-side are pure data
// (score thresholds, formula keys, reading-time math) and the analyzer's own
// output templates in lib/readability.ts.
// ---------------------------------------------------------------------------

export interface FleschGenre {
  id: string;
  label: string;
  targetMin: number;
  targetMax: number;
  note: string;
}

export interface FleschCopyFormulaDef {
  key: string; // matches ReadabilityResult key
  label: string; // display name
  description: string;
}

export interface FleschCopyFaq {
  question: string;
  answer: string;
}

/** Every remaining UI label/string on the calculator page. */
export interface FleschUiLabels {
  // Controls
  analyzeLabel: string;
  exampleLabel: string;
  clearLabel: string;
  textareaPlaceholder: string;
  pasteHint: string;

  // URL fetch mode
  pasteModeLabel: string;
  urlModeLabel: string;
  urlInputPlaceholder: string;
  fetchButtonLabel: string;
  fetchingLabel: string;
  fetchedWordsLabel: string;

  // Score header
  citationScoreTitle: string;
  readingEaseTitle: string;
  scoreSuffix: string;
  citationScoreDesc: string;
  inTargetLabel: string;
  offTargetLabel: string;
  forGenreSuffix: string;
  gradeLevelPrefix: string;

  // Formula grid
  formulaTargetPrefix: string;

  // Engine verdicts
  tipPrefix: string;
  verdictFootnote: string;

  // Metric grid
  metricWords: string;
  metricSentences: string;
  metricSyllables: string;
  metricCharacters: string;
  metricComplexWords: string;
  metricAvgSentence: string;
  metricAvgSyllables: string;
  metricReadingTime: string;

  // Breakdown panels
  complexWordsTitle: string;
  longestSentencesTitle: string;
  noComplexWords: string;
  noSentences: string;

  // Web3 terms panel
  web3TermsTitlePrefix: string;
  web3TermsFootnote: string;

  // Inline highlight legend
  legendComplexWord: string;
  legendLongSentence: string;
  legendWeb3Term: string;

  // Genre auto-detection
  autoDetectedLabel: string;
}

export interface FleschCopy {
  heroTitle: string;
  heroSubtitle: string;

  privacyBadge: string;
  privacyTitle: string;
  privacyBody: string;

  contentTypeLabel: string;

  emptyTextError: string;
  tooShortError: string;
  linkError: string;
  invalidContentError: string;
  fetchError: string;

  methodologyTitle: string;
  methodologyBody: string;
  contactEmailLabel: string;
  contactEmail: string;

  faqSectionTitle: string;

  sampleText: string;

  introSectionTitle: string;
  introBody1: string;
  introBody2: string;

  formulasTitle: string;
  formulasSubtext: string;
  glossaryLinkLabel: string;
  formulaDefinitions: FleschCopyFormulaDef[];

  engineVerdictTitle: string;
  engineVerdictIntro: string;

  citationSectionTitle: string;
  citationSectionIntro: string;

  faq: FleschCopyFaq[];

  genres: FleschGenre[];
  ui: FleschUiLabels;

  ctaHeading: string;
  ctaBody: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Minimum text the analyzer will accept for a meaningful readability score.
 * Fewer than this many words and the formulas produce nonsense (negative grade
 * levels etc.), so the tool asks for more input instead of analyzing.
 */
export const MIN_ANALYZE_WORDS = 8;

export const DEFAULT_GENRES: FleschGenre[] = [
  {
    id: "general",
    label: "General audience",
    targetMin: 60,
    targetMax: 70,
    note: "Flesch 60-70 (plain English).",
  },
  {
    id: "explainer",
    label: "Web3 explainer",
    targetMin: 45,
    targetMax: 60,
    note: "Flesch 45-60 (a bit denser, still readable).",
  },
  {
    id: "whitepaper",
    label: "Whitepaper",
    targetMin: 30,
    targetMax: 50,
    note: "Flesch 30-50 (technical is OK).",
  },
  {
    id: "tutorial",
    label: "Tutorial / docs",
    targetMin: 55,
    targetMax: 70,
    note: "Flesch 55-70 (step-following friendly).",
  },
  {
    id: "social",
    label: "Social media",
    targetMin: 60,
    targetMax: 75,
    note: "Flesch 60-75 (short, scannable posts).",
  },
];

export const DEFAULT_FORMULA_DEFINITIONS: FleschCopyFormulaDef[] = [
  {
    key: "readingEase",
    label: "Flesch Reading Ease",
    description:
      "Score 0-100 from sentence length and syllables. Higher = easier. 60-70 is plain English most adults read easily.",
  },
  {
    key: "gradeLevel",
    label: "Flesch-Kincaid Grade",
    description:
      "U.S. school grade a reader needs. Uses the same inputs as Reading Ease, converted to a grade level.",
  },
  {
    key: "gunningFog",
    label: "Gunning Fog",
    description:
      "Grade level weighted toward long words (3+ syllables), which tend to slow readers down the most.",
  },
  {
    key: "smog",
    label: "SMOG",
    description:
      "Grades text by counting polysyllable words near sentence ends. Strictest of the common formulas.",
  },
  {
    key: "colemanLiau",
    label: "Coleman-Liau",
    description:
      "Grade level based on characters per word and sentences - no syllable counting needed.",
  },
  {
    key: "ari",
    label: "ARI",
    description:
      "Uses characters per word and words per sentence to estimate a grade level. Good for technical text.",
  },
];

export const DEFAULT_UI: FleschUiLabels = {
  analyzeLabel: "Analyze text",
  exampleLabel: "Try Web3 example",
  clearLabel: "Clear",
  textareaPlaceholder:
    "Paste your Web3 copy, whitepaper excerpt, or landing page text here...",
  pasteHint:
    "Paste text above and hit Analyze - or use the Web3 example to see how it works.",

  pasteModeLabel: "Paste text",
  urlModeLabel: "Fetch a URL",
  urlInputPlaceholder: "https://your.protocol.xyz",
  fetchButtonLabel: "Fetch",
  fetchingLabel: "Fetching...",
  fetchedWordsLabel: "Fetched {words} words from {url}",

  citationScoreTitle: "Citation Readiness",
  readingEaseTitle: "Flesch Reading Ease",
  scoreSuffix: "/100",
  citationScoreDesc:
    "How likely answer engines are to pull a clean, grounded, citable sentence from your text (PromptRaise proprietary GEO signal).",
  inTargetLabel: "In target",
  offTargetLabel: "Off target",
  forGenreSuffix: " for ",
  gradeLevelPrefix: "Grade level",

  formulaTargetPrefix: "target",

  tipPrefix: "Tip:",
  verdictFootnote:
    "Heuristic estimate from PromptRaise's citation signals - not a live API check.",

  metricWords: "Words",
  metricSentences: "Sentences",
  metricSyllables: "Syllables",
  metricCharacters: "Characters",
  metricComplexWords: "Complex words",
  metricAvgSentence: "Avg sentence",
  metricAvgSyllables: "Avg syllables/word",
  metricReadingTime: "Reading time",

  complexWordsTitle: "Complex words",
  longestSentencesTitle: "Longest sentences",
  noComplexWords: "No complex words. Nice.",
  noSentences: "No sentences to review.",

  web3TermsTitlePrefix: "Web3 terms detected",
  web3TermsFootnote:
    "These are scored with Web3-aware rules, so industry terms are not falsely punished as \u201ccomplex.\u201d",

  legendComplexWord: "complex word",
  legendLongSentence: "long sentence (20+ words)",
  legendWeb3Term: "Web3 term",

  autoDetectedLabel: "auto-detected",
};

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

  emptyTextError: "Please paste or type some text to analyze.",
  tooShortError: `Not enough text to analyze. Paste at least a couple of full sentences (min ${MIN_ANALYZE_WORDS} words) for a meaningful readability score.`,
  linkError:
    "It looks like you pasted a link or URL. This tool analyzes text, not links - paste the actual article, post or docs copy instead.",
  invalidContentError:
    "That doesn't look like readable text. Paste plain sentences (words and punctuation) to get a readability score.",
  fetchError:
    "Couldn't fetch that page. It may block automatic requests - try pasting the text directly instead.",
  methodologyTitle: "Methodology & how it works",
  methodologyBody:
    "This calculator runs entirely in your browser - pasted text never leaves your device. The six formulas (Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau and ARI) are computed client-side from their original published equations. The Citation Readiness score and per-engine verdicts are PromptRaise heuristics built from four citation signals: entity clarity, defined terms, groundable statements and sentence structure. Web3 vocabulary (DeFi, TVL, AMM, protocol names) is scored with a Web3-aware dictionary so legitimate industry terms are not falsely penalized as complex.",
  contactEmailLabel: "Questions or feedback?",
  contactEmail: "readability@promptraise.com",

  faqSectionTitle: "Flesch & AI citation, explained",

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
  glossaryLinkLabel:
    "New to these formulas? Every one is explained in the Web3 AI Visibility glossary.",
  formulaDefinitions: DEFAULT_FORMULA_DEFINITIONS,

  engineVerdictTitle: "Answer engine verdict",
  engineVerdictIntro:
    "How each major answer engine is likely to treat your text, estimated from the same citation signals above. It is a heuristic - not a live retrieval check - but it shows where each engine is easiest to satisfy.",

  citationSectionTitle: "How to make this more citable",
  citationSectionIntro:
    "These are the concrete, ordered actions that will move your Citation Readiness score the most. Do them, re-run, and watch the verdicts climb.",

  faq: DEFAULT_FAQ,

  genres: DEFAULT_GENRES,
  ui: DEFAULT_UI,

  ctaHeading: "Want AI to actually cite your protocol?",
  ctaBody:
    "Get a free AI-viability audit and see how ChatGPT, Perplexity and Claude currently talk about your project - and how to become the answer instead of the rumor.",
  ctaLabel: "Get free audit",
  ctaHref: "https://audit.promptraise.com",
};
