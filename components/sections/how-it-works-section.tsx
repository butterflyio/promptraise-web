const steps = [
  {
    number: "01",
    title: "Audit",
    description:
      "We analyze how your project currently appears across ChatGPT, Perplexity, Claude, and 9 other AI surfaces. Identify gaps, misinformation, and missed opportunities.",
  },
  {
    number: "02",
    title: "Optimize",
    description:
      "We restructure your content, metadata, and external signals to align with how LLMs extract and rank information. Technical and content fixes delivered.",
  },
  {
    number: "03",
    title: "Monitor",
    description:
      "Monthly tracking across all major LLMs and AI search engines. Watch your rankings improve and catch regressions before they cost you visibility.",
  },
  {
    number: "04",
    title: "Rank",
    description:
      "Your project becomes the cited source in AI summaries. Founders, investors, and users discover you organically through conversational search.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="solutions" className="border-b border-[var(--border-default)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          How It Works
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          From invisible to unavoidable
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="flex flex-col gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--accent-secondary)]"
            >
              <span className="font-mono text-sm text-[var(--accent-primary)]">
                {step.number}
              </span>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
