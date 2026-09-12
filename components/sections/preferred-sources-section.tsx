import {
  DsBadge,
  DsButton,
  DsSection,
  DsSectionContainer,
} from "@/components/design-system";
import { SectionLabel } from "@/components/section-label";
import type { HomePage } from "@/sanity/lib/queries";

/**
 * "Make Me Preferred on Google" — Google Preferred Sources.
 * When a user adds a site as a preferred source, Google marks its content
 * with a "preferred" badge in AI Mode, AI Overviews and Top Stories.
 * Ref: https://developers.google.com/search/docs/appearance/preferred-sources
 *
 * All copy is CMS-editable via the `preferredSources` Sanity block.
 * ponytail: no custom Figma layout — this is a brand-new section with no
 * design node, so it uses the standard section atoms. If Zain supplies a
 * Figma frame, transcribe it to match (as other sections do).
 */
const DEFAULT_BADGE = "Make Me Preferred on Google";
const DEFAULT_HEADING = "Add us as a preferred source in Google";
const DEFAULT_SUBTEXT =
  "When you add a site as a preferred source, Google marks it with a \u201cpreferred\u201d badge and boosts it in AI Mode, AI Overviews and Top Stories. One click pins PromptRaise to the top of the AI answers you see.";
const DEFAULT_CTA_LABEL = "Add as Preferred Source";
const DEFAULT_CTA_HREF =
  "https://www.google.com/preferences/source?q=https://promptraise.com";
const DEFAULT_GUIDE_LABEL = "Read Google's guide";
const DEFAULT_GUIDE_HREF =
  "https://developers.google.com/search/docs/appearance/preferred-sources";

export function PreferredSourcesSection({
  content,
}: {
  content?: HomePage["preferredSources"];
}) {
  const badge = content?.badge ?? DEFAULT_BADGE;
  const heading = content?.heading ?? DEFAULT_HEADING;
  const subtext = content?.subtext ?? DEFAULT_SUBTEXT;
  const ctaLabel = content?.ctaLabel ?? DEFAULT_CTA_LABEL;
  const ctaHref = content?.ctaHref ?? DEFAULT_CTA_HREF;
  const guideLabel = content?.guideLabel ?? DEFAULT_GUIDE_LABEL;
  const guideHref = content?.guideHref ?? DEFAULT_GUIDE_HREF;

  return (
    <DsSection id="preferred-sources" className="ds-section-alt">
      <SectionLabel name="PreferredSourcesSection" />
      <DsSectionContainer className="relative z-10 flex flex-col items-center gap-7 text-center">
        <DsBadge
          variant="section"
          className="prompt-eyebrow shrink-0 whitespace-nowrap"
        >
          {badge}
        </DsBadge>
        <h2 className="tablet:text-[40px] max-w-[760px] text-[28px] leading-[1.25] font-bold tracking-[-0.03em] text-white">
          {heading}
        </h2>
        <p className="max-w-[680px] text-[16px] leading-[1.6] tracking-[-0.02em] text-[#9ca3af]">
          {subtext}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <DsButton href={ctaHref} showTrailingArrow size="lg">
            {ctaLabel}
          </DsButton>
          <DsButton href={guideHref} variant="secondary" size="md">
            {guideLabel}
          </DsButton>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
