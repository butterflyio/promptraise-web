'use client';

import { useState } from 'react';

const STEPS = [
  {
    number: '01',
    label: 'Audit',
    title: 'Current Visibility Audit',
    description:
      'We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you now. We fix the baseline — how often you\'re mentioned in target queries and alongside which competitors.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="7.5" stroke="white" strokeWidth="1.6" />
        <line x1="17.5" y1="17.5" x2="24" y2="24" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    label: 'Content',
    title: 'Content from Real Creators',
    description:
      'We assign unique tasks to real creators. Each has their own angle, audience, platform. Not 20 identical articles — 20 different voices about one project.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <rect x="5" y="6" width="18" height="16" rx="2" stroke="white" strokeWidth="1.6" />
        <line x1="9" y1="11" x2="19" y2="11" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="9" y1="15" x2="15" y2="15" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="20" cy="19" r="3.5" fill="#67FF67" />
        <path d="M18.5 19l1 1 2-2" stroke="#0f0f0f" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    label: 'Distribution',
    title: 'Tier-1-2 Media PR',
    description:
      'In parallel — publications in Cointelegraph, Coindesk, Decrypt, BeInCrypto, The Block. LLMs trained on these sources. This builds entity authority.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <circle cx="14" cy="14" r="8" stroke="white" strokeWidth="1.6" />
        <ellipse cx="14" cy="14" rx="4" ry="8" stroke="white" strokeWidth="1.2" />
        <line x1="6" y1="14" x2="22" y2="14" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '04',
    label: 'Verification',
    title: 'On-Chain Verification',
    description:
      'Every piece of content is verified and anchored. We ensure authenticity signals that AI systems can trust when attributing sources.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M14 4l8 3.5v7c0 4.5-3.5 8-8 9.5C9.5 22.5 6 19 6 14.5v-7L14 4z" stroke="white" strokeWidth="1.6" />
        <path d="M10.5 14l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '05',
    label: 'Measurement',
    title: 'Tracking & Monthly Report',
    description:
      'Every 2 weeks: target queries in ChatGPT, Perplexity, Google, DeepSeek, Gemini, Claude — track growth. Monthly report with before/after numbers, top queries, and next priorities.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
        <polyline points="5,20 10,13 14,16 18,9 23,11" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="19" y="16" width="5" height="5" rx="1" stroke="white" strokeWidth="1.4" />
      </svg>
    ),
  },
];

