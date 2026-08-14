// Creates the 3 author documents (Zain Khan, Maxim Moris, PromptRaise
// Research Team) and repoints existing posts to author references.
//
// Idempotent (createOrReplace by stable _id author-<slug>). Only fills
// name + slug + role. Zain completes bio/avatar/socials/SEO in the Studio.
//
// Run against staging:
//   NEXT_PUBLIC_SANITY_DATASET=staging npx tsx scripts/seed-authors.ts
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";
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

const AUTHORS = [
  {
    id: "author-zain-khan",
    slug: "zain-khan",
    name: "Zain Khan",
    role: "Co-founder, PromptRaise",
  },
  {
    id: "author-maxim-moris",
    slug: "maxim-moris",
    name: "Maxim Moris",
    role: "Co-founder, PromptRaise",
  },
  {
    id: "author-promptraise-research-team",
    slug: "promptraise-research-team",
    name: "PromptRaise Research Team",
    role: "PromptRaise Research",
  },
];

async function main() {
  console.log(`Seeding authors into ${dataset}...`);
  for (const a of AUTHORS) {
    await client.createOrReplace({
      _id: a.id,
      _type: "author",
      name: a.name,
      role: a.role,
      slug: { _type: "slug", current: a.slug, source: a.name },
    } as never);
    console.log(`  author: ${a.slug} (${a.name})`);
  }

  // Repoint posts that still have an inline author object (legacy model,
  // e.g. "PromptRaise" / "Cicada Team") to the PromptRaise Research Team
  // author reference so the byline + Person schema work.
  const teamRef = "author-promptraise-research-team";
  const legacyPosts = (await client.fetch(
    `*[_type == "post" && !defined(author._ref)]{_id, author}`,
  )) as Array<{ _id: string; author?: Record<string, unknown> }>;

  console.log(`\nFound ${legacyPosts.length} posts with inline authors.`);
  for (const p of legacyPosts) {
    await client
      .patch(p._id)
      .set({ author: { _type: "reference", _ref: teamRef } })
      .commit();
    console.log(`  repointed: ${p._id}`);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
