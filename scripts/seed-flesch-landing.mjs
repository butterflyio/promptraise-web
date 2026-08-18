// Seed / update the fleschKincaidLanding singleton in Sanity.
//
// Usage: node scripts/seed-flesch-landing.mjs
// Reads tokens from .env.local (never prints them). Creates or replaces the
// document `fleschKincaidLanding` in the configured dataset so the CMS-driven
// Flesch-Kincaid calculator page has editable copy from day one.
//
// Values mirror the in-code defaults in lib/flesch-copy.ts; the CMS becomes
// the source of truth once this doc exists.

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createClient } from "@sanity/client";

// --- minimal .env.local loader (KEY=VALUE lines, # comments) ---------------
const envPath = resolve(process.cwd(), ".env.local");
if (!existsSync(envPath)) {
  console.error("Missing .env.local - run from the repo root.");
  process.exit(1);
}
const env = {};
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) continue;
  const eq = trimmed.indexOf("=");
  if (eq === -1) continue;
  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  env[key] = value;
}

const projectId =
  env.SANITY_PROJECT_ID ?? env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
// THE production dataset key is SANITY_API_DATASET=production. NEXT_PUBLIC_
// SANITY_DATASET=staging locally is dev-only - never seed there for live CMS.
const dataset =
  env.SANITY_API_DATASET ??
  env.SANITY_DATASET ??
  env.NEXT_PUBLIC_SANITY_DATASET ??
  "";
