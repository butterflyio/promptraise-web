"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore } from "react";

interface Problem {
  id: number;
  title: string;
  desc: string;
  pos: { top?: string; left?: string; right?: string };
}

interface ProblemSectionClientProps {
  problems: Problem[];
  windowTitle?: string;
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
}

// -- Client-only mount guard without setState-in-effect -----------------------
const noop = () => {};
const subscribe = () => noop;

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true, // client snapshot
    () => false, // server snapshot -> static fallback during SSR
  );
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onStoreChange);
      return () => mql.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export function ProblemSectionClient({
  problems,
  windowTitle,
  heading,
  subtext,
  ctaLabel,
}: ProblemSectionClientProps) {
  const isClient = useIsClient();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  // Render static fallback until hydrated, on mobile, or if user prefers reduced motion
  if (!isClient || isMobile || prefersReducedMotion) {
    return (
      <section className="prompt-problem-section py-20 md:py-28">
        {/* Red decorative glows per Figma (Decorative Vector + Decorative Ellipse) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-clip opacity-60"
        >
          <img
            src="/figma/problem-decorative-ellipse.svg"
            alt=""
            aria-hidden="true"
            className="absolute top-[46%] left-1/2 -translate-x-1/2 mix-blend-plus-lighter"
            style={{ width: "min(1300px, 130%)" }}
          />
          <img
            src="/figma/problem-decorative-vector.svg"
            alt=""
            aria-hidden="true"
            className="absolute top-[50%] left-1/2 -translate-x-1/2 mix-blend-plus-lighter"
            style={{ width: "min(1340px, 134%)" }}
          />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="prompt-problem-window p-6 md:p-8">
            <div className="prompt-problem-window-bar relative mb-6 flex items-center pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/problem-window-dots.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-[1px] left-[2px] h-[17px] w-[65px]"
              />
              <h2 className="prompt-problem-window-title absolute inset-x-0 text-center">
                {windowTitle ?? "theProblem.exe"}
              </h2>
            </div>
            <div className="space-y-4">
              {problems.map((problem) => (
                <div key={problem.id} className="prompt-problem-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/figma/problem-card-icon.svg"
                    alt=""
                    aria-hidden="true"
                    className="prompt-problem-card-icon"
                  />
                  <h3 className="prompt-problem-card-title">{problem.title}</h3>
                  <p className="prompt-problem-card-body">{problem.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="#solutions"
              className="inline-flex items-center rounded-full bg-[#67FF67] px-6 py-2.5 text-sm font-semibold text-[#0F0F0F] transition-opacity hover:opacity-90"
            >
              {ctaLabel ?? "Go to Solution"}
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Only render animated version on desktop after hydration
  return (
    <ProblemSectionAnimated
      problems={problems}
      windowTitle={windowTitle}
      heading={heading}
      subtext={subtext}
      ctaLabel={ctaLabel}
    />
  );
}

// Separate component for animated desktop view (only called after hydration)
function ProblemSectionAnimated({
  problems,
  windowTitle,
  heading,
  subtext,
  ctaLabel,
}: ProblemSectionClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 60%", "end 40%"],
  });

  return (
    <section ref={sectionRef} className="prompt-problem-section py-20 md:py-28">
      {/* Background backdrop */}
      <div className="prompt-problem-bg" />
      <div className="prompt-problem-grid" />

      {/* Dark separator-grid layer + scattered marks (Figma 102:185 mask group, #1E1E1E decorative vectors) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[38%] left-1/2 z-0 h-[746px] w-[1441px] -translate-x-1/2 -rotate-180 opacity-70"
        style={{
          WebkitMaskImage: "url(/figma/problem-mask.svg)",
          maskImage: "url(/figma/problem-mask.svg)",
          WebkitMaskSize: "1441px 1075px",
          maskSize: "1441px 1075px",
          WebkitMaskPosition: "-3px 96px",
          maskPosition: "-3px 96px",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        }}
      >
        <img
          src="/figma/problem-bg-layer.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[-1476px] left-[-259px] block h-[2222px] w-[1959px] max-w-none"
        />
        {/* Scattered decorative marks */}
        <img
          src="/figma/problem-mark-2.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[123px] left-[191px] h-[24px] w-[25px]"
        />
        <img
          src="/figma/problem-mark-3.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-[51px] h-[24px] w-[25px]"
        />
        <img
          src="/figma/problem-mark-4.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[106px] left-0 h-[24px] w-[25px]"
        />
        <img
          src="/figma/problem-mark-5.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[246px] left-[134px] size-[24px]"
        />
        <img
          src="/figma/problem-mark-6.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[214px] left-[345px] size-[23px]"
        />
        <img
          src="/figma/problem-mark-7.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[348px] left-[281px] h-[23px] w-[24px]"
        />
        <img
          src="/figma/problem-mark-8.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[276px] left-[513px] h-[24px] w-[26px]"
        />
        <img
          src="/figma/problem-mark-9.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[423px] left-[443px] h-[24px] w-[28px]"
        />
        <img
          src="/figma/problem-mark-10.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[307px] left-[694px] h-[24px] w-[27px]"
        />
        <img
          src="/figma/problem-mark-11.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[466px] left-[618px] h-[25px] w-[27px]"
        />
        <img
          src="/figma/problem-mark-12.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[298px] left-[895px] h-[24px] w-[28px]"
        />
        <img
          src="/figma/problem-mark-13.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[473px] left-[812px] h-[25px] w-[29px]"
        />
        <img
          src="/figma/problem-mark-14.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[233px] left-[1124px] h-[31px] w-[27px]"
        />
        <img
          src="/figma/problem-mark-15.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[436px] left-[1028px] h-[26px] w-[28px]"
        />
      </div>

      {/* Red decorative glows (per Figma: Decorative Vector 102:184 + Decorative Ellipse 102:387) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-clip"
      >
        <img
          src="/figma/problem-decorative-ellipse.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[46%] left-1/2 -translate-x-1/2 mix-blend-plus-lighter"
          style={{ width: "min(1300px, 130%)", opacity: 0.9 }}
        />
        <img
          src="/figma/problem-decorative-vector.svg"
          alt=""
          aria-hidden="true"
          className="absolute top-[50%] left-1/2 -translate-x-1/2 mix-blend-plus-lighter"
          style={{ width: "min(1340px, 134%)", opacity: 0.9 }}
        />
      </div>

      {/* Edge fades */}
      <div className="prompt-problem-edge prompt-problem-edge-top" />
      <div className="prompt-problem-edge prompt-problem-edge-bottom" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="prompt-problem-stage">
          {/* Central window */}
          <div className="prompt-problem-window absolute inset-x-0 top-1/2 mx-auto w-full max-w-2xl -translate-y-1/2 p-8">
            <div className="prompt-problem-window-bar relative mb-6 flex items-center pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/figma/problem-window-dots.svg"
                alt=""
                aria-hidden="true"
                className="absolute top-[1px] left-0 h-[17px] w-[65px]"
              />
              <h2 className="prompt-problem-window-title absolute inset-x-0 text-center">
                {windowTitle ?? "theProblem.exe"}
              </h2>
            </div>

            <h3 className="desktop:text-4xl mb-4 text-3xl leading-[1.15] font-bold whitespace-pre-line text-white">
              {heading ?? "You're invisible where decisions are made"}
            </h3>
            <p className="desktop:text-base text-sm leading-[1.5] text-[#aaa]">
              {subtext ??
                "Founders, investors, and users discover you through AI. Or they don't."}
            </p>

            <div className="mt-6 flex justify-center">
              <a
                href="#solutions"
                className="inline-flex items-center rounded-full bg-[#67FF67] px-6 py-2.5 text-sm font-semibold text-[#0F0F0F] transition-opacity hover:opacity-90"
              >
                {ctaLabel ?? "Go to Solution"}
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
      className="prompt-problem-card absolute"
      style={{
        top: problem.pos.top,
        left: problem.pos.left,
        right: problem.pos.right,
        opacity,
        y,
        scale,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/figma/problem-card-icon.svg"
        alt=""
        aria-hidden="true"
        className="prompt-problem-card-icon"
      />
      <h4 className="prompt-problem-card-title">{problem.title}</h4>
      <p className="prompt-problem-card-body">{problem.desc}</p>
    </motion.div>
  );
}
