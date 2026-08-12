// ---------------------------------------------------------------------------
// PromptRaise Web3 Readability & Citation-Readiness engine.
//
// Two-layer analyzer:
//   1) Classic readability (Flesch Reading Ease + Flesch-Kincaid Grade Level),
//      syllable-counting that is Web3-aware so protocol/chain/jargon names are
//      not falsely scored as "complex".
//   2) A PromptRaise "Citation Readiness" score (0-100): how likely an answer
//      engine is to be able to pull a clean, grounded, citable sentence from
//      the text. This is the differentiator.
//
// All functions are pure and unit-testable - no DOM, no server, no side effects.
// ---------------------------------------------------------------------------

export interface TokenizedText {
  words: string[];
  sentences: string[];
}

export interface WordAnalysis {
  word: string;
  syllables: number;
  complex: boolean; // 3+ syllables (after Web3-aware adjustment)
  isWeb3Term: boolean;
}

export interface SentenceBreakdown {
  text: string;
  wordCount: number;
  hard: boolean; // long (>= 20 words) - flagged for review
}

export interface EngineVerdict {
  engine: string;
  emoji: string;
  score: number; // 0-100 probability-ish of being cited well
  label: string; // High / Medium / Low
  reasoning: string; // why
  tip: string; // specific improvement
}

export interface ReadabilityResult {
  charCount: number;
  charCountNoSpaces: number;
  wordCount: number;
  sentenceCount: number;
  syllableCount: number;
  complexWordCount: number;
  complexWordPct: number; // 0-100
  avgSentenceLength: number; // words per sentence (ASL)
  avgSyllablesPerWord: number; // ASW
  readingEase: number | null; // Flesch Reading Ease 0-100
  gradeLevel: number | null; // Flesch-Kincaid Grade Level
  gunningFog: number | null; // grade level
  smog: number | null; // grade level
  colemanLiau: number | null; // grade level
  ari: number | null; // grade level
  readingTimeMinutes: number;
  uniqueWeb3Terms: string[];
  wordAnalyses: WordAnalysis[]; // for inline highlighting
  complexWordList: string[]; // distinct complex words found
  longestSentences: SentenceBreakdown[]; // longest, for review
}

export interface CitationReadinessResult {
  score: number; // 0-100
  entityClarity: number; // 0-100
  definedTerms: number; // 0-100
  groundability: number; // 0-100
  structure: number; // 0-100
  signals: string[]; // human tips
}

export interface AnalysisResult {
  readability: ReadabilityResult;
  citation: CitationReadinessResult;
  engineVerdicts: EngineVerdict[];
  preview: string;
}

// --- Web3 vocabulary --------------------------------------------------------
// Terms that standard readability heuristics get wrong. They are legitimate
// industry vocabulary, not "complex words", so we (a) keep their syllable
// count reasonable and (b) never flag them as complex solely for being long.
const WEB3_TERMS = new Set<string>([
  // chains / networks
  "ethereum",
  "bitcoin",
  "solana",
  "polygon",
  "avalanche",
  "arbitrum",
  "optimism",
  "base",
  "binance",
  "cosmos",
  "polkadot",
  "cardano",
  "tezos",
  "near",
  "sui",
  "aptos",
  "ton",
  "tron",
  "celo",
  "harmony",
  "fantom",
  "zksync",
  "starknet",
  "scroll",
  "linea",
  "hyperliquid",
  "renzo",
  "blast",
  "mantle",
  "sei",
  "injective",
  "thorchain",
  "jupiter",
  "wormhole",
  // tokens / protocols
  "uniswap",
  "aave",
  "compound",
  "curve",
  "balancer",
  "sushiswap",
  "makerdao",
  "lido",
  "pendle",
  "eigenlayer",
  "kelp",
  "metis",
  "gmx",
  "perp",
  "defi",
  "dao",
  "nft",
  "nfts",
  "cryptocurrency",
  "crypto",
  "tokenomics",
  "altcoin",
  "stablecoin",
  "pepecoin",
  "meme",
  "remittance",
  // infra / primitives
  "blockchain",
  "ledger",
  "oracle",
  "validators",
  "validator",
  "rollup",
  "rollups",
  "sharding",
  "bridge",
  "bridges",
  "liquidity",
  "collateral",
  "staking",
  "yield",
  "impermanent",
  "slippage",
  "gassless",
  "gasless",
  "mev",
  "merkle",
  "zkevm",
  "evm",
  "solana-ecosystem",
  // layer-2s / rollups / infra
  "validium",
  "sequencer",
  "proposer",
  "blobs",
  "restaking",
  "liquid-staking",
  "depeg",
  "pegged",
  "peg",
  "dlt",
  "multisig",
  "zksnark",
  "monero",
  "wallet",
  "wallets",
  "airdrop",
  "tokens",
  "liquidation",
  "borrowers",
  "lenders",
  "oracles",
  // ask engines / visibility (PromptRaise core)
  "chatgpt",
  "perplexity",
  "claude",
  "gemini",
  "copilot",
  "grounding",
  "grounded",
  "citation",
  "citations",
  "definedterm",
  "answered",
  "web3",
  "geography",
  "geometric",
  "llm",
  "llms",
  // compliance / finance
  "custody",
  "audited",
  "kyt",
  "amm",
  "dapp",
  "dapps",
  "pow",
  "pos",
  "bft",
  "asn",
  "rwa",
  "tvl",
  "yield",
  "apr",
  "apy",
  "fdv",
  "mc",
]);

