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

export const GLOSSARY_CATEGORIES = [
  "How AI discovers you",
  "How LLMs answer",
  "Becoming a citable source",
  "Structured data",
  "Measurement",
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
];
