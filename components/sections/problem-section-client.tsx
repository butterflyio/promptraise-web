'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState, useLayoutEffect } from 'react';

interface Problem {
  id: number;
  title: string;
  desc: string;
  pos: { top?: string; left?: string; right?: string };
}

interface ProblemSectionClientProps {
  problems: Problem[];
}

export function ProblemSectionClient({ problems }: ProblemSectionClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [canAnimate, setCanAnimate] = useState(false);

  // Detect mobile/reduced motion after hydration
  useLayoutEffect(() => {
    setIsHydrated(true);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Defer animation setup until after layout is stable
  useEffect(() => {
    if (isHydrated && !isMobile && !prefersReducedMotion) {
      // Defer to next frame to ensure DOM is ready
      const timer = requestAnimationFrame(() => {
        setCanAnimate(true);
      });
      return () => cancelAnimationFrame(timer);
    }
  }, [isHydrated, isMobile, prefersReducedMotion]);

  // Initialize scroll tracking only after animation is enabled and DOM is ready
  const { scrollYProgress } = useScroll({
    target: canAnimate ? sectionRef : null,
    offset: ['start 60%', 'end 40%'],
  });

  // Build motion values for each card only when animating
  const cardMotions = canAnimate 
    ? problems.map((_, idx) => ({
        opacity: useTransform(scrollYProgress, [idx * 0.25, idx * 0.25 + 0.25], [0, 1]),
        y: useTransform(scrollYProgress, [idx * 0.25, idx * 0.25 + 0.25], [60, 0]),
        scale: useTransform(scrollYProgress, [idx * 0.25, idx * 0.25 + 0.25], [0.92, 1]),
      }))
    : [];

  // On mobile or reduced-motion, render static stacked layout
  if (!isHydrated || isMobile || prefersReducedMotion) {
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
          {canAnimate && cardMotions.length > 0
            ? problems.map((problem, idx) => (
                <motion.div
                  key={problem.id}
                  className="absolute prompt-problem-card"
                  style={{
                    top: problem.pos.top,
                    left: problem.pos.left,
                    right: problem.pos.right,
                    opacity: cardMotions[idx].opacity,
                    y: cardMotions[idx].y,
                    scale: cardMotions[idx].scale,
                  }}
                >
                  <h4 className="prompt-problem-card-title">{problem.title}</h4>
                  <p className="prompt-problem-card-body">{problem.desc}</p>
                </motion.div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
