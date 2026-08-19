// Seeds the blog post "Four Essential Principles to Improve Your AI Search
// Visibility" (from Zain's Starknet Foundation AI Visibility workshop) into the
// PRODUCTION Sanity dataset. Idempotent (createOrReplace by stable slug).
//
// Handles:
//  - uploading the 3 workshop slides as Sanity image assets (cover + inline)
//  - a full portable-text body with h2 headings, paragraphs, bullets, a
//    blockquote, inline images (alt + caption), and balanced follow/no-follow
//    external links
//  - author = author-zain-khan reference (E-E-A-T)
//  - SEO metaTitle / metaDescription, openGraphImage, featured, publishedAt=now
import { createClient } from "@sanity/client";
import * as fs from "fs";
import * as path from "path";

const envRaw = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf8");
function envVar(name: string): string {
  const m = envRaw.match(new RegExp(`^${name}[=\\s"']*(.*?)[\\s"']*$`, "m"));
  return m?.[1] ?? "";
}

const projectId = envVar("SANITY_API_PROJECT_ID") || "4pws3pyj";
const dataset = envVar("SANITY_API_DATASET") || "production"; // live dataset
const writeToken = envVar("SANITY_API_WRITE_TOKEN");
if (!writeToken) {
  console.error("Missing SANITY_API_WRITE_TOKEN");
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token: writeToken,
});

const SLUG = "four-essential-principles-to-improve-your-ai-search-visibility";
const POST_ID = `post-${SLUG}`;

// ── Image upload helper ────────────────────────────────────────────────────
async function uploadImage(filePath: string, label: string): Promise<string> {
  if (!fs.existsSync(filePath)) throw new Error("missing " + filePath);
  const asset = await client.assets.upload(
    "image",
    fs.createReadStream(filePath),
    {
      filename: path.basename(filePath),
      contentType: "image/png",
    },
  );
  console.log("  uploaded", label, "->", asset._id);
  return asset._id;
}

// ── Portable-text block builders ───────────────────────────────────────────
let keyCounter = 0;
const k = () => `k${++keyCounter}`;

type Seg = string | { text: string; href: string; nofollow?: boolean };

function para(segments: Seg[]): Record<string, unknown> {
  const markDefs: Array<Record<string, unknown>> = [];
  const children: Array<Record<string, unknown>> = [];
  for (const seg of segments) {
    if (typeof seg === "string") {
      if (seg) children.push({ _type: "span", marks: [], text: seg });
      continue;
    }
    const mk = k();
    markDefs.push({
      _key: mk,
      _type: "link",
      href: seg.href,
      ...(seg.nofollow ? { nofollow: true } : {}),
    });
    children.push({ _type: "span", marks: [mk], text: seg.text });
  }
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    markDefs,
    children,
  };
}

function heading(text: string, style = "h2"): Record<string, unknown> {
  return {
    _type: "block",
    _key: k(),
    style,
    markDefs: [],
    children: [{ _type: "span", marks: [], text }],
  };
}

function bullet(segments: Seg[]): Record<string, unknown> {
  const markDefs: Array<Record<string, unknown>> = [];
  const children: Array<Record<string, unknown>> = [];
  for (const seg of segments) {
    if (typeof seg === "string") {
      if (seg) children.push({ _type: "span", marks: [], text: seg });
      continue;
    }
    const mk = k();
    markDefs.push({
      _key: mk,
      _type: "link",
      href: seg.href,
      ...(seg.nofollow ? { nofollow: true } : {}),
    });
    children.push({ _type: "span", marks: [mk], text: seg.text });
  }
  return {
    _type: "block",
    _key: k(),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs,
    children,
  };
}

function imageBlock(
  assetId: string,
  alt: string,
  caption: string,
): Record<string, unknown> {
  return {
    _type: "image",
    _key: k(),
    asset: { _ref: assetId, _type: "reference" },
    alt,
    caption,
  };
}

function quote(text: string): Record<string, unknown> {
  return {
    _type: "block",
    _key: k(),
    style: "blockquote",
    markDefs: [],
    children: [{ _type: "span", marks: [], text }],
  };
}

