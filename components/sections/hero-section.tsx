"use client";

import {
  DsBadge,
  DsButton,
  designSystemAssets,
} from "@/components/design-system";
import type { HomePageHero } from "@/sanity/lib/queries";

interface HeroSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
  content?: HomePageHero;
}

const defaultHeroContent = {
  eyebrow: "GEO · LLM Visibility · Web3",
  headlinePrefix: "Be the",
  headlineHighlight: "answer",
  headlineSuffix: "not the search result.",
  body: [
    "When an investor asks ChatGPT about your niche — they get 2–7 names.",
    "PromptRaise makes sure one of them is yours.",
  ],
  primaryCtaLabel: "Get Free Audit",
  secondaryCta: {
    label: "How it works",
    href: "#how-it-works",
  },
  trustBar: {
    label: "Tracking visibility in",
    badge: "48 LLMs",
    logos: [
      { name: "Octals", symbol: "◌", dimmed: true },
      { name: "45 Degrees°", symbol: "↗" },
      { name: "Acme Corp", symbol: "✦" },
      { name: "AlphaWave", symbol: "⬢" },
      { name: "Alt+Shift", symbol: "◍" },
      { name: "Capsule", symbol: "●" },
      { name: "Basis", symbol: "✶", dimmed: true },
    ],
  },
};

export function HeroSection({
  auditUrl = "https://audit.promptraise.com",
  content,
}: HeroSectionProps) {
  const bodyCandidate = content?.body?.filter(Boolean) ?? [];
  const bodyLines =
    bodyCandidate.length > 0 ? bodyCandidate : defaultHeroContent.body;
  const trustLogos =
    content?.trustBar?.logos && content.trustBar.logos.length > 0
      ? content.trustBar.logos
      : defaultHeroContent.trustBar.logos;
  const primaryHref = content?.primaryCta?.href ?? auditUrl;
  const primaryLabel =
    content?.primaryCta?.label ?? defaultHeroContent.primaryCtaLabel;
  const secondaryHref =
    content?.secondaryCta?.href ?? defaultHeroContent.secondaryCta.href;
  const secondaryLabel =
    content?.secondaryCta?.label ?? defaultHeroContent.secondaryCta.label;

  return (
    <section className="prompt-hero-bg desktop:min-h-[960px] relative min-h-[780px] overflow-hidden bg-[var(--bg-hero)]">
      <video
        className="absolute inset-0 h-full w-full object-cover object-center [filter:brightness(0.94)_saturate(1.06)]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        poster={designSystemAssets.hero.poster}
      >
        <source src={designSystemAssets.hero.video} type="video/mp4" />
      </video>
      <div className="prompt-hero-vignette" aria-hidden="true" />

      <div className="mobile:px-6 tablet:pt-[220px] desktop:min-h-[960px] desktop:pt-[255px] relative z-10 mx-auto flex min-h-[780px] max-w-[1248px] flex-col items-center px-5 pt-[170px] text-center">
        <div className="flex max-w-[761px] flex-col items-center">
          <div className="mb-3 inline-flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 backdrop-blur-md">
            <span className="h-1 w-1 rounded-full bg-white/70" />
            <span className="prompt-hero-eyebrow text-white/70">
              {content?.eyebrow ?? defaultHeroContent.eyebrow}
            </span>
          </div>

          <h1 className="prompt-hero-title mb-6 text-white">
            {content?.headlinePrefix ?? defaultHeroContent.headlinePrefix}{" "}
            <strong className="font-semibold">
              {content?.headlineHighlight ??
                defaultHeroContent.headlineHighlight}
            </strong>
            <br />
            {content?.headlineSuffix ?? defaultHeroContent.headlineSuffix}
          </h1>

          <p className="prompt-hero-body mb-12 max-w-[330px] text-white/80 tablet:max-w-[584px]">
            {bodyLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < bodyLines.length - 1 ? <br /> : null}
              </span>
            ))}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <DsButton
              href={primaryHref}
              variant="light"
              showTrailingArrow
              className="group pr-1 transition-transform hover:scale-[1.02]"
              iconBubbleClassName="bg-[var(--accent-primary)] ring-1 ring-[var(--bg-hero-button-ring)] text-[var(--accent-foreground)]"
            >
              {primaryLabel}
            </DsButton>

            <DsButton
              href={secondaryHref}
              variant="hero-secondary"
            >
              {secondaryLabel}
            </DsButton>
          </div>
        </div>

        <div className="absolute right-0 bottom-24 left-0 flex flex-col items-center">
          <div className="prompt-hero-trust-label mb-5 flex items-center gap-2 text-[var(--text-muted)]">
            <span>
              {content?.trustBar?.label ?? defaultHeroContent.trustBar.label}
            </span>
            <DsBadge
              variant="dark"
              className="prompt-hero-trust-badge px-2 py-0.5 font-medium"
            >
              {content?.trustBar?.badge ?? defaultHeroContent.trustBar.badge}
            </DsBadge>
          </div>

          <div className="prompt-trust-mask w-full max-w-[978px] overflow-hidden px-4">
            <div className="tablet:gap-8 flex items-center justify-center gap-6">
              {trustLogos.map((company, index) => (
                <div
                  key={`${company.name ?? "trust-logo"}-${index}`}
                  className={`flex shrink-0 items-center gap-2 text-white ${
                    company.dimmed ? "opacity-[0.15]" : "opacity-[0.92]"
                  }`}
                >
                  <span className="text-[22px] leading-none">
                    {company.symbol}
                  </span>
                  <span className="text-[13px] leading-none font-semibold whitespace-nowrap">
                    {company.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
