const features = [
  {
    name: "LLM Surface Coverage",
    promptraise: true,
    traditional: false,
    diy: false,
  },
  {
    name: "AI Summary Optimization",
    promptraise: true,
    traditional: false,
    diy: false,
  },
  {
    name: "Perplexity Ranking",
    promptraise: true,
    traditional: false,
    diy: false,
  },
  {
    name: "ChatGPT Citation Strategy",
    promptraise: true,
    traditional: false,
    diy: false,
  },
  {
    name: "Monthly AI Ranking Report",
    promptraise: true,
    traditional: false,
    diy: false,
  },
  { name: "Technical SEO", promptraise: true, traditional: true, diy: true },
  { name: "Content Strategy", promptraise: true, traditional: true, diy: true },
  {
    name: "Backlink Building",
    promptraise: true,
    traditional: true,
    diy: false,
  },
];

function Check() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-[var(--accent-primary)]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6L5 9L10 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function Cross() {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--border-subtle)] text-[var(--text-muted)]">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path
          d="M3 3L9 9M9 3L3 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className="border-b border-[var(--border-default)]">
      <div className="tablet:py-20 mx-auto w-full max-w-6xl px-6 py-16">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          Comparison
        </p>
        <h2 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          AI visibility is not traditional SEO
        </h2>

        <div className="mt-12 overflow-hidden rounded-xl border border-[var(--border-default)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
                  <th className="px-6 py-4 font-medium text-[var(--text-primary)]">
                    Feature
                  </th>
                  <th className="px-6 py-4 font-medium text-[var(--accent-primary)]">
                    PromptRaise
                  </th>
                  <th className="px-6 py-4 font-medium text-[var(--text-muted)]">
                    Traditional SEO
                  </th>
                  <th className="px-6 py-4 font-medium text-[var(--text-muted)]">
                    DIY
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, i) => (
                  <tr
                    key={feature.name}
                    className={
                      i % 2 === 0
                        ? "bg-[var(--bg-base)]"
                        : "bg-[var(--bg-surface)]"
                    }
                  >
                    <td className="px-6 py-4 text-[var(--text-secondary)]">
                      {feature.name}
                    </td>
                    <td className="px-6 py-4">
                      <Check />
                    </td>
                    <td className="px-6 py-4">
                      {feature.traditional ? <Check /> : <Cross />}
                    </td>
                    <td className="px-6 py-4">
                      {feature.diy ? <Check /> : <Cross />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
