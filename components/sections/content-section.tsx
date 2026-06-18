import { DsBadge, DsSection, DsSectionContainer } from "@/components/design-system";
import { CheckCircleIcon } from "@radix-ui/react-icons";

const contentFeatures = [
  {
    id: 1,
    title: "PromptRaise Engine",
    description: "AI-powered content generation and distribution.",
    features: [
      "Continually-exhaustive question coverage",
      "Copyrights content audit",
      "High-load & recent manipulation",
      "Individuals built, API-low-powered & deep activity views",
    ],
  },
  {
    id: 2,
    title: "Content from Real People",
    description: "Authentic voices that resonate in AI systems.",
    features: [
      "Human-age and voice for each reader",
      "Publication in the top platforms",
      "Quality control before every publication",
      "Transparent reporting — detect spam everything",
    ],
  },
];

export function ContentSection() {
  return (
    <DsSection className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(103,255,103,0.12),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(103,255,103,0.08),transparent_42%)]" />

      <DsSectionContainer className="relative">
        <div className="mb-16 flex flex-col gap-3">
          <h2 className="text-[32px] font-bold leading-[1.2] tracking-[-0.02em] text-white tablet:text-[48px]">
            We create content that trains AI
          </h2>
          <p className="max-w-[640px] text-[14px] leading-[1.5] tracking-[-0.01em] text-white/50 tablet:text-[16px]">
            Real content, curated/ratified feeds, LLM structure. This is exactly the content LLM models read, learn, and redistribute in their answers.
          </p>
        </div>

        <div className="grid gap-8 tablet:grid-cols-2">
          {contentFeatures.map((feature, idx) => (
            <div key={feature.id} className="flex flex-col gap-6">
              {/* Feature Header with Number */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                  <span className="text-[18px] font-bold text-[#67FF67]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="text-[20px] font-bold leading-[1.3] tracking-[-0.01em] text-white tablet:text-[24px]">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.4] tracking-[-0.01em] text-white/40 tablet:text-[14px]">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-3 pl-16">
                {feature.features.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-1 h-4 w-4 flex-shrink-0 text-[#67FF67]" />
                    <span className="text-[12px] leading-[1.4] tracking-[-0.01em] text-white/60 tablet:text-[13px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
