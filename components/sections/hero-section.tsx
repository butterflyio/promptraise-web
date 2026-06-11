"use client";

interface HeroSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
}

export function HeroSection({
  auditUrl = "https://audit.promptraise.com",
}: HeroSectionProps) {
  return (
    <section className="prompt-hero-bg desktop:min-h-screen relative min-h-[720px] overflow-hidden bg-[#020604]">
      <div className="prompt-hero-vignette" aria-hidden="true" />

      <div className="mobile:px-6 tablet:pt-[200px] desktop:min-h-screen desktop:pt-[203px] relative z-10 mx-auto flex min-h-[720px] max-w-[1248px] flex-col items-center px-5 pt-[190px] text-center">
        <div className="flex max-w-[760px] flex-col items-center">
          <div className="mb-[13px] inline-flex h-[27px] items-center gap-2 rounded-full bg-white/10 px-3.5 backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="text-[11px] leading-none text-white/70">
              GEO · LLM Visibility · Web3
            </span>
          </div>

          <h1 className="mobile:text-[48px] tablet:text-[54px] mb-5 text-[42px] leading-[0.96] font-normal text-white">
            Be the <strong className="font-semibold">answer</strong>
            <br />
            not the search result.
          </h1>

          <p className="mb-[38px] max-w-[560px] text-[13px] leading-[1.45] text-white/80">
            When an investor asks ChatGPT about your niche — they get 2–7 names.
            <br />
            PromptRaise makes sure one of them is yours.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href={auditUrl}
              className="group inline-flex h-[43px] items-center rounded-full bg-white pl-[18px] text-[12px] leading-none font-medium text-black transition-transform hover:scale-[1.03]"
            >
              <span>Get Free Audit</span>
              <span className="mr-1 ml-3 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#43df4d] text-white">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="text-black"
                >
                  <path
                    d="M3 11L11 3M11 3H4M11 3V10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>

            <a
              href="#how-it-works"
              className="inline-flex h-[43px] items-center rounded-full border border-white/10 bg-black/30 px-[19px] text-[12px] leading-none font-medium text-white backdrop-blur-md transition-colors hover:bg-black/45"
            >
              How it works
            </a>
          </div>
        </div>

        <div className="absolute right-0 bottom-[92px] left-0 flex flex-col items-center">
          <div className="mb-5 flex items-center gap-2 text-[11px] leading-none text-white/45">
            <span>Tracking visibility in</span>
            <span className="rounded-full bg-black/30 px-2 py-1 text-[9px] font-semibold text-white/80">
              48 LLMs
            </span>
          </div>

          <div className="prompt-trust-mask w-full max-w-[780px] overflow-hidden px-6">
            <div className="tablet:gap-7 flex items-center justify-center gap-6">
              {[
                { name: "Octals", icon: "◌", dim: true },
                { name: "45 Degrees°", icon: "↗" },
                { name: "Acme Corp", icon: "✦" },
                { name: "AlphaWave", icon: "⬢" },
                { name: "Alt+Shift", icon: "◍" },
                { name: "Capsule", icon: "●" },
                { name: "Basis", icon: "✶", dim: true },
              ].map((company) => (
                <div
                  key={company.name}
                  className={`flex shrink-0 items-center gap-2 text-white ${
                    company.dim ? "opacity-[0.15]" : "opacity-[0.88]"
                  }`}
                >
                  <span className="text-[22px] leading-none">
                    {company.icon}
                  </span>
                  <span className="text-[13px] leading-none font-semibold whitespace-nowrap">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
