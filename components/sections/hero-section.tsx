"use client";

interface HeroSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
}

export function HeroSection({
  auditUrl = "https://audit.promptraise.com",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-[#050505]">
        {/* Base dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a1a0a] to-black" />

        {/* Aurora light streaks */}
        <div
          className="absolute -top-1/4 -right-1/4 h-[150%] w-[150%] opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 70% 30%, rgba(103, 255, 103, 0.3) 0%, transparent 50%),
              radial-gradient(ellipse 60% 40% at 80% 60%, rgba(74, 222, 128, 0.2) 0%, transparent 50%)
            `,
            filter: "blur(60px)",
          }}
        />

        {/* Secondary aurora from bottom */}
        <div
          className="absolute -bottom-1/4 -left-1/4 h-[150%] w-[150%] opacity-50"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 30% 70%, rgba(103, 255, 103, 0.25) 0%, transparent 50%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(34, 197, 94, 0.2) 0%, transparent 50%)
            `,
            filter: "blur(80px)",
          }}
        />

        {/* Light streak lines */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              linear-gradient(135deg, transparent 40%, rgba(103, 255, 103, 0.1) 50%, transparent 60%),
              linear-gradient(225deg, transparent 30%, rgba(103, 255, 103, 0.08) 45%, transparent 55%)
            `,
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Tagline pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67ff67]" />
            <span className="text-sm text-white/70">
              GEO · LLM Visibility · Web3
            </span>
          </div>

          {/* Headline */}
          <h1 className="tablet:text-7xl desktop:text-8xl mb-6 text-5xl leading-[1.1] font-normal tracking-tight text-white">
            Be the <em className="font-light italic">answer</em>
            <br />
            not the search result.
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-white/60">
            When an investor asks ChatGPT about your niche — they get 2–7 names.
            <br />
            PromptRaise makes sure one of them is yours.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            {/* Get Free Audit - White pill with green arrow circle */}
            <a
              href={auditUrl}
              className="group inline-flex items-center gap-0 rounded-full bg-white pl-6 text-sm font-medium text-black transition-transform hover:scale-105"
            >
              <span className="py-3">Get Free Audit</span>
              <span className="mx-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#67ff67]">
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

            {/* How it works - Dark translucent pill */}
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="tablet:flex-row tablet:justify-between mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-4">
            {/* Tracking text */}
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Tracking visibility in</span>
              <span className="rounded-md bg-[#67ff67]/20 px-2 py-0.5 text-xs font-medium text-[#67ff67]">
                48 LLMs
              </span>
            </div>

            {/* Scrolling logos */}
            <div className="flex items-center gap-6 overflow-hidden">
              {[
                { name: "45 Degrees°", icon: "↗" },
                { name: "Acme Corp", icon: "◆" },
                { name: "AlphaWave", icon: "◉" },
                { name: "Alt+Shift", icon: "◎" },
                { name: "Capsule", icon: "●" },
              ].map((company) => (
                <div
                  key={company.name}
                  className="flex items-center gap-2 text-white/30"
                >
                  <span className="text-lg">{company.icon}</span>
                  <span className="text-sm whitespace-nowrap">
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
