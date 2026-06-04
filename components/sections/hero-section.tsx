"use client";

import { useEffect, useState } from "react";

const words = ["ChatGPT", "Perplexity", "Claude", "Gemini", "AI Search"];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden border-b border-[var(--border-default)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:py-28">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          LLM Ranking and AI Visibility
        </p>

        <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] md:text-6xl">
          We help Web3 projects rank across{" "}
          <span className="inline-block min-w-[200px] text-[var(--accent-primary)] transition-all duration-500">
            {words[index]}
          </span>
          , LLM responses, and search surfaces.
        </h1>

        <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
          PromptRaise optimizes how your project appears in AI summaries,
          conversational search, and emerging discovery engines — so founders
          and investors find you first.
        </p>

        <div className="flex flex-wrap gap-3">
          <a
            href="https://t.me/placeholder"
            className="inline-flex items-center rounded-full bg-[var(--accent-primary)] px-5 py-3 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Join Telegram
          </a>
          <a
            href="https://audit.promptraise.com"
            className="inline-flex items-center rounded-full border border-[var(--border-default)] px-5 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--text-muted)]"
          >
            Get Free Audit
          </a>
        </div>
      </div>
    </section>
  );
}
