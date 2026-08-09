import { DsSection, DsSectionContainer } from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
import { cn } from "@/lib/cn";
import type { HomePage } from "@/sanity/lib/queries";

const DEFAULT_CHECKLIST = [
  "Content gap analysis across AI + communities",
  "Real creators (not AI-generated content)",
  "Tier-1 crypto media placements",
  "Measurable growth in AI mentions",
];

interface AuditCtaSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
}

/* ------------------------------------------------------------------ */
/* Figma CTA Banner - faithful transcription                          */
/* Desktop context: node 411:6768 (1248x500)                           */
/* Tablet context:  node 411:6900 (696x761)                            */
/* ------------------------------------------------------------------ */

/** Get Free Audit pill - Figma ButtonIcon (312:4029) */
function ButtonIcon({
  auditUrl,
  className,
  label = "Get Free Audit",
}: {
  auditUrl: string;
  className?: string;
  label?: string;
}) {
  return (
    <a
      href={auditUrl}
      className={cn(
        "flex w-[192px] items-center justify-between rounded-full border border-solid border-[rgba(0,0,0,0.91)] bg-[#67ff67] py-1 pr-1 pl-6 drop-shadow-[0px_8px_12px_rgba(0,0,0,0.32)] transition-transform hover:scale-[1.02]",
        className,
      )}
      data-node-id="312:4029"
    >
      <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.5] tracking-[-0.32px] text-[#09090b] [word-break:break-word]">
        {label}
      </p>
      <div
        className="flex shrink-0 items-center rounded-full bg-white p-[12px]"
        data-node-id="312:3946"
        data-name="Icon"
      >
        <div
          className="relative size-[24px] shrink-0 overflow-clip"
          data-node-id="312:4052"
          data-name="Icon"
        >
          <div
            className="absolute inset-[29.17%]"
            data-node-id="I312:4052;312:4051"
            data-name="Vector"
          >
            <div className="absolute inset-[-7.5%]">
              <img
                alt=""
                className="block size-full max-w-none"
                src="/figma/figma-fd7006a2-b532-4e39-98bd-826f6ffda47e.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

/** The glassy window mockup - Figma 411:6828 (fixed 439x444 content) */
function WindowMockup({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute h-[444px] w-[439px] overflow-clip rounded-[24px] border border-solid border-white/10 bg-white/5 backdrop-blur-[37px]",
        className,
      )}
      data-node-id="411:6828"
      data-name="window"
    >
      {/* Window buttons top bar - 411:6829 */}
      <div
        className="absolute top-[-1px] right-[-1px] left-[-1px] flex h-[61px] items-center bg-[rgba(249,249,250,0.05)] p-[22.177px]"
        data-node-id="411:6829"
        data-name="Window buttons"
      >
        <div
          className="absolute top-[22px] left-[22px] h-[17px] w-[64px]"
          data-node-id="411:6830"
          data-name="Button Icon Frame"
        >
          <div className="absolute inset-[0_-1.56%_0_0]">
            <img
              alt=""
              className="block size-full max-w-none"
              src="/figma/cta-window-dots.svg"
            />
          </div>
        </div>
      </div>

      {/* Chat bubble row - 411:6834 */}
      <div
        className="absolute top-[84px] left-[55px] flex w-[359px] items-end gap-[18px]"
        data-node-id="411:6834"
        data-name="Best web3 marketing agency Container"
      >
        <div
          className="relative h-[45px] w-[293px] shrink-0 mix-blend-difference"
          data-node-id="411:6835"
          data-name="Bubble - Person"
        >
          <div
            className="absolute top-0 left-0 h-[45px] w-[293px]"
            data-node-id="411:6836"
            data-name="Inner Frame"
          >
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src="/figma/cta-bubble.svg"
            />
          </div>
          <div
            className="absolute right-[-7px] bottom-0 h-[21px] w-[30px]"
            data-node-id="411:6838"
            data-name="Tail"
          >
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src="/figma/cta-bubble-tail.svg"
            />
          </div>
          <p className="absolute top-[9px] right-[20px] left-[22px] text-[18px] leading-[24px] [word-break:break-word] text-white">
            Best web3 marketing agency
          </p>
        </div>
        <div
          className="relative flex size-[48px] shrink-0 items-center justify-center rounded-[112.5px] bg-[#171919] mix-blend-difference backdrop-blur-[9px]"
          data-node-id="411:6840"
          data-name="Inner Frame"
        >
          <div
            className="relative size-[24px] shrink-0"
            data-node-id="411:6841"
          >
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src="/figma/cta-avatar.svg"
            />
          </div>
        </div>
      </div>

      {/* Window controls - 411:6844 */}
      <div
        className="absolute top-[235px] left-[23px] size-[48px]"
        data-node-id="411:6844"
        data-name="Window Controls"
      >
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          src="/figma/cta-window-controls.svg"
        />
      </div>
    </div>
  );
}

