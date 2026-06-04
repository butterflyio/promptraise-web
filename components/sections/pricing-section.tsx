const tiers = [
  {
    name: "Starter",
    price: "$2,500",
    period: "/month",
    description: "For early-stage projects building initial AI visibility.",
    features: [
      "AI visibility audit",
      "3 LLM surfaces monitored",
      "Monthly ranking report",
      "Content optimization (2 pages)",
      "Telegram support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Growth",
    price: "$5,000",
    period: "/month",
    description: "For scaling projects that need comprehensive AI coverage.",
    features: [
      "Everything in Starter",
      "12 LLM surfaces monitored",
      "Weekly ranking updates",
      "Content optimization (10 pages)",
      "Perplexity & ChatGPT strategy",
      "Priority support",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description:
      "For established protocols requiring dedicated AI visibility management.",
    features: [
      "Everything in Growth",
      "Custom LLM surface coverage",
      "Daily monitoring & alerts",
      "Unlimited content optimization",
      "Dedicated account manager",
      "Custom integrations",
    ],
    cta: "Contact Us",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="border-b border-[var(--border-default)]">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 md:py-20">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          Pricing
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          Simple, transparent pricing
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col gap-6 rounded-xl border p-6 ${
                tier.highlighted
                  ? "border-[var(--accent-primary)] bg-[var(--bg-surface)]"
                  : "border-[var(--border-default)] bg-[var(--bg-base)]"
              }`}
            >
              <div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                  {tier.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-[var(--text-primary)]">
                    {tier.price}
                  </span>
                  <span className="text-sm text-[var(--text-muted)]">
                    {tier.period}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[var(--text-secondary)]">
                  {tier.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent-secondary)] text-[var(--accent-primary)]">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6L5 9L10 3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href={
                  tier.name === "Enterprise"
                    ? "https://t.me/placeholder"
                    : "https://audit.promptraise.com"
                }
                className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-opacity hover:opacity-90 ${
                  tier.highlighted
                    ? "bg-[var(--accent-primary)] text-[var(--accent-foreground)]"
                    : "border border-[var(--border-default)] text-[var(--text-primary)] hover:border-[var(--text-muted)]"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
