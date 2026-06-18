'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useMemo, useEffect, useState } from 'react';

const PROBLEMS = [
  {
    id: 1,
    title: '72% of B2B buyers start research with AI',
    desc: 'Not through Google. Not through your website.',
    pos: { top: '12%', left: '8%' },
  },
  {
    id: 2,
    title: 'Traditional marketing doesn't reach AI',
    desc: 'Your SEO tactics won't work on Claude, ChatGPT, or Perplexity.',
    pos: { top: '58%', left: '6%' },
  },
  {
    id: 3,
    title: "You're invisible where decisions are made",
    desc: 'Founders, investors, and users discover you through AI. Or they don't.',
    pos: { top: '28%', right: '7%' },
  },
  {
    id: 4,
    title: 'Competitors are already in ChatGPT',
    desc: 'They're getting cited. They're getting traffic. You're not.',
    pos: { top: '64%', right: '6%' },
  },
];

export function ProblemSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile/reduced motion
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 40%'],
  });

  // Map scroll to card indices (drop them in sequence as you scroll through the section)
  const cardAnimations = useMemo(() => {
    return PROBLEMS.map((_, idx) => {
      const start = idx * 0.25; // Each card enters at 25% of scroll
      const end = start + 0.25;
      return {
        opacity: useTransform(scrollYProgress, [start, end], [0, 1]),
        y: useTransform(scrollYProgress, [start, end], [60, 0]),
        scale: useTransform(scrollYProgress, [start, end], [0.92, 1]),
      };
    });
  }, [scrollYProgress]);

  const prefersReducedMotion =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  // On mobile or reduced-motion, render static stacked layout
  if (isMobile || prefersReducedMotion) {
    return (
      <section className="prompt-problem-section py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="prompt-problem-window p-6 md:p-8">
            <div className="prompt-problem-window-bar pb-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="prompt-problem-window-title font-mono text-sm">
                  &gt; theProblem.exe
                </h2>
                <div className="prompt-problem-dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {PROBLEMS.map((problem) => (
                <div key={problem.id} className="prompt-problem-card">
                  <h3 className="prompt-problem-card-title">{problem.title}</h3>
                  <p className="prompt-problem-card-body">{problem.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-8">
            <a
              href="#solutions"
              className="px-6 py-2 rounded-full bg-[#67FF67] text-[#0F0F0F] text-sm font-semibold hover:bg-[#5de65d] transition-colors"
            >
              Go to Solution
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: floating card animation on scroll
  return (
    <section
      ref={sectionRef}
      className="prompt-problem-section py-20 md:py-28"
    >
      {/* Background backdrop */}
      <div className="prompt-problem-bg" />
      <div className="prompt-problem-grid" />

      {/* Edge fades */}
      <div className="prompt-problem-edge prompt-problem-edge-top" />
      <div className="prompt-problem-edge prompt-problem-edge-bottom" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="prompt-problem-stage" ref={stageRef}>
          {/* Central window */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-full max-w-xl prompt-problem-window p-8">
            <div className="prompt-problem-window-bar pb-4 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="prompt-problem-window-title font-mono text-sm">
                  &gt; theProblem.exe
                </h2>
                <div className="prompt-problem-dots">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold leading-snug text-[var(--text-primary)] mb-2">
              You&apos;re invisible where decisions are made
            </h3>
            <p className="text-sm text-[rgba(212,221,217,0.6)] leading-relaxed">
              Founders, investors, and users discover you through AI. Or they don&apos;t.
            </p>

            <div className="mt-6">
              <a
                href="#solutions"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#67FF67] text-[#0F0F0F] text-xs font-bold hover:bg-[#5de65d] transition-colors"
              >
                Go to Solution
              </a>
            </div>
          </div>

          {/* Floating problem cards */}
          {PROBLEMS.map((problem, idx) => (
            <motion.div
              key={problem.id}
              className="absolute prompt-problem-card"
              style={{
                top: problem.pos.top,
                left: problem.pos.left,
                right: problem.pos.right,
                opacity: cardAnimations[idx].opacity,
                y: cardAnimations[idx].y,
                scale: cardAnimations[idx].scale,
              }}
            >
              <h4 className="prompt-problem-card-title">{problem.title}</h4>
              <p className="prompt-problem-card-body">{problem.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
