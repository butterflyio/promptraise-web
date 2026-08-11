import {
  DsSectionContainer,
  designSystemAssets,
} from "@/components/design-system";
import { imageSrcSet, imageUrl } from "@/lib/sanity-image";
import type { HomePage } from "@/sanity/lib/queries";

const figmaAssets = designSystemAssets.figma.team;

const teamCards = [
  {
    name: "Maxim Moris",
    description:
      "20+ years in marketing, 9+ in Web3. Leading go-to-market strategy for blockchain protocols.",
    label: "Co-founder & CEO, Cicada",
    image: figmaAssets.teamCardTop,
    overlay: [figmaAssets.overlayVector, figmaAssets.overlayVector2],
  },
  {
    name: "Zain Khan",
    description:
      "Marketing strategist specializing in AI-driven brand visibility for emerging Web3 projects.",
    label: "Co-founder, PromptRaise",
    image: figmaAssets.teamCardTop2,
    overlay: [figmaAssets.overlayVector, figmaAssets.overlayVector3],
  },
] as const;

/* ── Figma 370:3526/27/28 masked background vector layers ────────────── */
const BG_MASK_LAYERS = [
  {
    src: figmaAssets.bgLayer1,
    maskPosition: "-256.9px -109.9px",
    blend: "normal",
    childInset: {
      top: "-26.37%",
      right: "-13.95%",
      bottom: "-13.95%",
      left: "-13.95%",
    },
  },
  {
    src: figmaAssets.bgLayer2,
    maskPosition: "-256.9px -390.9px",
    blend: "difference",
    childInset: {
      top: "-38.54%",
      right: "-13.93%",
      bottom: "-13.93%",
      left: "-13.93%",
    },
  },
  {
    src: figmaAssets.bgLayer3,
    maskPosition: "-256.9px -632.9px",
    blend: "screen",
    childInset: {
      top: "-41.02%",
      right: "-8.89%",
      bottom: "-8.89%",
      left: "-8.89%",
    },
  },
] as const;

const MASK_STYLE = {
  maskImage: `url(${figmaAssets.bgMask})`,
  WebkitMaskImage: `url(${figmaAssets.bgMask})`,
  maskSize: "2136.801px 1179.801px",
  WebkitMaskSize: "2136.801px 1179.801px",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
} as const;

function SocialIcon({
  href,
  alt,
  src,
}: {
  href?: string;
  alt: string;
  src: string;
}) {
  const chip = (
    <span className="inline-flex size-[40px] items-center justify-center rounded-[38px] border border-black bg-[rgba(0,0,0,0.35)] p-4 backdrop-blur-[6px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        aria-hidden
        src={src}
        className="block size-[24px] max-w-none object-contain"
      />
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
      {chip}
    </a>
  ) : (
    chip
  );
}

