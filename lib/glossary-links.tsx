import { createElement, Fragment, type ReactNode } from "react";
import type { GlossaryTerm } from "@/lib/glossary-terms";
import { GLOSSARY_TERMS, termAnchor } from "@/lib/glossary-terms";

/**
 * Auto internal linking between blog posts and the Academy glossary.
 *
 * Rules (kept strict so links stay clean and crawl-friendly):
 *  - Only CANONICAL term names are auto-linked (aliases are for search /
 *    JSON-LD, NOT body text, so 'GEO' never links to an odd anchor).
 *  - Whole-word, case-insensitive match, longest term wins at a position.
 *  - First occurrence of each term per post only (no term-link spam).
 *  - A hard cap on total links per post avoids over-optimization.
 *  - Spans already carrying a `link` mark are never touched.
 *  - List items and headings are linked too; code blocks are not.
 *
 * Callers:
 *  - app/blog/[slug]/page.tsx: autoLinkBlocks(post.body, glossary.terms)
 *  - app/academy/glossary/page.tsx: relatedPostsForTerm(...) for the
 *    reverse direction (glossary -> blog).
 */

/** Minimum plain-text length for a post to participate in glossary relations
 * (filters placeholder/stub posts automatically). */
export const GLOSSARY_LINK_MIN_BODY_CHARS = 3000;

/** Hard cap on auto links per post. */
export const GLOSSARY_LINK_MAX_PER_POST = 12;

export interface ParsedPostForLinks {
  _id?: string;
  slug?: { current?: string };
  title?: string;
  publishedAt?: string;
  /** Plain text of the body (pt::text), used for matching. */
  bodyText?: string;
}

export interface LinkPhrase {
  /** Text to match inside a body (may be a stripped variant). */
  phrase: string;
  /** Canonical glossary term this phrase links to. */
  canonical: string;
}

function strippedParenthetical(term: string): string {
  const m = /^(.*?)\s*\([^)]*\)$/.exec(term);
  return m?.[1]?.trim() ?? "";
}

/**
 * Linkable phrases for each term. Includes the canonical name AND a
 * parenthetical-stripped variant (e.g. 'GEO (generative engine optimization)'
 * yields 'GEO (generative engine optimization)' + 'GEO') so body copy that
 * uses the short form still links to the right glossary anchor.
 * Sorted longest-first for greedy matching.
 */
export function linkablePhrases(terms: GlossaryTerm[]): LinkPhrase[] {
  const phrases: LinkPhrase[] = [];
  const seen = new Set<string>();
  const push = (phrase: string, canonical: string) => {
    const p = phrase.trim();
    if (p.length < 2 || seen.has(p.toLowerCase())) return;
    seen.add(p.toLowerCase());
    phrases.push({ phrase: p, canonical });
  };
  for (const t of terms) {
    if (!t.term) continue;
    push(t.term, t.term);
    const stripped = strippedParenthetical(t.term);
    if (stripped && stripped !== t.term) push(stripped, t.term);
  }
  return phrases.sort((a, b) => b.phrase.length - a.phrase.length);
}

