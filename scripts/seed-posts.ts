// Seeds the 7 existing blog posts (from the legacy Vite SPA at
// /root/promptraise-blog) into the Sanity post documents. Idempotent
// (createOrReplace by stable slug). Run:
//   npx tsx scripts/seed-posts.ts
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
import { seoSlugify } from "../lib/seo-slug";
dotenv.config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "staging";
const token = process.env.SANITY_API_WRITE_TOKEN ?? "";

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  useCdn: false,
  token,
});

const slugify = (s: string) => seoSlugify(s);

/** Convert plain paragraphs into Sanity portable-text block objects. */
function blocks(paragraphs: string[]): Array<Record<string, unknown>> {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `seed_${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", marks: [], text }],
  }));
}

// ── Content from the SPA ─────────────────────────────────────────────────────

const FEATURED_BODY = [
  "The battle for AI visibility has quietly become the most consequential distribution challenge in Web3. While most protocols spend their budgets on Google SEO and Twitter impressions, a parallel information layer, one consulted by millions every day, has been taking shape with almost no awareness from the industry.",
  "When a user asks ChatGPT 'what's the best DeFi protocol for yield optimization?' or asks Perplexity 'which Layer 2 should I bridge to?', the answers they receive are shaped by a completely different set of signals than those that drive search rankings. Understanding those signals is now a competitive moat.",
];

// Metadata for each of the 6 grid posts + 1 featured (all content lifted
// verbatim from BlogPage.tsx / ArticlePage.tsx of the legacy Vite blog).
const POSTS = [
  {
    title: "How Web3 Protocols Win the AI Visibility Race in 2025",
    category: "AI Strategy",
    excerpt:
      "The next frontier isn't search rankings-it's whether AI systems cite, recommend, and trust your protocol. Here's what the data says about who's winning and why.",
    date: "2025-08-08T09:00:00.000Z",
    readTime: "8 min read",
    author: "Cicada Team",
    featured: true,
    body: blocks([
      ...FEATURED_BODY,
      "Our research across 10,000+ AI-generated responses found that LLMs weigh three primary factors when selecting sources: semantic authority (how coherently and consistently a protocol is described across the web), mention frequency in high-trust domains, and recency of substantive coverage. Traditional SEO correlation was near zero.",
      "The protocols appearing most frequently in AI outputs share a common pattern: they invest in what we call 'semantic surface area', a broad, coherent web of descriptions, technical explanations, and third-party coverage that LLMs can triangulate. This isn't about gaming any system. It's about being genuinely well-documented.",
      "Concretely, this means maintaining consistent technical documentation that gets referenced externally, actively supporting writers and researchers who cover the space, ensuring that audit reports and integration guides are publicly accessible and legible to non-specialists.",
      "AI models are trained on snapshots of the web. The protocols that establish strong semantic authority now are likely to remain the default recommendations in model weights for years, not weeks. This makes the current window unusually high-leverage.",
      "Protocols that act now aren't just winning a news cycle. They're shaping what AI systems believe is true about their category. That's a defensible position unlike any other in the current distribution landscape.",
    ]),
  },
  {
    title: "Why ChatGPT Ignores Your Protocol (And How to Fix It)",
    category: "Protocol Insights",
    excerpt:
      "Most Web3 teams optimize for Google. But the AI layer has different rules, different signals, and different winners.",
    date: "2025-08-05T09:00:00.000Z",
    readTime: "5 min read",
    author: "Cicada Team",
  },
  {
    title: "From Invisible to Referenced: A DeFi Protocol's 90-Day Journey",
    category: "Case Study",
    excerpt:
      "We tracked one protocol's AI mention rate across ChatGPT, Perplexity, and Claude over three months. The results were striking.",
    date: "2025-07-30T09:00:00.000Z",
    readTime: "7 min read",
    author: "Cicada Team",
  },
  {
    title: "The Anatomy of an AI Citation: What Makes LLMs Trust a Source",
    category: "Research",
    excerpt:
      "We analyzed 10,000 AI-generated responses across financial topics to understand what determines source selection.",
    date: "2025-07-22T09:00:00.000Z",
    readTime: "11 min read",
    author: "Cicada Team",
  },
  {
    title: "Prompt Engineering Is Dead. Here's What Comes Next",
    category: "AI Strategy",
    excerpt:
      "The shift from prompting to protocol-level influence is already underway. Early movers are seeing compounding advantages.",
    date: "2025-07-15T09:00:00.000Z",
    readTime: "6 min read",
    author: "Cicada Team",
  },
  {
    title: "Introducing Real-Time AI Audit: Know Your Visibility Score Today",
    category: "Product",
    excerpt:
      "Our new audit tool gives protocols a live snapshot of how AI systems currently perceive and reference them.",
    date: "2025-07-08T09:00:00.000Z",
    readTime: "4 min read",
    author: "Cicada Team",
  },
  {
    title:
      "Perplexity vs. ChatGPT vs. Claude: Which AI Drives the Most Protocol Traffic?",
    category: "Research",
    excerpt:
      "Not all AI assistants are created equal. Our analysis of referral patterns across 30 protocols reveals a clear hierarchy.",
    date: "2025-06-28T09:00:00.000Z",
    readTime: "9 min read",
    author: "Cicada Team",
  },
];

async function main() {
  console.log(`Seeding ${dataset}...`);
  let created = 0;
  let replaced = 0;

  for (const p of POSTS) {
    const slug = slugify(p.title);
    const doc = {
      _id: `post-${slug}`,
      _type: "post",
      title: p.title,
      slug: { _type: "slug", current: slug, source: p.title },
      excerpt: p.excerpt,
      categories: [p.category],
      publishedAt: p.date,
      status: "published" as const,
      featured: p.featured ?? false,
      author: {
        name: p.author === "Cicada Team" ? "PromptRaise" : p.author,
        role: "PromptRaise Research",
      },
      ...(p.body ? { body: p.body } : {}),
    };

    const existing = await client.fetch(`*[_id == $id][0]{_id}`, {
      id: doc._id,
    });
    if (existing) {
      replaced++;
    } else {
      created++;
    }
    await client.createOrReplace(doc as never);
    console.log(`  ${existing ? "replaced" : "created"}: ${slug}`);
  }

  console.log(
    `\nDone. created=${created} replaced=${replaced} total=${POSTS.length}`,
  );
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
