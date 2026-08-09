import type { ComponentType } from "react";

import { AiTrainingSection } from "@/components/sections/ai-training-section";
import { AskAiSection } from "@/components/sections/ask-ai-section";
import { AuditCtaSection } from "@/components/sections/audit-cta-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PlansSection } from "@/components/sections/plans-section";
import { ProblemSection } from "@/components/sections/problem-section";
import { ProcessSection } from "@/components/sections/process-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TeamSection } from "@/components/sections/team-section";
import { WhyChooseSection } from "@/components/sections/why-choose-section";
import type { SiteSettings } from "@/sanity/lib/queries";

/**
 * Section registry - the bounded set of blocks a page can contain.
 *
 * Sanity block `_type` values map 1:1 to component keys. A block does not
 * exist until it is in BOTH sectionBlocks.ts (schema) and here (registry);
 * anything else is ignored by the renderer instead of mounting unknown
 * markup. The two settings-dependent sections (Hero, AuditCta) receive
 * their CTA URLs from site settings at render time.
 */

export type SectionBlockType =
  | "hero"
  | "visibility"
  | "problem"
  | "aiTraining"
  | "process"
  | "comparison"
  | "whyChoose"
  | "plans"
  | "auditCta"
  | "team"
  | "askAi";

export interface SectionBlock {
  _type: SectionBlockType;
  /** Editable copy fields, shape depends on the block type. */
  [key: string]: unknown;
}

// Section components have heterogeneous props (content vs copy vs CTA urls);
// the renderer below narrows by `_type` before passing props.
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- bounded registry, narrowed at call sites
const registry: Record<SectionBlockType, ComponentType<any>> = {
  hero: HeroSection,
  visibility: StatsSection,
  problem: ProblemSection,
  aiTraining: AiTrainingSection,
  process: ProcessSection,
  comparison: ComparisonSection,
  whyChoose: WhyChooseSection,
  plans: PlansSection,
  auditCta: AuditCtaSection,
  team: TeamSection,
  askAi: AskAiSection,
};

export function isSectionBlockType(value: unknown): value is SectionBlockType {
  return typeof value === "string" && value in registry;
}

export function SectionRenderer({
  block,
  settings,
}: {
  block: SectionBlock;
  settings?: SiteSettings | null;
}) {
  if (!isSectionBlockType(block._type)) {
    // Bounded set: unknown blocks render nothing instead of breaking the page.
    return null;
  }

  const Component = registry[block._type];

  if (block._type === "hero") {
    return (
      <Component
        content={block}
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
      />
    );
  }

  if (block._type === "auditCta") {
    return (
      <Component
        copy={block}
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
      />
    );
  }

  return <Component content={block} />;
}