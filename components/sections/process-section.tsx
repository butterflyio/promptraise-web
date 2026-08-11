"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "@/components/section-label";
import type { HomePage } from "@/sanity/lib/queries";

/* ── Step data (Figma design copy; all text overridable via CMS) ── */
const STEPS = [
  {
    number: "01",
    label: "Audit",
    title: "Current Visibility Audit",
    description:
      "We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you now. We fix the baseline - how often you're mentioned in target queries and alongside which competitors.",
    icon: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src="/figma/process-card-icon-1.svg" alt="" className="size-full" />
    ),
  },
  {
    number: "02",
    label: "PromptRaise",
    title: "Content Gap Analysis",
    description:
      "PromptRaise scans communities and competitors. We identify: what your audience asks, what nobody covers, which words and topics have high AI-intent.",
    icon: (
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        <path
          d="M6 14V8h6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38 14V8h-6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 30v6h6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38 30v6h-6"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="22" cy="22" r="8" stroke="white" strokeWidth="1.5" />
        <ellipse
          cx="22"
          cy="22"
          rx="4"
          ry="8"
          stroke="white"
          strokeWidth="1.2"
        />
        <line
          x1="14"
          y1="22"
          x2="30"
          y2="22"
          stroke="#67FF67"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    label: "Creators",
    title: "Content from Real Creators",
    description:
      "We assign unique tasks to real creators. Each has their own angle, audience, platform. Not 20 identical articles - 20 different voices about one project.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect
          x="7"
          y="8"
          width="22"
          height="20"
          rx="3"
          stroke="white"
          strokeWidth="1.6"
        />
        <line
          x1="12"
          y1="15"
          x2="24"
          y2="15"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <line
          x1="12"
          y1="20"
          x2="18"
          y2="20"
          stroke="white"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="4" fill="#67FF67" />
        <path
          d="M22.5 24l1 1 2-2"
          stroke="#0f0f0f"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "04",
    label: "PR",
    title: "Tier-1-2 Media PR",
    description:
      "In parallel - publications in Cointelegraph, Coindesk, Decrypt, BeInCrypto, The Block. LLMs trained on these sources. This builds entity authority.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="10" stroke="white" strokeWidth="1.6" />
        <ellipse
          cx="18"
          cy="18"
          rx="5"
          ry="10"
          stroke="white"
          strokeWidth="1.2"
        />
        <line
          x1="8"
          y1="18"
          x2="28"
          y2="18"
          stroke="white"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    number: "05",
    label: "Analytics",
    title: "Tracking & Monthly Report",
    description:
      "Every 2 weeks: target queries in ChatGPT, Perplexity, Google, DeepSeek, Gemini, Claude - track growth. Monthly report with before/after numbers, top queries, and next priorities.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <polyline
          points="6,26 12,17 18,21 23,12 30,15"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="24"
          y="20"
          width="6"
          height="6"
          rx="1.5"
          stroke="white"
          strokeWidth="1.4"
        />
      </svg>
    ),
  },
];

/* ── Segmented slider (Figma 341:1753: ~230 segments, 6px gaps) ─── */
const TOTAL_SEGMENTS = 96;
const STEP_BAR_FRACTIONS = [0.2, 0.4, 0.6, 0.8, 1.0];

/* Card travel positions - % of the stage width (Figma card width 389px) */
const CARD_OFFSETS = ["2%", "18%", "34%", "50%", "66%"];
const CARD_WIDTH = 389;

