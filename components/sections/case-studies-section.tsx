const cases = [
  {
    project: "DeFi Protocol X",
    category: "DeFi",
    result: "3.5x increase in ChatGPT citations",
    description:
      "Optimized technical documentation and structured data to become the primary cited source for DeFi yield strategies.",
  },
  {
    project: "Layer 2 Network Y",
    category: "Infrastructure",
    result: "Top-3 Perplexity ranking",
    description:
      "Restructured developer docs and ecosystem pages to dominate AI search results for scaling solutions.",
  },
  {
    project: "NFT Marketplace Z",
    category: "NFT",
    result: "85% AI summary accuracy",
    description:
      "Corrected misinformation in AI summaries and established authoritative presence across 8 LLM surfaces.",
  },
];

export function CaseStudiesSection() {
  return (
    <section
      id="case-studies"
      className="border-b border-[var(--border-default)]"
    >
      <div className="tablet:py-20 mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          Case Studies
        </p>
        <h2 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          Proven results across Web3
        </h2>

        <div className="tablet:grid-cols-3 mt-12 grid gap-6">
          {cases.map((caseStudy) => (
            <div
              key={caseStudy.project}
              className="flex flex-col gap-4 rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--accent-secondary)]"
            >
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[var(--accent-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-primary)]">
                  {caseStudy.category}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                {caseStudy.project}
              </h3>
              <p className="text-sm font-medium text-[var(--accent-primary)]">
                {caseStudy.result}
              </p>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {caseStudy.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