// ── Content ────────────────────────────────────────────────────────────────
const TITLE = "Four Essential Principles to Improve Your AI Search Visibility";
const EXCERPT =
  "Web3 startups are invisible to ChatGPT, Claude and Perplexity without an AI search strategy. Zain Khan's Starknet Foundation workshop: the four pillars that get you cited by AI.";
const META_TITLE =
  "4 Principles to Improve Your AI Search Visibility | Promptraise";
const META_DESC =
  "How Web3 startups get cited by ChatGPT, Claude and Perplexity. Four AI-visibility principles from Zain Khan's Starknet Foundation workshop: hard numbers, answer capsules, unified messaging, technical fixes.";

const L = {
  linkedin: "https://www.linkedin.com/in/01z/",
  starknet: "https://www.starknet.org/",
  chipi: "https://chipipay.com/",
  helix: "https://helixassets.io/",
  invoicemate: "https://invoicemate.net/",
  audit: "https://audit.promptraise.com/",
  napkin:
    "https://app.napkin.ai/page/CgoiCHByb2Qtb25lEiwKBFBhZ2UaJGU1NjJlMGRiLWFkNDQtNGEwYS1hMDc4LTY0Y2YyMGE2M2QxYQ",
  flesch: "/free/flesch-kincaid-calculator",
};

