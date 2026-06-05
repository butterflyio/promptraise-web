"use client";

import { useEffect, useState } from "react";

interface HeroSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
}

export function HeroSection({
  telegramUrl = "https://t.me/promptraise",
  auditUrl = "https://audit.promptraise.com",
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Atmospheric green glow background */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        {/* Main green glow - top right */}
        <div
          className="absolute -top-[20%] -right-[10%] h-[80vh] w-[80vh] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(circle, #67ff67 0%, transparent 70%)" }}
        />
        {/* Secondary glow - bottom left */}
        <div
          className="absolute -bottom-[20%] -left-[10%] h-[60vh] w-[60vh] rounded-full opacity-30 blur-[100px]"
          style={{ background: "radial-gradient(circle, #4ade80 0%, transparent 70%)" }}
        />
        {/* Center subtle glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[50vh] w-[50vh] rounded-full opacity-20 blur-[80px]"
          style={{ background: "radial-gradient(circle, #22c55e 0%, transparent 70%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          {/* Tagline pill */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#67ff67]" />
            <span className="text-sm text-white/70">
              GEO · LLM Visibility · Web3
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-5xl font-medium leading-[1.1] tracking-tight text-white md:text-7xl lg:text-8xl">
            Be the <span className="italic">answer</span>
            <br />
            not the search result.
          </h1>

          {/* Subtitle */}
          <p className="mb-10 max-w-xl text-lg text-white/60">
            When an investor asks ChatGPT about your niche — they get 2–7 names.
            PromptRaise makes sure one of them is yours.
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-wrap items-center justify-center gap-4">
            <a
              href={auditUrl}
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-transform hover:scale-105"
            >
              Get Free Audit
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#67ff67]">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="text-black"
                >
                  <path
                    d="M2 10L10 2M10 2H3M10 2V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              How it works
            </a>
          </div>
        </div>

        {/* Trust bar */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-white/50">
              <span>Tracking visibility in</span>
              <span className="rounded-md bg-[#67ff67]/20 px-2 py-0.5 text-xs font-medium text-[#67ff67]">
                48 LLMs
              </span>
            </div>
            
            {/* Scrolling logos placeholder */}
            <div className="hidden items-center gap-8 md:flex">
              {["45 Degrees°", "Acme Corp", "AlphaWave", "Alt+Shift", "Capsule"].map(
                (name) => (
                  <span
                    key={name}
                    className="text-sm font-medium text-white/30"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
