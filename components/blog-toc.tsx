import type { TocEntry } from "@/lib/blog-headings";

/**
 * Auto-generated table of contents for blog posts.
 *
 * Built from the same PortableText block list that renders the body, so ids
 * always match the headings (see lib/blog-headings.ts). Server-rendered
 * `<nav aria-label="Table of contents">` - screen-reader friendly and easily
 * parsed by LLM crawlers.
 *
 * Layout (responsive, traffic is ~50/50 mobile/desktop):
 * - Mobile: single column, full-width touch targets (py-2.5), 15px text
 * - Desktop (md+): two-column grid so a 9-entry TOC stays compact
 * - Numbered items + hover highlight = the "interactive" feel
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
      className="mt-10 rounded-2xl border border-[var(--border-soft)] bg-[rgba(255,255,255,0.03)] p-6 md:p-8"
    >
      <div className="flex items-center gap-2.5">
        <span className="h-3 w-3 flex-shrink-0 rounded-sm bg-[var(--accent-primary)]" />
        <p className="text-sm font-semibold tracking-[0.1em] text-[var(--text-primary)] uppercase md:text-base">
          Table of contents
        </p>
      </div>

      <ol className="mt-5 grid gap-1 md:grid-cols-2 md:gap-x-10">
        {headings.map((h, i) => (
          <li key={h.key} className={h.level === 3 ? "md:pl-4" : undefined}>
            <a
              href={`#${h.id}`}
              className="group flex items-baseline gap-3 rounded-lg px-2 py-2.5 text-[15px] leading-snug font-medium text-[var(--text-secondary)] transition-colors hover:bg-[rgba(103,255,103,0.06)] hover:text-[var(--accent-primary)] md:text-base"
            >
              <span className="shrink-0 text-xs font-bold text-[var(--accent-primary)]/70 tabular-nums group-hover:text-[var(--accent-primary)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0">{h.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