/* Sparkle dots (106:1890 mask group): ~36 near-black 1-4px dots (positions from Figma) */
const SPARKLE_DOTS = [
  { x: 41.0, y: 97.25, size: 3.946, blend: true },
  { x: 68.0, y: 88.08, size: 1.315, blend: false },
  { x: 29.0, y: 49.08, size: 1.315, blend: true },
  { x: 144.0, y: 50.08, size: 1.315, blend: false },
  { x: 112.0, y: 63.08, size: 1.315, blend: true },
  { x: 80.0, y: 58.25, size: 3.946, blend: true },
  { x: 53.0, y: 49.25, size: 3.946, blend: false },
  { x: 119.0, y: 29.25, size: 3.946, blend: true },
  { x: 96.0, y: 100.08, size: 1.315, blend: true },
  { x: 104.0, y: 70.08, size: 1.315, blend: false },
  { x: 86.0, y: 41.08, size: 1.315, blend: false },
  { x: 53.0, y: 59.08, size: 1.315, blend: true },
  { x: 252.0, y: 228.36, size: 4.066, blend: false },
  { x: 278.0, y: 228.12, size: 1.355, blend: true },
  { x: 239.0, y: 182.12, size: 1.355, blend: false },
  { x: 305.0, y: 154.12, size: 1.355, blend: true },
  { x: 329.0, y: 205.12, size: 1.355, blend: true },
  { x: 294.0, y: 197.36, size: 4.066, blend: true },
  { x: 270.0, y: 136.36, size: 4.066, blend: false },
  { x: 339.0, y: 169.36, size: 4.066, blend: true },
  { x: 307.0, y: 245.12, size: 1.355, blend: true },
  { x: 319.0, y: 212.12, size: 1.355, blend: true },
  { x: 265.0, y: 157.12, size: 1.355, blend: false },
  { x: 264.0, y: 195.12, size: 1.355, blend: false },
  { x: 90.48, y: 253.89, size: 4.107, blend: true },
  { x: 99.99, y: 221.26, size: 2.738, blend: true },
  { x: 32.99, y: 231.26, size: 2.738, blend: true },
  { x: 43.99, y: 152.26, size: 2.738, blend: true },
  { x: 106.99, y: 159.26, size: 2.738, blend: true },
  { x: 80.48, y: 187.89, size: 4.107, blend: true },
  { x: 17.48, y: 158.89, size: 4.107, blend: false },
  { x: 79.48, y: 150.89, size: 4.107, blend: true },
  { x: 131.99, y: 202.26, size: 2.738, blend: true },
  { x: 107.99, y: 173.26, size: 2.738, blend: true },
  { x: 48.99, y: 186.26, size: 2.738, blend: false },
  { x: 59.99, y: 215.26, size: 2.738, blend: true },
];

/* ── Component ───────────────────────────────────────────────────── */
interface ProcessSectionProps {
  content?: HomePage["process"];
}

