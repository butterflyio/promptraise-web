export function StatsSection() {
  return (
    <section className="tablet:py-28 relative overflow-hidden bg-[#0a0a0a] py-20">
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Headline */}
      <div className="mobile:px-6 relative z-10 mx-auto mb-16 max-w-2xl px-4 text-center">
        <h2 className="tablet:text-2xl desktop:text-3xl text-xl leading-snug font-medium text-white">
          If you are not in the AI responses — you do not exist,
          <br />
          and PromptRaise fixes that.
        </h2>
      </div>

      {/* Central glow with orbiting cards */}
      <div className="mobile:px-6 relative z-10 mx-auto max-w-5xl px-4">
        <div
          className="relative flex items-center justify-center"
          style={{ minHeight: "400px" }}
        >
          {/* Large central green glow */}
          <div
            className="tablet:h-96 tablet:w-96 absolute h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(103, 255, 103, 0.4) 0%, rgba(74, 222, 128, 0.2) 40%, transparent 70%)",
            }}
          />

          {/* Secondary glow ring */}
          <div
            className="tablet:h-[500px] tablet:w-[500px] absolute h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(103, 255, 103, 0.15) 0%, transparent 60%)",
            }}
          />

          {/* Subtle arc lines */}
          <svg
            className="absolute h-full w-full opacity-20"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <ellipse
              cx="300"
              cy="200"
              rx="250"
              ry="180"
              fill="none"
              stroke="rgba(103, 255, 103, 0.3)"
              strokeWidth="1"
            />
            <ellipse
              cx="300"
              cy="200"
              rx="200"
              ry="140"
              fill="none"
              stroke="rgba(103, 255, 103, 0.2)"
              strokeWidth="1"
            />
          </svg>

          {/* Stat Cards - positioned absolutely around the glow */}
          {/* Top Left */}
          <div className="tablet:left-[5%] tablet:top-[5%] absolute top-0 left-0">
            <div className="rounded-2xl border border-white/10 bg-[#1a1a1a]/80 px-6 py-4 backdrop-blur-md">
              <p className="tablet:text-3xl text-2xl font-semibold text-white">
                58%
              </p>
              <p className="mt-1 text-xs text-white/40">
                of searches today go through AI
              </p>
            </div>
          </div>

          {/* Top Right */}
          <div className="tablet:right-[5%] tablet:top-[5%] absolute top-0 right-0">
            <div className="rounded-2xl border border-white/10 bg-[#1a1a1a]/80 px-6 py-4 backdrop-blur-md">
              <p className="tablet:text-3xl text-2xl font-semibold text-white">
                3–5x growth
              </p>
              <p className="mt-1 text-xs text-white/40">growth in 90 days</p>
            </div>
          </div>

          {/* Bottom Left */}
          <div className="tablet:bottom-[10%] tablet:left-[8%] absolute bottom-0 left-0">
            <div className="rounded-2xl border border-white/10 bg-[#1a1a1a]/80 px-6 py-4 backdrop-blur-md">
              <p className="tablet:text-3xl text-2xl font-semibold text-white">
                2–7 projects
              </p>
              <p className="mt-1 text-xs text-white/40">per answer</p>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="tablet:bottom-[10%] tablet:right-[8%] absolute right-0 bottom-0">
            <div className="rounded-2xl border border-white/10 bg-[#1a1a1a]/80 px-6 py-4 backdrop-blur-md">
              <p className="tablet:text-3xl text-2xl font-semibold text-white">
                +40%
              </p>
              <p className="mt-1 text-xs text-white/40">inbound growth</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
