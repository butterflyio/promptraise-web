'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

/* ── Step data ───────────────────────────────────────────────────── */
const STEPS = [
  {
    number: '01',
    label: 'Audit',
    title: 'Current Visibility Audit',
    description:
      "We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you now. We fix the baseline — how often you're mentioned in target queries and alongside which competitors.",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="17" cy="17" r="9" stroke="white" strokeWidth="1.6" />
        <line x1="23.5" y1="23.5" x2="30" y2="30" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    label: 'PromptRaise',
    title: 'Content Gap Analysis',
    description:
      'PromptRaise scans communities and competitors. We identify: what your audience asks, what nobody covers, which words and topics have high AI-intent.',
    icon: (
      /* Globe with scan-bracket icon — matches 10871.png */
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden>
        {/* Scan brackets */}
        <path d="M6 14V8h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 14V8h-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 30v6h6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M38 30v6h-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Globe */}
        <circle cx="22" cy="22" r="8" stroke="white" strokeWidth="1.5" />
        <ellipse cx="22" cy="22" rx="4" ry="8" stroke="white" strokeWidth="1.2" />
        <line x1="14" y1="22" x2="30" y2="22" stroke="#67FF67" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Creators',
    title: 'Content from Real Creators',
    description:
      'We assign unique tasks to real creators. Each has their own angle, audience, platform. Not 20 identical articles — 20 different voices about one project.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <rect x="7" y="8" width="22" height="20" rx="3" stroke="white" strokeWidth="1.6" />
        <line x1="12" y1="15" x2="24" y2="15" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="12" y1="20" x2="18" y2="20" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="24" cy="24" r="4" fill="#67FF67" />
        <path d="M22.5 24l1 1 2-2" stroke="#0f0f0f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '04',
    label: 'PR',
    title: 'Tier-1-2 Media PR',
    description:
      'In parallel — publications in Cointelegraph, Coindesk, Decrypt, BeInCrypto, The Block. LLMs trained on these sources. This builds entity authority.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <circle cx="18" cy="18" r="10" stroke="white" strokeWidth="1.6" />
        <ellipse cx="18" cy="18" rx="5" ry="10" stroke="white" strokeWidth="1.2" />
        <line x1="8" y1="18" x2="28" y2="18" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '05',
    label: 'Analytics',
    title: 'Tracking & Monthly Report',
    description:
      'Every 2 weeks: target queries in ChatGPT, Perplexity, Google, DeepSeek, Gemini, Claude — track growth. Monthly report with before/after numbers, top queries, and next priorities.',
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden>
        <polyline points="6,26 12,17 18,21 23,12 30,15" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="24" y="20" width="6" height="6" rx="1.5" stroke="white" strokeWidth="1.4" />
      </svg>
    ),
  },
];

/* ── Waveform bar heights ─────────────────────────────────────────── */
const BAR_HEIGHTS = [
  6,8,10,12,14,16,18,20,22,20,18,16,14,12,10,12,14,16,18,20,
  22,24,20,18,16,14,12,10,8,10,12,14,16,18,20,22,20,18,16,14,
  12,10,8,6,8,10,12,14,16,18,20,18,16,14,12,10,12,14,16,14,
  12,10,8,10,12,14,16,18,20,22,20,18,16,14,12,10,8,10,12,14,
  16,14,12,10,8,6,8,10,12,14,16,18,20,18,16,14,12,10,8,6,
];
const TOTAL_BARS = BAR_HEIGHTS.length;

/* ── Card X offsets per step (% of container width) ─────────────── */
// These are the left-edge positions of the card (310px wide).
// The card's center is at offset + CARD_WIDTH/2, which we use for the connector line.
const CARD_OFFSETS = ['2%', '18%', '36%', '52%', '66%'];
const CARD_WIDTH_PX = 310;

/* ── Waveform bar fill per step (as fraction of TOTAL_BARS) ──────── */
// Step 0 → first ~20% green, step 4 → ~100% green
const STEP_BAR_FRACTIONS = [0.2, 0.4, 0.6, 0.8, 1.0];