/** PromptRaise identity panel - Figma 411:6853 (fixed 396x209 content) */
function IdentityPanel({
  className,
  heading = "PromptRaise - full-cycle AI visibility agency for Web3.",
  checklist = DEFAULT_CHECKLIST,
}: {
  className?: string;
  heading?: string;
  checklist?: string[];
}) {
  return (
    <div
      className={cn("absolute h-[209px] w-[396px]", className)}
      data-node-id="411:6853"
      data-name="PromptRaise — full-cycle AI visibility a Container"
    >
      {/* Logo Shape - 411:6854 */}
      <div
        className="absolute top-0 left-[0.31px] h-[209px] w-[395.689px]"
        data-node-id="411:6854"
        data-name="Logo Shape"
      >
        <div className="absolute inset-[-14.47%_-1.98%_-27.34%_-38.22%]">
          <img
            alt=""
            className="block size-full max-w-none"
            src="/figma/cta-logo-shape.svg"
          />
        </div>
      </div>
      {/* Mask Group - 411:6857 */}
      <div
        className="absolute top-0 left-[0.31px] contents"
        data-node-id="411:6857"
        data-name="Mask Group"
      >
        <div
          className="absolute top-0 left-[0.31px] h-[209px] w-[395.689px]"
          data-node-id="411:6858"
          data-name="Mask Group"
        >
          <div className="absolute inset-[-14.47%_0_-27.34%_-38.22%]">
            <img
              alt=""
              className="block size-full max-w-none"
              src="/figma/cta-mask-group.svg"
            />
          </div>
        </div>
      </div>
      {/* Heading + checklist - 411:6863 */}
      <div
        className="absolute top-[calc(50%+0.5px)] left-[38px] flex h-[160px] w-[330px] -translate-y-1/2 flex-col items-start gap-[16px]"
        data-node-id="411:6863"
      >
        <p
          className="relative w-full shrink-0 text-[16px] leading-[1.25] font-bold tracking-[-0.32px] [word-break:break-word] text-white"
          data-node-id="411:6864"
        >
          <span className="text-[#67ff67]">{`PromptRaise `}</span>
          <span className="font-medium">{heading}</span>
        </p>
        <div
          className="relative flex h-[104px] w-full shrink-0 flex-col items-start gap-[4.481px]"
          data-node-id="411:6865"
          data-name="List"
        >
          {checklist.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex w-full shrink-0 items-start gap-[4px] ${
                idx === 0 ? "h-[22px]" : "h-[23px]"
              }`}
              data-name="Item"
            >
              <div
                className={`relative shrink-0 ${
                  idx === 0 ? "flex size-[22px] items-center" : "size-[23px]"
                }`}
                data-name="Inner Frame"
              >
                <div className="relative size-[22px] shrink-0">
                  <img
                    alt=""
                    className="absolute inset-0 block size-full max-w-none"
                    src={idx === 0 ? "/figma/cta-check.svg" : "/figma/cta-check-2.svg"}
                  />
                </div>
              </div>
              <div className="relative flex min-w-px flex-[1_0_0] flex-col justify-center text-[13.44px] leading-[1.5] text-[#52525b] [word-break:break-word]">
                <p className="whitespace-pre-wrap">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Vertical separator line ornament (rotated 90deg) */
function Sep({ className, src }: { className?: string; src: string }) {
  return (
    <div
      className={cn(
        "absolute flex h-[82px] w-0 items-center justify-center",
        className,
      )}
    >
      <div className="flex-none rotate-90">
        <div className="relative h-0 w-[82px]" data-name="Separator Line">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block size-full max-w-none" src={src} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Horizontal separator line ornament */
function SepH({ className, src }: { className?: string; src: string }) {
  return (
    <div
      className={cn("absolute h-0 w-[82px]", className)}
      data-name="Separator Line"
    >
      <div className="absolute inset-[-1px_0_0_0]">
        <img alt="" className="block size-full max-w-none" src={src} />
      </div>
    </div>
  );
}

/**
 * Full background layer stack - Figma 411:6769.
 * All child coordinates are identical between the desktop and tablet
 * contexts except the Patterns container horizontal offset, passed in
 * via `patternsLeft`.
 */
function BgLayers({ patternsLeft }: { patternsLeft: string }) {
  return (
    <div
      className="pointer-events-none absolute top-0 left-0 h-[500px] w-full"
      data-node-id="411:6769"
      data-name="BG"
    >
      {/* Light radial glow - 411:6770 */}
      <div
        className="absolute top-[-170px] left-[-290.87px] h-[1106.331px] w-[2281.047px]"
        data-node-id="411:6770"
        data-name="Light"
      >
        <div className="absolute inset-[-7.17%_-1.57%_-0.48%_0]">
          <img
            alt=""
            className="block size-full max-w-none"
            src="/figma/cta-light.svg"
          />
        </div>
      </div>

      {/* Patterns (masked grid) - 411:6774 */}
      <div
        className={cn(
          "absolute top-0 h-[900px] w-[1440px] -translate-x-1/2",
          patternsLeft,
        )}
        data-node-id="411:6774"
        data-name="Patterns"
      >
        <div
          className="absolute top-0 left-0 h-[900px] w-[1440px]"
          data-node-id="411:6775"
          data-name="Inner Frame"
        >
          <div
            className="absolute top-0 left-0 h-[900px] w-[1440px]"
            data-node-id="411:6777"
            data-name="Inner Frame"
            style={{
              maskImage: 'url("/figma/cta-mask-grid.svg")',
              maskSize: "1604px 1604px",
              maskPosition: "-82px -352px",
              maskRepeat: "no-repeat",
              maskComposite: "intersect",
              maskMode: "alpha",
              WebkitMaskImage: 'url("/figma/cta-mask-grid.svg")',
              WebkitMaskSize: "1604px 1604px",
              WebkitMaskPosition: "-82px -352px",
              WebkitMaskRepeat: "no-repeat",
            }}
          >
            <div
              className="absolute top-0 left-0 h-[900px] w-[1440px]"
              data-node-id="411:6778"
              data-name="Inner Frame"
            >
              <img
                alt=""
                className="absolute inset-0 block size-full max-w-none"
                src="/figma/cta-pattern-base.svg"
              />
            </div>
            <div
              className="absolute top-0 left-0 flex h-[900px] w-[1440px] items-center justify-center"
              data-node-id="411:6788"
            >
              <div className="flex-none -rotate-90">
                <div
                  className="relative h-[1440px] w-[900px]"
                  data-name="Inner Frame"
                >
                  <div className="absolute inset-[0_-60%_0_0]">
                    <img
                      alt=""
                      className="block size-full max-w-none"
                      src="/figma/cta-pattern-rotated.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative rectangles - 411:6803..411:6806 */}
            <div
              className="absolute top-[112px] left-[554px] h-[113px] w-[110px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6803"
              data-name="Decorative Rectangle"
            />
            <div
              className="absolute top-[562px] left-[996px] h-[113px] w-[112px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6804"
              data-name="Decorative Rectangle"
            />
            <div
              className="absolute top-px left-[886px] size-[111px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6805"
              data-name="Decorative Rectangle"
            />
            <div
              className="absolute top-[225px] left-[1218px] h-[112px] w-[111px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6806"
              data-name="Decorative Rectangle"
            />
          </div>
        </div>
        {/* Empty Inner Frame decor - 411:6807 */}
        <div
          className="absolute top-[765px] left-[1316px] size-[24px] opacity-75"
          data-node-id="411:6807"
          data-name="Inner Frame"
        />
      </div>

      {/* Glow blot - 411:6808 */}
      <div
        className="absolute top-[-198.77px] left-px h-[428.708px] w-[436.883px]"
        data-node-id="411:6808"
        data-name="Inner Frame"
      >
        <div className="absolute inset-[-19.92%_-16.85%_-19.92%_-16.65%]">
          <img
            alt=""
            className="block size-full max-w-none"
            src="/figma/cta-glow.svg"
          />
        </div>
      </div>

      {/* Sparkle - 411:6813 */}
      <div
        className="absolute top-[365.71px] left-[357px] h-[365.115px] w-[437.134px]"
        data-node-id="411:6813"
        data-name="Inner Frame"
      >
        <div className="absolute inset-[-22.18%_-17.88%_-22.18%_-17.77%]">
          <img
            alt=""
            className="block size-full max-w-none"
            src="/figma/cta-sparkle.svg"
          />
        </div>
      </div>

      {/* Decorative Ellipse - 411:6818 */}
      <div
        className="absolute top-[-56px] left-[847.85px] flex h-[699.02px] w-[718.768px] items-center justify-center mix-blend-plus-lighter"
        data-node-id="411:6818"
      >
        <div className="flex-none scale-y-[0.99] rotate-[36.42deg] skew-x-[-8.23deg]">
          <div
            className="relative h-[874px] w-[130px]"
            data-name="Decorative Ellipse"
          >
            <div className="absolute inset-[-25.63%_-172.31%]">
              <img
                alt=""
                className="block size-full max-w-none"
                src="/figma/cta-ellipse.svg"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Separator lines - 411:6819..411:6826 */}
      <Sep className="top-[335px] left-[537px]" src="/figma/cta-sep-1.svg" />
      <Sep className="top-[404px] left-[94px]" src="/figma/cta-sep-2.svg" />
      <Sep className="top-[-35px] left-[426px]" src="/figma/cta-sep-1.svg" />
      <SepH className="top-[450px] left-[417px]" src="/figma/cta-sep-3.svg" />
      <SepH className="top-[225px] left-[537px]" src="/figma/cta-sep-3.svg" />
      <SepH className="top-[112px] left-[-47px]" src="/figma/cta-sep-3.svg" />
      <Sep className="top-[30px] left-[94px]" src="/figma/cta-sep-4.svg" />
      <SepH className="top-[338px] left-[1202px]" src="/figma/cta-sep-3.svg" />
      {/* Center divider - 411:6885 (also present in tablet 411:7017) */}
      <Sep className="top-[83px] left-[648px]" src="/figma/cta-sep-1.svg" />
    </div>
  );
}

/** Left text column - Figma 411:6886 (position set per breakpoint) */
function LeftColumn({
  className,
  auditUrl,
  heading = "Ready to be the answer, not the search result?",
  subtext = "Start with a free audit and see how AI talks about your project today.",
  ctaLabel,
}: {
  className?: string;
  auditUrl: string;
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
}) {
  // Figma split: green "Ready to be the answer," + gradient "not the search result?"
  const greenPart = heading.split("not the search result?")[0] ?? "Ready to be the answer,";
  const restPart = heading.includes("not the search result?")
    ? "not the search result?"
    : heading;
  return (
    <div
      className={cn(
        "absolute flex w-[594px] -translate-y-1/2 flex-col items-start gap-[48px]",
        className,
      )}
      data-node-id="411:6886"
      data-name="Ready to be the answer, not the search r Container"
    >
      <div
        className="relative flex w-full shrink-0 flex-col items-start gap-[16px]"
        data-node-id="411:6887"
      >
        <div
          className="relative flex w-[594px] shrink-0 flex-col items-start"
          data-node-id="411:6888"
          data-name="Ready to be the answer, not the search r"
        >
          <div
            className="relative flex w-full shrink-0 flex-col justify-center text-[40px] leading-[0] font-bold tracking-[-1.5px] [word-break:break-word] text-white"
            data-node-id="411:6889"
          >
            <p className="mb-0">
              <span className="leading-[1.2]">{`Ready `}</span>
              <span className="leading-[1.2] text-[#b1ffb1]">
                {greenPart}
              </span>
            </p>
            <p className="bg-gradient-to-b from-white to-[rgba(255,255,255,0.5)] bg-clip-text font-medium leading-[1.2] text-[transparent]">
              {restPart}
            </p>
          </div>
        </div>
        <div
          className="relative w-[538px] shrink-0 text-[16px] leading-[1.5] tracking-[-0.32px] [word-break:break-word] text-[#52525b]"
          data-node-id="411:6890"
        >
          <p>{subtext}</p>
        </div>
      </div>
      <ButtonIcon
        auditUrl={auditUrl}
        className="shrink-0"
        label={ctaLabel}
      />
    </div>
  );
}

export function AuditCtaSection({
  auditUrl = "https://audit.promptraise.com",
  copy,
}: AuditCtaSectionProps & { copy?: HomePage["auditCta"] }) {
  const heading = copy?.heading ?? "Ready to be the answer, not the search result?";
  const subtext =
    copy?.subtext ??
    "Start with a free audit and see how AI talks about your project today.";
  const ctaLabel = copy?.ctaLabel ?? "Get Free Audit";
  const checklistHeading =
    copy?.checklistHeading ?? "PromptRaise - full-cycle AI visibility agency for Web3.";
  const checklist = copy?.checklist?.length ? copy.checklist : DEFAULT_CHECKLIST;
  return (
    <DsSection className="ds-section-base">
      <SectionLabel name="AuditCtaSection" />
      <DsSectionContainer className="tablet:py-24 py-20">
        {/* Figma CTA Banner card - 411:6768 / 411:6900 */}
        <div
          className="relative w-full overflow-clip rounded-[32px] bg-[rgba(19,22,25,0.25)]"
          data-node-id="411:6768"
          data-name="CTA Banner"
        >
          {/* Desktop >= 1024px: exact 1248-wide Figma layout (411:6768) */}
          <div className="desktop:block hidden">
            <div className="relative h-[500px] w-full">
              <BgLayers patternsLeft="left-[calc(50%+80px)]" />

              {/* Image container - 411:6827 */}
              <div
                className="pointer-events-none absolute bottom-0 left-[648px] h-[500px] w-[600px] overflow-clip"
                data-node-id="411:6827"
                data-name="Image"
              >
                <WindowMockup className="top-[97px] left-[63px]" />
                {/* Empty Inner Frame decor - 411:6851 */}
                <div
                  className="absolute top-[24px] left-[460px] size-[100px]"
                  data-node-id="411:6851"
                  data-name="Inner Frame"
                />
                <Sep className="left-[590px] top-[83px]" src="/figma/cta-sep-1.svg" />
                <IdentityPanel
                  className="left-[145px] top-[253px]"
                  heading={checklistHeading}
                  checklist={checklist}
                />
                {/* Decorative Ellipse - 411:6884 */}
                <div
                  className="absolute bottom-0 left-[calc(50%+207px)] size-[120px] -translate-x-1/2"
                  data-node-id="411:6884"
                  data-name="Decorative Ellipse"
                >
                  <div className="absolute inset-[-166.67%]">
                    <img
                      alt=""
                      className="block size-full max-w-none"
                      src="/figma/cta-ellipse-2.svg"
                    />
                  </div>
                </div>
              </div>

              <LeftColumn
                className="left-[96px] top-1/2"
                auditUrl={auditUrl}
                heading={heading}
                subtext={subtext}
                ctaLabel={ctaLabel}
              />
            </div>
          </div>

          {/* Tablet 768-1023px: exact 696-wide Figma layout (411:6900) */}
          <div className="tablet:block desktop:hidden hidden">
            <div className="relative h-[761px] w-full">
              <BgLayers patternsLeft="left-[calc(50%+356px)]" />

              {/* Image container - 411:6959 */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-[484px] w-[696px] overflow-clip"
                data-node-id="411:6959"
                data-name="Image"
              >
                <WindowMockup className="top-[97px] left-[98px]" />
                {/* Empty Inner Frame decor - 411:6983 */}
                <div
                  className="absolute top-[24px] left-[495px] size-[100px]"
                  data-node-id="411:6983"
                  data-name="Inner Frame"
                />
                <Sep className="left-[648px] top-[83px]" src="/figma/cta-sep-1.svg" />
                <IdentityPanel
                  className="left-[180px] top-[253px]"
                  heading={checklistHeading}
                  checklist={checklist}
                />
                {/* Decorative Ellipse - 411:7016 */}
                <div
                  className="absolute bottom-[-16px] left-[calc(50%+194px)] size-[120px] -translate-x-1/2"
                  data-node-id="411:7016"
                  data-name="Decorative Ellipse"
                >
                  <div className="absolute inset-[-166.67%]">
                    <img
                      alt=""
                      className="block size-full max-w-none"
                      src="/figma/cta-ellipse-2.svg"
                    />
                  </div>
                </div>
              </div>

              <LeftColumn
                className="top-[calc(50%-198.5px)] left-[64px]"
                auditUrl={auditUrl}
                heading={heading}
                subtext={subtext}
                ctaLabel={ctaLabel}
              />
            </div>
          </div>

          {/* Mobile < 768px: stacked text + CTA, centered */}
          <div className="tablet:hidden flex flex-col items-center gap-8 px-6 py-12 text-center">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-[26px] leading-[1.2] font-bold tracking-[-1.5px] text-white">
                <span>
                  Ready{" "}
                  <span className="text-[#b1ffb1]">to be the answer,</span>
                </span>
                <br />
                <span className="bg-gradient-to-b from-white to-[rgba(255,255,255,0.5)] bg-clip-text font-medium text-[transparent]">
                  not the search result?
                </span>
              </h2>
              <p className="max-w-[340px] text-[16px] leading-[1.5] tracking-[-0.32px] text-[#52525b]">
                Start with a free audit and see how AI talks about your project
                today.
              </p>
            </div>
            <ButtonIcon
              auditUrl={auditUrl}
              className="shrink-0"
              label={ctaLabel}
            />
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
