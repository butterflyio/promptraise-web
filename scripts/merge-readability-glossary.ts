// Merge the readability glossary terms into the live Sanity `glossary` doc
// WITHOUT clobbering existing entries (unlike seed-glossary.ts which rebuilds
// the whole doc from constants). Adds only terms whose name is not already
// present, and appends the new category if missing.
//
//   env:  SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID,
//         SANITY_DATASET / NEXT_PUBLIC_SANITY_DATASET,
//         SANITY_API_WRITE_TOKEN  (loaded from .env.local, no dotenv dep)
//   run:  node --experimental-strip-types scripts/merge-readability-glossary.ts
// @ts-nocheck -- tooling-only script; run via node --experimental-strip-types
// (the explicit .ts import extension is required by node ESM but rejected by tsc)
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_RELATED,
  GLOSSARY_TERMS,
} from "../lib/glossary-terms.ts";

// The exact new term names introduced in this batch (everything else already
// exists in the CMS from the original seed).
const NEW_TERM_NAMES = new Set([
  "Readability",
  "Flesch Reading Ease",
  "Flesch-Kincaid Grade Level",
  "Gunning Fog Index",
  "SMOG Index",
  "Coleman-Liau Index",
  "Automated Readability Index (ARI)",
  "Dale-Chall Readability Formula",
  "Linsear Write Readability Formula",
  "Polysyllabic word",
  "Heuristic",
]);
const NEW_CATEGORY = "Readability & content clarity";

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// --- minimal .env.local loader (KEY=VALUE lines, # comments) ---------------
const env: Record<string, string> = {};
for (const line of readFileSync(".env.local", "utf8").split(/\r?\n/)) {
  const t = line.trim();
  if (!t || t.startsWith("#")) continue;
  const eq = t.indexOf("=");
  if (eq === -1) continue;
  let v = t.slice(eq + 1).trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1);
  }
  env[t.slice(0, eq).trim()] = v;
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
  useCdn: false,
  token,
});

async function main() {
  const existing = await client.getDocument("glossary");
  const existingTerms = ((existing?.terms as Array<{ term?: string }>) ??
    []) as Array<{ term?: string }>;
  const existingNames = new Set(existingTerms.map((t) => t.term));

  // If no published glossary doc exists yet (e.g. a fresh production dataset),
  // build a full doc from the constants instead of erroring out.
  const base: Record<string, unknown> = existing ?? {
    _id: "glossary",
    _type: "glossary",
    metaTitle: "Web3 AI Visibility Glossary | PromptRaise Academy",
    metaDescription: `The PromptRaise Academy glossary: ${GLOSSARY_TERMS.length} Web3 + AI-visibility terms answer engines use to discover, read and cite your protocol.`,
    intro:
      "The language answer engines use to discover, read and cite your protocol. If you are wondering why ChatGPT and Perplexity do not mention you, these terms explain the machinery - and how to become a source instead of a rumor.",
  };

  const categories: string[] = Array.isArray(base.categories)
    ? [...(base.categories as string[])]
    : [...GLOSSARY_CATEGORIES];

  const newTerms = GLOSSARY_TERMS.filter((t) => NEW_TERM_NAMES.has(t.term))
    .filter((t) => !existingNames.has(t.term))
    .map((t) => {
      const item: Record<string, unknown> = {
        _key: slugify(t.term),
        term: t.term,
        category: t.category,
        definition: t.definition,
      };
      if (t.aliases?.length) item.aliases = t.aliases;
      if (t.example) item.example = t.example;
      const related = GLOSSARY_RELATED[t.term];
      if (related?.length) item.related = related;
      return item;
    });

  if (!categories.includes(NEW_CATEGORY)) categories.push(NEW_CATEGORY);

  const merged = {
    ...base,
    categories,
    terms: [...existingTerms, ...newTerms],
  };

  console.log(`Dataset: ${dataset}`);
  console.log(
    `Existing terms: ${existingNames.size}; adding: ${newTerms.length}; total now: ${merged.terms.length}`,
  );
  console.log(`Categories now: ${categories.length}`);

  await client.createOrReplace(merged as never);
  const back = await client.fetch(
    '*[_type == "glossary"][0]{categories, "terms": terms[].term}',
  );
  console.log("Verify total terms:", back.terms.length);
  console.log(
    "Readability category present:",
    back.categories.includes(NEW_CATEGORY),
  );
  for (const name of NEW_TERM_NAMES) {
    if (!back.terms.includes(name)) console.log("  MISSING:", name);
  }
  console.log("Done ✓");
}

main().catch((err) => {
  console.error("Merge failed:", err.message ?? err);
  process.exit(1);
});
