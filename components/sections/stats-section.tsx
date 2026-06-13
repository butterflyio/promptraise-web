import type { HomePageVisibilitySection } from "@/sanity/lib/queries";
import { designSystemAssets } from "@/components/design-system";

const figmaAssets = designSystemAssets.figma.stats;

const defaultVisibilitySection = {
  headline: {
    lineOne: "If you are not in the AI responses — you do not exist,",
    lineTwo: "and PromptRaise fixes that.",
  },
  statCards: [
    { value: "58%", label: "of searches today go through AI" },
    { value: "3–5x growth", label: "growth in 90 days" },
    { value: "2–7 projects", label: "per answer" },
    { value: "+40%", label: "inbound growth" },
  ],
};

type StatsSectionProps = {
  content?: HomePageVisibilitySection;
};

type FeatureCardProps = {
  value: string;
  label: string;
  className: string;
};

function FeatureCard({ value, label, className }: FeatureCardProps) {
  return (
    <div className={`prompt-feature-card absolute ${className}`}>
      <p className="prompt-feature-card-value">{value}</p>
      <p className="prompt-feature-card-label">{label}</p>
    </div>
  );
}

function FigmaEllipse({
  asset,
  maskOffset,
  size,
  inset,
  rotate,
}: {
  asset: string;
  maskOffset: string;
  size: string;
  inset: string;
  rotate?: string;
}) {
  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        width: size,
        height: size,
        transform: `translate(-50%, -50%) ${rotate ? `rotate(${rotate})` : ""}`.trim(),
        WebkitMaskImage: `url("${figmaAssets.mask}")`,
        maskImage: `url("${figmaAssets.mask}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: maskOffset,
        maskPosition: maskOffset,
        WebkitMaskSize: "1985px 866px",
        maskSize: "1985px 866px",
        WebkitMaskComposite: "source-in",
        maskComposite: "intersect",
      }}
      aria-hidden="true"
    >
      <div className="absolute" style={{ inset }}>
        <img alt="" className="block size-full max-w-none" src={asset} />
      </div>
    </div>
  );
}

export function StatsSection({ content }: StatsSectionProps) {
  const headlineLineOne =
    content?.headline?.lineOne ?? defaultVisibilitySection.headline.lineOne;
  const headlineLineTwo =
    content?.headline?.lineTwo ?? defaultVisibilitySection.headline.lineTwo;

  const statCards = defaultVisibilitySection.statCards.map((card, index) => ({
    value: content?.statCards?.[index]?.value ?? card.value,
    label: content?.statCards?.[index]?.label ?? card.label,
  }));

  return (
    <section className="prompt-stats-section relative isolate overflow-hidden bg-[var(--bg-base)]">
      <div className="prompt-stats-canvas pointer-events-none absolute left-1/2 top-0 z-10 h-[782px] w-[1440px] -translate-x-1/2">
        <div className="absolute left-0 top-[80px] h-[696px] w-[1419px] overflow-visible">
          <div className="absolute left-[-83px] top-[115px] h-[466px] w-[1585px] overflow-visible">
            <div className="absolute left-[108px] top-[-264px] h-[1223px] w-[1223px] overflow-visible">
              <FigmaEllipse
                asset={figmaAssets.ellipse1}
                maskOffset="-391px 179px"
                size="1223px"
                inset="-27.36% -42.39% -57.42% -42.39%"
              />
              <FigmaEllipse
                asset={figmaAssets.ellipse2}
                maskOffset="-476px 94px"
                size="1053px"
                inset="-31.78% -49.23% -66.69% -49.23%"
              />
              <FigmaEllipse
                asset={figmaAssets.ellipse3}
                maskOffset="-561px 9px"
                size="883px"
                inset="-37.89% -58.71% -79.53% -58.71%"
              />
              <FigmaEllipse
                asset={figmaAssets.ellipse4}
                maskOffset="-516px 53.862px"
                size="713px"
                inset="-46.93% -72.71% -98.49% -72.71%"
                rotate="-60.22deg"
              />
              <FigmaEllipse
                asset={figmaAssets.ellipse5}
                maskOffset="-730px -161px"
                size="544px"
                inset="-61.51% -95.3% -129.08% -95.3%"
              />
            </div>
          </div>
        </div>

        <p className="prompt-stats-headline absolute left-1/2 top-[113px] w-[595px] -translate-x-1/2 text-center text-white">
          <span className="font-normal">{headlineLineOne}</span>
          <br />
          <span className="font-semibold">{headlineLineTwo}</span>
        </p>

        <div className="prompt-stats-core absolute left-1/2 top-[142px] z-20 h-[164px] w-[164px] -translate-x-1/2">
          <svg
            width="92"
            height="46"
            viewBox="0 0 92 46"
            fill="none"
            className="prompt-stats-core-mark relative z-10"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M24.77 2H89L72.64 18.25H43.69l-3.67 6.22h26.02L46.03 44.4H25.5l11.8-19.93H22.2L10.43 44.4H1.34L24.77 2Z"
            />
            <path
              fill="var(--accent-primary)"
              fillOpacity="0.22"
              d="M32.97 9.84h36.13l-4.88 4.8H30.12l2.85-4.8Z"
            />
          </svg>
        </div>

        <div className="absolute left-1/2 top-[242px] h-[318px] w-[992px] -translate-x-1/2">
          <FeatureCard
            value={statCards[0]?.value ?? ""}
            label={statCards[0]?.label ?? ""}
            className="left-[76px] top-[234px]"
          />
          <FeatureCard
            value={statCards[1]?.value ?? ""}
            label={statCards[1]?.label ?? ""}
            className="left-0 top-[32px]"
          />
          <FeatureCard
            value={statCards[2]?.value ?? ""}
            label={statCards[2]?.label ?? ""}
            className="left-[667px] top-0"
          />
          <FeatureCard
            value={statCards[3]?.value ?? ""}
            label={statCards[3]?.label ?? ""}
            className="left-[777px] top-[234px]"
          />
        </div>
      </div>
    </section>
  );
}
