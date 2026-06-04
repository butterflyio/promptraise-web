export default function Home() {
  return (
    <main>
      <section className="border-b border-[var(--color-border)]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-20 md:py-28">
          <p className="text-sm tracking-[0.12em] text-[var(--color-text-muted)] uppercase">
            LLM Ranking and AI Visibility
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
            We help Web3 projects rank across AI summaries, LLM responses, and
            search surfaces.
          </h1>
          <p className="max-w-2xl text-lg text-[var(--color-text-muted)]">
            This shell is intentionally structural for Unit 5. Final visual
            fidelity and token values will be applied from Figma node 63-93.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://t.me/placeholder"
              className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-5 py-3 text-sm font-medium text-[var(--color-primary-foreground)]"
            >
              Join Telegram
            </a>
            <a
              href="https://audit.promptraise.com"
              className="inline-flex items-center rounded-full border border-[var(--color-border)] px-5 py-3 text-sm font-medium"
            >
              Get Free Audit
            </a>
          </div>
        </div>
      </section>

      <section
        id="case-studies"
        className="border-b border-[var(--color-border)]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Case study highlights
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            Placeholder module for case study cards. Content wiring comes in V2
            once Sanity article templates are active.
          </p>
        </div>
      </section>

      <section id="resources" className="border-b border-[var(--color-border)]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Resources and guides
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            Placeholder section for recurring thought leadership and monthly AI
            ranking updates.
          </p>
        </div>
      </section>

      <section id="audit">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold tracking-tight">
            Request a free audit
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--color-text-muted)]">
            The audit flow currently routes to the web app. Telegram bot flow
            will be introduced later.
          </p>
        </div>
      </section>
    </main>
  );
}