// Web3 terms that should NOT count as "complex" purely for being long or
// multi-syllable, even though the raw heuristic might otherwise flag them.
const WEB3_COMPLEX_WHITELIST = new Set<string>([
  "blockchain",
  "tokenomics",
  "cryptocurrency",
  "cryptocurrencies",
  "ethereum",
  "avalanche",
  "arbitrum",
  "optimism",
  "polkadot",
  "cardano",
  "solana",
  "hyperliquid",
  "uniswap",
  "eigenlayer",
  "makerdao",
  "stablecoin",
  "impermanent",
  "liquidation",
  "validators",
  "perplexity",
  "chatgpt",
  "restaking",
]);

// Terms the Web3 dictionary should NOT inflate. Lowercase keys -> syllable count.
const WEB3_TERM_SYLLABLES: Record<string, number> = {
  ethereum: 3,
  defi: 2,
  crypto: 2,
  tvl: 3,
  apy: 3,
  apr: 3,
  web3: 2,
  uniswap: 3,
  blockchain: 2,
  tokenomics: 4,
  solana: 3,
  bitcoin: 2,
  stablecoin: 3,
  liquidity: 4,
  collateral: 4,
  valudator: 4,
  perplexity: 4,
  chatgpt: 2,
};

// Patterns that indicate a term is being explicitly defined (great for LLM
// citation / DefinedTermSEO). Regex applied to definition sentences.
const DEFINITION_PATTERNS: RegExp[] = [
  /\b(is|are|refers? to|means?|describes?|represents?|denotes?)\b/i,
  /\b(also called|also known as|aka|i\.e\.|in other words|that is)\b/i,
  /\b(defined as|stands for|short for)\b/i,
];

// --- Tokenization -----------------------------------------------------------