function TeamCard({
  name,
  description,
  label,
  image,
  overlay,
  linkedin,
  x,
  className,
}: {
  name: string;
  description: string;
  label: string;
  image: string;
  overlay: readonly string[];
  linkedin?: string;
  x?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-clip rounded-[32px] border border-[rgba(255,255,255,0.1)] bg-[#0f0f10] shadow-[0px_0px_0px_4px_rgba(255,255,255,0.07)] backdrop-blur-[6.5px] ${className ?? ""}`}
    >
      {/* Main overlay vector (I*;173:171, mix-blend-overlay) */}
      <div className="absolute top-[calc(50%+0.5px)] left-1/2 h-[444.929px] w-[961.673px] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={figmaAssets.overlayVector}
          className="block size-full max-w-none"
        />
      </div>

      <div className="w-full shrink-0 px-[12px] pt-[12px]">
        <div className="relative h-[260px] w-full shrink-0 overflow-clip rounded-[24px]">
          {/* Member photo (fills the window; CMS-supplied) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            src={
              imageUrl(image, { width: 640, height: 520, fit: "crop" }) ?? image
            }
            srcSet={imageSrcSet(image, [320, 480, 640]) ?? undefined}
            sizes="(max-width: 768px) 100vw, 405px"
            loading="lazy"
          />
          {/* Decorative Vector lighten (157:1088) */}
          <div className="absolute top-[10.22px] left-[-17.24px] h-[208.805px] w-[366.032px] mix-blend-lighten">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              src={overlay[1]}
              className="block size-full max-w-none"
            />
          </div>
          {/* Decorative Vector plus-lighter (157:1119) */}
          <div className="absolute top-[10.22px] left-[-17.24px] h-[208.805px] w-[366.032px] mix-blend-plus-lighter">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              aria-hidden
              src={overlay[1]}
              className="block size-full max-w-none"
            />
          </div>
          {/* Role chip (157:1058 stdPopular) */}
          <div className="absolute top-[23px] left-[23px] flex items-center justify-center gap-2 overflow-clip rounded-[38px] border border-black bg-[rgba(0,0,0,0.35)] px-[12px] py-[8px] backdrop-blur-[6px]">
            <div className="absolute top-[10.65px] left-[-21.53px] size-[120px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                aria-hidden
                src={figmaAssets.ellipse}
                className="block size-full max-w-none"
              />
            </div>
            <p className="relative shrink-0 text-[12px] leading-[1.4] whitespace-nowrap text-white">
              {label}
            </p>
          </div>
        </div>
      </div>

      <div className="flex w-full shrink-0 flex-col items-start gap-[16px] px-[32px] pt-[16px] pb-[32px]">
        <div className="flex w-full shrink-0 flex-col items-start gap-[8px]">
          <h3 className="mobile:text-[18px] mobile:leading-[1.4] mobile:tracking-[-0.36px] w-full bg-gradient-to-b from-white to-[rgba(255,255,255,0.9)] bg-clip-text text-[24px] leading-[1.3] font-bold tracking-[-0.48px] text-transparent">
            {name}
          </h3>
          <p className="w-full text-[12px] leading-[1.4] text-[#52525b]">
            {description}
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-[8px]">
          <SocialIcon
            href={x}
            src={figmaAssets.twitter}
            alt={`${name} on X (Twitter)`}
          />
          <SocialIcon
            href={linkedin}
            src={figmaAssets.linkedin}
            alt={`${name} on LinkedIn`}
          />
        </div>
      </div>
    </div>
  );
}

function BackedByChip({
  href,
  src,
  label,
  widthClassName,
}: {
  href: string;
  src: string;
  label: string;
  widthClassName: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex min-w-0 flex-col items-center gap-[8px] ${widthClassName}`}
      aria-label={label}
    >
      <span className="flex w-full items-center justify-center rounded-[38px] border border-black bg-[rgba(0,0,0,0.35)] px-[24px] py-[16px] backdrop-blur-[6px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          aria-hidden
          src={src}
          className="block h-[24px] w-full max-w-none object-contain"
        />
      </span>
      <p className="w-full text-center text-[16px] leading-[1.5] tracking-[-0.32px] text-[#52525b]">
        {label}
      </p>
    </a>
  );
}

export function TeamSection({ content }: { content?: HomePage["team"] }) {
  // Override name/role/bio/image/socials from CMS while keeping the fixed
  // overlay art. Falls back to the design's stock portrait/labels.
  const cards: {
    name: string;
    label: string;
    description: string;
    image: string;
    overlay: readonly string[];
    linkedin?: string;
    x?: string;
  }[] = teamCards.map((card, i) => ({
    ...card,
    name: content?.members?.[i]?.name ?? card.name,
    label: content?.members?.[i]?.role ?? card.label,
    description: content?.members?.[i]?.bio ?? card.description,
    image: content?.members?.[i]?.image?.asset?.url ?? card.image,
    linkedin: content?.members?.[i]?.linkedin ?? undefined,
    x: content?.members?.[i]?.x ?? undefined,
  }));

  return (
    <section
      id="company"
      className="relative overflow-clip border-b border-[var(--border-default)] bg-[#1E1E1E]"
    >
      {/* ── Bg image (370:3522/3526-3528): masked decorative eclipses ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[calc(50%+0.5px)] left-1/2 h-[752px] w-[1440px] max-w-none -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute top-0 left-[-121px] h-[752px] w-[1709px]">
          <div className="absolute bottom-[-29px] left-[calc(50%+37.5px)] h-[885px] w-[1671px] -translate-x-1/2">
            {BG_MASK_LAYERS.map((layer, i) => (
              <div
                key={i}
                className="absolute bottom-[-27px] h-[883px] w-[1669px] -translate-x-1/2"
                style={{
                  left: "calc(50% + 36.5px)",
                  ...MASK_STYLE,
                  maskPosition: layer.maskPosition,
                  WebkitMaskPosition: layer.maskPosition,
                  mixBlendMode: layer.blend,
                }}
              >
                <div
                  className="absolute"
                  style={{
                    inset: `${layer.childInset.top} ${layer.childInset.right} ${layer.childInset.bottom} ${layer.childInset.left}`,
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    src={layer.src}
                    className="block size-full max-w-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DsSectionContainer className="relative z-10 w-full">
        <div className="mx-auto w-full max-w-[826px]">
          {/* ── Heading (147:477) ─────────────────────────────── */}
          <div className="flex flex-col items-center gap-[20px]">
            {/* Badge row (147:491 Team Container) */}
            <div className="relative inline-flex h-[48px] w-[384px] max-w-full items-center justify-center">
              {/* Decorative line (147:492, rotate-180) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={figmaAssets.badgeLine}
                alt=""
                aria-hidden
                className="absolute top-1/2 left-1/2 h-[6px] w-[384px] max-w-none -translate-x-1/2 -translate-y-1/2 rotate-180"
              />
              {/* Mark left (147:496, flipped) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={figmaAssets.badgeMark2}
                alt=""
                aria-hidden
                className="absolute top-1/2 left-[114.5px] h-[25px] w-[40px] -translate-y-1/2 -scale-y-100 rotate-180"
              />
              {/* Mark right (147:493) */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={figmaAssets.badgeMark1}
                alt=""
                aria-hidden
                className="absolute top-1/2 right-[114.5px] h-[25px] w-[40px] -translate-y-1/2"
              />
              {/* Pill (147:499) */}
              <div className="flex h-[39px] items-center justify-center rounded-[100px] border border-[#3c3e3f] bg-[rgba(20,20,20,0.8)] px-6 py-2 backdrop-blur-[12px]">
                <span className="text-[15px] leading-[1.5] whitespace-nowrap text-[#a1a1aa]">
                  {content?.badge ?? "Team"}
                </span>
              </div>
            </div>
            <h2 className="mobile:tracking-[-0.48px] tablet:text-[40px] tablet:leading-[1.15] tablet:tracking-[-0.8px] text-center text-[24px] leading-[1.3] font-bold tracking-[-0.48px] text-white">
              {content?.heading ?? "Built by Web3 Veterans"}
            </h2>
          </div>

          {/* ── Team cards (174:255) ─────────────────────────── */}
          <div className="tablet:flex-row tablet:items-stretch mt-[53px] flex flex-col items-center gap-[16px]">
            {cards.map((card) => (
              <TeamCard
                key={card.name}
                {...card}
                className="tablet:flex-1 tablet:max-w-none desktop:w-[405px] desktop:flex-none w-full max-w-[405px]"
              />
            ))}
          </div>

          {/* ── Backed by (174:298) ──────────────────────────── */}
          <div className="tablet:flex-row tablet:gap-[24px] mt-[56px] flex flex-col items-center justify-center gap-[24px]">
            <h3 className="bg-gradient-to-b from-white to-[rgba(255,255,255,0.9)] bg-clip-text pt-[10px] text-[24px] leading-[1.3] font-bold tracking-[-0.48px] whitespace-nowrap text-transparent">
              Backed by
            </h3>
            <div className="tablet:max-w-[384px] tablet:gap-[24px] flex w-full max-w-[372px] items-center gap-[12px]">
              <BackedByChip
                href="https://cicada-mm.com"
                src={figmaAssets.cicadaLogo}
                label="Market Making"
                widthClassName="min-w-0 flex-1"
              />
              <BackedByChip
                href="https://OxD.one"
                src={figmaAssets.strategyLogo}
                label="AI Marketing Strategy"
                widthClassName="min-w-0 flex-1"
              />
            </div>
          </div>
        </div>
      </DsSectionContainer>
    </section>
  );
}
