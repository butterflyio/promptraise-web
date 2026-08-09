import { DsSection, DsSectionContainer } from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
import { cn } from "@/lib/cn";

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
}: {
  auditUrl: string;
  className?: string;
}) {
  return (
    <a
      href={auditUrl}
      className={cn(
        "flex w-[192px] items-center justify-between rounded-full border border-solid border-[rgba(0,0,0,0.91)] bg-[#67ff67] py-1 pl-6 pr-1 drop-shadow-[0px_8px_12px_rgba(0,0,0,0.32)] transition-transform hover:scale-[1.02]",
        className,
      )}
      data-node-id="312:4029"
    >
      <p className="relative shrink-0 whitespace-nowrap text-[16px] leading-[1.5] tracking-[-0.32px] text-[#09090b] [word-break:break-word]">
        Get Free Audit
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
        className="absolute left-[-1px] right-[-1px] top-[-1px] flex h-[61px] items-center bg-[rgba(249,249,250,0.05)] p-[22.177px]"
        data-node-id="411:6829"
        data-name="Window buttons"
      >
        <div
          className="absolute left-[22px] top-[22px] h-[17px] w-[64px]"
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
        className="absolute left-[55px] top-[84px] flex w-[359px] items-end gap-[18px]"
        data-node-id="411:6834"
        data-name="Best web3 marketing agency Container"
      >
        <div
          className="relative h-[45px] w-[293px] shrink-0 mix-blend-difference"
          data-node-id="411:6835"
          data-name="Bubble - Person"
        >
          <div
            className="absolute left-0 top-0 h-[45px] w-[293px]"
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
            className="absolute bottom-0 right-[-7px] h-[21px] w-[30px]"
            data-node-id="411:6838"
            data-name="Tail"
          >
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src="/figma/cta-bubble-tail.svg"
            />
          </div>
          <p className="absolute left-[22px] right-[20px] top-[9px] text-[18px] leading-[24px] text-white [word-break:break-word]">
            Best web3 marketing agency
          </p>
        </div>
        <div
          className="relative flex size-[48px] shrink-0 items-center justify-center rounded-[112.5px] bg-[#171919] backdrop-blur-[9px] mix-blend-difference"
          data-node-id="411:6840"
          data-name="Inner Frame"
        >
          <div className="relative size-[24px] shrink-0" data-node-id="411:6841">
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
        className="absolute left-[23px] top-[235px] size-[48px]"
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
function IdentityPanel({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute h-[209px] w-[396px]", className)}
      data-node-id="411:6853"
      data-name="PromptRaise — full-cycle AI visibility a Container"
    >
      {/* Logo Shape - 411:6854 */}
      <div
        className="absolute left-[0.31px] top-0 h-[209px] w-[395.689px]"
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
        className="absolute left-[0.31px] top-0 contents"
        data-node-id="411:6857"
        data-name="Mask Group"
      >
        <div
          className="absolute left-[0.31px] top-0 h-[209px] w-[395.689px]"
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
        className="absolute left-[38px] top-[calc(50%+0.5px)] flex h-[160px] w-[330px] -translate-y-1/2 flex-col items-start gap-[16px]"
        data-node-id="411:6863"
      >
        <p
          className="relative w-full shrink-0 text-[16px] font-bold leading-[1.25] tracking-[-0.32px] text-white [word-break:break-word]"
          data-node-id="411:6864"
        >
          <span className="text-[#67ff67]">{`PromptRaise `}</span>
          <span className="font-medium">- full-cycle AI visibility agency for Web3.</span>
        </p>
        <div
          className="relative flex h-[104px] w-full shrink-0 flex-col items-start gap-[4.481px]"
          data-node-id="411:6865"
          data-name="List"
        >
          {/* Item 1 - 411:6866 */}
          <div
            className="relative flex h-[22px] w-full shrink-0 items-start gap-[4px]"
            data-node-id="411:6866"
            data-name="Item"
          >
            <div
              className="relative flex size-[22px] shrink-0 items-center"
              data-node-id="411:6867"
              data-name="Inner Frame"
            >
              <div
                className="relative flex size-[22px] shrink-0 items-center"
                data-node-id="411:6868"
                data-name="Inner Frame"
              >
                <div
                  className="relative size-[22px] shrink-0"
                  data-node-id="411:6869"
                  data-name="Inner Frame"
                >
                  <img
                    alt=""
                    className="absolute inset-0 block size-full max-w-none"
                    src="/figma/cta-check.svg"
                  />
                </div>
              </div>
            </div>
            <div
              className="relative flex min-w-px flex-[1_0_0] flex-col justify-center text-[13.44px] leading-[1.5] text-[#52525b] [word-break:break-word]"
              data-node-id="411:6871"
            >
              <p className="whitespace-pre-wrap">{`Content gap analysis across AI + communities  `}</p>
            </div>
          </div>
          {/* Item 2 - 411:6872 */}
          <div
            className="relative flex h-[23px] w-full shrink-0 items-center gap-[4px]"
            data-node-id="411:6872"
            data-name="Item"
          >
            <div
              className="relative size-[23px] shrink-0"
              data-node-id="411:6873"
              data-name="Inner Frame"
            >
              <img
                alt=""
                className="absolute inset-0 block size-full max-w-none"
                src="/figma/cta-check-2.svg"
              />
            </div>
            <div
              className="relative flex min-w-px flex-[1_0_0] flex-col justify-center text-[13.44px] leading-[1.5] text-[#52525b] [word-break:break-word]"
              data-node-id="411:6875"
            >
              <p className="whitespace-pre-wrap">{`Real creators (not AI-generated content)  `}</p>
            </div>
          </div>
          {/* Item 3 - 411:6876 */}
          <div
            className="relative flex h-[23px] w-full shrink-0 items-center gap-[4px]"
            data-node-id="411:6876"
            data-name="Item"
          >
            <div
              className="relative size-[23px] shrink-0"
              data-node-id="411:6877"
              data-name="Inner Frame"
            >
              <img
                alt=""
                className="absolute inset-0 block size-full max-w-none"
                src="/figma/cta-check-2.svg"
              />
            </div>
            <div
              className="relative flex min-w-px flex-[1_0_0] flex-col justify-center text-[13.44px] leading-[1.5] text-[#52525b] [word-break:break-word]"
              data-node-id="411:6879"
            >
              <p className="whitespace-pre-wrap">{`Tier-1 crypto media placements  `}</p>
            </div>
          </div>
          {/* Item 4 - 411:6880 */}
          <div
            className="relative flex h-[23px] w-full shrink-0 items-center gap-[4px]"
            data-node-id="411:6880"
            data-name="Item"
          >
            <div
              className="relative size-[23px] shrink-0"
              data-node-id="411:6881"
              data-name="Inner Frame"
            >
              <img
                alt=""
                className="absolute inset-0 block size-full max-w-none"
                src="/figma/cta-check-2.svg"
              />
            </div>
            <div
              className="relative flex min-w-px flex-[1_0_0] flex-col justify-center text-[13.44px] leading-[1.5] text-[#52525b] [word-break:break-word]"
              data-node-id="411:6883"
            >
              <p className="whitespace-pre-wrap">{`Measurable growth in AI mentions  `}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Vertical separator line ornament (rotated 90deg) */
function Sep({ className, src }: { className?: string; src: string }) {
  return (
    <div
      className={cn("absolute flex h-[82px] w-0 items-center justify-center", className)}
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
    <div className={cn("absolute h-0 w-[82px]", className)} data-name="Separator Line">
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
      className="pointer-events-none absolute left-0 top-0 h-[500px] w-full"
      data-node-id="411:6769"
      data-name="BG"
    >
      {/* Light radial glow - 411:6770 */}
      <div
        className="absolute left-[-290.87px] top-[-170px] h-[1106.331px] w-[2281.047px]"
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
          "-translate-x-1/2 absolute top-0 h-[900px] w-[1440px]",
          patternsLeft,
        )}
        data-node-id="411:6774"
        data-name="Patterns"
      >
        <div
          className="absolute left-0 top-0 h-[900px] w-[1440px]"
          data-node-id="411:6775"
          data-name="Inner Frame"
        >
          <div
            className="absolute left-0 top-0 h-[900px] w-[1440px]"
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
              className="absolute left-0 top-0 h-[900px] w-[1440px]"
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
              className="absolute left-0 top-0 flex h-[900px] w-[1440px] items-center justify-center"
              data-node-id="411:6788"
            >
              <div className="-rotate-90 flex-none">
                <div className="relative h-[1440px] w-[900px]" data-name="Inner Frame">
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
              className="absolute left-[554px] top-[112px] h-[113px] w-[110px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6803"
              data-name="Decorative Rectangle"
            />
            <div
              className="absolute left-[996px] top-[562px] h-[113px] w-[112px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6804"
              data-name="Decorative Rectangle"
            />
            <div
              className="absolute left-[886px] top-px size-[111px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6805"
              data-name="Decorative Rectangle"
            />
            <div
              className="absolute left-[1218px] top-[225px] h-[112px] w-[111px] border border-solid border-white/5 bg-[rgba(255,255,255,0.07)] opacity-[0.47]"
              data-node-id="411:6806"
              data-name="Decorative Rectangle"
            />
          </div>
        </div>
        {/* Empty Inner Frame decor - 411:6807 */}
        <div
          className="absolute left-[1316px] top-[765px] size-[24px] opacity-75"
          data-node-id="411:6807"
          data-name="Inner Frame"
        />
      </div>

      {/* Glow blot - 411:6808 */}
      <div
        className="absolute left-px top-[-198.77px] h-[428.708px] w-[436.883px]"
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
        className="absolute left-[357px] top-[365.71px] h-[365.115px] w-[437.134px]"
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
        className="absolute left-[847.85px] top-[-56px] flex h-[699.02px] w-[718.768px] items-center justify-center mix-blend-plus-lighter"
        data-node-id="411:6818"
      >
        <div className="flex-none rotate-[36.42deg] skew-x-[-8.23deg] scale-y-[0.99]">
          <div className="relative h-[874px] w-[130px]" data-name="Decorative Ellipse">
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
      <Sep className="left-[537px] top-[335px]" src="/figma/cta-sep-1.svg" />
      <Sep className="left-[94px] top-[404px]" src="/figma/cta-sep-2.svg" />
      <Sep className="left-[426px] top-[-35px]" src="/figma/cta-sep-1.svg" />
      <SepH className="left-[417px] top-[450px]" src="/figma/cta-sep-3.svg" />
      <SepH className="left-[537px] top-[225px]" src="/figma/cta-sep-3.svg" />
      <SepH className="left-[-47px] top-[112px]" src="/figma/cta-sep-3.svg" />
      <Sep className="left-[94px] top-[30px]" src="/figma/cta-sep-4.svg" />
      <SepH className="left-[1202px] top-[338px]" src="/figma/cta-sep-3.svg" />
      {/* Center divider - 411:6885 (also present in tablet 411:7017) */}
      <Sep className="left-[648px] top-[83px]" src="/figma/cta-sep-1.svg" />
    </div>
  );
}

/** Left text column - Figma 411:6886 (position set per breakpoint) */
function LeftColumn({
  className,
  auditUrl,
}: {
  className?: string;
  auditUrl: string;
}) {
  return (
    <div
      className={cn(
        "-translate-y-1/2 absolute flex w-[594px] flex-col items-start gap-[48px]",
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
            className="relative flex w-full shrink-0 flex-col justify-center text-[40px] font-bold leading-[0] tracking-[-1.5px] text-white [word-break:break-word]"
            data-node-id="411:6889"
          >
            <p className="mb-0">
              <span className="leading-[1.2]">{`Ready `}</span>
              <span className="leading-[1.2] text-[#b1ffb1]">
                to be the answer,
              </span>
            </p>
            <p className="bg-gradient-to-b from-white to-[rgba(255,255,255,0.5)] bg-clip-text font-medium leading-[1.2] text-[transparent]">
              not the search result?
            </p>
          </div>
        </div>
        <div
          className="relative w-[538px] shrink-0 text-[16px] leading-[1.5] tracking-[-0.32px] text-[#52525b] [word-break:break-word]"
          data-node-id="411:6890"
        >
          <p>
            Start with a free audit and see how AI talks about your project
            today.
          </p>
        </div>
      </div>
      <ButtonIcon
        auditUrl={auditUrl}
        className="shrink-0"
      />
    </div>
  );
}

export function AuditCtaSection({
  auditUrl = "https://audit.promptraise.com",
}: AuditCtaSectionProps) {
  return (
    <DsSection className="ds-section-base">
      <SectionLabel name="AuditCtaSection" />
      <DsSectionContainer className="py-20 tablet:py-24">
        {/* Figma CTA Banner card - 411:6768 / 411:6900 */}
        <div
          className="relative w-full overflow-clip rounded-[32px] bg-[rgba(19,22,25,0.25)]"
          data-node-id="411:6768"
          data-name="CTA Banner"
        >
          {/* Desktop >= 1024px: exact 1248-wide Figma layout (411:6768) */}
          <div className="hidden desktop:block">
            <div className="relative h-[500px] w-full">
              <BgLayers patternsLeft="left-[calc(50%+80px)]" />

              {/* Image container - 411:6827 */}
              <div
                className="pointer-events-none absolute bottom-0 left-[648px] h-[500px] w-[600px] overflow-clip"
                data-node-id="411:6827"
                data-name="Image"
              >
                <WindowMockup className="left-[63px] top-[97px]" />
                {/* Empty Inner Frame decor - 411:6851 */}
                <div
                  className="absolute left-[460px] top-[24px] size-[100px]"
                  data-node-id="411:6851"
                  data-name="Inner Frame"
                />
                <Sep className="left-[590px] top-[83px]" src="/figma/cta-sep-1.svg" />
                <IdentityPanel className="left-[145px] top-[253px]" />
                {/* Decorative Ellipse - 411:6884 */}
                <div
                  className="-translate-x-1/2 absolute bottom-0 left-[calc(50%+207px)] size-[120px]"
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

              <LeftColumn className="left-[96px] top-1/2" auditUrl={auditUrl} />
            </div>
          </div>

          {/* Tablet 768-1023px: exact 696-wide Figma layout (411:6900) */}
          <div className="hidden tablet:block desktop:hidden">
            <div className="relative h-[761px] w-full">
              <BgLayers patternsLeft="left-[calc(50%+356px)]" />

              {/* Image container - 411:6959 */}
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-[484px] w-[696px] overflow-clip"
                data-node-id="411:6959"
                data-name="Image"
              >
                <WindowMockup className="left-[98px] top-[97px]" />
                {/* Empty Inner Frame decor - 411:6983 */}
                <div
                  className="absolute left-[495px] top-[24px] size-[100px]"
                  data-node-id="411:6983"
                  data-name="Inner Frame"
                />
                <Sep className="left-[648px] top-[83px]" src="/figma/cta-sep-1.svg" />
                <IdentityPanel className="left-[180px] top-[253px]" />
                {/* Decorative Ellipse - 411:7016 */}
                <div
                  className="-translate-x-1/2 absolute bottom-[-16px] left-[calc(50%+194px)] size-[120px]"
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
                className="left-[64px] top-[calc(50%-198.5px)]"
                auditUrl={auditUrl}
              />
            </div>
          </div>

          {/* Mobile < 768px: stacked text + CTA, centered */}
          <div className="flex flex-col items-center gap-8 px-6 py-12 text-center tablet:hidden">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-[26px] font-bold leading-[1.2] tracking-[-1.5px] text-white">
                <span>
                  Ready <span className="text-[#b1ffb1]">to be the answer,</span>
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
            <ButtonIcon auditUrl={auditUrl} className="shrink-0" />
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}