export function ProcessSection({ content }: ProcessSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  // Override step copy/label/number from CMS while keeping the 5-step structure
  const steps = STEPS.map((step, i) => {
    const cms = content?.steps?.[i];
    return {
      ...step,
      number: cms?.number ?? step.number,
      label: cms?.label ?? step.label,
      title: cms?.title ?? step.title,
      description: cms?.desc ?? step.description,
    };
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const scrollableHeight = sectionHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;
      const progress = Math.max(0, Math.min(1, -sectionTop / scrollableHeight));
      const raw = progress * (STEPS.length - 1);
      setActiveStep(Math.min(Math.round(raw), STEPS.length - 1));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const step = steps[activeStep]!;
  const activeSegments = Math.round(
    STEP_BAR_FRACTIONS[activeStep]! * TOTAL_SEGMENTS,
  );

  return (
    <div
      ref={sectionRef}
      id="how-it-works"
      style={{ height: `${STEPS.length * 100}vh` }}
      className="relative"
    >
      <SectionLabel name="ProcessSection" />
      <div
        className="sticky top-0 overflow-hidden bg-[#0f0f0f]"
        style={{ height: "100vh" }}
      >
        {/* ── Background layers (Figma 133:41034 Audit Container) ─────── */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Off-canvas framework (106:1873 Inner Frame: the full 1891px bg canvas) */}
          <div className="absolute" style={{ left: -257, top: -331 }}>
            {/* Bright band 1 (106:1874, mix-blend-plus-lighter) */}
            <div className="absolute mix-blend-plus-lighter" style={{ left: 0, top: 885, width: 1891, height: 217 }}>
              <img src="/figma/process-bg-bright-1.svg" alt="" className="block size-full max-w-none" />
            </div>
            {/* Bright band 2 (106:1877) */}
            <div className="absolute" style={{ left: 316, top: 789, width: 1224, height: 710 }}>
              <img src="/figma/process-bg-bright-2.svg" alt="" className="block size-full max-w-none" />
            </div>
            {/* Decorative vector 1 (106:1881, mix-blend-overlay, rotate-180, opacity-70) */}
            <div className="absolute flex items-center justify-center mix-blend-overlay" style={{ left: 453, top: 219, width: 950, height: 1339 }}>
              <div className="rotate-180">
                <div className="relative opacity-70" style={{ width: 950, height: 1339 }}>
                  <img src="/figma/process-vector-1.svg" alt="" className="block size-full max-w-none" />
                </div>
              </div>
            </div>
            {/* Decorative vector 2 (106:1882, mix-blend-overlay, rotate-180, opacity-70) */}
            <div className="absolute flex items-center justify-center mix-blend-overlay" style={{ left: 744, top: 253, width: 428, height: 1339 }}>
              <div className="rotate-180">
                <div className="relative opacity-70" style={{ width: 428, height: 1339 }}>
                  <img src="/figma/process-vector-2.svg" alt="" className="block size-full max-w-none" />
                </div>
              </div>
            </div>
            {/* Vertical green glow bar (106:1883, blur 80.96, border #163f16) */}
            <div
              className="absolute mix-blend-overlay"
              style={{
                left: 866, top: 224, width: 124, height: 1329,
                border: "0.756px solid #163f16",
                backgroundImage:
                  "linear-gradient(179.54deg, rgb(103, 255, 103) 2.81%, rgba(255, 255, 255, 0) 99.96%)",
                filter: "blur(80.96px)",
              }}
            >
              <div className="rotate-180" />
            </div>
            {/* Bar glow (106:1884, opacity-70) */}
            <div className="absolute opacity-70" style={{ left: 878, top: 370, width: 112, height: 1016 }}>
              <img src="/figma/process-bg-bar-glow.svg" alt="" className="block size-full max-w-none" />
            </div>
            {/* Noise & texture (106:1887 mask -> 106:1889, mix-blend-screen, rotate-90, blur 150.24, opacity-5) */}
            <div className="absolute mix-blend-screen" style={{ left: 238, top: 0 }}>
              <div className="flex items-center justify-center" style={{ left: 238, top: 0, width: 1074, height: 1499 }}>
                <div className="rotate-90">
                  <div className="relative opacity-5" style={{ width: 1499, height: 1074, filter: "blur(150.241px)" }}>
                    <img src="/figma/process-noise.png" alt="" className="block size-full max-w-none" />
                  </div>
                </div>
              </div>
            </div>
            {/* Sparkle dots (106:1890 mask group) - ~36 near-black 1-4px dots, imask: invisible on dark */}
            {SPARKLE_DOTS.map((d, i) => (
              <div
                key={i}
                aria-hidden
                className="absolute rounded-full"
                style={{
                  left: -148 + 246.01 + d.x,
                  top: -179 + 245.83 + d.y,
                  width: d.size,
                  height: d.size,
                  background: "#09090B",
                  mixBlendMode: d.blend ? "overlay" : "normal",
                }}
              />
            ))}
          </div>

          {/* Pattern (106:1295, mix-blend-overlay, centered at top 34.35%) */}
          <img
            src="/figma/process-pattern.svg"
            alt=""
            className="absolute left-1/2 -translate-x-1/2 mix-blend-overlay"
            style={{ top: "34.35%", width: 1566, maxWidth: "none" }}
          />
        </div>

        {/* ── Decorative vector on top (119:2733, color-dodge) ─ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/figma/process-vector-top.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-[52px] left-1/2 z-0 h-[228px] w-[585px] max-w-none -translate-x-1/2 mix-blend-color-dodge"
        />

        {/* ── Section header (Figma 133:41030, 649px) ───────── */}
        <div className="relative z-10 px-6 pt-16 pb-6 text-center">
          {/* "Process" badge: line + marks + pill + capsules */}
          <div className="relative mx-auto mb-5 inline-flex h-[48px] w-[384px] max-w-full items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/process-badge-line.svg"
              alt=""
              aria-hidden
              className="absolute top-1/2 left-1/2 h-[6px] w-[384px] max-w-none -translate-x-1/2 -translate-y-1/2"
            />
            {/* Mark 1 (Figma 123:40522, at x=105.5, flipped) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/process-badge-mark-1.svg"
              alt=""
              aria-hidden
              className="absolute top-1/2 left-[105px] h-[25px] w-[40px] -translate-y-1/2 -scale-y-100 rotate-180"
            />
            <div className="absolute top-1/2 left-[139px] flex h-[39px] -translate-y-1/2 items-center justify-center rounded-[100px] border border-[#3c3e3f] bg-[rgba(20,20,20,0.8)] px-6 py-2 backdrop-blur-[12px]">
              <span className="text-[15px] leading-[1.5] whitespace-nowrap text-[#a1a1aa]">
                {content?.badge ?? "Process"}
              </span>
            </div>
            {/* Mark 2 (Figma 123:40521, at x=238.5) */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/process-badge-mark-2.svg"
              alt=""
              aria-hidden
              className="absolute top-1/2 left-[238px] h-[25px] w-[40px] -translate-y-1/2"
            />
          </div>

          <h2 className="desktop:text-[40px] mx-auto max-w-[649px] text-[36px] leading-[1.15] font-bold tracking-[-0.02em] text-balance text-white">
            {content?.heading ?? "From analysis to ChatGPT answer"}
          </h2>
          <p className="desktop:text-base mx-auto mt-4 max-w-[649px] text-sm leading-[1.5] text-[#52525b]">
            {content?.subtext ??
              "Five steps - from a visibility audit to measurable growth in AI mentions."}
          </p>
        </div>

        {/* ── Stage: card + connector + segmented slider ────── */}
        <div
          className="relative z-10 mx-auto w-full max-w-[1248px] px-6"
          style={{ height: 490 }}
        >
          {/* Card (Figma 338:707; w-389, rounded-32, glass) */}
          <motion.div
            className="absolute top-0"
            animate={{ left: CARD_OFFSETS[activeStep] }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: "min(389px, 86vw)" }}
          >
            <div
              className="relative w-full overflow-hidden rounded-[32px] border border-white/90 shadow-[0_0_0_4px_rgba(255,255,255,0.07)]"
              style={{
                background: "rgba(0,0,0,0.25)",
                backdropFilter: "blur(6.5px)",
                WebkitBackdropFilter: "blur(6.5px)",
              }}
            >
              {/* Icon art area (338:709, h 216) */}
              <div className="relative h-[216px] w-full">
                {/* Glow panels */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/process-card-glow-1.svg"
                  alt=""
                  aria-hidden
                  className="absolute top-0 left-0 h-[256px] w-[400px] max-w-none"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/process-card-glow-2.svg"
                  alt=""
                  aria-hidden
                  className="absolute top-0 right-0 h-[256px] w-[400px] max-w-none"
                />
                {/* Arcs */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/process-card-arc-1.svg"
                  alt=""
                  aria-hidden
                  className="absolute bottom-0 left-1/2 h-[207px] w-[392px] max-w-none -translate-x-1/2"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/process-card-arc-2.svg"
                  alt=""
                  aria-hidden
                  className="absolute bottom-[74px] left-1/2 h-[142px] w-[393px] max-w-none -translate-x-1/2"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/process-card-arc-3.svg"
                  alt=""
                  aria-hidden
                  className="absolute bottom-[131px] left-1/2 h-[85px] w-[393px] max-w-none -translate-x-1/2"
                />
                {/* Decorative ellipse (338:714) */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/figma/process-card-ellipse.svg"
                  alt=""
                  aria-hidden
                  className="absolute bottom-[-204px] left-1/2 h-[341px] w-[327px] max-w-none -translate-x-1/2"
                />

                {/* Icon wrapper (338:722, 64px chip) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.25 }}
                      className="flex size-[64px] items-center justify-center overflow-hidden rounded-full border border-white/20 bg-black/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] backdrop-blur-[6px]"
                    >
                      {activeStep === 0 ? (
                        step.icon
                      ) : (
                        <span className="flex items-center justify-center opacity-90 [&_svg]:h-[30px] [&_svg]:w-[30px]">
                          {step.icon}
                        </span>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Text area (338:727, px-8 pb-10) */}
              <div className="relative px-8 pb-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="mb-2 bg-gradient-to-b from-white to-white/90 bg-clip-text text-[18px] leading-[1.4] font-bold tracking-[-0.36px] text-transparent">
                      {step.title}
                    </h3>
                    <p className="text-[12px] leading-[1.4] text-[#52525b]">
                      {step.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Connector (338:730, 96px) */}
          <motion.div
            aria-hidden
            className="absolute"
            animate={{
              left: `calc(min(${CARD_OFFSETS[activeStep]}, 66%) + ${
                Math.min(CARD_WIDTH, 389) / 2
              }px)`,
            }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ top: 388, width: 1, transform: "translateX(-50%)" }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/figma/process-connector.svg"
              alt=""
              className="block h-[68px] w-full max-w-none"
            />
          </motion.div>

          {/* Segmented slider (341:1753, 1248px, 24px, gap 6) */}
          <div className="absolute inset-x-0" style={{ top: 456 }}>
            <div className="relative mx-auto flex h-6 w-full max-w-[1248px] items-center gap-[6px]">
              {Array.from({ length: TOTAL_SEGMENTS }, (_, i) => (
                <div
                  key={i}
                  className="h-full min-w-0 flex-1 rounded-[3px]"
                  style={{
                    background:
                      i < activeSegments ? "#67FF67" : "rgba(85,85,85,0.25)",
                    transition: "background 0.35s",
                  }}
                />
              ))}
              {/* Floating step pill above the slider */}
              <StepPill
                label={step.label}
                number={step.number}
                totalSegments={TOTAL_SEGMENTS}
                activeSegments={activeSegments}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────────────── */

function StepPill({
  label,
  number,
  totalSegments,
  activeSegments,
}: {
  label: string;
  number: string;
  totalSegments: number;
  activeSegments: number;
}) {
  const pct = (activeSegments / totalSegments) * 100;
  return (
    <motion.div
      className="absolute -top-[34px] flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
      animate={{ left: `${pct}%` }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      style={{
        transform: "translateX(-50%)",
        background: "rgba(20,24,20,0.92)",
        border: "1px solid rgba(103,255,103,0.35)",
        color: "white",
        whiteSpace: "nowrap",
        boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
      }}
    >
      <span className="text-white/80">{label}</span>
      <span
        className="flex items-center justify-center rounded-full text-[10px] font-bold text-[#090b0a]"
        style={{
          width: 18,
          height: 18,
          background: "#67FF67",
          flexShrink: 0,
        }}
      >
        {number}
      </span>
    </motion.div>
  );
}