const token = env.SANITY_API_WRITE_TOKEN ?? "";
if (!projectId || !dataset || !token) {
  console.error("Missing SANITY project/dataset/write-token in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const doc = {
  _id: "fleschKincaidLanding",
  _type: "fleschKincaidLanding",
  heroTitle: "Flesch-Kincaid Calculator for Web3",
  heroSubtitle:
    "Paste your copy and see two things: how hard it is to read (Flesch + 5 more formulas), and how likely answer engines are to actually cite your protocol. Built for Web3 writing - no false \u201ccomplex word\u201d penalties on industry terms.",
  privacyBadge: "Runs 100% in your browser - fully offline",
  privacyTitle: "Runs 100% in your browser - fully offline",
  privacyBody:
    "Your text is analyzed on this device only. Nothing is uploaded, stored, or sent to a server - the calculator works even if you lose your connection after the page loads.",
  trustLine:
    "Forever Free \u00b7 No signup \u00b7 No word limit \u00b7 No data capture, ever \u00b7 100% offline in your browser",
  contentTypeLabel: "Content type:",
  emptyTextError: "Please paste or type some text to analyze.",
  tooShortError:
    "Not enough text to analyze. Paste at least a couple of full sentences (min 8 words) for a meaningful readability score.",
  linkError:
    "It looks like you pasted a link or URL. This tool analyzes text, not links - paste the actual article, post or docs copy instead.",
  invalidContentError:
    "That doesn't look like readable text. Paste plain sentences (words and punctuation) to get a readability score.",
  fetchError:
    "Couldn't fetch that page. It may block automatic requests - try pasting the text directly instead.",
  disclaimerText:
    "Use the Citation Readiness score to spot what to look at - but use your judgment to decide what to change.",
  truncationNote:
    "This page is large - analyzing the first 50,000 characters (the main content). Paste the full text for a complete analysis.",
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
  formulaDefinitions: [
    {
      _key: "f-readingEase",
      key: "readingEase",
      label: "Flesch Reading Ease",
      description:
        "Score 0-100 from sentence length and syllables. Higher = easier. 60-70 is plain English most adults read easily.",
    },
    {
      _key: "f-gradeLevel",
      key: "gradeLevel",
      label: "Flesch-Kincaid Grade",
      description:
        "U.S. school grade a reader needs. Uses the same inputs as Reading Ease, converted to a grade level.",
    },
    {
      _key: "f-gunningFog",
      key: "gunningFog",
      label: "Gunning Fog",
      description:
        "Grade level weighted toward long words (3+ syllables), which tend to slow readers down the most.",
    },
    {
      _key: "f-smog",
      key: "smog",
      label: "SMOG",
      description:
        "Grades text by counting polysyllable words near sentence ends. Strictest of the common formulas.",
    },
    {
      _key: "f-colemanLiau",
      key: "colemanLiau",
      label: "Coleman-Liau",
      description:
        "Grade level based on characters per word and sentences - no syllable counting needed.",
    },
    {
      _key: "f-ari",
      key: "ari",
      label: "ARI",
      description:
        "Uses characters per word and words per sentence to estimate a grade level. Good for technical text.",
    },
  ],
  engineVerdictTitle: "Answer engine verdict",
  engineVerdictIntro:
    "How each major answer engine is likely to treat your text, estimated from the same citation signals above. It is a heuristic - not a live retrieval check - but it shows where each engine is easiest to satisfy.",
  citationSectionTitle: "How to make this more citable",
  citationSectionIntro:
    "These are the concrete, ordered actions that will move your Citation Readiness score the most. Do them, re-run, and watch the verdicts climb.",
  faq: [
    {
      _key: "faq1",
      question: "What is a good Flesch Reading Ease score?",
      answer:
        "A score of 60-70 is generally regarded as plain English that most adults can read easily. Higher scores are easier to read; lower scores are harder. For Web3 content, a 45-60 range is often appropriate for technical explainers.",
    },
    {
      _key: "faq2",
      question: "Why does this tool differ from a normal Flesch calculator?",
      answer:
        "PromptRaise's checker is Web3-aware: protocol and chain names (DeFi, ethereum, tokenomics, TVL) are scored with a custom dictionary so legitimate industry terms are not falsely flagged as complex. It also adds a Citation Readiness score for AI visibility.",
    },
    {
      _key: "faq3",
      question: "What is the Citation Readiness score?",
      answer:
        "It is a 0-100 PromptRaise signal estimating how likely answer engines are to pull a clean, grounded, citable sentence from your text, based on entity clarity, defined terms, groundable statements and sentence structure.",
    },
    {
      _key: "faq4",
      question: "Which readability formulas are included?",
      answer:
        "The calculator runs six formulas at once: Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau and the Automated Readability Index (ARI). Seeing them together shows where they disagree, which is usually more informative than any single figure.",
    },
    {
      _key: "faq5",
      question: "What does each formula actually measure?",
      answer:
        "Flesch Reading Ease scores readability out of 100 using sentence length and syllable count. Flesch-Kincaid Grade Level converts that into a U.S. school grade. Gunning Fog focuses on long words and sentence length. SMOG counts hard words to estimate an education level. Coleman-Liau uses characters instead of syllables. ARI counts characters per word and words per sentence to give a grade.",
    },
    {
      _key: "faq6",
      question: "Is my text sent to a server?",
      answer:
        "No. The calculator runs 100% in your browser. Your text is analyzed on your device, never uploaded or stored - it works even offline after the page loads.",
    },
  ],
  genres: [
    {
      _key: "g-general",
      id: "general",
      label: "General audience",
      targetMin: 60,
      targetMax: 70,
      note: "Flesch 60-70 (plain English).",
    },
    {
      _key: "g-explainer",
      id: "explainer",
      label: "Web3 explainer",
      targetMin: 45,
      targetMax: 60,
      note: "Flesch 45-60 (a bit denser, still readable).",
    },
    {
      _key: "g-whitepaper",
      id: "whitepaper",
      label: "Whitepaper",
      targetMin: 30,
      targetMax: 50,
      note: "Flesch 30-50 (technical is OK).",
    },
    {
      _key: "g-tutorial",
      id: "tutorial",
      label: "Tutorial / docs",
      targetMin: 55,
      targetMax: 70,
      note: "Flesch 55-70 (step-following friendly).",
    },
    {
      _key: "g-social",
      id: "social",
      label: "Social media",
      targetMin: 60,
      targetMax: 75,
      note: "Flesch 60-75 (short, scannable posts).",
    },
  ],
  ui: {
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
    shareButtonLabel: "Copy report link",
    copiedLabel: "Copied!",
    sharedStripLabel: "Report shared from promptraise.com",
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
  },
  ctaHeading: "Want AI to actually cite your protocol?",
  ctaBody:
    "Get a free AI-viability audit and see how ChatGPT, Perplexity and Claude currently talk about your project - and how to become the answer instead of the rumor.",
  ctaLabel: "Get free audit",
  ctaHref: "https://audit.promptraise.com",
};

try {
  const result = await client.createOrReplace(doc);
  console.log("Upserted fleschKincaidLanding:", result._id, "rev", result._rev);
  const back = await client.fetch(
    '*[_type == "fleschKincaidLanding"][0]{heroTitle, sampleText, formulaDefinitions[]{key}, faq[]{question}}',
  );
  console.log("Verify:", JSON.stringify(back, null, 2));
} catch (err) {
  console.error("Seed failed:", err.message ?? err);
  process.exit(1);
}
