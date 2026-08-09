'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { useRef, useSyncExternalStore } from 'react';

interface Problem {
  id: number;
  title: string;
  desc: string;
  pos: { top?: string; left?: string; right?: string };
}

interface ProblemSectionClientProps {
  problems: Problem[];
}

// -- Client-only mount guard without setState-in-effect -----------------------
const noop = () => {};
const subscribe = () => noop;

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false // server snapshot -> static fallback during SSR
  );
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', onStoreChange);
      return () => mql.removeEventListener('change', onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function ProblemSectionClient({ problems }: ProblemSectionClientProps) {
  const isClient = useIsClient();
  const isMobile = useMediaQuery('(max-width: 767px)');
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  // Render static fallback until hydrated, on mobile, or if user prefers reduced motion
  if (!isClient || isMobile || prefersReducedMotion) {
    return (
      <section className="prompt-problem-section py-20 md:py-28">
        {/* Red decorative glows per Figma (Decorative Vector + Decorative Ellipse) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-clip opacity-60">
          <img
            src="/figma/problem-decorative-ellipse.svg"
            alt=""
            className="absolute left-1/2 top-[46%] -translate-x-1/2 mix-blend-plus-lighter"
            style={{ width: "min(1300px, 130%)" }}
          />
          <img
            src="/figma/problem-decorative-vector.svg"
            alt=""
            className="absolute left-1/2 top-[50%] -translate-x-1/2 mix-blend-plus-lighter"
            style={{ width: "min(1340px, 134%)" }}
          />
        </div>
        <div className="mx-auto max-w-6xl px-6 relative">
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
              {problems.map((problem) => (
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
              className="px-6 py-2 rounded-full bg-[#67FF67] text-[#0F0F0F] text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Go to Solution
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Only render animated version on desktop after hydration
  return <ProblemSectionAnimated problems={problems} />;
}

// Separate component for animated desktop view (only called after hydration)
function ProblemSectionAnimated({ problems }: ProblemSectionClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 60%', 'end 40%'],
  });

  return (
    <section
      ref={sectionRef}
      className="prompt-problem-section py-20 md:py-28"
    >
      {/* Background backdrop */}
      <div className="prompt-problem-bg" />
      <div className="prompt-problem-grid" />

      {/* Red decorative glows (per Figma: Decorative Vector 102:184 + Decorative Ellipse 102:387) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-clip">
        <img
          src="/figma/problem-decorative-ellipse.svg"
          alt=""
          className="absolute left-1/2 top-[46%] -translate-x-1/2 mix-blend-plus-lighter"
          style={{ width: "min(1300px, 130%)", opacity: 0.9 }}
        />
        <img
          src="/figma/problem-decorative-vector.svg"
          alt=""
          className="absolute left-1/2 top-[50%] -translate-x-1/2 mix-blend-plus-lighter"
          style={{ width: "min(1340px, 134%)", opacity: 0.9 }}
        />
      </div>

      {/* Edge fades */}
      <div className="prompt-problem-edge prompt-problem-edge-top" />
      <div className="prompt-problem-edge prompt-problem-edge-bottom" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="prompt-problem-stage">
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

            <h3 className="text-xl font-bold leading-snug text-white mb-2">
              You&apos;re invisible where decisions are made
            </h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Founders, investors, and users discover you through AI. Or they don&apos;t.
            </p>

            <div className="mt-6">
              <a
                href="#solutions"
                className="inline-block px-5 py-2.5 rounded-lg bg-[#67FF67] text-[#0F0F0F] text-xs font-bold hover:opacity-90 transition-opacity"
              >
                Go to Solution
              </a>
            </div>
          </div>

          {/* Floating problem cards */}
          {problems.map((problem, idx) => (
            <FloatingProblemCard
              key={problem.id}
              problem={problem}
              idx={idx}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FloatingProblemCard({
  problem,
  idx,
  scrollYProgress,
}: {
  problem: Problem;
  idx: number;
  scrollYProgress: MotionValue<number>;
}) {
  // Hooks must be called unconditionally, so each card gets its own
  // transformed motion values (not called inside .map()).
  const from = [idx * 0.25, idx * 0.25 + 0.25];
  const opacity = useTransform(scrollYProgress, from, [0, 1]);
  const y = useTransform(scrollYProgress, from, [60, 0]);
  const scale = useTransform(scrollYProgress, from, [0.92, 1]);

  return (
    <motion.div
      className="absolute prompt-problem-card"
      style={{
        top: problem.pos.top,
        left: problem.pos.left,
        right: problem.pos.right,
        opacity,
        y,
        scale,
      }}
    >
      <h4 className="prompt-problem-card-title">{problem.title}</h4>
      <p className="prompt-problem-card-body">{problem.desc}</p>
    </motion.div>
  );
}
