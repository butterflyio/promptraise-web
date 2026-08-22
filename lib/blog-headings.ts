/**
 * Shared heading utilities for blog TOC + heading anchors.
 * Both the rendered headings (post-body) and the TOC (blog-toc) MUST use the
 * same id derivation, so a TOC link always lands on the right heading.
 */

export type HeadingLevel = 2 | 3;

export interface TocEntry {
  /** PortableText block _key - ties the entry to the rendered heading. */
  key: string;
  text: string;
  id: string;
  level: HeadingLevel;
}

interface RawBlock {
  _type?: string;
  _key?: string;
  style?: string;
  children?: Array<{ text?: string }>;
}

/** kebab-case, URL-safe, dedupe-friendly heading slug. */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // drop punctuation
    .replace(/[\s_]+/g, "-") // spaces/underscores -> hyphens
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Flatten PortableText children into plain text. */
function blockText(block: RawBlock): string {
  return (block.children ?? [])
    .map((c) => c.text ?? "")
    .join("")
    .trim();
}

/**
 * Derive TOC entries (h2/h3) from a PortableText block array.
 *
 * - Gate: a TOC only makes sense for long articles, so `show` is true only
 *   when there are at least `minH2` h2 headings.
 * - Depth: h2 + h3 only (h4+ is noise for both readers and models).
 * - IDs: slugified heading text, deduped with -1/-2 suffixes so repeated
 *   headings (e.g. a FAQ that mirrors a section) never collide.
 */
export function deriveHeadings(
  blocks: RawBlock[],
  minH2 = 4,
): {
  headings: TocEntry[];
  headingIds: Record<string, string>;
  show: boolean;
} {
  const headings: TocEntry[] = [];
  const headingIds: Record<string, string> = {};
  const slugCounts = new Map<string, number>();
  let h2Count = 0;

  for (const block of blocks) {
    if (block._type !== "block") continue;
    const level = block.style === "h2" ? 2 : block.style === "h3" ? 3 : 0;
    if (!level) continue;

    const text = blockText(block);
    if (!text) continue;

    const base = slugifyHeading(text);
    const n = (slugCounts.get(base) ?? 0) + 1;
    slugCounts.set(base, n);
    const id = n === 1 ? base : `${base}-${n}`;

    if (level === 2) h2Count++;
    const key = block._key ?? `${base}-${headings.length}`;
    headings.push({ key, text, id, level });
    if (block._key) headingIds[block._key] = id;
  }

  return {
    headings,
    headingIds,
    show: headings.length > 0 && h2Count >= minH2,
  };
}
