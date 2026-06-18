import type { ReactNode } from "react";

import { DsCard, DsSection, DsSectionContainer } from "@/components/design-system";

const experts = [
  {
    name: "Zain Khan",
    role: "Co-founder & CEO, Cicada",
    description:
      "Marketing strategist specializing in AI-driven brand visibility for emerging Web3 projects.",
    backedBy: ["Market Making", "AI Marketing Strategy"],
    accent: "from-[rgba(99,255,145,0.24)] via-[rgba(30,32,31,0.92)] to-[rgba(8,9,9,1)]",
    initials: "ZK",
  },
  {
    name: "PromptRaise",
    role: "Systems for search, content, and distribution",
    description:
      "A working team model that combines strategy, editorial, and technical implementation so the signal stays consistent.",
    backedBy: ["Search", "Content", "Engineering"],
    accent: "from-[rgba(99,255,145,0.18)] via-[rgba(29,30,31,0.94)] to-[rgba(8,9,9,1)]",
    initials: "PR",
  },
] as const;

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      aria-label={label}
      href={href}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/8 bg-white/[0.03] text-white/78 transition-colors hover:border-white/18 hover:bg-white/[0.05]"
    >
      {children}
    </a>
  );
}

function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M18.9 3H22l-6.9 7.9L23 21h-6.8l-5.3-6.4L5.3 21H2l7.5-8.6L1 3h6.9l4.8 5.8L18.9 3Zm-1.2 16h1.7L7 4.9H5.2L17.7 19Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M6.5 8.6H3.9V21h2.6V8.6ZM5.2 3.1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM20.1 21h-2.6v-6.1c0-1.5-.6-2.6-2-2.6-1 0-1.6.7-1.9 1.4-.1.2-.1.6-.1.9V21H10.8s.1-11.3 0-12.4h2.6v1.8c.3-.8 1.6-2 4-2 2.9 0 5 1.9 5 6V21Z" />
    </svg>
  );
}

export function CaseStudiesSection() {
  return (
    <DsSection id="case-studies" className="ds-section-base">
      <DsSectionContainer>
        <div className="grid gap-10 desktop:grid-cols-[340px_minmax(0,1fr)]">
          <div className="max-w-[300px]">
            <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
              Built by Web3 Veterans
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)] tablet:text-4xl">
              People who know how the ecosystem actually moves.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)]">
              The work blends strategy, content, and engineering so the system is credible
              to both humans and machines.
            </p>
          </div>

          <div className="grid gap-4 tablet:grid-cols-2">
            {experts.map((expert) => (
              <DsCard
                key={expert.name}
                className={`relative overflow-hidden rounded-[28px] border border-white/7 bg-[linear-gradient(180deg,rgba(15,16,16,0.98),rgba(7,8,8,1))] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.25)] tablet:p-7`}
              >
                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${expert.accent}`}
                />
                <div className="pointer-events-none absolute right-[-2rem] top-[-1.5rem] h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(103,255,103,0.18),transparent_68%)] blur-2xl" />

                <div className="relative flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[rgba(103,255,103,0.18)] bg-[rgba(103,255,103,0.12)] text-lg font-semibold tracking-[-0.04em] text-[var(--accent-primary)]">
                        {expert.initials}
                      </div>
                      <div>
                        <h3 className="text-[22px] font-semibold tracking-[-0.04em] text-white">
                          {expert.name}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed tracking-[-0.02em] text-white/42">
                          {expert.role}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      <SocialIcon label={`${expert.name} on Twitter`} href="https://twitter.com">
                        <TwitterIcon />
                      </SocialIcon>
                      <SocialIcon label={`${expert.name} on LinkedIn`} href="https://linkedin.com">
                        <LinkedInIcon />
                      </SocialIcon>
                    </div>
                  </div>

                  <p className="mt-6 max-w-[460px] text-[15px] leading-[1.55] tracking-[-0.02em] text-white/70">
                    {expert.description}
                  </p>

                  <div className="mt-8">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/32">
                      Backed by
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {expert.backedBy.map((item) => (
                        <span
                          key={item}
                          className="inline-flex rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm tracking-[-0.02em] text-white/72"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto pt-10">
                    <div className="h-px w-full bg-white/8" />
                  </div>
                </div>
              </DsCard>
            ))}
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
