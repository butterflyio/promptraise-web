"use client";

import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";

type Term = {
  term: string;
  aliases?: string[];
  category: string;
  definition: string;
  example?: string;
};

/**
 * Progressive-enhancement layer for the Academy glossary.
 * All terms remain server-rendered in the DOM (SSR, indexable); this client
 * component adds search filtering, an A-Z quick-nav, and copy-permalink for a
 * given term without removing content that crawlers/AI engines need.
 */
export default function GlossaryScroller({
  terms,
  categories,
}: {
  terms: Term[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return terms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        (t.aliases || []).some((a) => a.toLowerCase().includes(q)) ||
        t.definition.toLowerCase().includes(q),
    );
  }, [query, terms]);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const letters = useMemo(() => {
    const s = new Set(
      terms.map((t) => (t.term[0] ?? "").toUpperCase()).filter(Boolean),
    );
    return s;
  }, [terms]);

  function scrollToTerm(term: string) {
    const el = document.getElementById("term-" + slugify(term));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function jumpToLetter(letter: string) {
    const match = terms.find((t) => (t.term[0] ?? "").toUpperCase() === letter);
    if (match) scrollToTerm(match.term);
  }

  return (
    <div className="mt-8 no-print">
      {/* Search */}
      <div className="relative mb-4 max-w-md">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path
            d="M10.5 10.5L13.5 13.5"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms, aliases, definitions..."
          className="w-full rounded-xl border border-[var(--border-soft)] bg-[var(--bg-surface)] py-2.5 pl-9 pr-16 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)]"
        />
        {query ? (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-1.5 py-0.5 text-xs text-[var(--text-secondary)] bg-[var(--bg-surface-hover)]"
          >
            Clear
          </button>
        ) : (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-[var(--border-soft)] px-1.5 py-0.5 text-xs text-[var(--text-muted)]">
            ⌘K
          </span>
        )}
      </div>

      {/* Jump-to-result hint */}
      {filtered && (
        <p className="mb-3 text-sm text-[var(--text-secondary)]">
          <span className="font-medium text-[var(--text-primary)]">
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "result" : "results"} - tap a term to jump to
          it.
        </p>
      )}

      {/* A-Z quick nav */}
      <div className="mb-6 flex flex-wrap gap-1">
        {alphabet.map((letter) => {
          const active = letters.has(letter);
          return (
            <button
              key={letter}
              disabled={!active}
              onClick={() => jumpToLetter(letter)}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-md border text-sm font-medium transition-colors",
                active
                  ? "border-[var(--border-soft)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                  : "cursor-default border-transparent text-[var(--text-muted)]/40",
              )}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Filtered results (below-fold) - only rendered when searching */}
      {filtered && (
        <div className="mb-8 flex flex-col gap-2">
          {filtered.map((t) => (
            <button
              key={t.term}
              onClick={() => {
                setQuery("");
                setTimeout(() => scrollToTerm(t.term), 60);
              }}
              className="rounded-lg border border-[var(--border-soft)] bg-[var(--bg-surface)] px-4 py-2.5 text-left text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--text-primary)]"
            >
              <span className="font-medium text-[var(--text-primary)]">
                {t.term}
              </span>
              <span className="ml-2 text-xs text-[var(--text-muted)]">
                {t.category}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
