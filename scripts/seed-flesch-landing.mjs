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
const dataset = env.SANITY_DATASET ?? env.NEXT_PUBLIC_SANITY_DATASET ?? "";
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
  contentTypeLabel: "Content type:",
  emptyTextError: "Please paste or type some text to analyze.",
  tooShortError:
    "Not enough text to analyze. Paste at least a couple of full sentences (min 8 words) for a meaningful readability score.",
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
  formulaDefinitions: [
    {
      _key: "f-readingEase",
      key: "readingEase",
      description:
        "Score 0-100 from sentence length and syllables. Higher = easier. 60-70 is plain English most adults read easily.",
    },
    {
      _key: "f-gradeLevel",
      key: "gradeLevel",
      description:
        "U.S. school grade a reader needs. Uses the same inputs as Reading Ease, converted to a grade level.",
    },
    {
      _key: "f-gunningFog",
      key: "gunningFog",
      description:
        "Grade level weighted toward long words (3+ syllables), which tend to slow readers down the most.",
    },
    {
      _key: "f-smog",
      key: "smog",
      description:
        "Grades text by counting polysyllable words near sentence ends. Strictest of the common formulas.",
    },
    {
      _key: "f-colemanLiau",
      key: "colemanLiau",
      description:
        "Grade level based on characters per word and sentences - no syllable counting needed.",
    },
    {
      _key: "f-ari",
      key: "ari",
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
