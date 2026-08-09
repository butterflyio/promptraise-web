"use client";

import {
  DsBadge,
  DsButton,
} from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
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
      { name: "ChatGPT", logo: "/logos/llm-chatgpt.svg" },
      { name: "Claude", logo: "/logos/llm-claude.svg" },
      { name: "Gemini", logo: "/logos/llm-gemini.svg" },
      { name: "Perplexity", logo: "/logos/llm-perplexity.svg" },
      { name: "DeepSeek", logo: "/logos/llm-deepseek.svg" },
      { name: "Grok", logo: "/logos/llm-grok.svg" },
      { name: "Llama", logo: "/logos/llm-llama.svg" },
      { name: "Mistral", logo: "/logos/llm-mistral.svg" },
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
      <SectionLabel name="HeroSection" />
      <video
        className="absolute inset-0 h-full w-full object-cover object-center [filter:brightness(0.94)_saturate(1.06)]"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      >
        <source src="/videos/bg-video-promptraise.mp4" type="video/mp4" />
      </video>

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
            <div className="tablet:gap-10 flex items-center justify-center gap-8">
              {trustLogos.map((company, index) => (
                <div
                  key={`${company.name ?? "trust-logo"}-${index}`}
                  className={`flex shrink-0 items-center gap-2 text-white ${
                    "dimmed" in company && company.dimmed
                      ? "opacity-[0.15]"
                      : "opacity-[0.92]"
                  }`}
                >
                  {company.logo ? (
                    <img
                      src={company.logo}
                      alt=""
                      aria-hidden="true"
                      className="h-[18px] w-[18px]"
                    />
                  ) : (
                    <span className="text-[22px] leading-none">
                      {"symbol" in company ? company.symbol : ""}
                    </span>
                  )}
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