/** Canonical term names only, sorted longest-first for greedy matching. */
export function linkableTermNames(terms: GlossaryTerm[]): string[] {
  return [...new Set(terms.map((t) => t.term).filter(Boolean))].sort(
    (a, b) => b.length - a.length,
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Whole-word, case-insensitive match of `term` inside `text`. */
function findTerm(text: string, term: string): number {
  const re = new RegExp(
    `(?<![A-Za-z0-9])${escapeRegExp(term)}(?![A-Za-z0-9])`,
    "i",
  );
  const m = re.exec(text);
  return m ? m.index : -1;
}

type Span = {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type Block = {
  _type?: string;
  _key?: string;
  style?: string;
  children?: Span[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
};

/**
 * Returns the first-occurrence match positions for linkable phrases in `text`,
 * skipping terms already in `used` (tracked by canonical name). Longest phrase
 * at the earliest position wins. Result: array of
 * { canonical, phrase, index, phraseLen }.
 */
function earliestMatches(
  text: string,
  phrases: LinkPhrase[],
  used: Set<string>,
): Array<{
  canonical: string;
  phrase: string;
  index: number;
  phraseLen: number;
}> {
  const found: Array<{
    canonical: string;
    phrase: string;
    index: number;
    phraseLen: number;
  }> = [];
  for (const { phrase, canonical } of phrases) {
    if (used.has(canonical)) continue;
    const index = findTerm(text, phrase);
    if (index > -1)
      found.push({ canonical, phrase, index, phraseLen: phrase.length });
  }
  // Earliest position first; tie-break by longest phrase.
  found.sort((a, b) => a.index - b.index || b.phraseLen - a.phraseLen);
  return found;
}

function hasLinkMark(defs: Block["markDefs"], span: Span): boolean {
  return !!(
    span.marks &&
    span.marks.some((mKey) =>
      defs?.some((d) => d._key === mKey && d._type === "link"),
    )
  );
}

export interface AutoLinkResult {
  blocks: Block[];
  /** Terms actually linked in the post (for 'Key terms' chips). */
  matched: GlossaryTerm[];
}

/**
 * Wraps first occurrences of glossary terms in a post body with links to
 * /academy/glossary#term-<slug>. Pure transform: never mutates input blocks.
 */
export function autoLinkBlocks(
  blocks: Block[],
  terms: GlossaryTerm[],
): AutoLinkResult {
  if (!blocks || blocks.length === 0) {
    return { blocks: blocks ?? [], matched: [] };
  }
  const phrases = linkablePhrases(terms);
  const termByLabel = new Map(terms.map((t) => [t.term, t]));
  const used = new Set<string>();
  const matched: GlossaryTerm[] = [];
  let totalLinks = 0;

  const transformed: Block[] = blocks.map((block, bi) => {
    if (!block || block._type !== "block" || !block.children?.length) {
      return block;
    }
    const children = block.children;
    const markDefs = block.markDefs ?? [];
    const outChildren: Span[] = [];
    let defsUsed = 0;
    // Keys must stay unique within the block, even if the source Sanity
    // document carries duplicate child keys (observed in production data).
    const usedKeys = new Set<string>([
      ...(children.map((c) => c._key).filter(Boolean) as string[]),
      ...(markDefs.map((d) => d._key).filter(Boolean) as string[]),
    ]);
    const uniqKey = (base: string): string => {
      let k = base;
      let i = 2;
      while (usedKeys.has(k)) k = `${base}-${i++}`;
      usedKeys.add(k);
      return k;
    };

    for (const span of children) {
      if (!span.text || (!span.marks?.length && span.text.length === 0)) {
        outChildren.push(span);
        continue;
      }
      if (hasLinkMark(markDefs, span)) {
        outChildren.push(span); // never touch already-linked spans
        continue;
      }

      const baseMarks = span.marks ?? [];
      const spanKey = span._key ?? `sp-${bi}-${outChildren.length}`;
      let remaining = span.text;
      const produced: Span[] = [];

      // Repeatedly locate the best (earliest, longest) term in the remainder.
      for (;;) {
        if (totalLinks >= GLOSSARY_LINK_MAX_PER_POST) break;
        const hits = earliestMatches(remaining, phrases, used);
        if (hits.length === 0) break;
        // Earliest/longest term at this position (safe: hits is non-empty).
        const hit = hits[0];
        if (!hit) break;
        // Respect the whole-word boundary: the regex already guarantees it.
        const beforeText = remaining.slice(0, hit.index);
        const matchText = remaining.slice(hit.index, hit.index + hit.phraseLen);
        const afterText = remaining.slice(hit.index + hit.phraseLen);

        if (beforeText) {
          produced.push({
            _type: "span",
            _key: uniqKey(`${spanKey}-${produced.length}-before`),
            text: beforeText,
            marks: baseMarks.length ? [...baseMarks] : undefined,
          });
        }
        const newMarkKey = uniqKey(`${spanKey}-g${defsUsed++}-link`);
        produced.push({
          _type: "span",
          _key: uniqKey(`${spanKey}-${produced.length}-term`),
          text: matchText,
          marks: [...baseMarks, newMarkKey],
        });
        markDefs.push({
          _key: newMarkKey,
          _type: "link",
          href: `/academy/glossary#${termAnchor(hit.canonical)}`,
        });
        used.add(hit.canonical);
        const term = termByLabel.get(hit.canonical);
        if (term && !matched.includes(term)) matched.push(term);
        totalLinks += 1;
        remaining = afterText;
      }

      if (remaining) {
        produced.push({
          _type: "span",
          _key: uniqKey(`${spanKey}-${produced.length}-after`),
          text: remaining,
          marks: baseMarks.length ? [...baseMarks] : undefined,
        });
      }
      if (produced.length === 0) {
        outChildren.push(span);
      } else {
        outChildren.push(...produced);
      }
    }

    if (
      outChildren.length === children.length &&
      outChildren.every((c, i) => c === children[i])
    ) {
      return block;
    }
    return { ...block, children: outChildren, markDefs };
  });

  return { blocks: transformed, matched };
}

/** Is this post substantive enough to participate in glossary links? */
export function isPostEligibleForGlossaryLinks(
  post: ParsedPostForLinks,
): boolean {
  return (post.bodyText ?? "").length >= GLOSSARY_LINK_MIN_BODY_CHARS;
}

/**
 * Reverse direction (glossary -> blog): which posts mention a given term?
 * Only eligible posts (real bodies) are candidates, so placeholder posts
 * never leak into the glossary page.
 */
export function relatedPostsForTerm(
  term: string,
  posts: ParsedPostForLinks[],
  limit = 3,
): ParsedPostForLinks[] {
  const hitScore = (post: ParsedPostForLinks): number => {
    if (!isPostEligibleForGlossaryLinks(post)) return 0;
    const text = post.bodyText ?? "";
    let score = 0;
    for (const { phrase } of linkablePhrases([{ term } as GlossaryTerm])) {
      const re = new RegExp(
        `(?<![A-Za-z0-9])${escapeRegExp(phrase)}(?![A-Za-z0-9])`,
        "i",
      );
      const m = re.exec(text);
      if (m) score += phrase.length;
    }
    return score;
  };
  const hits = posts
    .map((p) => ({ p, score: hitScore(p) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.p);
  return hits;
}

/**
 * Text-level auto-linker: given a plain-text string, wraps the FIRST
 * occurrence of each glossary term (canonical names only, whole-word,
 * case-insensitive) in an <a href="/academy/glossary#term-..."> link and
 * returns React nodes. Used by CMS-driven copy blocks like the
 * Flesch-Kincaid calculator's educational sections, so editors never need
 * to add glossary links by hand.
 */
export function linkGlossaryTerms(
  text: string,
  terms: GlossaryTerm[] = GLOSSARY_TERMS,
): ReactNode {
  if (!text) return text;
  const phrases = linkablePhrases(terms);
  const used = new Set<string>();
  let remaining = text;
  let totalLinks = 0;
  const parts: ReactNode[] = [];
  let key = 0;

  for (;;) {
    if (totalLinks >= GLOSSARY_LINK_MAX_PER_POST) break;
    const hits = earliestMatches(remaining, phrases, used);
    if (hits.length === 0) break;
    const hit = hits[0];
    if (!hit) break;
    if (hit.index > 0) {
      parts.push(remaining.slice(0, hit.index));
    }
    parts.push(
      createElement(
        "a",
        {
          key: `gl-${key++}`,
          href: `/academy/glossary#${termAnchor(hit.canonical)}`,
          className:
            "text-[var(--accent-primary)] underline decoration-[var(--accent-primary)]/40 underline-offset-2 hover:decoration-[var(--accent-primary)]",
        },
        remaining.slice(hit.index, hit.index + hit.phraseLen),
      ),
    );
    used.add(hit.canonical);
    totalLinks += 1;
    remaining = remaining.slice(hit.index + hit.phraseLen);
  }

  if (remaining) {
    parts.push(remaining);
  }
  if (parts.length === 0) return text;
  return createElement(Fragment, null, parts);
}
