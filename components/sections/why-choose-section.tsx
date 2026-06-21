"use client";

import Image from "next/image";
import { DsBadge, DsSection, DsSectionContainer } from "@/components/design-system";

/* ─────────────────────────────────────────────────────────────────────────────
   Shared card shell — dark #0e0f10 bg, subtle border, rounded-2xl
───────────────────────────────────────────────────────────────────────────── */
function BentoCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl flex flex-col ${className}`}
      style={{
        background: "#0e0f10",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card header — icon + title + description
───────────────────────────────────────────────────────────────────────────── */
function CardHeader({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="px-8 pt-8 pb-6">
      <div className="flex items-center gap-3 mb-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" aria-hidden width={24} height={24} />
        <h3 className="text-[15px] font-bold text-white leading-snug">{title}</h3>
      </div>
      <p className="text-[12px] leading-[1.6] text-white/40">{description}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card 1 — "Full cycle, not just tracking"
   Figma: PromptRaise Cycle widget with Analysis + Content rows
───────────────────────────────────────────────────────────────────────────── */
function FullCycleCard() {
  return (
    <BentoCard>
      <CardHeader
        icon="/figma/icon.svg"
        title="Full cycle, not just tracking"
        description={"Analysis \u2192 content \u2192 publication \u2192 tracking.\nNo Web3 competitor closes everything in one product."}
      />

      {/* PromptRaise Cycle widget */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden flex-1" style={{
        background: "linear-gradient(160deg, rgba(30,80,40,0.55) 0%, rgba(10,18,12,0.9) 60%)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}>
        {/* Widget header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-[12px] text-white/70">PromptRaise Cycle</span>
          <div className="flex gap-1">
            <span className="w-[5px] h-[5px] rounded-full bg-white/25" />
            <span className="w-[5px] h-[5px] rounded-full bg-white/25" />
            <span className="w-[5px] h-[5px] rounded-full bg-white/25" />
          </div>
        </div>

        {/* Separator */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/separator-line.svg" alt="" aria-hidden className="w-full" />

        {/* Analysis row */}
        <div
          className="flex items-center justify-between px-4 py-3 mx-3 mt-3 rounded-lg"
          style={{ background: "#1d1d20", border: "1px solid #27272b" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#303036", border: "1px solid #3f3f46" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/lucide-chart-line.svg" alt="" aria-hidden width={16} height={16} />
            </div>
            <span className="text-[11px] text-white/85">Analysis</span>
          </div>
          <div className="flex gap-1">
            <span className="w-[4px] h-[4px] rounded-full bg-white/30" />
            <span className="w-[4px] h-[4px] rounded-full bg-white/30" />
            <span className="w-[4px] h-[4px] rounded-full bg-white/30" />
          </div>
        </div>

        {/* Vertical connector line */}
        <div className="ml-6 w-px h-6 bg-white/10" />

        {/* Content row */}
        <div
          className="flex items-center justify-between px-4 py-3 mx-3 mb-4 rounded-lg"
          style={{ background: "#1d1d20", border: "1px solid #27272b" }}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "#303036", border: "1px solid #3f3f46" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/figma/lucide-square-chart-gantt.svg" alt="" aria-hidden width={16} height={16} />
            </div>
            <span className="text-[11px] text-white/85">Content</span>
          </div>
          <div className="flex gap-1">
            <span className="w-[4px] h-[4px] rounded-full bg-white/30" />
            <span className="w-[4px] h-[4px] rounded-full bg-white/30" />
            <span className="w-[4px] h-[4px] rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card 2 — "Real creators, not AI text"
   Figma: Blurred avatar grid + PromptRaise green R logo centered
───────────────────────────────────────────────────────────────────────────── */
function RealCreatorsCard() {
  return (
    <BentoCard>
      <CardHeader
        icon="/figma/icon-2.svg"
        title="Real creators, not AI text"
        description="LLMs filter AI-generated content. Real person with real audience — an EEAT signal that can't be faked."
      />

      {/* Avatar grid + logo overlay */}
      <div className="relative flex-1 min-h-[180px] overflow-hidden">
        {/* Blurred avatar circles — simulated grid */}
        <div className="absolute inset-0 flex flex-wrap gap-3 p-4 opacity-35 blur-[1px]">
          {Array.from({ length: 14 }).map((_, i) => (
            <div
              key={i}
              className="rounded-full bg-white/20 shrink-0"
              style={{ width: 52, height: 52 }}
            />
          ))}
        </div>

        {/* Radial fade overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 100%, #0e0f10 0%, transparent 65%)" }}
        />

        {/* Centered PromptRaise R logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 100,
              height: 100,
              background: "linear-gradient(160deg, #22c55e 0%, #127637 100%)",
              boxShadow: "0 0 40px rgba(34,197,94,0.45), 0 0 80px rgba(34,197,94,0.2)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo-shape.svg" alt="PromptRaise" width={52} height={26} />
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card 3 — "Transparency at every step"
   Figma: Dashed-border connection diagram with name pills
───────────────────────────────────────────────────────────────────────────── */
function TransparencyCard() {
  return (
    <BentoCard>
      <CardHeader
        icon="/figma/icon-4.svg"
        title="Transparency at every step"
        description={'Client sees who writes, what they write, and where it\'s published. No "we did the work" without proof.'}
      />

      {/* Connection diagram */}
      <div className="relative mx-6 mb-6 flex-1 min-h-[100px]">
        {/* Dashed border rectangle */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{ border: "1.5px dashed rgba(255,255,255,0.18)" }}
        />

        {/* Corner dots */}
        <span className="absolute top-[-3px] left-[-3px] w-[6px] h-[6px] rounded-sm bg-white/30" />
        <span className="absolute top-[-3px] right-[-3px] w-[6px] h-[6px] rounded-sm bg-white/30" />
        <span className="absolute bottom-[-3px] left-[-3px] w-[6px] h-[6px] rounded-sm bg-white/30" />
        <span className="absolute bottom-[-3px] right-[-3px] w-[6px] h-[6px] rounded-sm bg-white/30" />

        {/* Name pills */}
        <div
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white"
          style={{ background: "#1d1d20", border: "1px solid #3f3f46", top: "18%", left: "8%" }}
        >
          Braxton King
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/arrow.svg" alt="" aria-hidden width={12} height={12} />
        </div>

        <div
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white"
          style={{ background: "#1d1d20", border: "1px solid #3f3f46", top: "50%", left: "30%" }}
        >
          Jamison Clark
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/arrow.svg" alt="" aria-hidden width={12} height={12} />
        </div>

        <div
          className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-white"
          style={{ background: "#1d1d20", border: "1px solid #3f3f46", top: "8%", right: "4%" }}
        >
          Zackary Green
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/figma/arrow.svg" alt="" aria-hidden width={12} height={12} />
        </div>

        {/* Green arrow markers */}
        <span
          className="absolute"
          style={{ top: "44%", left: "26%", color: "#67ff67", fontSize: 10 }}
          aria-hidden
        >▼</span>
        <span
          className="absolute"
          style={{ top: "18%", right: "20%", color: "#67ff67", fontSize: 10 }}
          aria-hidden
        >▼</span>
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card 4 — "Numbers, not promises"
   Figma: Analytics widget with 6,281 users + bar chart + +21.76% stat
───────────────────────────────────────────────────────────────────────────── */
function NumbersCard() {
  const barHeights = [89, 41, 71, 114, 55, 89, 60];

  return (
    <BentoCard>
      <CardHeader
        icon="/figma/icon-1.svg"
        title="Numbers, not promises"
        description={'Not "wrote 20 articles." But "ChatGPT mentions you in X of 5 queries on topic Y." Baseline and growth in every report.'}
      />

      {/* Analytics widget */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden" style={{
        background: "rgba(0,0,0,0.30)",
        border: "1px solid rgba(255,255,255,0.07)",
        backdropFilter: "blur(14px)",
      }}>
        {/* Widget header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <span className="text-[12px] text-white/70">Analytics</span>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
            <span className="text-[10px] text-white/50">This Week</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/chevron-down-1.svg" alt="" aria-hidden width={10} height={10} />
          </div>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/figma/separator-line-2.svg" alt="" aria-hidden className="w-full" />

        {/* Stats row */}
        <div className="flex items-center justify-between px-4 py-2">
          <div>
            <p className="text-[12px] text-white/80">6,281</p>
            <p className="text-[10px] text-white/40">Users Average</p>
          </div>
          <div className="flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: "rgba(72,228,75,0.16)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/decorative-shape.svg" alt="" aria-hidden width={8} height={8} />
            <span className="text-[10px]" style={{ color: "#25de28" }}>21.76%</span>
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-[5px] px-4 pb-4 pt-1 h-[100px]">
          {barHeights.map((h, i) => (
            <div key={i} className="flex-1 relative">
              {/* Background bar */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-md"
                style={{ height: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.05)" }}
              />
              {/* Fill bar */}
              <div
                className="absolute bottom-0 left-0 right-0 rounded-md"
                style={{
                  height: `${(h / 140) * 100}%`,
                  background: "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
                  boxShadow: "0 -1px 8px rgba(255,255,255,0.15)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card 5 — "Web3 from the inside"
   Figma: card-21.png background + Cicada logo centered
───────────────────────────────────────────────────────────────────────────── */
function Web3InsideCard() {
  return (
    <BentoCard>
      <CardHeader
        icon="/figma/icon-3.svg"
        title="Web3 from the inside"
        description="Cicada in crypto since 2018. 100+ clients, 1000+ listings. We understand DeFi, TGE, tokenomics firsthand."
      />

      {/* Background image + Cicada logo */}
      <div className="relative flex-1 min-h-[160px] overflow-hidden">
        <Image
          src="/figma/card-21.png"
          alt=""
          fill
          className="object-cover opacity-60"
          aria-hidden
        />
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(0deg, #0e0f10 0%, transparent 60%)" }}
        />
        {/* Centered Cicada logo */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center rounded-2xl px-6 py-4"
            style={{
              background: "rgba(10,10,10,0.85)",
              border: "1px solid rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="text-[18px] font-bold text-white tracking-tight" style={{ fontFamily: "monospace" }}>cicada</span>
          </div>
        </div>
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Card 6 — "Narrative + market = power"
   Figma: PromptRaise + Cicada logos side-by-side + horizontal bar chart
───────────────────────────────────────────────────────────────────────────── */
function NarrativeCard() {
  const barWidths = [85, 68, 75, 60, 72, 55];

  return (
    <BentoCard>
      <CardHeader
        icon="/figma/icon.svg"
        title="Narrative + market = power"
        description="Cicada builds liquidity. PromptRaise builds narrative. AI-visible projects list more easily and hold price post-TGE."
      />

      {/* Logos + bar chart */}
      <div className="mx-6 mb-6 rounded-xl overflow-hidden" style={{
        background: "rgba(0,0,0,0.25)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}>
        {/* Logo row */}
        <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-full"
            style={{ background: "linear-gradient(135deg, #22c55e 0%, #127637 100%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/logo-shape.svg" alt="PromptRaise" width={16} height={8} />
            <span className="text-[11px] font-bold text-white">cicada</span>
          </div>
          <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.1)" }} />
        </div>

        {/* Horizontal bars */}
        <div className="flex flex-col gap-2 px-5 py-4">
          {barWidths.map((w, i) => (
            <div key={i} className="h-[6px] rounded-full" style={{
              background: "rgba(255,255,255,0.08)",
              width: "100%",
            }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${w}%`,
                  background: i === 0 ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </BentoCard>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   Main export