// Waveform bar heights — mimics the Figma progress bar bar heights
const BAR_HEIGHTS = [
  6,8,10,12,14,16,18,20,22,20,18,16,14,12,10,12,14,16,18,20,
  22,24,20,18,16,14,12,10,8,10,12,14,16,18,20,22,20,18,16,14,
  12,10,8,6,8,10,12,14,16,18,20,18,16,14,12,10,12,14,16,14,
  12,10,8,10,12,14,16,18,20,22,20,18,16,14,12,10,8,10,12,14,
  16,14,12,10,8,6,8,10,12,14,16,18,20,18,16,14,12,10,8,6,
];
const TOTAL_BARS = BAR_HEIGHTS.length;

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState(0);
  const step = STEPS[activeStep];

  // The progress bar split point: divide bars evenly across 5 steps
  const activeBarsCount = Math.round(((activeStep + 1) / STEPS.length) * TOTAL_BARS);

  return (
    <section className="relative overflow-hidden bg-[#090b0a] py-20 md:py-28">

      {/* ── Green atmospheric glow ─────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 28% 42%, rgba(55,120,60,0.38) 0%, transparent 70%)',
        }}
      />

      {/* ── Section header ─────────────────────────────────────── */}
      <div className="relative z-10 px-6 text-center mb-14 md:mb-20">

        {/* "Process" badge with circuit-board connectors */}
        <div className="inline-flex items-center gap-0 mb-6">
          {/* Left connector */}
          <ConnectorLine side="left" />
          {/* Badge pill */}
          <div
            className="px-4 py-1.5 rounded-full text-xs tracking-wide font-medium text-white/80 select-none"
            style={{
              background: 'rgba(20,22,20,0.85)',
              border: '1px solid rgba(255,255,255,0.14)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
            }}
          >
            Process
          </div>
          {/* Right connector */}
          <ConnectorLine side="right" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-balance mb-3">
          From analysis to ChatGPT answer
        </h2>
        <p className="text-sm md:text-base text-white/45 max-w-xl mx-auto">
          Five steps — from a visibility audit to measurable growth in AI mentions.
        </p>
      </div>

      {/* ── Main stage: card (left) + grid (right) ─────────────── */}
      <div className="relative z-10 w-full" style={{ minHeight: 460 }}>

        {/* Perspective grid — fills right half, extends behind */}
        <PerspectiveGrid />

        {/* Step card */}
        <div className="relative z-20 px-6 md:px-12 lg:px-20">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{
              width: 'min(310px, 85vw)',
              background: 'linear-gradient(170deg, rgba(40,100,50,0.9) 0%, rgba(15,25,18,0.95) 55%)',
              border: '1px solid rgba(103,255,103,0.18)',
              boxShadow: '0 24px 60px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}
          >
            {/* Inner grid overlay on card */}
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
            <div className="relative flex items-center justify-center pt-10 pb-16">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: 52,
                  height: 52,
                  background: 'rgba(0,0,0,0.45)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                {step.icon}
              </div>
            </div>

            {/* Text area */}
            <div className="relative px-5 pb-6">
              <h3 className="text-[15px] font-bold text-white leading-snug mb-2">
                {step.title}
              </h3>
              <p className="text-[11px] leading-[1.55] text-white/50">
                {step.description}
              </p>
            </div>
          </div>

          {/* Vertical connector line from card to progress bar */}
          <div
            aria-hidden
            className="ml-[calc(min(310px,85vw)/2)] -translate-x-px"
            style={{
              width: 1,
              height: 60,
              background: 'linear-gradient(180deg, rgba(103,255,103,0.7) 0%, rgba(103,255,103,0.15) 100%)',
            }}
          />
        </div>
      </div>

      {/* ── Waveform progress bar ───────────────────────────────── */}
      <div className="relative z-10 w-full overflow-hidden mt-0">
        <div className="relative flex items-end justify-center gap-[2px] h-8 px-0">
          {BAR_HEIGHTS.map((h, i) => {
            const isActive = i < activeBarsCount;
            return (
              <div
                key={i}
                style={{
                  width: 3,
                  height: h,
                  borderRadius: 2,
                  background: isActive ? '#67FF67' : 'rgba(255,255,255,0.12)',
                  transition: 'background 0.3s',
                  flexShrink: 0,
                }}
              />
            );
          })}

          {/* Floating step pill — positioned at the active split point */}
          <StepPill
            label={step.label}
            number={step.number}
            totalBars={TOTAL_BARS}
            activeBars={activeBarsCount}
          />
        </div>
      </div>

      {/* ── Step navigation (click dots) ───────────────────────── */}
      <div className="relative z-10 flex justify-center gap-3 mt-6">
        {STEPS.map((s, i) => (
          <button
            key={s.number}
            onClick={() => setActiveStep(i)}
            aria-label={`Step ${s.number}: ${s.title}`}
            className="flex flex-col items-center gap-1.5 group focus:outline-none"
          >
            <div
              className="transition-all duration-300"
              style={{
                width: i === activeStep ? 24 : 8,
                height: 4,
                borderRadius: 9999,
                background: i === activeStep ? '#67FF67' : 'rgba(255,255,255,0.18)',
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

/* ── Sub-components ──────────────────────────────────────────────── */

function ConnectorLine({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="flex items-center gap-1.5">
      {side === 'left' ? (
        <>
          <Dot size={3} opacity={0.35} />
          <Dot size={5} opacity={0.55} />
          <Line />
          <Dot size={7} opacity={0.8} />
        </>
      ) : (
        <>
          <Dot size={7} opacity={0.8} />
          <Line />
          <Dot size={5} opacity={0.55} />
          <Dot size={3} opacity={0.35} />
        </>
      )}
    </div>
  );
}

function Dot({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div
      aria-hidden
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `rgba(180,200,180,${opacity})`,
        flexShrink: 0,
      }}
    />
  );
}

function Line() {
  return (
    <div
      aria-hidden
      style={{
        width: 36,
        height: 1,
        background: 'linear-gradient(90deg, rgba(180,200,180,0.15), rgba(180,200,180,0.45))',
        flexShrink: 0,
      }}
    />
  );
}

function PerspectiveGrid() {
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 right-0 pointer-events-none"
      style={{ width: '62%' }}
    >
      {/* Fade edge on the left side of the grid */}
      <div
        className="absolute inset-y-0 left-0 z-10"
        style={{
          width: 120,
          background: 'linear-gradient(90deg, #090b0a 0%, transparent 100%)',
        }}
      />
      {/* Fade edge bottom */}
      <div
        className="absolute inset-x-0 bottom-0 z-10"
        style={{
          height: 80,
          background: 'linear-gradient(0deg, #090b0a 0%, transparent 100%)',
        }}
      />
      {/* The grid itself, perspective-transformed */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(103,255,103,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(103,255,103,0.22) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          transform: 'perspective(600px) rotateX(52deg)',
          transformOrigin: '50% 0%',
          opacity: 0.7,
        }}
      />
    </div>
  );
}

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
    <div
      className="absolute bottom-0 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold"
      style={{
        left: `${pct}%`,
        transform: 'translateX(-50%)',
        background: 'rgba(20,24,20,0.92)',
        border: '1px solid rgba(103,255,103,0.35)',
        color: 'white',
        whiteSpace: 'nowrap',
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
        backdropFilter: 'blur(6px)',
        transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1)',
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
    </div>
  );
}
