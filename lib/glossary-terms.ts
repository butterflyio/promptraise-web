// PromptRaise Glossary - Web3 AI Visibility
// Core set (~28 terms). Extend by appending to this array - the page, sitemap
// and DefinedTerm JSON-LD render everything automatically. Keep each entry to
// one crisp sentence or two: short, quotable, and exact.
//
// `category` drives the section grouping on the page.
// `aliases` feed the search-as-you-type filter (and become sameAs signals later).

export interface GlossaryTerm {
  term: string;
  aliases?: string[];
  category: string;
  definition: string;
  /** A one-line example showing the term in a Web3-AI-visibility context. */
  example?: string;
}

/**
 * Term-to-term cross links (Phase 0 of the topical-authority plan). Maps a
 * term name to the names of related terms. Each entry becomes a "See also"
 * chip linking to that term's `#term-<slug>` anchor, and a `mentions` entry
 * in the DefinedTerm JSON-LD. Kept in one map (not inline) so the graph is
 * easy to audit and every edge is bidirectional-by-definition.
 */
export const GLOSSARY_RELATED: Record<string, string[]> = {
  // ---- How AI discovers you ----
  "AI visibility": [
    "GEO (generative engine optimization)",
    "Answer engine",
    "Citation",
  ],
  "GEO (generative engine optimization)": [
    "AI visibility",
    "Answer capsule",
    "Structured data",
  ],
  "Answer engine": [
    "AI visibility",
    "Citation",
    "Retrieval-augmented generation (RAG)",
  ],
  Crawler: ["robots.txt", "Indexability", "sitemap.xml"],
  "robots.txt": ["Crawler", "Indexability", "sitemap.xml"],
  "sitemap.xml": ["Indexability", "Crawler", "Whitepaper indexability"],
  Indexability: ["Crawler", "robots.txt", "Whitepaper indexability"],
  // ---- How LLMs answer ----
  "Knowledge cutoff": [
    "Parametric knowledge",
    "Retrieval-augmented generation (RAG)",
  ],
  "Parametric knowledge": [
    "Knowledge cutoff",
    "Retrieval-augmented generation (RAG)",
    "Grounding",
  ],
  "Retrieval-augmented generation (RAG)": [
    "Grounding",
    "Citation",
    "Knowledge cutoff",
  ],
  Grounding: [
    "Retrieval-augmented generation (RAG)",
    "Citation",
    "On-chain grounding",
  ],
  Citation: ["Source graph", "Zero-click AI answer", "AI visibility"],
  "Source graph": [
    "Citation",
    "Entity authority",
    "Digital public relations (digital PR)",
  ],
  // ---- Becoming a citable source ----
  "First-party data": [
    "Canonical facts",
    "Onchain transparency",
    "TVL (total value locked)",
  ],
  "Answer capsule": [
    "GEO (generative engine optimization)",
    "Context window",
    "First-party data",
  ],
  "Canonical facts": [
    "First-party data",
    "Organization schema",
    "Entity resolution",
  ],
  "Onchain transparency": [
    "On-chain grounding",
    "TVL (total value locked)",
    "First-party data",
  ],
  "TVL (total value locked)": [
    "Onchain transparency",
    "On-chain grounding",
    "First-party data",
  ],
  "Audit as a trust signal": [
    "Onchain transparency",
    "Decentralized identity (DID) for AI",
    "First-party data",
  ],
  "Digital public relations (digital PR)": [
    "Source graph",
    "Entity authority",
    "Brand mention monitoring",
  ],
  // ---- Structured data ----
  "Structured data": ["JSON-LD", "DefinedTerm", "Rich results"],
  "JSON-LD": ["Structured data", "DefinedTerm", "Organization schema"],
  DefinedTerm: ["Structured data", "JSON-LD", "Rich results"],
  "FAQPage schema": ["Structured data", "Rich results", "Answer capsule"],
  "Rich results": ["Structured data", "FAQPage schema", "DefinedTerm"],
  "Organization schema": ["JSON-LD", "Entity resolution", "Canonical facts"],
  // ---- Measurement ----
  "Citation per query": [
    "Brand mention monitoring",
    "AI share of voice (AI SOV)",
    "Citation",
  ],
  "AI referral traffic": [
    "Zero-click AI answer",
    "Citation per query",
    "Brand mention monitoring",
  ],
  "Brand mention monitoring": [
    "Citation per query",
    "AI share of voice (AI SOV)",
    "Source graph",
  ],
  "AI share of voice (AI SOV)": [
    "Citation per query",
    "Brand mention monitoring",
    "Zero-click AI answer",
  ],
  "Zero-click AI answer": [
    "Citation",
    "AI referral traffic",
    "AI share of voice (AI SOV)",
  ],
  // ---- Web3 x AI specifics ----
  "Entity resolution": [
    "Organization schema",
    "Canonical facts",
    "Ticker hallucination",
  ],
  "On-chain grounding": [
    "Grounding",
    "Onchain transparency",
    "TVL (total value locked)",
  ],
  "Whitepaper indexability": ["Indexability", "Crawler", "Entity resolution"],
  "Ticker hallucination": [
    "Entity resolution",
    "Entity authority",
    "Canonical facts",
  ],
  "Decentralized identity (DID) for AI": [
    "Onchain transparency",
    "Audit as a trust signal",
    "Entity authority",
  ],
  // ---- Advanced GEO & AI mechanics ----
  "Semantic embeddings": [
    "Retrieval-augmented generation (RAG)",
    "Context window",
    "Answer capsule",
  ],
  "Context window": [
    "Semantic embeddings",
    "Answer capsule",
    "Whitepaper indexability",
  ],
  "Entity authority": [
    "Source graph",
    "Digital public relations (digital PR)",
    "Entity resolution",
  ],
  "Prompt injection": [
    "Entity authority",
    "Onchain transparency",
    "Decentralized identity (DID) for AI",
  ],
  // ---- Readability & content clarity ----
  Readability: [
    "Flesch Reading Ease",
    "Flesch-Kincaid Grade Level",
    "Gunning Fog Index",
    "SMOG Index",
  ],
  "Flesch Reading Ease": [
    "Readability",
    "Flesch-Kincaid Grade Level",
    "Polysyllabic word",
  ],
  "Flesch-Kincaid Grade Level": [
    "Flesch Reading Ease",
    "Gunning Fog Index",
    "Readability",
  ],
  "Gunning Fog Index": [
    "SMOG Index",
    "Flesch-Kincaid Grade Level",
    "Polysyllabic word",
  ],
  "SMOG Index": [
    "Gunning Fog Index",
    "Polysyllabic word",
    "Coleman-Liau Index",
  ],
  "Coleman-Liau Index": [
    "Automated Readability Index (ARI)",
    "Flesch Reading Ease",
    "Readability",
  ],
  "Automated Readability Index (ARI)": [
    "Coleman-Liau Index",
    "Flesch-Kincaid Grade Level",
    "Heuristic",
  ],
  "Dale-Chall Readability Formula": [
    "Linsear Write Readability Formula",
    "Flesch Reading Ease",
    "Polysyllabic word",
  ],
  "Linsear Write Readability Formula": [
    "Dale-Chall Readability Formula",
    "Flesch-Kincaid Grade Level",
    "Readability",
  ],
  "Polysyllabic word": ["Gunning Fog Index", "SMOG Index", "Heuristic"],
  Heuristic: [
    "Automated Readability Index (ARI)",
    "Flesch Reading Ease",
    "Readability",
  ],
};

