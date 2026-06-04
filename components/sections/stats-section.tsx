const stats = [
  { value: "50+", label: "Web3 Projects Optimized" },
  { value: "12", label: "LLM Surfaces Covered" },
  { value: "3.2x", label: "Avg. Ranking Improvement" },
  { value: "94%", label: "Client Retention Rate" },
];

export function StatsSection() {
  return (
    <section className="border-b border-[var(--border-default)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-[var(--accent-primary)] md:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-[var(--text-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