async function buildBody(): Promise<{
  body: Array<Record<string, unknown>>;
  cover: string;
}> {
  const cover = await uploadImage(
    "/tmp/pra_blog_img0.png",
    "cover (Four Pillars slide)",
  );
  const img1 = await uploadImage(
    "/tmp/pra_blog_img1.png",
    "inline (visibility actions)",
  );
  const img2 = await uploadImage(
    "/tmp/pra_blog_img2.png",
    "inline (SEO parallel gear)",
  );

  const body: Array<Record<string, unknown>> = [
    quote("Be the answer, not the search result."),
    para([
      "Search behavior is undergoing a massive shift. While traditional SEO remains vital, AI engines like ",
      { text: "ChatGPT", href: "https://chatgpt.com/", nofollow: true },
      ", Claude and Perplexity are rapidly capturing search traffic. In a recent workshop for the ",
      { text: "Starknet Foundation", href: L.starknet },
      " cohort, ",
      { text: "Zain Khan", href: L.linkedin },
      " broke down how Web3 startups can optimize for AI discovery (AEO/GEO) to avoid brand silence and AI hallucinations.",
    ]),
    heading("Core Problem: The Citation Gap"),
    para([
      "AI models do not index the web exactly like Google. According to Gartner, there is an 80% citation gap - meaning 80% of the URLs Google ranks are completely ignored by AI. AI models also frequently mention brands without linking to them. If your startup's data isn't structured for AI retrieval, engines will either ignore you or hallucinate incorrect information about your product.",
    ]),
    heading("Four Pillars of AI Visibility"),
    para([
      "AI search engines are increasingly the first touchpoint users have with your project, and how you structure your information directly determines whether AI cites you. Below are four key principles for AI search visibility.",
    ]),
    imageBlock(
      cover,
      "Four pillars of AI visibility diagram from the Starknet Foundation AI visibility workshop with Promptraise",
      "The four pillars of AI visibility - structured facts, answer capsules, unified messaging and clean technical foundations.",
    ),
    heading("1. Publish Hard Numbers & Facts"),
    para([
      "AI engines favor quantifiable, transparent data. Even early-stage projects should publish metrics (volume processed, TVL, NPL rates) on their homepages. AI crawlers heavily weight transparency and factual data over marketing fluff.",
    ]),
    heading("2. Create Answer Capsules"),
    para([
      "Make the AI's job easy by providing synthesized answers. Build out JSON-based FAQs, direct comparison tables against competitors, and clear mechanical explainers of how your protocol works. If you feed the AI structured answers, it is more likely to cite you.",
    ]),
    heading("3. Unify Your Messaging"),
    para([
      "Fragmented messaging confuses AI training and retrieval models. Ensure your core value proposition, open-graph images, and terminology are strictly aligned across your website, pitch decks, whitepapers, and social channels.",
    ]),
    heading("4. Fix Technical Roadblocks"),
    para([
      "Heavy JavaScript, 3D elements, and misconfigured authentication handshakes (e.g., ",
      { text: "Clerk", href: "https://clerk.com/", nofollow: true },
      " blocking bots) render sites invisible to AI crawlers. The test: disable JavaScript in your browser. If your core text disappears, AI cannot read your site. The fix: migrate to an AI-friendly headless CMS (like ",
      { text: "Sanity", href: "https://www.sanity.io/" },
      "), implement llms.txt, and ensure your robots.txt permits AI scraping.",
    ]),
    para([
      "Start with the technical roadblocks - none of the other three points matter if crawlers can't get in. From there, it's an iterative process of tightening up your data and content structure.",
    ]),
    heading("Live Audit Takeaways"),
    imageBlock(
      img1,
      "Recommended AI visibility actions per cohort company from the live workshop audit",
      "Live audit recommendations - add answer capsules, landing pages, comparison tables and mechanics pages.",
    ),
    para([
      "During the session, Zain conducted live audits of cohort projects and showed that even well-funded teams often overlook the basics of AI accessibility. Key issues and wins across three projects:",
    ]),
    bullet([
      "Chipi Pay: ",
      { text: "Chipi Pay", href: L.chipi, nofollow: true },
      " had a misconfigured backend handshake entirely blocking AI crawlers from scanning the site.",
    ]),
    bullet([
      "Helix: ",
      { text: "Helix", href: L.helix, nofollow: true },
      " was hiding core text from crawlers; moving to a structured CMS was recommended.",
    ]),
    bullet([
      "InvoiceMate: ",
      { text: "InvoiceMate", href: L.invoicemate, nofollow: true },
      " was praised as a best-in-class example for transparently publishing quantifiable metrics on its landing page.",
    ]),
    para([
      "These examples reinforce a simple pattern: technical blockers kill visibility outright, while transparent, well-structured data earns it. Teams should treat an AI crawler audit as a standard pre-launch check.",
    ]),
    heading("Consistency Is Key"),
    para([
      "Do not get bogged down by acronyms like AEO, GEO, or LLMO - they all point to the same goal: being the verified source. AI visibility is a hygiene exercise. Expect a 3 to 6-month runway for B2C results, and longer for B2B. Run your traditional SEO and AI optimization in parallel, use readability tools (like the ",
      { text: "Flesch-Kincaid calculator", href: L.flesch },
      ") to simplify your copy, and consistently feed the AI engines the structured data they crave.",
    ]),
    imageBlock(
      img2,
      "Google SEO and AI SEO gear diagram showing AEO, GEO and LLMO converge on the same goal",
      "Run Google SEO and AI SEO in parallel - AEO, GEO and LLMO are all the same game.",
    ),
    heading("Get Your AI-Readiness Score"),
    para([
      "Want to know if AI engines can read your project today? ",
      { text: "Get a free AI visibility audit", href: L.audit },
      ". The full presentation with sources ",
      { text: "can be found here", href: L.napkin, nofollow: true },
      ".",
    ]),
    quote("Be the answer, not the search result."),
  ];
  console.log("  body blocks:", body.length);
  return { body, cover };
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`Seeding ${dataset} (project ${projectId})...`);
  const { body, cover } = await buildBody();

  const doc = {
    _id: POST_ID,
    _type: "post",
    title: TITLE,
    slug: { _type: "slug", current: SLUG, source: TITLE },
    excerpt: EXCERPT,
    coverImage: { _type: "image", asset: { _ref: cover, _type: "reference" } },
    categories: ["AI Strategy"],
    body,
    author: { _ref: "author-zain-khan", _type: "reference" },
    publishedAt: new Date().toISOString(),
    status: "published" as const,
    metaTitle: META_TITLE,
    metaDescription: META_DESC,
    openGraphImage: {
      _type: "image",
      asset: { _ref: cover, _type: "reference" },
    },
    noindex: false,
    featured: true,
  };

  console.log("Creating/replacing", POST_ID, "(status: published)...");
  const res = await client.createOrReplace(doc as never);
  console.log(
    "OK ->",
    res._id,
    "| status:",
    res.status,
    "| publishedAt:",
    res.publishedAt,
  );
  console.log("\nStudio:", `https://promptraise.com/studio/blog/${POST_ID}`);
  console.log("Live:", `https://promptraise.com/blog/${SLUG}`);
}

main().catch((e) => {
  console.error("FAILED", e.message);
  process.exit(1);
});
