'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

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
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Only mount animated content on client after hydration
  useEffect(() => {
    setMounted(true);
    setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Render static fallback until mounted
  if (!mounted || isMobile || prefersReducedMotion) {
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

  const cardMotions = problems.map((_, idx) => ({
    opacity: useTransform(scrollYProgress, [idx * 0.25, idx * 0.25 + 0.25], [0, 1]),
    y: useTransform(scrollYProgress, [idx * 0.25, idx * 0.25 + 0.25], [60, 0]),
    scale: useTransform(scrollYProgress, [idx * 0.25, idx * 0.25 + 0.25], [0.92, 1]),
  }));

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
          ))}
        </div>
      </div>
    </section>
  );
}
