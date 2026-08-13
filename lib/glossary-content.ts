import type { draftMode } from "next/headers";

import {
  GLOSSARY_CATEGORIES,
  GLOSSARY_RELATED,
  GLOSSARY_TERMS,
  type GlossaryTerm,
} from "@/lib/glossary-terms";
import {
  getGlossary,
  getGlossaryPreview,
  type GlossaryDoc,
} from "@/sanity/lib/queries";

/**
 * Normalized glossary content used by BOTH glossary pages
 * (/academy/glossary and /glossary) so they never drift.
 *
 * Data resolution order:
 *   1. Sanity CMS `glossary` document (when configured + present) - the
 *      source of truth once seeded/published.
 *   2. Static constants in lib/glossary-terms.ts - fallback so the pages
 *      never render empty and local/dev (no Sanity) still works.
 *
 * `related` is built from each term's `related[]` in the CMS; the static
 * GLOSSARY_RELATED map is only used in fallback mode.
 */
export interface GlossaryContent {
  categories: string[];
  terms: GlossaryTerm[];
  related: Record<string, string[]>;
  metaTitle?: string;
  metaDescription?: string;
  intro?: string;
  updatedAt?: string;
}

export function relatedFor(related: Record<string, string[]>, term: string) {
  return related[term] ?? [];
}

export function termAnchor(term: string): string {
  return (
    "term-" +
    term
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
  );
}

function toGlossaryTerm(
  t: NonNullable<GlossaryDoc["terms"]>[number],
): GlossaryTerm {
  return {
    term: t.term,
    aliases: t.aliases,
    category: t.category ?? "",
    definition: t.definition ?? "",
    example: t.example,
  };
}

export function fromDoc(doc: GlossaryDoc | null): GlossaryContent {
  if (!doc) {
    // Fallback: static constants.
    return {
      categories: [...GLOSSARY_CATEGORIES],
      terms: GLOSSARY_TERMS,
      related: JSON.parse(JSON.stringify(GLOSSARY_RELATED)),
      metaTitle: undefined,
      metaDescription: undefined,
      intro: undefined,
      updatedAt: undefined,
    };
  }

  const terms = (doc.terms ?? []).map(toGlossaryTerm);
  const listed = (doc.categories ?? []).filter(Boolean);
  // Preserve the CMS category order, then append any categories that appear
  // on terms but weren't explicitly listed (so nothing is hidden).
  const seen = new Set(listed);
  const extra = terms.map((t) => t.category).filter((c) => c && !seen.has(c));
  extra.forEach((c) => listed.push(c));
  const categories = listed.filter(Boolean);

  // related: build from each term's `related[]`. Fall back to the static map
  // only for terms that carry no related data yet (covers pre-seed state).
  const related: Record<string, string[]> = {};
  for (const t of doc.terms ?? []) {
    const rel =
      t.related && t.related.length ? t.related : GLOSSARY_RELATED[t.term];
    if (rel && rel.length) {
      related[t.term] = rel;
    }
  }

  return {
    categories,
    terms,
    related,
    metaTitle: doc.metaTitle,
    metaDescription: doc.metaDescription,
    intro: doc.intro,
    updatedAt: doc._updatedAt,
  };
}

/**
 * Loads glossary content with draft-mode awareness. In draft mode it uses the
 * preview client (uncached, resolves drafts.*) so Studio edits appear live.
 */
export async function getGlossaryContent(
  isDraftMode: Awaited<ReturnType<typeof draftMode>>,
): Promise<GlossaryContent> {
  let doc: GlossaryDoc | null = null;
  if (isDraftMode.isEnabled) {
    doc = await getGlossaryPreview();
  } else {
    doc = await getGlossary();
  }
  if (!doc) {
    // If the CMS doc isn't published yet, still try preview/draft else fallback.
    doc = (await getGlossary()) ?? null;
  }
  return fromDoc(doc);
}
