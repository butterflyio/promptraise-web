import type { TocEntry } from "@/lib/blog-headings";

/**
 * Auto-generated table of contents for blog posts.
 *
 * Built from the same PortableText block list that renders the body, so ids
 * always match the headings (see lib/blog-headings.ts). Server-rendered
 * `<nav aria-label="Table of contents">` - screen-reader friendly and easily
 * parsed by LLM crawlers.
 *
 * Why it helps (see research): the TOC is not a ranking lever by itself;
 * the heading structure it mirrors is what both Google and LLMs reward.
 * Same-page anchors also give models clean fragment deep-links
 * (e.g. promptraise.com/blog/x#context-specific-anchor).
 *
 * Deliberately NO TableOfContents JSON-LD: Google retired that rich result
 * (the docs page 404s), so the markup would be dead bytes. Plain HTML anchors
 * work for readers, crawlers and models alike.
 */
export function BlogToc({ headings }: { headings: TocEntry[] }) {
  if (!headings.length) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="mt-8 rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.02)] p-5"
    >
      <p className="text-[11px] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
        Table of Contents
      </p>
      <ol className="mt-3 space-y-1.5">
        {headings.map((h) => (
          <li key={h.key} className={h.level === 3 ? "pl-4" : undefined}>
            <a
              href={`#${h.id}`}
              className="text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent-primary)]"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
