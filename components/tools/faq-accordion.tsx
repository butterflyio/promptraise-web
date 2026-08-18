"use client";

import { useState } from "react";

import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ accordion. Answers stay in the DOM (good for SEO + AI
 * visibility) and ALL items are expanded by default so the FAQ can be read
 * without clicking each one. Clicking a question toggles just that item.
 */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(items.map((_, i) => i)),
  );

  const toggle = (i: number) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-3">
      {items.map((f, i) => {
        const isOpen = open.has(i);
        return (
          <div
            key={f.q}
            className={cn(
              "rounded-2xl border transition-colors",
              isOpen
                ? "border-[var(--accent-primary)] bg-[var(--bg-surface)]"
                : "border-[var(--border-default)] bg-[var(--bg-surface-panel)] hover:border-[var(--accent-secondary)]",
            )}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-semibold text-[var(--text-primary)]">
                {f.q}
              </span>
              <span
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-sm transition-transform duration-200",
                  isOpen
                    ? "rotate-45 border-[var(--accent-primary)] text-[var(--accent-primary)]"
                    : "border-[var(--border-default)] text-[var(--text-muted)]",
                )}
              >
                +
              </span>
            </button>
            {/* Answer stays rendered for crawlers/AI engines; visually collapsed. */}
            <div id={`faq-panel-${i}`} hidden={!isOpen} className="px-5 pb-5">
              <p className="border-t border-[var(--border-default)] pt-4 leading-relaxed text-[var(--text-secondary)]">
                {f.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
