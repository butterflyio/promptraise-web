// Turns plain prose into clickable internal links to the glossary: whenever a
// known readability/glossary term appears in page copy, it becomes an <a> to
// /academy/glossary#term-<slug>. Rendered server-side, so answer engines see
// the links too (not just users).

import type { ReactNode } from "react";

const GLOSSARY_URL = "/academy/glossary";

/** Term name -> glossary anchor (must match slugify used on the glossary pages). */
const TERM_LINKS: Record<string, string> = {
  Readability: "readability",
  "Flesch Reading Ease": "flesch-reading-ease",
  "Flesch-Kincaid Grade Level": "flesch-kincaid-grade-level",
  "Flesch-Kincaid": "flesch-kincaid-grade-level",
  "Gunning Fog": "gunning-fog-index",
  SMOG: "smog-index",
  "Simple Measure of Gobbledygook": "smog-index",
  "Coleman-Liau": "coleman-liau-index",
  "Automated Readability Index": "automated-readability-index-ari",
  ARI: "automated-readability-index-ari",
  "Dale-Chall": "dale-chall-readability-formula",
  "Linsear Write": "linsear-write-readability-formula",
  Polysyllabic: "polysyllabic-word",
  Heuristic: "heuristic",
};

const TERM_PATTERN = new RegExp(
  "\\b(" +
    Object.keys(TERM_LINKS)
      .sort((a, b) => b.length - a.length) // longest first
      .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|") +
    ")\\b",
  "g",
);

/** Wraps known glossary term names in <a href="/academy/glossary#term-...">. */
export function linkGlossaryTerms(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  TERM_PATTERN.lastIndex = 0;
  while ((m = TERM_PATTERN.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const term = m[0];
    const anchor = TERM_LINKS[term];
    if (anchor) {
      parts.push(
        <a
          key={`${term}-${m.index}`}
          href={`${GLOSSARY_URL}#term-${anchor}`}
          className="text-[var(--accent-primary)] hover:underline"
        >
          {term}
        </a>,
      );
    } else {
      parts.push(term);
    }
    last = m.index + term.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
