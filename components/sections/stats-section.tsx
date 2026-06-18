"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { HomePageVisibilitySection } from "@/sanity/lib/queries";

const defaultVisibilitySection = {
  headline: {
    lineOne: "If you are not in the AI responses — you do not exist,",
    lineTwo: "and PromptRaise fixes that.",
  },
  statCards: [
    { value: "58%", label: "of searches today go through AI" },
    { value: "3–5x growth", label: "growth in 90 days" },
    { value: "2–7 projects", label: "per answer" },
    { value: "+40%", label: "inbound growth" },
  ],
};

type StatsSectionProps = {
  content?: HomePageVisibilitySection;
};

type FeatureCardProps = {
  value: string;
  label: string;
  className: string;
};

function FeatureCard({ value, label, className }: FeatureCardProps) {
  return (
    <div className={`prompt-feature-card absolute ${className}`}>
      <p className="prompt-feature-card-value">{value}</p>
      <p className="prompt-feature-card-label">{label}</p>
    </div>
  );
}

function useIsMobileBreakpoint() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mediaQuery.matches);
    sync();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  return isMobile;
}

export function StatsSection({ content }: StatsSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobileBreakpoint();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "end 30%"],
  });

  const compressionProgress = useTransform(
    scrollYProgress,
    [0.06, 0.58],
    [0, 1],
    { clamp: true },
  );
  const smoothProgress = useSpring(compressionProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  const animatedWidth = useTransform(smoothProgress, [0, 1], [1320, 300]);
  const animatedHeight = useTransform(smoothProgress, [0, 1], [740, 300]);
  const animatedTop = useTransform(smoothProgress, [0, 1], [90, 265]);
  const animatedOpacity = useTransform(smoothProgress, [0, 1], [0.88, 1]);
  const logoOpacity = useTransform(smoothProgress, [0.6, 0.82, 1], [0, 0.7, 1]);
  const logoScale = useTransform(smoothProgress, [0.6, 1], [0.9, 1]);

  const animationEnabled = !isMobile && !prefersReducedMotion;

  const stageStyle = animationEnabled
    ? {
        width: animatedWidth,
        height: animatedHeight,
        top: animatedTop,
        borderRadius: 9999,
        opacity: animatedOpacity,
      }
    : {
        width: 300,
        height: 300,
        top: 265,
        borderRadius: 9999,
        opacity: 1,
      };

  const logoStyle = animationEnabled
    ? { opacity: logoOpacity, scale: logoScale }
    : { opacity: 1, scale: 1 };

  const headlineLineOne =
    content?.headline?.lineOne ?? defaultVisibilitySection.headline.lineOne;
  const headlineLineTwo =
    content?.headline?.lineTwo ?? defaultVisibilitySection.headline.lineTwo;

  const statCards = defaultVisibilitySection.statCards.map((card, index) => ({
    value: content?.statCards?.[index]?.value ?? card.value,
    label: content?.statCards?.[index]?.label ?? card.label,
  }));

  return (
    <section
      ref={sectionRef}
      id="features"
      className="prompt-stats-section relative isolate overflow-hidden bg-[var(--bg-base)]"
    >
      <div className="prompt-stats-canvas pointer-events-none absolute left-1/2 top-0 z-10 h-[782px] w-[1440px] -translate-x-1/2">
        <div className="prompt-stats-rings absolute left-1/2 top-[80px] h-[696px] w-[1419px] -translate-x-1/2">
          <div className="prompt-stats-ring prompt-stats-ring-1" />
          <div className="prompt-stats-ring prompt-stats-ring-2" />
          <div className="prompt-stats-ring prompt-stats-ring-3" />
          <div className="prompt-stats-ring prompt-stats-ring-4" />
          <div className="prompt-stats-ring prompt-stats-ring-5" />
        </div>

        <div className="prompt-stats-vectors absolute inset-0">
          <div className="prompt-stats-vector prompt-stats-vector-top" />
          <div className="prompt-stats-vector prompt-stats-vector-bottom" />
          <div className="prompt-stats-vector prompt-stats-vector-bottom-secondary" />
        </div>

        <p className="prompt-stats-headline absolute left-1/2 top-[113px] z-[24] w-[595px] -translate-x-1/2 text-center text-white">
          <span className="font-normal">{headlineLineOne}</span>
          <br />
          <span className="font-semibold">{headlineLineTwo}</span>
        </p>

        <motion.div
          className="prompt-stats-video-stage absolute left-1/2 z-[12] -translate-x-1/2 overflow-hidden"
          style={stageStyle}
          aria-hidden="true"
        >
          <video
            className="prompt-stats-core-bg"
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src="/videos/bg-video-promptraise.mp4" type="video/mp4" />
          </video>
          <div className="prompt-stats-core-overlay" aria-hidden="true" />
          <motion.svg
            width="154"
            height="76"
            viewBox="0 0 92 46"
            fill="none"
            className="prompt-stats-core-mark absolute left-1/2 top-1/2 z-10 h-auto w-[154px] -translate-x-1/2 -translate-y-1/2"
            style={logoStyle}
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M24.77 2H89L72.64 18.25H43.69l-3.67 6.22h26.02L46.03 44.4H25.5l11.8-19.93H22.2L10.43 44.4H1.34L24.77 2Z"
            />
            <path
              fill="var(--accent-primary)"
              fillOpacity="0.22"
              d="M32.97 9.84h36.13l-4.88 4.8H30.12l2.85-4.8Z"
            />
          </motion.svg>
        </motion.div>

        <div className="absolute left-1/2 top-[242px] z-[24] h-[318px] w-[992px] -translate-x-1/2">
          <FeatureCard
            value={statCards[0]?.value ?? ""}
            label={statCards[0]?.label ?? ""}
            className="left-0 top-[32px]"
          />
          <FeatureCard
            value={statCards[1]?.value ?? ""}
            label={statCards[1]?.label ?? ""}
            className="left-[667px] top-0"
          />
          <FeatureCard
            value={statCards[2]?.value ?? ""}
            label={statCards[2]?.label ?? ""}
            className="left-[76px] top-[234px]"
          />
          <FeatureCard
            value={statCards[3]?.value ?? ""}
            label={statCards[3]?.label ?? ""}
            className="left-[777px] top-[234px]"
          />
        </div>
      </div>
    </section>
  );
}
