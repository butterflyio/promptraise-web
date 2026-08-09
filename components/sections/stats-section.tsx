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
import { SectionLabel } from "@/components/section-label";

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

/** Figma mobile/tablet "Features Section" - heading, badge, rings, stacked cards */
function StatsMobileLayout() {
  return (
    <div className="desktop:hidden tablet:py-24 relative overflow-hidden py-16">
      <SectionLabel name="StatsSection" />
      <div className="mx-auto max-w-[1248px] px-6">
        {/* Heading row: tracking label + 48 LLMs badge */}
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center justify-center gap-2">
            <span className="text-[16px] tracking-[-0.02em] text-[#d4d4d8]">
              Tracking visibility in
            </span>
            <span className="rounded-full border border-black/90 bg-black/35 px-3 pt-0.5 pb-[2px] text-[12px] font-medium tracking-[-0.02em] text-white backdrop-blur-[6px]">
              48 LLMs
            </span>
          </div>
          {/* Slider / divider line */}
          <div className="relative h-8 w-full max-w-[392px]">
            <div
              className="absolute top-0 left-1/2 h-[43px] w-full max-w-[393px] -translate-x-1/2"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0) 0%, #fff 25%, #fff 75%, rgba(255,255,255,0) 100%)",
                WebkitMaskImage: "url(/figma/mobile-slider-mask.svg)",
                maskImage: "url(/figma/mobile-slider-mask.svg)",
                WebkitMaskSize: "100% 32px",
                maskSize: "100% 32px",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                opacity: 0.7,
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Rings visual behind the cards */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -z-0 -translate-x-1/2 -translate-y-1/2 opacity-50"
          aria-hidden="true"
        >
          <div
            className="relative h-[391px] w-[710px]"
            style={{
              WebkitMaskImage: "url(/figma/mobile-ring-mask.svg)",
              maskImage: "url(/figma/mobile-ring-mask.svg)",
              WebkitMaskSize: "993px 433px",
              maskSize: "993px 433px",
              WebkitMaskPosition: "-196px 89px",
              maskPosition: "-196px 89px",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <img
              src="/figma/mobile-ring-1.svg"
              alt=""
              className="absolute inset-0 block h-full w-full max-w-none"
            />
          </div>
        </div>

        {/* Two stacked glass cards */}
        <div className="tablet:gap-6 relative mt-10 grid gap-4">
          {/* Card 1: Current Visibility Audit */}
          <div className="tablet:p-7 overflow-hidden rounded-[16px] border-[0.5px] border-white bg-black/25 p-5 shadow-[0_0_0_2px_rgba(255,255,255,0.07)] backdrop-blur-[3.25px]">
            {/* Decorative visual strip */}
            <div className="relative mx-auto mb-4 h-[178px] w-full max-w-[340px]">
              <img
                src="/figma/mobile-audit-vec-1.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-1/2 left-0 h-auto w-[112px] -translate-y-1/2 opacity-60"
              />
              <img
                src="/figma/mobile-audit-vec-2.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-1/3 right-4 h-auto w-[112px] -translate-y-1/2 rotate-180 opacity-60"
              />
              <img
                src="/figma/mobile-audit-ellipse.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 h-auto w-[270px] -translate-x-1/2 -translate-y-1/2 opacity-40"
              />
              <img
                src="/figma/mobile-audit-card.svg"
                alt=""
                className="absolute top-1/2 left-0 h-auto w-[165px] max-w-none -translate-y-1/2"
              />
              <img
                src="/figma/mobile-audit-card-2.svg"
                alt=""
                className="absolute top-1/2 right-0 h-auto w-[165px] max-w-none -translate-y-1/2 -scale-x-100"
              />
              <img
                src="/figma/mobile-audit-center.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 h-[53px] w-[53px] -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <h3 className="bg-gradient-to-b from-white to-white/90 bg-clip-text text-[18px] leading-[1.4] font-bold tracking-[-0.02em] text-transparent">
              Current Visibility Audit
            </h3>
            <p className="mt-2 text-[12px] leading-[1.5] text-white/40">
              We check how ChatGPT, Gemini, Perplexity, Claude, DeepSeek see you
              now. We fix the baseline - how often you&apos;re mentioned in
              target queries and alongside which competitors.
            </p>
          </div>

          {/* Card 2: Real creators, not AI text */}
          <div className="tablet:p-7 overflow-hidden rounded-[24px] border border-white/[0.03] bg-[rgba(19,22,25,0.25)] p-5 backdrop-blur-[6.5px]">
            {/* Logos grid visual */}
            <div className="relative mx-auto mb-4 grid max-w-[340px] grid-cols-6 gap-2 overflow-hidden opacity-70">
              {Array.from({ length: 18 }).map((_, i) => (
                <img
                  key={i}
                  src={`/figma/mobile-creators-dot-${i + 1}.png`}
                  alt=""
                  aria-hidden="true"
                  className="h-[38px] w-[38px] rounded-full object-cover"
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#22c55e] to-[#127637] shadow-[0_0_0_2px_rgba(0,222,78,0.2)]">
                <img
                  src="/figma/mobile-creators-logo.svg"
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5"
                />
              </span>
              <h3 className="bg-gradient-to-b from-white to-white/90 bg-clip-text text-[16px] leading-[1.5] font-bold tracking-[-0.02em] text-transparent">
                Real creators, not AI text
              </h3>
            </div>
            <p className="mt-3 text-[12px] leading-[1.4] text-white/40">
              LLMs filter AI-generated content. Real person with real audience -
              an EEAT signal that can&apos;t be faked.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
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
  const animatedTop = useTransform(smoothProgress, [0, 1], [90, 278]);
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
        top: 278,
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
      {/* Mobile / tablet layout (below desktop) */}
      <StatsMobileLayout />

      {/* Desktop animated canvas (>= 1024px) */}
      <div className="desktop:block hidden">
        <SectionLabel name="StatsSection" />
        <div className="prompt-stats-canvas pointer-events-none absolute top-0 left-1/2 z-10 h-[782px] w-[1440px] -translate-x-1/2">
          {/* Figma ring visual - masked ellipse layers */}
          <div className="prompt-stats-rings absolute top-[80px] left-1/2 h-[696px] w-[1419px] -translate-x-1/2">
            <div
              className="absolute top-1/2 left-1/2 size-[1223px] -translate-x-1/2 -translate-y-1/2"
              style={{
                WebkitMaskImage: "url(/figma/stats-ellipse-mask.svg)",
                maskImage: "url(/figma/stats-ellipse-mask.svg)",
                WebkitMaskSize: "1985px 866px",
                maskSize: "1985px 866px",
                WebkitMaskPosition: "-391px 179px",
                maskPosition: "-391px 179px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <img
                src="/figma/stats-ellipse-1.svg"
                alt=""
                className="block h-full w-full"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 size-[1053px] -translate-x-1/2 -translate-y-1/2"
              style={{
                WebkitMaskImage: "url(/figma/stats-ellipse-mask.svg)",
                maskImage: "url(/figma/stats-ellipse-mask.svg)",
                WebkitMaskSize: "1985px 866px",
                maskSize: "1985px 866px",
                WebkitMaskPosition: "-476px 94px",
                maskPosition: "-476px 94px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <img
                src="/figma/stats-ellipse-2.svg"
                alt=""
                className="block h-full w-full"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 size-[883px] -translate-x-1/2 -translate-y-1/2"
              style={{
                WebkitMaskImage: "url(/figma/stats-ellipse-mask.svg)",
                maskImage: "url(/figma/stats-ellipse-mask.svg)",
                WebkitMaskSize: "1985px 866px",
                maskSize: "1985px 866px",
                WebkitMaskPosition: "-561px 9px",
                maskPosition: "-561px 9px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <img
                src="/figma/stats-ellipse-3.svg"
                alt=""
                className="block h-full w-full"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 size-[713px] -translate-x-1/2 -translate-y-1/2 rotate-[-60.22deg]"
              style={{
                WebkitMaskImage: "url(/figma/stats-ellipse-mask.svg)",
                maskImage: "url(/figma/stats-ellipse-mask.svg)",
                WebkitMaskSize: "1985px 866px",
                maskSize: "1985px 866px",
                WebkitMaskPosition: "-516px 54px",
                maskPosition: "-516px 54px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <img
                src="/figma/stats-ellipse-4.svg"
                alt=""
                className="block h-full w-full"
                aria-hidden="true"
              />
            </div>
            <div
              className="absolute top-1/2 left-1/2 size-[544px] -translate-x-1/2 -translate-y-1/2"
              style={{
                WebkitMaskImage: "url(/figma/stats-ellipse-mask.svg)",
                maskImage: "url(/figma/stats-ellipse-mask.svg)",
                WebkitMaskSize: "1985px 866px",
                maskSize: "1985px 866px",
                WebkitMaskPosition: "-730px -161px",
                maskPosition: "-730px -161px",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            >
              <img
                src="/figma/stats-ellipse-5.svg"
                alt=""
                className="block h-full w-full"
                aria-hidden="true"
              />
            </div>
          </div>

          <p className="prompt-stats-headline absolute top-[113px] left-1/2 z-[24] w-[595px] -translate-x-1/2 text-center text-white">
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
            <motion.img
              src="/images/logo-stats-section.png"
              alt="PromptRaise mark"
              width={154}
              height={154}
              className="prompt-stats-core-mark absolute top-1/2 left-1/2 z-10 h-auto w-[154px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
              style={logoStyle}
              aria-hidden="true"
            />
          </motion.div>

          <div className="absolute top-[242px] left-1/2 z-[24] h-[318px] w-[992px] -translate-x-1/2">
            <FeatureCard
              value={statCards[0]?.value ?? ""}
              label={statCards[0]?.label ?? ""}
              className="top-[32px] left-0"
            />
            <FeatureCard
              value={statCards[1]?.value ?? ""}
              label={statCards[1]?.label ?? ""}
              className="top-0 left-[667px]"
            />
            <FeatureCard
              value={statCards[2]?.value ?? ""}
              label={statCards[2]?.label ?? ""}
              className="top-[234px] left-[76px]"
            />
            <FeatureCard
              value={statCards[3]?.value ?? ""}
              label={statCards[3]?.label ?? ""}
              className="top-[234px] left-[777px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
