"use client";

import { DsSection, DsSectionContainer } from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
import type { HomePage } from "@/sanity/lib/queries";

const DEFAULT_BADGE = "How we solve it";
const DEFAULT_HEADING = "We create content that trains AI";
const DEFAULT_SUBTEXT =
  "Real creators, authoritative media, right structure.\nThis is exactly the content LLM models read, index, and reproduce in their answers.";

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
      "Every piece is created by a real author with a real audience - and published on platforms LLM models trust. Not AI-generated. Real voices in authoritative sources.",
    benefits: [
      "Unique angle and voice for each creator",
      "Publications in Tier-1 - 2 crypto media",
      "Medium, Twitter, Substack, niche blogs",
      "Quality control before every publication",
      "Transparent reporting - client sees everything",
    ],
  },
];

/**
 * Figma benefit-pill icons. Each benefit row shows its own 20px line icon
 * (stroke #B1FFB1). Order follows the design: layer 01 = analytics icons,
 * layer 02 = content/social icons. The per-icon inset boxes come from the
 * Figma ctx (the SVGs ship with internal padding, so the icon content is
 * drawn inside a sub-box of the 20px pill icon slot).
 */
const LAYER_ICON_KEYS = [
  [
    "chart-network",
    "table",
    "whole-word",
    "file-spreadsheet",
    "layout-dashboard",
  ],
  [
    "speech",
    "users-round",
    "share-2",
    "badge-check",
    "file-chart-line",
  ],
];

const ICON_INSET: Record<string, { outer: string; inner: string }> = {
  "chart-network": { outer: "12.5%", inner: "-5%" },
  table: { outer: "12.5%", inner: "-5%" },
  "whole-word": { outer: "29.17% 8.33% 20.83% 8.33%", inner: "-7.5% -4.5%" },
  "file-spreadsheet": { outer: "8.33% 16.67%", inner: "-4.5% -5.63%" },
  "layout-dashboard": { outer: "12.5%", inner: "-5%" },
  speech: { outer: "11.85% 8.35% 16.67% 8.33%", inner: "-5.25% -4.5%" },
  "users-round": { outer: "12.5% 8.33%", inner: "-5% -4.5%" },
  "share-2": { outer: "8.33% 12.5%", inner: "-4.5% -5%" },
  "badge-check": { outer: "8.35% 8.35% 8.32% 8.29%", inner: "-4.5%" },
  "file-chart-line": { outer: "8.33% 16.67%", inner: "-4.5% -5.63%" },
};

/**
 * Decorative background capsules from the section BG frame (411:5377, desktop
 * 1440 only - the tablet frame has no BG, the mobile BG is positioned
 * off-canvas in Figma). [x, y] relative to the section content box, in px.
 * Style: 17x10px rounded pill, fill #2e2e2e, 0.8px border #3c3e3f.
 */
const BG_CAPSULES: Array<[number, number]> = [
  [1089, 112],
  [819, 82],
  [802, 72],
  [612, 82],
  [532, 2],
  [752, 2],
  [752, 152],
  [972, 152],
  [972, 141],
  [882, 41],
  [662, 41],
  [1053, 0],
  [383, 182],
  [403, 82],
  [453, 12],
];

