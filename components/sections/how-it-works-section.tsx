import {
  DsBadge,
  DsCard,
  DsSection,
  DsSectionContainer,
  MagnifierIcon,
} from "@/components/design-system";

const progressSteps = [
  "Audit",
  "Content",
  "Distribution",
  "Verification",
  "Measurement",
] as const;

export function HowItWorksSection() {
  return (
    <DsSection
      id="solutions"
      className="relative overflow-hidden ds-section-alt"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_58%,rgba(67,255,119,0.24),transparent_24%),radial-gradient(circle_at_85%_0%,rgba(67,255,119,0.12),transparent_28%)]" />

      <DsSectionContainer className="relative">
        <div className="flex flex-col items-center gap-3 text-center">
          <DsBadge variant="muted">Process</DsBadge>
          <h2 className="text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-white tablet:text-[40px]">
            From analysis to ChatGPT answer
          </h2>
          <p className="max-w-[560px] text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40 tablet:text-[16px] tablet:leading-[1.5]">
            Five steps - from a visibility audit to measurable growth in AI mentions.
          </p>
        </div>

        <div className="mt-14 grid gap-6 desktop:grid-cols-[360px_minmax(0,1fr)]">
          <DsCard className="relative overflow-hidden border-white/8 bg-[linear-gradient(180deg,rgba(19,21,19,0.96),rgba(8,9,8,1))] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)]">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,255,103,0.42),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/6" />
            <div className="relative flex h-full flex-col">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/8 bg-[rgba(103,255,103,0.08)] shadow-[0_0_32px_rgba(103,255,103,0.12)]">
                <MagnifierIcon className="h-6 w-6 text-white" />
              </div>

              <div className="mt-auto pt-24">
                <h3 className="text-[18px] font-bold leading-[1.4] tracking-[-0.02em] text-white">
                  Current Visibility Audit
                </h3>
                <p className="mt-2 max-w-[260px] text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40">
                  We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you now. We fix the baseline - how often you&apos;re mentioned in target queries and alongside which competitors.
                </p>
              </div>
            </div>
          </DsCard>

          <div className="relative min-h-[420px] overflow-hidden rounded-[28px] border border-white/6 bg-[linear-gradient(180deg,rgba(9,11,10,1),rgba(8,9,8,1))]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(103,255,103,0.08),transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-[52%] bg-[linear-gradient(180deg,transparent,rgba(103,255,103,0.09))]" />
            <div
              className="absolute inset-0 opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(103,255,103,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(103,255,103,0.14) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                backgroundPosition: "0 0, 0 0",
                maskImage:
                  "linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.65) 40%, rgba(0,0,0,1))",
              }}
              aria-hidden="true"
            />

            <div className="relative flex h-full flex-col px-6 pb-6 pt-10 tablet:px-10">
              <DsBadge variant="muted" className="mx-auto">
                Audit
                <span className="ml-2 rounded-full bg-[rgba(255,255,255,0.08)] px-2 py-0.5 text-[10px] tracking-[0.08em] text-white/60">
                  01
                </span>
              </DsBadge>

              <div className="mt-6 text-center">
                <h3 className="text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-white tablet:text-[40px]">
                  From analysis to ChatGPT answer
                </h3>
                <p className="mt-2 text-[12px] leading-[1.4] tracking-[-0.02em] text-white/38 tablet:text-[16px] tablet:leading-[1.5]">
                  Five steps - from a visibility audit to measurable growth in AI mentions.
                </p>
              </div>

              <div className="mt-auto flex items-end">
                <div className="relative h-[320px] w-full">
                  <div className="absolute left-0 top-[18px] h-[250px] w-[280px] overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(75,255,107,0.65),rgba(8,9,8,0.92))] shadow-[0_0_0_2px_rgba(255,255,255,0.03)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_50%_20%,rgba(103,255,103,0.2),transparent_52%)]" />
                    <div className="relative flex h-full flex-col px-5 pb-5 pt-8">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-white/8 bg-[rgba(0,0,0,0.35)] text-white shadow-[0_0_28px_rgba(103,255,103,0.18)]">
                        <MagnifierIcon className="h-6 w-6 text-white" />
                      </div>
                      <div className="mt-auto">
                        <h4 className="text-[16px] font-bold leading-[1.4] tracking-[-0.02em] text-white">
                          Current Visibility Audit
                        </h4>
                        <p className="mt-1 max-w-[210px] text-[10px] leading-[1.4] tracking-[-0.02em] text-white/44">
                          We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you now.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-x-0 bottom-0 h-[104px]">
                    <div className="relative h-full">
                      <div className="absolute inset-x-0 bottom-0 h-5 bg-[linear-gradient(90deg,rgba(103,255,103,0.18),rgba(255,255,255,0.05))]" />
                      <div className="absolute left-[7%] right-[7%] top-1/2 h-px bg-white/10" />
                      <div className="absolute left-[7%] right-[7%] top-1/2 -translate-y-1/2">
                        <div className="flex items-center gap-1">
                          {progressSteps.map((step, index) => (
                            <div
                              key={step}
                              className={`flex h-6 items-center rounded-full px-3 text-[10px] leading-none tracking-[0.04em] text-white ${
                                index === 0
                                  ? "bg-[rgba(103,255,103,0.14)] border border-[rgba(103,255,103,0.28)]"
                                  : "opacity-40"
                              }`}
                            >
                              {step}
                              <span className="ml-2 rounded-full bg-white/8 px-1.5 py-0.5 text-[9px] text-white/60">
                                0{index + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
