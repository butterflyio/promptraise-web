"use client";

import { DsSection, DsSectionContainer } from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
import type { HomePage } from "@/sanity/lib/queries";

const DEFAULT_LAYERS = [
  {
    id: 1,
    number: "01",
    title: "PromptRaise Engine",
    description:
      "AI content gap analysis engine. Scans Reddit, Twitter/X, Telegram, and the LLM landscape - delivers a precise plan: what to write, for whom, on which platforms.",
    benefits: [
      "Community and audience question analysis",
      "Competitive content audit",
      "High LLM-intent keyword identification",
      "Individual briefs for each creator",
      "Atlas Dashboard: three priority cards",
    ],
  },
  {
    id: 2,
    number: "02",
    title: "Content from Real People",
    description:
      "Every piece is created by a real author with a real audience and published on platforms LLM models trust. No AI-generated filler. Real voices in authoritative sources.",
    benefits: [
      "Unique angle and voice for each creator",
      "Publications in Tier 1-2 crypto media",
      "Medium, Twitter, Substack, niche blogs",
      "Quality control before every publication",
      "Transparent reporting: client sees everything",
    ],
  },
];

interface AiTrainingSectionProps {
  content?: HomePage["aiTraining"];
}

export function AiTrainingSection({ content }: AiTrainingSectionProps) {
  const layers =
    content?.layers && content.layers.length > 0
      ? content.layers.map((layer, i) => ({
          id: i + 1,
          number:
            layer.number ??
            DEFAULT_LAYERS[i]?.number ??
            String(i + 1).padStart(2, "0"),
          title: layer.title ?? DEFAULT_LAYERS[i]?.title ?? "",
          description:
            layer.description ?? DEFAULT_LAYERS[i]?.description ?? "",
          benefits: layer.benefits ?? DEFAULT_LAYERS[i]?.benefits ?? [],
        }))
      : DEFAULT_LAYERS;

  return (
    <DsSection className="ds-section-alt">
      <SectionLabel name="AiTrainingSection" />
      {/* Ambient green glow echoes the site accent used across sections */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(103,255,103,0.06),transparent_50%)]" />

      <DsSectionContainer className="relative">
        {/* Header */}
        <div className="mb-12 flex items-start justify-between gap-8">
          <div>
            <h2 className="max-w-2xl font-sans text-4xl leading-tight font-bold text-white">
              {content?.heading ?? "We create content that trains AI"}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60">
              {content?.subtext ?? (
                <>
                  Real creators, authoritative media, right structure.
                  <br />
                  This is exactly the content LLM models read, index, and
                  reproduce in their answers.
                </>
              )}
            </p>
          </div>

          <div className="tablet:flex hidden shrink-0 items-center gap-0">
            <div
              style={{
                width: 60,
                height: 1,
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2))",
              }}
            />
            <div
              className="shrink-0 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide text-white/60"
              style={{
                background: "rgba(20,22,20,0.6)",
                border: "1px solid rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
              }}
            >
              {content?.badge ?? "How we solve it"}
            </div>
            <div
              style={{
                width: 60,
                height: 1,
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
              }}
            />
          </div>
        </div>

        {/* Column labels */}
        <div className="tablet:flex mb-3 hidden w-full max-w-[1200px] items-center justify-between text-xs text-white/40">
          <div className="flex items-center gap-4">
            <span className="w-[72px]">Layer</span>
            <span className="w-[200px]">Layer Name</span>
          </div>
          <span className="w-[320px]">Benefits</span>
        </div>

        {/* Layer cards */}
        <div className="flex flex-col gap-3">
          {layers.map((layer) => (
            <div
              key={layer.id}
              className="tablet:flex-row tablet:items-start tablet:justify-between tablet:gap-4 tablet:p-6 flex w-full flex-col gap-6 p-5"
              style={{ background: "rgba(19,22,25,0.25)" }}
            >
              {/* Number */}
              <div className="tablet:w-[72px]">
                <span className="text-xs text-[#aaa]">{layer.number}</span>
              </div>

              {/* Title + description */}
              <div className="tablet:flex-[1_1_0%]">
                <h3 className="bg-gradient-to-b from-white to-white/90 bg-clip-text text-2xl font-bold text-transparent">
                  {layer.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-white/40">
                  {layer.description}
                </p>
              </div>

              {/* Benefit pills */}
              <div className="tablet:w-[380px] tablet:flex-col tablet:gap-1 flex">
                {layer.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-2 overflow-hidden rounded-[20px] py-1 pr-5 pl-3"
                  >
                    <span className="relative block h-[14px] w-[14px] shrink-0">
                      <span className="absolute inset-[12.5%] rounded-full bg-[var(--accent-primary)]" />
                    </span>
                    <span className="text-xs whitespace-nowrap text-[#d4d4d8]">
                      {benefit}
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