function BenefitIcon({ iconKey }: { iconKey: string }) {
  const inset = ICON_INSET[iconKey] ?? ICON_INSET["chart-network"]!;
  return (
    <div className="relative size-[20px] shrink-0 overflow-hidden">
      <div className="absolute" style={{ inset: inset.outer }}>
        <div className="absolute" style={{ inset: inset.inner }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/figma/ai-icon-${iconKey}.svg`}
            alt=""
            className="block size-full max-w-none"
          />
        </div>
      </div>
    </div>
  );
}

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

  const heading = content?.heading ?? DEFAULT_HEADING;
  const subtext = content?.subtext ?? DEFAULT_SUBTEXT;
  const badge = content?.badge ?? DEFAULT_BADGE;

  /* Figma breaks the heading "We create content / that trains AI". Preserve
     that exact two-line break for the default copy; CMS variants wrap naturally. */
  function renderHeading() {
    if (heading !== DEFAULT_HEADING) return heading;
    return (
      <>
        We create content
        <br />
        that trains AI
      </>
    );
  }

  return (
    <DsSection className="ds-section-alt">
      <SectionLabel name="AiTrainingSection" />

      {/* Decorative background capsules (Figma BG 411:5377, desktop only) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden desktop:block"
      >
        {BG_CAPSULES.map(([x, y], i) => (
          <div
            key={i}
            className="absolute h-[10px] w-[17px] rounded-[100px] border-[0.8px] border-[#3c3e3f] bg-[#2e2e2e]"
            style={{ left: x, top: y }}
          />
        ))}
      </div>

      <DsSectionContainer className="relative z-10 flex flex-col">
        {/* Eyebrow badge (Figma 102:149 desktop / 411:5359 tablet).
            Tablet: label left, rule extends right. Desktop: label right,
            long rule from the left edge. Hidden on mobile (Figma mobile
            badge is positioned off-canvas). */}
        <div className="mb-10 hidden h-[39px] w-full items-center tablet:flex">
          <div className="relative flex h-full w-full items-center justify-start desktop:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/ai-badge-line.svg"
              alt=""
              className="absolute top-1/2 left-0 h-[6px] w-full max-w-none -translate-y-1/2"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/ai-badge-mark-2.svg"
              alt=""
              className="relative mr-3 h-[25px] w-[39px]"
            />
            <div className="relative flex h-[39px] items-center justify-center rounded-[100px] border border-[#3c3e3f] bg-[rgba(20,20,20,0.8)] px-6 py-2 backdrop-blur-[12px]">
              <span className="text-[15px] leading-[1.5] whitespace-nowrap text-[#a1a1aa]">
                {badge}
              </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/ai-badge-mark-1.svg"
              alt=""
              className="relative ml-3 h-[25px] w-[41px]"
            />
          </div>
        </div>

        {/* Header: heading + subtext (Figma 102:437/102:438, 649px) */}
        <div className="flex w-full flex-col gap-3 desktop:mb-16 desktop:max-w-[649px] desktop:gap-6">
          <h2 className="font-sans text-2xl leading-[1.3] font-bold tracking-[-0.02em] text-white tablet:text-4xl tablet:leading-[1.15]">
            {renderHeading()}
          </h2>
          <p className="text-xs leading-[1.4] whitespace-pre-line text-[#52525b] tablet:text-base tablet:leading-[1.5]">
            {subtext}
          </p>
        </div>

        {/* Column labels - tablet (Figma 411:5351) */}
        <div className="mb-3 hidden w-full items-center gap-9 text-xs leading-[1.4] text-[#52525b] tablet:flex desktop:hidden">
          <span className="w-[96px] shrink-0 px-6 text-left">Layer Name</span>
          <span className="flex-1">Benefits</span>
        </div>

        {/* Column labels - desktop (Figma 102:443, 1200px) */}
        <div className="mb-3 hidden w-full max-w-[1200px] items-center justify-between text-xs leading-[1.4] text-[#52525b] desktop:flex">
          <div className="flex items-center gap-4">
            <span className="w-[96px]">Layer</span>
            <span className="w-[96px]">Layer Name</span>
          </div>
          <span className="w-[581px]">Benefits</span>
        </div>

        {/* Layer rows (Figma 102:448) */}
        <div className="flex flex-col gap-3">
          {layers.map((layer, layerIndex) => {
            const iconKeys =
              LAYER_ICON_KEYS[layerIndex % LAYER_ICON_KEYS.length]!;
            return (
              <div
                key={layer.id}
                data-node-id={layerIndex === 0 ? "102:449" : "102:470"}
                className={`flex w-full flex-col bg-[rgba(19,22,25,0.25)] p-6 ${
                  layerIndex === 1 ? "gap-9" : "gap-6"
                } desktop:flex-row desktop:items-start desktop:gap-4`}
              >
                {/* Number + title/desc stack */}
                <div className="flex w-full flex-col gap-4 desktop:flex-1 desktop:flex-row desktop:gap-4">
                  <div className="shrink-0 desktop:w-[96px]">
                    <span className="text-xs leading-[1.4] text-[#aaa]">
                      {layer.number}
                    </span>
                  </div>
                  <div className="flex w-full flex-col gap-3">
                    <h3 className="bg-gradient-to-b from-white to-white/90 bg-clip-text text-lg leading-[1.4] font-bold tracking-[-0.02em] text-transparent tablet:text-2xl tablet:leading-[1.3]">
                      {layer.title}
                    </h3>
                    <p className="text-xs leading-[1.4] text-[#52525b]">
                      {layer.description}
                    </p>
                  </div>
                </div>

                {/* Benefits pills (Figma 102:454, 592px desktop) */}
                <div className="flex w-full flex-col gap-1 desktop:w-[592px] desktop:shrink-0">
                  {layer.benefits.map((benefit, benefitIndex) => (
                    <div
                      key={benefit}
                      className="inline-flex items-center gap-2 overflow-hidden rounded-[20px] py-2 pr-6 pl-3"
                    >
                      <BenefitIcon
                        iconKey={
                          iconKeys[benefitIndex % iconKeys.length] ??
                          "chart-network"
                        }
                      />
                      <span className="text-xs leading-[1.4] whitespace-nowrap text-[#d4d4d8]">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}