/* ── Component ───────────────────────────────────────────────────── */
export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      // scrollable height is totalHeight minus one viewport
      const scrollableHeight = sectionHeight - window.innerHeight;
      if (scrollableHeight <= 0) return;

      // How far we've scrolled into the section (0 → 1)
      const progress = Math.max(0, Math.min(1, -sectionTop / scrollableHeight));

      // Map 0→1 to 0→4 steps
      const raw = progress * (STEPS.length - 1);
      const step = Math.round(raw);
      setActiveStep(Math.min(step, STEPS.length - 1));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialise on mount
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const step = STEPS[activeStep];
  const activeBarsCount = Math.round(STEP_BAR_FRACTIONS[activeStep] * TOTAL_BARS);

  return (
    /*
     * Outer wrapper is tall — 500vh gives ~4 scroll "pages" of travel so the
     * sticky inner panel advances through all 5 steps.
     */
    <div
      ref={sectionRef}
      style={{ height: `${STEPS.length * 100}vh` }}
      className="relative"
    >
      {/* ── Sticky viewport ─────────────────────────────────────── */}
      <div className="sticky top-0 overflow-hidden bg-[#090b0a]" style={{ height: '100vh' }}>

        {/* Green atmospheric glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 55% at 28% 42%, rgba(55,120,60,0.38) 0%, transparent 70%)',
          }}
        />

        {/* ── Section header ──────────────────────────────────── */}
        <div className="relative z-10 px-6 text-center pt-16 pb-10">
          {/* "Process" badge with Figma SVG connectors */}
          <div className="inline-flex items-center gap-0 mb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/inner-frame.svg" alt="" aria-hidden width={80} height={50} className="shrink-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/decorative-vector-9.svg" alt="" aria-hidden width={120} height={12} className="shrink-0" style={{ transform: 'scaleX(-1)' }} />
            <div
              className="shrink-0 px-5 py-2 rounded-full text-xs tracking-wide font-medium text-white/80 select-none"
              style={{
                background: 'rgba(20,22,20,0.85)',
                border: '1px solid rgba(255,255,255,0.14)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              Process
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/decorative-vector-9.svg" alt="" aria-hidden width={120} height={12} className="shrink-0" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/figma/inner-frame-1.svg" alt="" aria-hidden width={80} height={50} className="shrink-0" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-balance mb-3">
            From analysis to ChatGPT answer
          </h2>
          <p className="text-sm md:text-base text-white/45 max-w-xl mx-auto">
            Five steps — from a visibility audit to measurable growth in AI mentions.
          </p>
        </div>

        {/* ── Stage: card + connector + waveform ──────────────── */}
        {/*
         * Everything from the card down to the waveform lives in one
         * relative container so we can use a SINGLE absolute connector
         * line whose left position tracks the card center exactly.
         *
         * Card center (px) = CARD_OFFSETS[step] expressed as vw + CARD_WIDTH/2.
         * We pass this as a CSS left value on the connector so it always
         * touches both the card bottom and the waveform top.
         *
         * The waveform is full-width (no centering padding) so its
         * coordinate space matches the viewport — the pill position
         * (% of bars) maps directly to % of full screen width.
         */}
        <div className="relative z-10 w-full" style={{ height: 420 }}>

          {/* Card */}
          <motion.div
            className="absolute top-0"
            animate={{ left: CARD_OFFSETS[activeStep] }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{ width: CARD_WIDTH_PX }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(170deg, rgba(40,100,50,0.9) 0%, rgba(15,25,18,0.95) 55%)',
                border: '1px solid rgba(103,255,103,0.18)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
              }}
            >
              {/* Inner grid overlay */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(103,255,103,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(103,255,103,0.15) 1px, transparent 1px)',
                  backgroundSize: '28px 28px',
                }}
              />

              {/* Icon area */}
              <div className="relative flex items-center justify-center pt-10 pb-14" style={{ minHeight: 130 }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 56,
                      height: 56,
                      background: 'rgba(0,0,0,0.45)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                      backdropFilter: 'blur(4px)',
                    }}
                  >
                    {step.icon}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Text area */}
              <div className="relative px-5 pb-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="text-[15px] font-bold text-white leading-snug mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[11px] leading-[1.55] text-white/50">
                      {step.description}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/*
           * Connector line — absolutely positioned so its left edge matches
           * the horizontal center of the card at each step.
           * `calc(CARD_OFFSET + CARD_WIDTH/2)` keeps it perfectly centred
           * under the card no matter where it travels.
           */}
          <motion.div
            aria-hidden
            className="absolute"
            animate={{ left: `calc(${CARD_OFFSETS[activeStep]} + ${CARD_WIDTH_PX / 2}px)` }}
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            style={{
              top: 340,           // bottom of card (approx)
              width: 1,
              height: 56,
              transform: 'translateX(-50%)',
              background: 'linear-gradient(180deg, rgba(103,255,103,0.75) 0%, rgba(103,255,103,0.08) 100%)',
            }}
          />

          {/* ── Waveform progress bar — full viewport width ─── */}
          {/*
           * No padding, no justify-center. Bars span the full width so
           * that percentage-based pill positioning maps 1-to-1 with
           * screen coordinates. Bar width + gap auto-fill via flex.
           */}
          <div
            className="absolute inset-x-0"
            style={{ top: 396 }}
          >
            <div className="relative flex items-end gap-[2px] w-full h-8 px-4">
              {BAR_HEIGHTS.map((h, i) => {
                const isActive = i < activeBarsCount;
                return (
                  <div
                    key={i}
                    style={{
                      flex: '1 1 0',
                      maxWidth: 5,
                      height: h,
                      borderRadius: 2,
                      background: isActive ? '#67FF67' : 'rgba(255,255,255,0.12)',
                      transition: 'background 0.35s',
                    }}
                  />
                );
              })}

              {/* Floating step pill — left% maps to bar fraction of full width */}
              <StepPill
                label={step.label}
                number={step.number}
                totalBars={TOTAL_BARS}
                activeBars={activeBarsCount}
              />
            </div>
          </div>
        </div>

        {/* ── Dot navigation ──────────────────────────────────── */}
        <div className="relative z-10 flex justify-center gap-3 mt-5">
          {STEPS.map((s, i) => (
            <div
              key={s.number}
              aria-hidden
              className="transition-all duration-300"
              style={{
                width: i === activeStep ? 24 : 8,
                height: 4,
                borderRadius: 9999,
                background: i === activeStep ? '#67FF67' : 'rgba(255,255,255,0.18)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ───────────────────────────────────────────────── */



function StepPill({
  label,
  number,
  totalBars,
  activeBars,
}: {
  label: string;
  number: string;
  totalBars: number;
  activeBars: number;
}) {
  const pct = (activeBars / totalBars) * 100;
  return (
    <motion.div
      className="absolute bottom-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      animate={{ left: `${pct}%` }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
      style={{
        transform: 'translateX(-50%)',
        background: 'rgba(20,24,20,0.92)',
        border: '1px solid rgba(103,255,103,0.35)',
        color: 'white',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(6px)',
      }}
    >
      <span className="text-white/80">{label}</span>
      <span
        className="flex items-center justify-center text-[10px] font-bold rounded-full text-[#090b0a]"
        style={{
          width: 18,
          height: 18,
          background: '#67FF67',
          flexShrink: 0,
        }}
      >
        {number}
      </span>
    </motion.div>
  );
}
