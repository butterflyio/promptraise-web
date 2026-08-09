import {
  DsBadge,
  DsCard,
  DsSection,
  DsSectionContainer,
  LinkedInIcon,
  TwitterXIcon,
  designSystemAssets,
} from "@/components/design-system";
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

function SocialIcon({
  href,
  alt,
  kind,
}: {
  href: string;
  alt: string;
  kind: "twitter" | "linkedin";
}) {
  return (
    <a
      href={href}
      className="inline-flex h-10 w-10 items-center justify-center rounded-[38px] border border-black bg-[rgba(0,0,0,0.35)] p-4 text-white backdrop-blur-[6px]"
      aria-label={alt}
    >
      {kind === "twitter" ? (
        <TwitterXIcon className="h-4 w-4" />
      ) : (
        <LinkedInIcon className="h-4 w-4" />
      )}
    </a>
  );
}

function TeamCard({
  name,
  description,
  label,
  image,
  overlay,
}: {
  name: string;
  description: string;
  label: string;
  image: string;
  overlay: readonly string[];
}) {
  return (
    <DsCard className="relative overflow-hidden rounded-[var(--radius-card-lg)] border-[rgba(255,255,255,0.1)] bg-[var(--bg-surface-panel)] shadow-[0_0_0_4px_rgba(255,255,255,0.07)]">
      <div className="absolute top-1/2 left-1/2 h-[444px] w-[962px] -translate-x-1/2 -translate-y-1/2 mix-blend-overlay">
        <img
          alt=""
          aria-hidden="true"
          src={figmaAssets.overlayVector}
          className="block h-full w-full max-w-none"
        />
      </div>

      <div className="relative px-3 pt-3">
        <div className="relative h-[260px] overflow-hidden rounded-[24px]">
          <img
            alt=""
            aria-hidden="true"
            src={image}
            className="absolute inset-0 block h-full w-full max-w-none object-cover"
          />
          <div className="absolute inset-0 mix-blend-lighten">
            <img
              alt=""
              aria-hidden="true"
              src={overlay[0]}
              className="block h-full w-full max-w-none object-cover"
            />
          </div>
          <div className="absolute inset-0 mix-blend-plus-lighter">
            <img
              alt=""
              aria-hidden="true"
              src={overlay[1]}
              className="block h-full w-full max-w-none object-cover"
            />
          </div>
          <div className="absolute top-[23px] left-[23px] inline-flex items-center gap-2 rounded-[38px] border border-black bg-[rgba(0,0,0,0.35)] px-3 py-2 text-[12px] leading-[1.4] text-white backdrop-blur-[6px]">
            <div className="absolute top-[11px] left-[-21px] h-[120px] w-[120px]">
              <img
                alt=""
                aria-hidden="true"
                src={figmaAssets.ellipse}
                className="block h-full w-full max-w-none"
              />
            </div>
            <span className="relative z-10 whitespace-nowrap">{label}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-8 pt-4 pb-8">
        <div className="flex flex-col gap-2">
          <h3 className="text-[18px] leading-[1.4] font-bold tracking-[-0.02em] text-white">
            {name}
          </h3>
          <p className="text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40">
            {description}
          </p>
        </div>

        <div className="flex gap-2">
          <SocialIcon
            href="https://twitter.com"
            kind="twitter"
            alt={`${name} on Twitter`}
          />
          <SocialIcon
            href="https://linkedin.com"
            kind="linkedin"
            alt={`${name} on LinkedIn`}
          />
        </div>
      </div>
    </DsCard>
  );
}

function BackedByChip({
  src,
  label,
  widthClassName,
}: {
  src: string;
  label: string;
  widthClassName: string;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex items-center justify-center rounded-[38px] border border-black bg-[rgba(0,0,0,0.35)] px-6 py-4 backdrop-blur-[6px] ${widthClassName}`}
      >
        <img
          alt=""
          aria-hidden="true"
          src={src}
          className="block h-6 w-full max-w-none object-contain"
        />
      </div>
      <p className="text-[16px] leading-[1.5] tracking-[-0.02em] text-white/40">
        {label}
      </p>
    </div>
  );
}

export function TeamSection({
  content,
}: {
  content?: HomePage["team"];
}) {
  // Override name/role/bio from CMS while keeping the fixed portrait/overlay art
  const cards: {
    name: string;
    label: string;
    description: string;
    image: string;
    overlay: readonly string[];
  }[] = teamCards.map((card, i) => ({
    ...card,
    name: content?.members?.[i]?.name ?? card.name,
    label: content?.members?.[i]?.role ?? card.label,
    description: content?.members?.[i]?.bio ?? card.description,
  }));
  return (
    <DsSection id="company" className="ds-section-contrast">
      <DsSectionContainer>
        <div className="flex flex-col items-center gap-5">
          <DsBadge
            variant="section"
            className="relative px-6 py-2 text-[15px] leading-[1.5]"
          >
            {content?.badge ?? "Team"}
          </DsBadge>
          <h2 className="text-center text-[24px] font-bold leading-[1.3] tracking-[-0.02em] text-white">
            {content?.heading ?? "Built by Web3 Veterans"}
          </h2>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {cards.map((card) => (
            <TeamCard key={card.name} {...card} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6">
          <h3 className="bg-gradient-to-b from-white to-white/90 bg-clip-text text-[24px] leading-[1.3] font-bold tracking-[-0.02em] text-transparent">
            Backed by
          </h3>
          <div className="flex w-full max-w-[372px] gap-3">
            <BackedByChip
              src={figmaAssets.cicadaLogo}
              label="Market Making"
              widthClassName="w-[194px]"
            />
            <BackedByChip
              src={figmaAssets.strategyLogo}
              label="AI Marketing Strategy"
              widthClassName="w-[165px]"
            />
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
