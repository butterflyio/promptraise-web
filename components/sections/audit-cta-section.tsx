import { DsSection, DsSectionContainer } from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";

interface AuditCtaSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
}

const CHECKLIST = [
  "Content gap analysis across AI + communities",
  "Real creators (not AI-generated content)",
  "Tier-1 crypto media placements",
  "Measurable growth in AI mentions",
];

export function AuditCtaSection({
  auditUrl = "https://audit.promptraise.com",
}: AuditCtaSectionProps) {
  return (
    <DsSection className="ds-section-base">
      <SectionLabel name="AuditCtaSection" />
      <DsSectionContainer className="py-20 tablet:py-24">
        {/* Rounded banner card */}
        <div
          className="relative w-full overflow-hidden rounded-[32px]"
          style={{ background: "rgba(19,22,25,0.25)" }}
        >
          {/* Ambient background: light glow + green pattern tint */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute left-0 top-0 h-[500px] w-full opacity-70"
              style={{
                background:
                  "radial-gradient(60% 100% at 30% 10%, rgba(103,255,103,0.18), transparent 60%)",
              }}
            />
            <div className="absolute right-0 top-0 hidden h-full w-1/2 opacity-40 tablet:block">
              <img
                src="/figma/cta-pattern.svg"
                alt=""
                aria-hidden="true"
                className="block h-full w-full object-cover opacity-50"
              />
            </div>
            {/* decorative grid rectangles */}
            <div className="absolute left-[40%] top-[12%] h-[113px] w-[110px] rounded-md border border-white/5 bg-white/5 opacity-40 hidden desktop:block" />
            <div className="absolute left-[58%] top-[60%] h-[113px] w-[112px] rounded-md border border-white/5 bg-white/5 opacity-40 hidden desktop:block" />
          </div>

          {/* Two-column layout: text left, window right */}
          <div className="relative grid items-center gap-10 p-6 tablet:p-8 desktop:grid-cols-[1fr_1.05fr] desktop:gap-6 desktop:p-12">
            {/* Left column */}
            <div className="flex flex-col items-start">
              <h2 className="text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-white tablet:text-[40px]">
                <span>
                  Ready <span className="text-[#b1ffb1]">to be the answer,</span>
                </span>
                <br />
                <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text font-medium text-transparent">
                  not the search result?
                </span>
              </h2>

              <p className="mt-4 max-w-[538px] text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40 tablet:text-[16px] tablet:leading-[1.5]">
                Start with a free audit and see how AI talks about your project
                today.
              </p>

              <a
                href={auditUrl}
                className="mt-8 inline-flex h-14 w-[192px] items-center justify-between rounded-full bg-[var(--accent-primary)] py-1.5 pl-6 pr-1.5 text-[16px] leading-none text-[#09090b] shadow-[0px_8px_12px_rgba(0,0,0,0.32)] transition-transform hover:scale-[1.02]"
              >
                <span className="whitespace-nowrap">Get Free Audit</span>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <svg
                    viewBox="0 0 14 14"
                    fill="none"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path
                      d="M3 11L11 3M11 3H4M11 3V10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </a>
            </div>

            {/* Right column: window mockup */}
            <div className="relative hidden tablet:block">
              <div className="relative mx-auto max-w-[460px] overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-[20px]">
                {/* Window top bar */}
                <div className="relative flex items-center gap-2 px-5 py-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                </div>

                <div className="px-6 pb-6">
                  {/* Chat bubble */}
                  <div className="flex items-end justify-end gap-3">
                    <div className="rounded-[16px] bg-white/10 px-4 py-2.5 text-[16px] leading-6 text-white backdrop-blur-[4px]">
                      Best web3 marketing agency
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#171919]">
                      <img
                        src="/figma/cta-avatar.svg"
                        alt=""
                        aria-hidden="true"
                        className="h-6 w-6"
                      />
                    </div>
                  </div>

                  {/* PromptRaise identity panel */}
                  <div className="relative mt-6 overflow-hidden rounded-[20px] border border-white/10 bg-[#0f1110] p-5">
                    <img
                      src="/figma/cta-identity-bg.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
                    />
                    <div className="relative">
                      <p className="text-[16px] font-bold leading-5 text-white">
                        <span className="text-[#67ff67]">PromptRaise</span>{" "}
                        <span className="font-medium">
                          - full-cycle AI visibility agency for Web3.
                        </span>
                      </p>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {CHECKLIST.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-[13px] leading-[1.5] text-white/40"
                          >
                            <img
                              src="/figma/cta-check.svg"
                              alt=""
                              aria-hidden="true"
                              className="h-[18px] w-[18px] shrink-0"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
