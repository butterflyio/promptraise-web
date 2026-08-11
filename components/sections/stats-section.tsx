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

/** Figma mobile "Features Section" (frame 415:7299 + heading 415:9260) -
 * 24px headline, 5 masked ellipse rings, 92x92 center mark, 4 stat cards
 * overlaying the rings in a staggered 2-col grid. All copy from CMS
 * (visibility block) with the same Figma defaults as desktop. */
function StatsMobileLayout({
  content,
}: {
  content?: HomePageVisibilitySection;
}) {
  const headlineLineOne =
    content?.headline?.lineOne ?? defaultVisibilitySection.headline.lineOne;
  const headlineLineTwo =
    content?.headline?.lineTwo ?? defaultVisibilitySection.headline.lineTwo;

  const statCards = defaultVisibilitySection.statCards.map((card, index) => ({
    value: content?.statCards?.[index]?.value ?? card.value,
    label: content?.statCards?.[index]?.label ?? card.label,
  }));

  const ringLayers = [
    {
      img: "/figma/mobile-ring-1.svg",
      wrapperClass: "left-[calc(50%+6px)] top-1/2 size-[612px]",
      inset: "inset-[-27.34%_-42.35%_-57.37%_-42.35%]",
      maskPosition: "-196px 89px",
    },
    {
      img: "/figma/mobile-ring-2.svg",
      wrapperClass: "left-[calc(50%+6.5px)] top-[calc(50%+0.5px)] size-[527px]",
      inset: "inset-[-31.75%_-49.18%_-66.62%_-49.18%]",
      maskPosition: "-239px 46px",
    },
    {
      img: "/figma/mobile-ring-3.svg",
      wrapperClass: "left-[calc(50%+6px)] top-1/2 size-[442px]",
      inset: "inset-[-37.85%_-58.64%_-79.44%_-58.64%]",
      maskPosition: "-281px 4px",
    },
    {
      img: "/figma/mobile-ring-4.svg",
      wrapperClass:
        "left-[calc(50%+6.58px)] top-[calc(50%-0.29px)] size-[487.158px]",
      inset: "inset-[-46.86%_-72.61%_-98.35%_-72.61%]",
      maskPosition: "-259px 26.865px",
      rotate: true,
    },
    {
      img: "/figma/mobile-ring-5.svg",
      wrapperClass: "left-[calc(50%+6px)] top-1/2 size-[272px]",
      inset: "inset-[-61.51%_-95.3%_-129.08%_-95.3%]",
      maskPosition: "-366px -81px",
    },
  ];

  const ringMaskStyle = (maskPosition: string): React.CSSProperties => ({
    WebkitMaskImage: "url(/figma/mobile-ring-mask.svg)",
    maskImage: "url(/figma/mobile-ring-mask.svg)",
    WebkitMaskSize: "993px 433px",
    maskSize: "993px 433px",
    WebkitMaskPosition: maskPosition,
    maskPosition,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
  });

  return (
    <div className="desktop:hidden tablet:py-24 relative overflow-hidden py-16">
      <SectionLabel name="StatsSection" />
      <div className="mx-auto max-w-[1248px]">
        {/* Heading (Figma 415:9260): 24px regular + bold, mix-blend-luminosity */}
        <p className="relative z-10 mx-auto max-w-[361px] text-center text-[24px] text-white mix-blend-luminosity">
          <span className="leading-[1.5] font-normal tracking-[-0.02em]">
            {headlineLineOne}
          </span>
          <br aria-hidden />
          <span className="leading-[1.3] font-bold tracking-[-0.02em]">
            {headlineLineTwo}
          </span>
        </p>

        {/* Composition: rings + center mark + 4 stat cards (Figma 415:7299) */}
        <div className="relative mx-auto mt-2 h-[420px] w-full max-w-[393px]">
          {/* Rings visual - 5 masked ellipse layers (415:7304..415:7308) */}
          <div
            className="pointer-events-none absolute top-[40px] bottom-[3px] left-1/2 w-[710px] -translate-x-1/2"
            aria-hidden="true"
          >
            <div className="absolute top-[57px] left-[-41px]">
              <div className="absolute top-1/2 left-[calc(50%+6px)] -translate-x-1/2 -translate-y-1/2">
                {ringLayers.map((layer) => (
                  <div
                    key={layer.img}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 ${layer.wrapperClass}`}
                    style={ringMaskStyle(layer.maskPosition)}
                  >
                    {layer.rotate ? (
                      <div className="flex rotate-[-60.22deg] items-center justify-center">
                        <div className="relative size-[357px]">
                          <div className={`absolute ${layer.inset}`}>
                            <img
                              src={layer.img}
                              alt=""
                              className="block size-full max-w-none"
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className={`absolute ${layer.inset}`}>
                        <img
                          src={layer.img}
                          alt=""
                          className="block size-full max-w-none"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center mark (415:9269 Background Container 92x92 at ring center) */}
          <img
            src="/images/logo-stats-section.png"
            alt="PromptRaise mark"
            className="absolute top-1/2 left-1/2 z-10 size-[92px] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
          />

          {/* 4 stat cards overlaying the rings (Figma 415:9261/8199/9265/8200) */}
          <StatCardMobile
            value={statCards[0]?.value ?? ""}
            label={statCards[0]?.label ?? ""}
            className="top-[25px] left-[16px] h-[86px] w-[173px]"
          />
          <StatCardMobile
            value={statCards[1]?.value ?? ""}
            label={statCards[1]?.label ?? ""}
            className="top-[90px] left-[205px] h-[69px] w-[172px]"
          />
          <StatCardMobile
            value={statCards[2]?.value ?? ""}
            label={statCards[2]?.label ?? ""}
            className="top-[241px] left-[16px] h-[69px] w-[173px]"
          />
          <StatCardMobile
            value={statCards[3]?.value ?? ""}
            label={statCards[3]?.label ?? ""}
            className="top-[310px] left-[205px] h-[69px] w-[172px]"
          />
        </div>
      </div>
    </div>
  );
}

/** Figma features-card (415:9261 instance) - bg #232b28, white/91 border,
 * rounded-20, drop shadow + 3px inset ring; 16px bold value / 12px #71717a label. */
function StatCardMobile({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className: string;
}) {
  return (
    <div
      className={`absolute flex flex-col items-center justify-center gap-1 overflow-hidden rounded-[20px] border border-white/[0.91] bg-[#232b28] px-6 py-3 text-center shadow-[0px_9px_16.9px_0px_rgba(0,0,0,0.25),0px_0px_0px_3px_#232b28] ${className}`}
    >
      <p className="text-[16px] leading-[1.5] font-bold tracking-[-0.02em] whitespace-nowrap text-white">
        {value}
      </p>
      <p className="text-[12px] leading-[1.4] font-medium text-[#71717a]">
        {label}
      </p>
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
      <StatsMobileLayout content={content} />

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
