import {
  CheckIcon,
  DsBadge,
  DsCard,
  DsSection,
  DsSectionContainer,
  MinusIcon,
} from "@/components/design-system";

const competitors = [
  { name: "PromptRaise", highlight: true, price: "$3,000" },
  { name: "Profound", price: "$499" },
  { name: "AthenaHQ", price: "$49" },
  { name: "coinbound", price: "Custom" },
] as const;

const rows = [
  "Content gap analysis",
  "LLM tracking (ChatGPT, Gemini...)",
  "Content from real creators",
  "On-chain verification",
  "Tier-1–2 Web3 media PR",
  "Web3 specialization",
  "Price/mo (start)",
] as const;

const rowMatrix = [
  [true, false, false, false],
  [true, true, true, false],
  [true, false, false, true],
  [true, false, false, false],
  [true, false, false, true],
  [true, false, false, true],
  [true, false, false, false],
] as const;

function CheckMark({ active }: { active?: boolean }) {
  return active ? (
    <CheckIcon className="h-5 w-5 text-[var(--accent-primary)]" />
  ) : (
    <MinusIcon className="h-5 w-5 text-white/26" />
  );
}

export function ComparisonSection() {
  return (
    <DsSection className="relative overflow-hidden ds-section-alt">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_70%,rgba(67,255,119,0.22),transparent_18%),radial-gradient(circle_at_100%_32%,rgba(67,255,119,0.26),transparent_18%)]" />

      <DsSectionContainer className="relative">
        <div className="flex flex-col items-center gap-3 text-center">
          <DsBadge variant="muted">Comparison</DsBadge>
          <h2 className="text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-white tablet:text-[40px]">
            PromptRaise vs Competitors
          </h2>
          <p className="max-w-[540px] text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40 tablet:text-[16px] tablet:leading-[1.5]">
            Competitors can track. We close the full loop - from analysis to publication and measurable result.
          </p>
        </div>

        <DsCard className="mt-12 overflow-hidden border-white/6 bg-[linear-gradient(180deg,rgba(9,11,10,0.98),rgba(8,9,8,1))] px-5 py-6 tablet:px-8">
          <div className="grid grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] gap-4 pb-4 text-[12px] tracking-[-0.02em] text-white/42">
            <div />
            {competitors.map((competitor) => (
              <div
                key={competitor.name}
                className={`flex items-center justify-center gap-2 rounded-[20px] px-3 py-2 ${
                  competitor.name === "PromptRaise" ? "bg-[rgba(67,255,119,0.08)] text-white" : "text-white/72"
                }`}
              >
                <span className="text-[12px] font-semibold tracking-[-0.02em]">
                  {competitor.name}
                </span>
              </div>
            ))}
          </div>

          <div className="grid gap-y-2">
            {rows.map((row, rowIndex) => (
              <div
                key={row}
                className="grid grid-cols-[1.5fr_repeat(4,minmax(0,1fr))] items-center gap-4"
              >
                <div className="py-4 text-[16px] leading-[1.5] tracking-[-0.02em] text-white/72">
                  {row}
                </div>

                {competitors.map((competitor) => (
                <div
                  key={`${competitor.name}-${row}`}
                  className={`flex min-h-[56px] items-center justify-center rounded-[20px] px-3 text-center ${
                      competitor.name === "PromptRaise"
                        ? "bg-[linear-gradient(180deg,rgba(103,255,103,0.18),rgba(103,255,103,0.05))] shadow-[0_0_0_1px_rgba(103,255,103,0.28)]"
                        : "bg-transparent"
                    }`}
                >
                  {rowIndex === rows.length - 1 ? (
                      <span className={`text-[16px] tracking-[-0.02em] ${competitor.name === "PromptRaise" ? "text-[var(--accent-primary)]" : "text-white/72"}`}>
                        {competitor.price}
                      </span>
                    ) : (
                      <CheckMark active={rowMatrix[rowIndex]?.[competitors.indexOf(competitor)] ?? false} />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </DsCard>
      </DsSectionContainer>
    </DsSection>
  );
}
