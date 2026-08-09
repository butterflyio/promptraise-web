import {
  DsBadge,
  DsCard,
  DsSection,
  DsSectionContainer,
} from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";

const layers = [
  {
    index: "01",
    name: "PromptRaise Engine",
    description:
      "AI content gap analysis engine. Scans Reddit, Twitter/X, Telegram, and the LLM landscape to deliver a precise plan: what to write, for whom, on which platforms.",
    benefits: [
      "Community and audience question analysis",
      "Competitive content audit",
      "High LLM-intent keyword identification",
      "Individual briefs for each creator",
      "Atlas Dashboard: three priority cards",
    ],
    highlighted: true,
  },
  {
    index: "02",
    name: "Content from Real People",
    description:
      "Every piece is created by a real author with a real audience and published on platforms LLM models trust. No AI-generated filler. Real voices in authoritative sources.",
    benefits: [
      "Unique angle and voice for each creator",
      "Publications in Tier-1–2 crypto media",
      "Medium, Twitter, Substack, niche blogs",
      "Quality control before every publication",
      "Transparent reporting — client sees everything",
    ],
  },
];

function BenefitBullet({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3 text-[15px] leading-[1.5] tracking-[-0.02em] text-white/78">
      <span className="mt-1 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border border-[rgba(153,255,153,0.55)] bg-[rgba(153,255,153,0.08)]">
        <span className="h-1.5 w-1.5 rounded-[2px] bg-[var(--accent-primary)]" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function PricingSection() {
  return (
    <DsSection id="pricing" className="ds-section-alt relative overflow-hidden">
      <SectionLabel name="PricingSection" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_58%_20%,rgba(109,255,146,0.42),rgba(109,255,146,0.12)_24%,transparent_60%)]" />
        <div className="absolute top-14 left-1/2 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(87,255,129,0.18)_0%,rgba(87,255,129,0.06)_38%,transparent_72%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.18),rgba(0,0,0,0.36))]" />
      </div>

      <DsSectionContainer className="tablet:py-24 relative">
        <div className="relative">
          <div className="desktop:grid-cols-[minmax(0,1fr)_auto] desktop:items-start grid gap-4">
            <div className="max-w-[720px]">
              <h2 className="mobile:text-[52px] text-[40px] leading-[0.98] font-semibold tracking-[-0.06em] text-white">
                We create content
                <br />
                that trains AI
              </h2>
              <p className="mt-4 max-w-[660px] text-[15px] leading-[1.55] tracking-[-0.02em] text-white/38">
                Real creators, authoritative media, right structure.
                <br />
                This is exactly the content LLM models read, index, and
                reproduce in their answers.
              </p>
            </div>

            <DsBadge
              variant="muted"
              className="desktop:justify-self-end justify-self-start px-5 py-2 text-[15px] leading-none"
            >
              How we solve it
            </DsBadge>
          </div>

          <div className="desktop:grid mt-10 hidden grid-cols-[72px_minmax(0,1.1fr)_minmax(0,1fr)] border-b border-white/8 pb-4 text-[13px] tracking-[-0.02em] text-white/28">
            <div>Layer</div>
            <div>Layer Name</div>
            <div>Benefits</div>
          </div>

          <DsCard className="mt-4 overflow-hidden rounded-[40px] border-white/6 bg-[linear-gradient(180deg,rgba(13,18,14,0.98),rgba(7,8,7,0.98))] shadow-[0_40px_120px_rgba(0,0,0,0.25)]">
            {layers.map((layer, index) => (
              <article
                key={layer.name}
                className={`desktop:grid-cols-[72px_minmax(0,1.1fr)_minmax(0,1fr)] desktop:gap-8 desktop:px-8 desktop:py-10 grid gap-6 px-6 py-8 ${
                  index > 0 ? "border-t border-white/6" : ""
                } ${layer.highlighted ? "bg-[linear-gradient(90deg,rgba(82,255,130,0.06),transparent_70%)]" : ""}`}
              >
                <div className="desktop:pt-2 pt-1 text-[13px] tracking-[0.08em] text-white/38">
                  {layer.index}
                </div>

                <div className="max-w-[520px]">
                  <h3 className="mobile:text-[30px] text-[26px] leading-[1.1] font-semibold tracking-[-0.04em] text-white">
                    {layer.name}
                  </h3>
                  <p className="mt-4 max-w-[430px] text-[15px] leading-[1.55] tracking-[-0.02em] text-white/34">
                    {layer.description}
                  </p>
                </div>

                <ul className="desktop:pt-2 flex flex-col gap-4 pt-1">
                  {layer.benefits.map((benefit) => (
                    <BenefitBullet key={benefit}>{benefit}</BenefitBullet>
                  ))}
                </ul>
              </article>
            ))}
          </DsCard>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
