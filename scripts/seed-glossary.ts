// Seeds the Sanity `glossary` document (staging dataset) from the current
// static constants in lib/glossary-terms.ts. Idempotent (createOrReplace).
//
//   env:  NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
//         SANITY_API_WRITE_TOKEN  (loaded from .env.local)
//   run:  npx tsx scripts/seed-glossary.ts
import { createClient } from "@sanity/client";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_RELATED,
  GLOSSARY_TERMS,
} from "../lib/glossary-terms";

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

// Default meta (editable later in the CMS).
const metaTitle = "Web3 AI Visibility Glossary | PromptRaise Academy";
const metaDescription = `The PromptRaise Academy glossary: ${GLOSSARY_TERMS.length} Web3 + AI-visibility terms answer engines use to discover, read and cite your protocol - from GEO and grounding to DefinedTerm and citation-per-query.`;
const intro =
  "The language answer engines use to discover, read and cite your protocol. If you are wondering why ChatGPT and Perplexity do not mention you, these terms explain the machinery - and how to become a source instead of a rumor.";

const terms = GLOSSARY_TERMS.map((t) => {
  const item: Record<string, unknown> = {
    _key: slugify(t.term),
    term: t.term,
    category: t.category,
    definition: t.definition,
  };
  if (t.aliases?.length) item.aliases = t.aliases;
  if (t.example) item.example = t.example;
  // Related terms -> "See also" chips + JSON-LD mentions.
  const related = GLOSSARY_RELATED[t.term];
  if (related?.length) item.related = related;
  return item;
});

const doc = {
  _id: "glossary",
  _type: "glossary",
  metaTitle,
  metaDescription,
  intro,
  categories: [...GLOSSARY_CATEGORIES],
  terms,
};

async function main() {
  const existing = await client.getDocument("glossary");
  const source = existing ? "existing (will be REPLACED)" : "none (first seed)";
  console.log(`Dataset: ${dataset}`);
  console.log(`Existing glossary doc: ${source}`);
  console.log(`Categories: ${doc.categories.length}`);
  console.log(`Terms: ${doc.terms.length}`);

  await client.createOrReplace(doc as never);
  console.log("Seed complete. _id='glossary' created/replaced ✓");
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
