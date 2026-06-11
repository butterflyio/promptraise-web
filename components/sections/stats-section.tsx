const statCards = [
  {
    value: "58%",
    label: "of searches today go through AI",
    className: "top-[140px] left-4 tablet:left-[15%] tablet:top-[144px]",
  },
  {
    value: "3–5x growth",
    label: "growth in 90 days",
    className: "top-[124px] right-4 tablet:right-[17%] tablet:top-[126px]",
  },
  {
    value: "2–7 projects",
    label: "per answer",
    className: "top-[252px] left-8 tablet:left-[20.5%] tablet:top-[252px]",
  },
  {
    value: "+40%",
    label: "inbound growth",
    className: "top-[252px] right-8 tablet:right-[9.5%] tablet:top-[252px]",
  },
];

export function StatsSection() {
  return (
    <section className="prompt-stats-section bg-bg-base relative overflow-hidden">
      <div className="prompt-stats-grid" aria-hidden="true" />
      <div className="prompt-stats-orbits" aria-hidden="true" />

      <div className="mobile:px-6 relative z-10 mx-auto min-h-[424px] w-full max-w-[776px] px-4 pt-[58px]">
        <h2 className="mx-auto max-w-[360px] text-center text-[13px] leading-[1.15] font-normal text-white">
          If you are not in the AI responses — you do not exist,
          <br />
          <strong className="font-semibold">and PromptRaise fixes that.</strong>
        </h2>

        <div className="prompt-stats-center" aria-hidden="true">
          <div className="prompt-stats-logo-disc">
            <svg
              width="92"
              height="46"
              viewBox="0 0 92 46"
              fill="none"
              className="relative z-10"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M24.77 2H89L72.64 18.25H43.69l-3.67 6.22h26.02L46.03 44.4H25.5l11.8-19.93H22.2L10.43 44.4H1.34L24.77 2Z"
              />
              <path
                fill="var(--accent-primary)"
                fillOpacity="0.22"
                d="M32.97 9.84h36.13l-4.88 4.8H30.12l2.85-4.8Z"
              />
            </svg>
          </div>
        </div>

        {statCards.map((card) => (
          <div
            key={card.value}
            className={`prompt-stat-card absolute z-20 ${card.className}`}
          >
            <p className="tablet:text-[16px] text-center text-[15px] leading-none font-semibold text-white">
              {card.value}
            </p>
            <p className="mt-1 text-center text-[7px] leading-none text-white/30">
              {card.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
