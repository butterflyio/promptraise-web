export default function Home() {
  return (
    <main>
      <section className="border-b border-[var(--border-default)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:py-28">
          <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
            LLM Ranking and AI Visibility
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] md:text-6xl">
            We help Web3 projects rank across AI summaries, LLM responses, and
            search surfaces.
          </h1>
          <p className="max-w-2xl text-lg text-[var(--text-secondary)]">
            PromptRaise optimizes how your project appears in ChatGPT,
            Perplexity, Claude, and emerging AI search engines.
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

      <section
        id="case-studies"
        className="border-b border-[var(--border-default)]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Case study highlights
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Placeholder module for case study cards. Content wiring comes in V2
            once Sanity article templates are active.
          </p>
        </div>
      </section>

      <section
        id="resources"
        className="border-b border-[var(--border-default)]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Resources and guides
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            Placeholder section for recurring thought leadership and monthly AI
            ranking updates.
          </p>
        </div>
      </section>

      <section id="audit">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Request a free audit
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--text-secondary)]">
            The audit flow currently routes to the web app. Telegram bot flow
            will be introduced later.
          </p>
        </div>
      </section>
    </main>
  );
}