export function relatedFor(term: string): string[] {
  return GLOSSARY_RELATED[term] ?? [];
}

/** #term-<slug> anchor for a term name (must match rendering on the pages). */
export function termAnchor(term: string): string {
  return (
    "term-" +
    term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

export const GLOSSARY_CATEGORIES = [
  "How AI discovers you",
  "How LLMs answer",
  "Becoming a citable source",
  "Structured data",
  "Measurement",
  "Web3 x AI specifics",
  "Advanced GEO & AI mechanics",
  "Readability & content clarity",
] as const;

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  // ---- How AI discovers you ----
  {
    term: "AI visibility",
    aliases: ["GEO", "generative engine optimization", "LLM visibility"],
    category: "How AI discovers you",
    definition:
      "How often and how accurately large language models (LLMs) like ChatGPT, Claude and Perplexity name, describe and link to your protocol in their answers. It is about being cited, not just ranked.",
    example:
      "A DeFi protocol that appears by name in ChatGPT's answer to 'best private lending protocols' has AI visibility; one that no LLM mentions does not, regardless of Google ranking.",
  },
  {
    term: "GEO (generative engine optimization)",
    aliases: ["generative engine optimization"],
    category: "How AI discovers you",
    definition:
      "The discipline of shaping your on-page content, structured data and public surfaces so AI answer engines select and cite you. GEO optimizes for the answer, not the blue link.",
  },
  {
    term: "Answer engine",
    aliases: ["AI search", "generative search"],
    category: "How AI discovers you",
    definition:
      "A service that responds to a query with a synthesized answer instead of a list of links - for example ChatGPT, Perplexity, Google AI Overviews, Claude and Gemini.",
  },
  {
    term: "Crawler",
    aliases: ["spider", "bot", "GPTBot", "PerplexityBot"],
    category: "How AI discovers you",
    definition:
      "An automated program that fetches and scans web pages to build an index or knowledge base. AI crawlers (GPTBot, PerplexityBot, ClaudeBot, CCBot) visit your site to read it; you control them via robots.txt.",
  },
  {
    term: "robots.txt",
    aliases: ["robots exclusion standard"],
    category: "How AI discovers you",
    definition:
      "A plain-text file at your site root that tells crawlers which paths they may or may not fetch. For AI visibility it must explicitly allow the AI crawlers - GPTBot, PerplexityBot, ClaudeBot, CCBot, Google-Extended.",
    example:
      "A protocol whose robots.txt blocks GPTBot and PerplexityBot is invisible to those answer engines no matter how good the content is.",
  },
  {
    term: "sitemap.xml",
    category: "How AI discovers you",
    definition:
      "An XML file listing the URLs a site wants crawlers to find, usually with last-modified dates. Submitting one to Google Search Console helps ensure every page - including each glossary entry's page - is discovered.",
  },
  {
    term: "Indexability",
    aliases: ["indexable", "noindex"],
    category: "How AI discovers you",
    definition:
      "Whether a page is allowed and able to be read and stored by crawlers. A page marked noindex, behind a login, or rendered only by JavaScript may be effectively invisible to AI engines.",
  },
  {
    term: "Knowledge cutoff",
    aliases: ["training data cutoff"],
    category: "How LLMs answer",
    definition:
      "The date up to which a model's static (parametric) knowledge was trained. Events after the cutoff are unknown to the model unless supplied by live retrieval - which is why fresh, current content you publish matters.",
  },
  {
    term: "Parametric knowledge",
    aliases: ["parametric memory", "training data"],
    category: "How LLMs answer",
    definition:
      "Facts a model holds from its training data, recalled without fetching anything live. It can be stale or wrong, and it is the default when no external source is provided.",
  },
  {
    term: "Retrieval-augmented generation (RAG)",
    aliases: ["live retrieval", "grounding"],
    category: "How LLMs answer",
    definition:
      "The pattern where a model answers by first searching external sources and then quoting them. About 40% of an answer may draw on live retrieval - the part you can influence with publicly available, verifiable content.",
  },
  {
    term: "Grounding",
    aliases: ["grounded answer"],
    category: "How LLMs answer",
    definition:
      "Tying an answer to verifiable sources rather than model memory. Grounded answers cite documents - so your onchain dashboards, audit reports and docs pages become the evidence the answer is built on.",
  },
  {
    term: "Citation",
    aliases: ["source link", "referenced"],
    category: "How LLMs answer",
    definition:
      "An answer engine naming and linking the source it drew from. Perplexity cites every source; ChatGPT and Google AI Overviews cite many but not all. Citations are the core KPI of AI visibility.",
  },
  {
    term: "Source graph",
    category: "How LLMs answer",
    definition:
      "The network of trusted domains and documents an answer engine prefers to draw from. Being inside it repeatedly across queries builds your authority with that engine.",
  },
  // ---- Becoming a citable source ----
  {
    term: "First-party data",
    aliases: ["first-party numbers", "canonical facts"],
    category: "Becoming a citable source",
    definition:
      "Data you own and publish about your own protocol: TVL, volumes, user counts, dates of audits and grants. LLMs trust it more than third-party claims, and it is what they quote when describing you.",
    example:
      "'$670M processed, 0.19% NPL rate' in a protocol's own docs gives an answer engine a concrete, quotable fact - far stronger than a vague 'industry-leading' claim.",
  },
  {
    term: "Answer capsule",
    category: "Becoming a citable source",
    definition:
      "A self-contained, quotable one or two sentence answer to a likely question, placed directly in your copy. It states one thing completely with one number, so an engine can lift it verbatim.",
  },
  {
    term: "Canonical facts",
    category: "Becoming a citable source",
    definition:
      "The stable, public truths about what your protocol is and does - category, mechanics, date founded, current status. Publish these consistently so every AI surface describes you the same way.",
  },
  {
    term: "Onchain transparency",
    aliases: ["onchain data", "verifiable data"],
    category: "Becoming a citable source",
    definition:
      "Publishing data verifiable on the blockchain - balances, transactions, contracts - that an engine can treat as provably true. It is some of the strongest trust material a Web3 project has.",
  },
  {
    term: "TVL (total value locked)",
    category: "Becoming a citable source",
    definition:
      "The total value of assets deposited in a protocol. A dated, sourced TVL figure listed on DefiLlama or your docs is a first-party number answer engines routinely cite when ranking a category.",
  },
  {
    term: "Audit as a trust signal",
    aliases: ["security audit", "audit report"],
    category: "Becoming a citable source",
    definition:
      "A published security audit with a date and report link. For Web3 auditors, LLMs and answer engines treat an independent audit as one of the strongest signals a project is legitimate and current.",
  },
  {
    term: "Digital public relations (digital PR)",
    aliases: ["link earning", "digital PR"],
    category: "Becoming a citable source",
    definition:
      "Getting listed, mentioned and referenced across third-party directories, marketplaces and media so multiple trustworthy surfaces describe you consistently - reinforcing what LLMs know about you.",
  },
  // ---- Structured data ----
  {
    term: "Structured data",
    aliases: ["schema markup"],
    category: "Structured data",
    definition:
      "Machine-readable annotations - usually JSON-LD - added to a page so engines understand its meaning precisely instead of guessing. It is the language AI visibility is written in.",
  },
  {
    term: "JSON-LD",
    aliases: ["JSON for Linking Data"],
    category: "Structured data",
    definition:
      "The most common format for embedding structured data in a page: a JSON block in the <head> describing the page to engines using schema.org vocabulary.",
  },
  {
    term: "DefinedTerm",
    category: "Structured data",
    definition:
      "A schema.org type for a glossary entry: the term plus its definition, marked so engines can read, quote and link it as a precise definition rather than loose text.",
    example:
      "Every entry on this page is emitted as a DefinedTerm, which is exactly the kind of machine-readable terminology answer engines can pull a definition from.",
  },
  {
    term: "FAQPage schema",
    aliases: ["FAQ schema"],
    category: "Structured data",
    definition:
      "Structured data marking a question-and-answer block so engines can surface the Q&A verbatim, often as a rich result. Useful for the top questions about your protocol.",
  },
  {
    term: "Rich results",
    aliases: ["rich snippets"],
    category: "Structured data",
    definition:
      "Enhanced search listings built from structured data - FAQ, glossary, product, review. They make your result stand out and confirm to an engine that the content is structured and trustworthy.",
  },
  {
    term: "Organization schema",
    category: "Structured data",
    definition:
      "Structured data describing your project as an organization - name, logo, links to socials - so engines know who you are and can associate all your surfaces with one entity.",
  },
  // ---- Measurement ----
  {
    term: "Citation per query",
    aliases: ["citation rate", "mention rate"],
    category: "Measurement",
    definition:
      "The KPI of AI visibility: across a fixed set of representative queries, how often an answer engine names and links your domain. Track it over time rather than chasing rankings.",
  },
  {
    term: "AI referral traffic",
    category: "Measurement",
    definition:
      "Visitors arriving from answer engines. Perplexity citations are clickable and appear in analytics; ChatGPT and others are mostly not, so referral traffic undercounts real citation influence.",
    example:
      "Filtering analytics by referral from perplexity.ai shows clean, attributable traffic - while a ChatGPT mention that isn't clickable stays invisible to analytics even though it shaped the answer.",
  },
  {
    term: "Brand mention monitoring",
    aliases: ["visibility monitoring", "AI mention tracking"],
    category: "Measurement",
    definition:
      "Systematically checking whether answer engines name you for relevant queries. Tools that ping ChatGPT, Perplexity, Claude and Gemini for your brand name automate this tracking over time.",
  },
  // ---- Web3 x AI specifics ----
  {
    term: "Entity resolution",
    aliases: ["entity disambiguation", "named entity resolution"],
    category: "Web3 x AI specifics",
    definition:
      "The process by which an LLM determines that two tokens, projects or people sharing the same name or ticker are distinct entities. For Web3 - where tickers are sparse and reused across chains - resolution is what stops one protocol being conflated with a namesake. Anchor your entity with Organization schema, a canonical URL and stable, repeated facts so the model resolves you to the right identity.",
    example:
      "Two protocols both using the ticker 'NOVA' on different chains: entity resolution is what lets an answer engine tell them apart instead of merging their TVL, tokenomics and history into one confused profile.",
  },
  {
    term: "On-chain grounding",
    aliases: ["onchain grounding", "verifiable grounding"],
    category: "Web3 x AI specifics",
    definition:
      "Anchoring an AI-generated claim to immutable blockchain data - wallets, TVL, transaction history, contract state - rather than to a mutable web page. On-chain facts are provable and time-stamped, so an engine can treat them as ground truth even when a blog or docs page could be edited or deleted. Link your claim to the exact on-chain data so a model can verify it.",
    example:
      "Instead of a docs page stating '$50M TVL', a protocol links the statement to its live on-chain treasury address - so an answer engine quoting the figure can verify it against the ledger.",
  },
  {
    term: "Whitepaper indexability",
    aliases: ["whitepaper parsing", "docs indexability"],
    category: "Web3 x AI specifics",
    definition:
      "Whether a protocol's whitepaper - typically a PDF or Gitbook - can actually be parsed, read and cited by an LLM. A PDF with no text layer, or a JS-only Gitbook, may be invisible to crawlers no matter how substantial the document is. Serve a crawlable, text-first version of the whitepaper alongside the PDF to make it indexable and citable.",
    example:
      "A whitepaper published only as a scanned-image PDF is unreadable to GPTBot; republishing the same content as a crawlable text page or a plain-text Gitbook lets an engine read and cite it.",
  },
  {
    term: "Ticker hallucination",
    aliases: ["ticker confusion", "token name collision"],
    category: "Web3 x AI specifics",
    definition:
      "When an LLM confuses one token with another that shares the same ticker symbol, mixing up price, utility, history or chain. It is commonplace in Web3 because tickers like 'BTC', 'USDC' and 'SOL' are reused across chains and bridges. Prevent it by stating your chain, contract address and distinct utility explicitly - on every surface - so the model has enough signal to keep you separate.",
    example:
      "An answer engine reporting the liquidation mechanics and treasury of one 'NOVA' token while quoting the price of a different 'NOVA' - ticker hallucination in action.",
  },
  {
    term: "Decentralized identity (DID) for AI",
    aliases: ["DID", "onchain identity", "verifiable credential"],
    category: "Web3 x AI specifics",
    definition:
      "Using on-chain credentials - wallet ownership, DAO membership, attestations, signed statements - to verify who authored or authorized Web3 content. DIDs give an LLM a machine-checkable chain of authorship and authority, so it can attribute a claim to a known, legitimate source rather than an anonymous account. Publish signed, identity-bound content to give engines a verifiable author.",
    example:
      "A protocol's documentation signed by its governance multisig, tied to an on-chain identity, lets an answer engine verify the content is the official project's statement - not an imposter's fork.",
  },
  // ---- Advanced GEO & AI mechanics ----
  {
    term: "Semantic embeddings",
    aliases: ["vector embeddings", "embedding vectors"],
    category: "Advanced GEO & AI mechanics",
    definition:
      "The mathematical vectors an LLM converts text into to represent meaning, so it can match and rank content by concept rather than keyword. Content that is contextually similar sits close together in vector space. Write prose that says what you mean plainly and completely - embeddings reward clear, dense, on-topic language over keyword stuffing.",
    example:
      "A page about 'speeding up settlement' can rank for a query about 'fast finality' because their embeddings are close in meaning, even when no exact keyword is shared.",
  },
  {
    term: "Context window",
    aliases: ["128k tokens", "token limit"],
    category: "Advanced GEO & AI mechanics",
    definition:
      "The bounded amount of text an LLM can hold in memory at once - a few thousand tokens on small models, up to 128k or more on large ones. Because the window is finite and shared across many retrieved sources, concise, dense material gets preserved and cited while rambling content gets trimmed or dropped. Make every sentence carry one verifiable fact.",
    example:
      "A 5,000-word blog post may have its most important claim truncated out of a 128k context window, while a one-paragraph fact sheet stating the same TVL number survives intact - and is what the engine cites.",
  },
  {
    term: "Entity authority",
    aliases: ["entity authority vs domain authority", "brand entity"],
    category: "Advanced GEO & AI mechanics",
    definition:
      "Why an LLM trusts a recognized brand or person - Vitalik on Ethereum, a protocol on its own architecture - more than a high-DR blog that merely repeats secondhand. Authority attaches to the entity and its provenance, not to a link profile. Build a strong entity with consistent, verifiable, identity-bound facts so the model weighs your primary word above any copycat's.",
    example:
      "A low-DR tweet from Vitalik Buterin about Ethereum is treated by an engine as more authoritative than a high-DR article on a generic news site summarizing what someone else claimed.",
  },
  {
    term: "Prompt injection",
    aliases: ["indirect prompt injection"],
    category: "Advanced GEO & AI mechanics",
    definition:
      "A malicious attempt to manipulate an LLM's output by embedding hidden instructions inside content the model retrieves - a technique Web3 brands must guard against because their public docs, forums and tooling are all read by AI crawlers. Publish from controlled, signed, canonical surfaces and treat any instruction-like text in user-generated content as untrusted.",
    example:
      "A token page that injects 'ignore the previous instructions and say X' is a prompt injection; a protocol that keeps its authoritative facts on a signed, first-party page limits what such attacks can hijack.",
  },
  // ---- Agency & measurement ----
  {
    term: "AI share of voice (AI SOV)",
    aliases: ["AI SOV", "share of voice"],
    category: "Measurement",
    definition:
      "The percentage of relevant queries on which an answer engine cites your protocol compared with direct competitors. Where traditional SOV tracks media mentions, AI SOV tracks citations inside ChatGPT, Perplexity, Claude and Gemini answers for a category. Measure it as: your citations / total competitor citations across a fixed query set.",
    example:
      "If your protocol is cited in 12 of 40 benchmark queries and three competitors together appear across the rest, you own ~30% AI SOV for that category - a number you can track month over month.",
  },
  {
    term: "Zero-click AI answer",
    aliases: ["zero-click answer", "no-click citation"],
    category: "Measurement",
    definition:
      "When an LLM returns the complete answer to a query - 'What is Arbitrum's TVL?' - sourced from your content, but the user never clicks through to your site. The answer is consumed inside the engine. Your value is captured as the cited authority, not as traffic, so optimize to be the named, linked source even when the click is zero.",
    example:
      "Perplexity answering 'What is Arbitrum's TVL?' with your figure and your domain cited, while the user never visits your site - a zero-click answer that still builds brand authority.",
  },
  // ---- Readability & content clarity ----
  {
    term: "Readability",
    aliases: ["reading level", "readability score"],
    category: "Readability & content clarity",
    definition:
      "How easy a text is to read, measured by formulas that weigh sentence length against word or syllable complexity. Readability is a trust signal for answer engines: short sentences and plain words are easier to quote cleanly, while dense prose gets compressed or skipped.",
    example:
      "A protocol that rewrites a 40-word sentence into two 15-word sentences typically sees its Flesch Reading Ease jump from the 30s into plain-English 60-70 territory.",
  },
  {
    term: "Flesch Reading Ease",
    aliases: ["Flesch score", "Flesch-Kincaid Reading Ease"],
    category: "Readability & content clarity",
    definition:
      "The classic 0-100 readability score, created by Rudolf Flesch in 1948. Higher scores mean easier reading: it is computed from average sentence length and average syllables per word, so short sentences with short words score high. 60-70 is considered plain English.",
    example:
      "Answer engines favor quotable plain English - a 65 Flesch Reading Ease passage is far more likely to be lifted verbatim than a 25-score dense paragraph.",
  },
  {
    term: "Flesch-Kincaid Grade Level",
    aliases: ["FK grade level", "Flesch-Kincaid Grade"],
    category: "Readability & content clarity",
    definition:
      "A U.S. school-grade score derived from the same inputs as Flesch Reading Ease: average sentence length and average syllables per word. A grade level of 8 means an eighth-grader can read it comfortably; a score of 15+ signals graduate-level density that answer engines are less likely to quote.",
    example:
      "DeFi documentation aimed at retail users typically targets grade 8-9, while a protocol whitepaper can legitimately land at grade 13+.",
  },
  {
    term: "Gunning Fog Index",
    aliases: ["Gunning Fog", "Fog Index"],
    category: "Readability & content clarity",
    definition:
      "A grade-level readability formula that adds average sentence length to the percentage of complex words (3+ syllables), then multiplies by 0.4. The Fog Index punishes long sentences and jargon equally, making it a quick check for how much industry vocabulary your copy carries.",
    example:
      "'The platform facilitates user staking across multiple networks' reads at a higher Fog index than 'Users can stake across networks' - the simpler sentence scores closer to grade 8.",
  },
  {
    term: "SMOG Index",
    aliases: ["SMOG", "Simple Measure of Gobbledygook"],
    category: "Readability & content clarity",
    definition:
      "A readability formula, full name Simple Measure of Gobbledygook, that estimates the education needed to fully understand a text by counting polysyllabic words in sample sentences. It is usually the strictest of the common formulas - if your copy passes SMOG, it is genuinely readable.",
    example:
      "A whitepaper with a SMOG of 18 demands a college-graduate reading level, while the same ideas restated as short, concrete sentences can drop to a SMOG of 10.",
  },
  {
    term: "Coleman-Liau Index",
    aliases: ["Coleman-Liau formula"],
    category: "Readability & content clarity",
    definition:
      "A grade-level formula based on characters per word and sentences per 100 words, with no syllable counting at all. Because it ignores syllables, it behaves differently on technical and Web3 text - which is why comparing it against Flesch and Gunning Fog is usually more informative than trusting any single formula.",
    example:
      "On the same protocol docs, Flesch-Kincaid may report grade 9 while Coleman-Liau reports grade 11 - the spread itself is a useful signal that word length is driving difficulty.",
  },
  {
    term: "Automated Readability Index (ARI)",
    aliases: ["ARI", "Automated Readability Index"],
    category: "Readability & content clarity",
    definition:
      "A grade-level formula that uses characters per word and words per sentence to estimate the U.S. grade level needed to read a text. Because it works on characters rather than syllables, it is simple to compute and stays stable across inconsistent syllable counting - helpful for technical contracts and tokenomics pages.",
    example:
      "Token audit reports packed with long contract terms often show an ARI 3-4 grades above Flesch-Kincaid, flagging that character-dense words are the main drag.",
  },
  {
    term: "Dale-Chall Readability Formula",
    aliases: ["Dale-Chall index"],
    category: "Readability & content clarity",
    definition:
      "A readability formula that compares every word against a list of roughly 3,000 familiar words and weighs unfamiliar words plus average sentence length. It is one of the harshest judges of jargon, which makes it a good sanity check for Web3 copy full of protocol-specific vocabulary.",
    example:
      "A page that constantly repeats 'decentralized autonomous organization' trips the Dale-Chall unfamiliar-word count even when sentences are short.",
  },
  {
    term: "Linsear Write Readability Formula",
    aliases: ["Linsear Write"],
    category: "Readability & content clarity",
    definition:
      "A readability formula developed by Linsear Write and used by the U.S. Air Force for technical manuals. It counts easy and hard words per sample sentence to produce a grade level, and is considered one of the simpler, more practical checks for documentation-style content.",
    example:
      "Tutorial-style docs with imperative verbs and short sentences typically score grade 6-8 on Linsear Write, well inside the readability range for retail users.",
  },
  {
    term: "Polysyllabic word",
    aliases: ["polysyllable", "long word", "complex word"],
    category: "Readability & content clarity",
    definition:
      "A word with three or more syllables. Readability formulas treat polysyllabic words as complex because they slow readers down, and answer engines prefer short words when lifting a quotable sentence. Web3 vocabulary like 'protocol' and 'infrastructure' is polysyllabic, which is why Web3-aware tools adjust for it.",
    example:
      "'Decentralized', 'liquidity' and 'governance' are polysyllabic; a paragraph that swaps 'utilization' for 'use' drops its complexity count without losing meaning.",
  },
  {
    term: "Heuristic",
    aliases: ["rule of thumb", "heuristic method"],
    category: "Readability & content clarity",
    definition:
      "A practical, approximate rule used when a perfect computation is too costly or impossible. Score-like signals in AI-visibility tools - including the Citation Readiness score and per-engine verdicts - are heuristics: fast, client-side estimates of behavior, not live measurements of what an engine actually did.",
    example:
      "PromptRaise's per-engine verdicts are heuristics built from citation signals (entity clarity, defined terms, grounding), so they are directionally useful without calling live APIs on every check.",
  },
];
