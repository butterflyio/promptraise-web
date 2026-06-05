export function StatsSection() {
  const stats = [
    {
      value: "58%",
      label: "of searches today go through AI",
      position: "top-left",
    },
    {
      value: "3–5x growth",
      label: "growth in 90 days",
      position: "top-right",
    },
    {
      value: "2–7 projects",
      label: "per answer",
      position: "bottom-left",
    },
    {
      value: "+40%",
      label: "inbound growth",
      position: "bottom-right",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-32">
      {/* Headline */}
      <div className="mx-auto mb-16 max-w-2xl px-6 text-center">
        <h2 className="text-2xl font-medium leading-snug text-white md:text-3xl">
          If you are not in the AI responses — you do not exist,
          <br />
          and PromptRaise fixes that.
        </h2>
      </div>

      {/* Central orbiting stats layout */}
      <div className="relative mx-auto max-w-4xl px-6">
        {/* Central glow circle with logo */}
        <div className="relative mx-auto flex h-64 w-64 items-center justify-center md:h-80 md:w-80">
          {/* Outer glow rings */}
          <div className="absolute inset-0 rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, #67ff67 0%, transparent 70%)" }}
          />
          <div className="absolute inset-4 rounded-full opacity-20 blur-2xl"
            style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)" }}
          />
          
          {/* Inner circle with texture effect */}
          <div className="relative flex h-48 w-48 items-center justify-center rounded-full md:h-56 md:w-56"
            style={{
              background: "radial-gradient(circle at 30% 30%, #2a4a2a 0%, #1a2a1a 50%, #0a1a0a 100%)",
              boxShadow: "0 0 60px rgba(103, 255, 103, 0.3), inset 0 0 40px rgba(103, 255, 103, 0.1)",
            }}
          >
            {/* R Logo */}
            <svg
              viewBox="0 0 100 100"
              className="h-20 w-20 text-white md:h-24 md:w-24"
              fill="currentColor"
            >
              <path d="M20 20 L60 20 Q75 20 75 35 Q75 50 60 50 L45 50 L75 80 L55 80 L30 50 L30 80 L20 80 Z M30 30 L30 42 L55 42 Q62 42 62 36 Q62 30 55 30 Z" />
            </svg>
          </div>
        </div>

        {/* Stat cards positioned around the circle */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:absolute md:inset-0 md:mt-0">
          {/* Top Left */}
          <div className="flex justify-start md:absolute md:left-0 md:top-[10%]">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white md:text-3xl">58%</p>
              <p className="mt-1 text-xs text-white/50">of searches today go through AI</p>
            </div>
          </div>

          {/* Top Right */}
          <div className="flex justify-end md:absolute md:right-0 md:top-[10%]">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white md:text-3xl">3–5x growth</p>
              <p className="mt-1 text-xs text-white/50">growth in 90 days</p>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="flex justify-start md:absolute md:bottom-[10%] md:left-0">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white md:text-3xl">2–7 projects</p>
              <p className="mt-1 text-xs text-white/50">per answer</p>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="flex justify-end md:absolute md:bottom-[10%] md:right-0">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
              <p className="text-2xl font-semibold text-white md:text-3xl">+40%</p>
              <p className="mt-1 text-xs text-white/50">inbound growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