/** Split text into sentences on common English terminators, keeping decimals safe. */
export function tokenize(text: string): TokenizedText {
  const cleaned = String(text ?? "")
    .replace(/\s+/g, " ")
    .trim();

  const sentences = cleaned
    .split(/(?<=[.!?])\s+(?=[A-Z0-9"\u201c])/)
    .map((s) => s.trim())
    .filter(Boolean);

  // Words = alphabetic tokens including apostrophes and internal periods only
  // when part of crypto/finance abbreviations (e.g. "e.g." is not a word).
  const words =
    cleaned
      .toLowerCase()
      .match(/[a-z0-9]+(?:'[a-z]+)?/g)
      ?.filter(
        (w) =>
          ![
            "a",
            "an",
            "the",
            "and",
            "or",
            "but",
            "of",
            "to",
            "in",
            "on",
            "for",
            "with",
            "at",
            "by",
            "from",
            "as",
            "is",
            "are",
            "was",
            "were",
            "be",
            "been",
            "it",
            "its",
            "this",
            "that",
          ].includes(w),
      ) ?? [];

  return { words, sentences };
}

// --- Syllable counting ------------------------------------------------------

/** Heuristic syllable counter (approximate). Handles silent-e and -ed rules. */
function countSyllables(word: string): number {
  const w = word
    .toLowerCase()
    .trim()
    .replace(/[^a-z]/g, "");
  if (!w) return 0;
  if (w.length <= 3) return 1;

  const lowered = w
    .replace(/(?:[^laeiouy]|ed|[^laeiouy]e)$/, "") // silent e / ed endings
    .replace(/^y/, ""); // leading y is a consonant

  const matches = lowered.match(/[aeiouy]{1,2}/g);
  return Math.max(1, matches ? matches.length : 1);
}

/** Web3-aware syllable count: dictionary overrides + known names kept short. */
function syllablesForWord(rawWord: string): number {
  const key = rawWord.toLowerCase();
  if (WEB3_TERM_SYLLABLES[key] != null) return WEB3_TERM_SYLLABLES[key];
  return countSyllables(rawWord);
}

// --- Complexity -------------------------------------------------------------

/** Complex = 3+ syllables, unless the word is Web3 (whitelisted, never complex on its own). */
function isComplexWord(rawWord: string, syllables: number): boolean {
  const key = rawWord.toLowerCase();
  if (WEB3_TERMS.has(key) || WEB3_COMPLEX_WHITELIST.has(key)) return false;
  return syllables >= 3;
}

/** Return the set of distinct Web3 terms found (for display). */
function findWeb3Terms(words: string[]): Set<string> {
  const found = new Set<string>();
  for (const raw of words) {
    if (WEB3_TERMS.has(raw.toLowerCase())) found.add(raw.toLowerCase());
  }
  return found;
}

// --- Reading metrics --------------------------------------------------------

const TERMINATORS = /[.!?]/g;

export function analyzeReadability(text: string): ReadabilityResult {
  const { words, sentences } = tokenize(text);
  const raw = String(text ?? "");
  const charCount = raw.length;
  const charCountNoSpaces = raw.replace(/\s/g, "").length;
  const wordCount = words.length;
  const sentenceCount = Math.max(1, sentences.length);
  const terminatorCount = (raw.match(TERMINATORS) ?? []).length;

  // Actually count sentence terminators so sentenceCount isn't overflowed.
  const realSentences = Math.max(1, terminatorCount || sentences.length);

  const wordAnalyses: WordAnalysis[] = words.map((w) => {
    const isWeb3 = WEB3_TERMS.has(w);
    const syllables = syllablesForWord(w);
    return {
      word: w,
      syllables,
      complex: isComplexWord(w, syllables),
      isWeb3Term: isWeb3,
    };
  });

  const syllableCount = wordAnalyses.reduce((s, wa) => s + wa.syllables, 0);
  const complexWordCount = wordAnalyses.filter((wa) => wa.complex).length;
  const complexWordPct = wordCount ? (complexWordCount / wordCount) * 100 : 0;

  const avgSentenceLength = wordCount / realSentences; // ASL
  const avgSyllablesPerWord = wordCount ? syllableCount / wordCount : 0; // ASW

  // Flesch Reading Ease = 206.835 - 1.015 * ASL - 84.6 * ASW
  let readingEase: number | null = null;
  if (wordCount > 0) {
    readingEase =
      206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
    readingEase = clamp(Math.round(readingEase * 10) / 10, 0, 100);
  }

  // Flesch-Kincaid Grade Level = 0.39 * ASL + 11.8 * ASW - 15.59
  let gradeLevel: number | null = null;
  if (wordCount > 0) {
    gradeLevel = 0.39 * avgSentenceLength + 11.8 * avgSyllablesPerWord - 15.59;
    gradeLevel = Math.round(gradeLevel * 10) / 10;
  }

  const readingTimeMinutes = wordCount / 230; // ~230 wpm

  // Letters across words - needed for Coleman-Liau + ARI.
  const letters = wordAnalyses.reduce(
    (n, wa) => n + wa.word.replace(/[^a-z]/g, "").length,
    0,
  );

  // --- Additional readability formulas ------------------------------------
  // Gunning Fog = 0.4 * (ASL + 100 * (complex / total words))
  let gunningFog: number | null = null;
  if (wordCount > 0 && realSentences > 0) {
    const fog =
      0.4 * (avgSentenceLength + 100 * (complexWordCount / wordCount));
    gunningFog = Math.round(fog * 10) / 10;
  }

  // SMOG = 1.043 * sqrt(30 * (polysyllable words / sentences)) + 3.1291
  let smog: number | null = null;
  if (wordCount > 0 && realSentences > 0) {
    const polysyllables = wordAnalyses.filter((wa) => wa.syllables >= 3).length;
    const rawSmog =
      1.043 * Math.sqrt(30 * (polysyllables / realSentences)) + 3.1291;
    smog = Math.round(rawSmog * 10) / 10;
  }

  // Coleman-Liau = 0.0588 * (letters/100w) - 0.296 * (sentences/100w) - 15.8
  let colemanLiau: number | null = null;
  if (wordCount > 0 && realSentences > 0) {
    const l = (letters / wordCount) * 100;
    const s = (realSentences / wordCount) * 100;
    const cl = 0.0588 * l - 0.296 * s - 15.8;
    colemanLiau = Math.round(cl * 10) / 10;
  }

  // ARI = 4.71 * (letters/words) + 0.5 * (words/sentences) - 21.43
  let ari: number | null = null;
  if (wordCount > 0 && realSentences > 0) {
    const rawAri =
      4.71 * (letters / wordCount) + 0.5 * avgSentenceLength - 21.43;
    ari = Math.round(rawAri * 10) / 10;
  }

  // Distinct complex words + longest-sentence breakdown (for review UI).
  const complexWordList: string[] = [];
  for (const wa of wordAnalyses) {
    if (wa.complex && !complexWordList.includes(wa.word))
      complexWordList.push(wa.word);
  }

  const longestSentences: SentenceBreakdown[] = sentences
    .map((s) => {
      const c = tokenize(s).words.length;
      return { text: s.trim(), wordCount: c, hard: c >= 20 };
    })
    .sort((a, b) => b.wordCount - a.wordCount)
    .slice(0, 5);

  return {
    charCount,
    charCountNoSpaces,
    wordCount,
    sentenceCount: realSentences,
    syllableCount,
    complexWordCount,
    complexWordPct,
    avgSentenceLength,
    avgSyllablesPerWord,
    readingEase,
    gradeLevel,
    gunningFog,
    smog,
    colemanLiau,
    ari,
    readingTimeMinutes,
    uniqueWeb3Terms: [...findWeb3Terms(words)],
    wordAnalyses,
    complexWordList,
    longestSentences,
  };
}

// --- Citation Readiness -----------------------------------------------------
// A PromptRaise-specific 0-100 score. Weighted four factors.

const WEIGHTS = {
  entityClarity: 0.35,
  definedTerms: 0.3,
  groundability: 0.25,
  structure: 0.1,
};

function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** Does the opener name an entity and state what it does? LLMs need this fast. */
function scoreEntityClarity(sentences: string[]): {
  score: number;
  signals: string[];
} {
  if (sentences.length === 0)
    return {
      score: 0,
      signals: [
        "Add an opening sentence that names your protocol and what it does.",
      ],
    };
  const opener = sentences[0] ?? "";
  const hasEntity =
    /[A-Z][a-z]{2,}/.test(opener) ||
    WEB3_TERMS.has(tokenize(opener).words[0] ?? "");
  const hasAction =
    /\b(provides?|is|lets|enables|allows|offers|helps|lets|builds?|connects?|powers?|turns?|makes?)\b/i.test(
      opener,
    );
  let score = 40;
  if (hasEntity) score += 30;
  if (hasAction) score += 30;
  score = clamp(score, 0, 100);
  const signals: string[] = [];
  if (!hasEntity)
    signals.push(
      "First sentence should name your protocol/project explicitly.",
    );
  if (!hasAction)
    signals.push(
      "First sentence should state what the protocol does (builds, enables, powers...).",
    );
  return { score, signals };
}

/** Do you define your jargon rather than assume knowledge? LLMs cite definitions. */
function scoreDefinedTerms(
  wordAnalyses: WordAnalysis[],
  sentences: string[],
): { score: number; signals: string[] } {
  const web3Set = findWeb3Terms(wordAnalyses.map((w) => w.word));
  if (web3Set.size === 0 || sentences.length === 0) {
    return { score: 70, signals: [] }; // no jargon to define - fine
  }
  let defined = 0;
  for (const term of [...web3Set]) {
    const matches = sentences.some((s) =>
      DEFINITION_PATTERNS.some(
        (re) => re.test(s) && s.toLowerCase().includes(term),
      ),
    );
    if (matches) defined++;
  }
  let ratio = defined / Math.min(web3Set.size, 6); // don't penalize huge glossaries
  ratio = clamp(ratio, 0, 1);
  const score = Math.round(50 + ratio * 50);
  const signals: string[] = [];
  if (ratio < 0.5) {
    signals.push(
      'Define key Web3 terms ("X is a...") so answer engines can quote a clean definition.',
    );
  }
  return { score, signals };
}

/** Does the text contain verifiable, groundable statements (numbers, TVL, facts)? */
function scoreGroundability(text: string): {
  score: number;
  signals: string[];
} {
  const numbers = (text.match(/\$?\d[\d,]*\.?\d*\s?%?/g) ?? []).length;
  const groundSignals = (
    text.match(
      /\b(TVL|audited|audit|revenue|users|tps|up-time|uptime|apy|apr|mc|fdv|v1|v2|v3)\b/gi,
    ) ?? []
  ).length;
  let score = 30;
  if (numbers >= 1) score += 25;
  if (numbers >= 3) score += 20;
  if (groundSignals >= 1) score += 15;
  if (groundSignals >= 2) score += 10;
  score = clamp(score, 0, 100);
  const signals: string[] = [];
  if (numbers < 2)
    signals.push(
      "Add concrete, verifiable numbers (TVL, users, APY) - answer engines love groundable statements.",
    );
  return { score, signals };
}

/** Sentence structure: concise, self-contained sentences are easy to cite. */
function scoreStructure(readability: ReadabilityResult): number {
  const senLen = readability.avgSentenceLength;
  const pct = readability.complexWordPct;
  let score = 50;
  if (senLen >= 8 && senLen <= 20) score += 30;
  else if (senLen > 20) score += 10;
  score += pct <= 15 ? 20 : pct <= 30 ? 10 : 0;
  return clamp(score, 0, 100);
}

export function analyzeCitationReadiness(
  text: string,
  readability: ReadabilityResult,
): CitationReadinessResult {
  const { sentences } = tokenize(text);
  if (!sentences.length) {
    return {
      score: 0,
      entityClarity: 0,
      definedTerms: 0,
      groundability: 0,
      structure: 0,
      signals: ["Enter some text to see your Citation Readiness score."],
    };
  }

  const entity = scoreEntityClarity(sentences);
  const defined = scoreDefinedTerms(readability.wordAnalyses, sentences);
  const ground = scoreGroundability(text);
  const structure = scoreStructure(readability);

  const score = Math.round(
    entity.score * WEIGHTS.entityClarity +
      defined.score * WEIGHTS.definedTerms +
      ground.score * WEIGHTS.groundability +
      structure * WEIGHTS.structure,
  );

  const signals = [
    ...entity.signals,
    ...defined.signals,
    ...ground.signals,
  ].slice(0, 4);

  return {
    score: clamp(score, 0, 100),
    entityClarity: entity.score,
    definedTerms: defined.score,
    groundability: ground.score,
    structure,
    signals,
  };
}

// --- Per-engine verdict -----------------------------------------------------
// A heuristic, fully client-side breakdown of how each answer engine is likely
// to treat the text. No APIs, no cost. Based on the same citation signals.
export function analyzeEngineVerdicts(
  c: CitationReadinessResult,
): EngineVerdict[] {
  const grade = (v: number) => (v >= 70 ? "High" : v >= 45 ? "Medium" : "Low");

  // ChatGPT - entity + grounding focused, loves quotable plain-English sentences.
  const chatgptScore = Math.round(
    c.entityClarity * 0.4 + c.groundability * 0.3 + c.structure * 0.3,
  );
  const chatgpt: EngineVerdict = {
    engine: "ChatGPT",
    emoji: "💬",
    score: chatgptScore,
    label: grade(chatgptScore),
    reasoning:
      chatgptScore >= 70
        ? "Balanced - it can pull a grounded, plain-English sentence."
        : "Needs more quotable entity facts or shorter sentences.",
    tip:
      chatgptScore < 70
        ? "Lead with the protocol name + a verifiable number in plain English."
        : "Keep the grounded facts and definition-style sentences.",
  };

  // Perplexity - citation/source driven, rewards explicit grounding and sources.
  const perpScore = Math.round(
    c.groundability * 0.45 +
      c.definedTerms * 0.25 +
      c.entityClarity * 0.2 +
      c.structure * 0.1,
  );
  const perp: EngineVerdict = {
    engine: "Perplexity",
    emoji: "🔍",
    score: perpScore,
    label: grade(perpScore),
    reasoning:
      perpScore >= 70
        ? "Strong - it can cite a verifiable, defined claim."
        : "Weakens without concrete numbers or named sources.",
    tip:
      perpScore < 70
        ? "Add specific, checkable figures (TVL, users, APY) - Perplexity cites verifiable claims."
        : "Keep citing the audited numbers and definitions.",
  };

  // Claude - definition + clarity focused, values self-contained reasoning.
  const claudeScore = Math.round(
    c.definedTerms * 0.4 +
      c.structure * 0.3 +
      c.entityClarity * 0.2 +
      c.groundability * 0.1,
  );
  const claude: EngineVerdict = {
    engine: "Claude",
    emoji: "🟠",
    score: claudeScore,
    label: grade(claudeScore),
    reasoning:
      claudeScore >= 70
        ? "Good - it can reason from your defined terms."
        : "Undefined jargon or long sentences hurt its confidence.",
    tip:
      claudeScore < 70
        ? 'Define each Web3 term on first use ("X is a...") and keep sentences under 20 words.'
        : "Keep terms defined and sentences self-contained.",
  };

  // Gemini - headline + grounding focused, favors scannable key facts.
  const geminiScore = Math.round(
    c.entityClarity * 0.35 + c.structure * 0.35 + c.groundability * 0.3,
  );
  const gemini: EngineVerdict = {
    engine: "Gemini",
    emoji: "✨",
    score: geminiScore,
    label: grade(geminiScore),
    reasoning:
      geminiScore >= 70
        ? "Scannable - it can surface your key facts quickly."
        : "Long sentences or weak opener bury the key facts.",
    tip:
      geminiScore < 70
        ? "Front-load the who + what, then a number. Keep sentences tight and scannable."
        : "Keep the tight opener and bold facts.",
  };

  return [chatgpt, perp, claude, gemini];
}

// --- Convenience wrapper ----------------------------------------------------

export function analyzeText(text: string): AnalysisResult {
  const readability = analyzeReadability(text);
  const citation = analyzeCitationReadiness(text, readability);
  const engineVerdicts = analyzeEngineVerdicts(citation);
  const preview = String(text ?? "")
    .trim()
    .slice(0, 160);
  return { readability, citation, engineVerdicts, preview };
}

// --- Grade-level label helpers ----------------------------------------------

export function readingEaseLabel(ease: number | null): string {
  if (ease == null) return "-";
  if (ease >= 90) return "Very easy";
  if (ease >= 80) return "Easy";
  if (ease >= 70) return "Fairly easy";
  if (ease >= 60) return "Standard / plain";
  if (ease >= 50) return "Fairly difficult";
  if (ease >= 30) return "Difficult";
  return "Very difficult";
}

export function gradeLevelLabel(grade: number | null): string {
  if (grade == null) return "-";
  const g = Math.round(grade);
  if (g <= 5) return `${g}th grade`;
  if (g <= 8) return `${g}th grade`;
  if (g <= 12) return `${g}th grade`;
  return g >= 16 ? "College / Graduate" : `Grade ${g}`;
}