───────────────────────────────────────────────────────────────────────────── */
export function WhyChooseSection() {
  return (
    <DsSection>
      <DsSectionContainer>
        {/* Header row: title left, badge right */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <h2 className="text-[40px] tablet:text-[52px] font-bold text-white leading-tight mb-3">
              Why Choose PromptRaise
            </h2>
            <p className="text-[14px] text-white/40">
              Real creators. On-chain transparency. Measurable results.
            </p>
          </div>

          {/* "Why Choose us" badge with connector lines — same Figma SVG assets as Process badge */}
          <div className="hidden tablet:flex items-center gap-0 shrink-0 mt-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/inner-frame.svg" alt="" aria-hidden width={72} height={44} className="shrink-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/decorative-vector-9.svg" alt="" aria-hidden width={100} height={10} className="shrink-0" style={{ transform: "scaleX(-1)" }} />
            <DsBadge variant="section" className="shrink-0 whitespace-nowrap">
              Why Choose us
            </DsBadge>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/decorative-vector-9.svg" alt="" aria-hidden width={100} height={10} className="shrink-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/inner-frame-1.svg" alt="" aria-hidden width={72} height={44} className="shrink-0" />
          </div>
        </div>

        {/* Bento grid — 3 columns, rows of varying heights */}
        {/*
          Layout (matches screenshot):
          Col 1 (left):  row1=FullCycle (tall), row2=Numbers (shorter)
          Col 2 (center): row1=RealCreators (tall), row2=Web3Inside (shorter)
          Col 3 (right):  row1=Transparency (shorter), row2=Narrative (taller)
        */}
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
          {/* Column 1 */}
          <div className="flex flex-col gap-4">
            <FullCycleCard />
            <NumbersCard />
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-4">
            <RealCreatorsCard />
            <Web3InsideCard />
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-4">
            <TransparencyCard />
            <NarrativeCard />
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
