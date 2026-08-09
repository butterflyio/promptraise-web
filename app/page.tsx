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
import { getHomePage, getSiteSettings } from "@/sanity/lib/queries";

export default async function Home() {
  const [settings, homePage] = await Promise.all([
    getSiteSettings(),
    getHomePage(),
  ]);

  return (
    <main>
      {/* 1. Hero */}
      <HeroSection
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
        content={homePage?.hero}
      />
      {/* 2. Stats (animated) */}
      <StatsSection content={homePage?.visibilitySection} />
      {/* 3. Problem (animated) */}
      <ProblemSection />
      {/* 4. We create content that trains AI */}
      <AiTrainingSection />
      {/* 5. Process / Audit */}
      <ProcessSection />
      {/* 6. PromptRaise vs Competitors */}
      <ComparisonSection />
      {/* 7. Why Choose PromptRaise */}
      <WhyChooseSection />
      {/* 8. Plans That Scale With You + lead form */}
      <PlansSection />
      {/* 9. CTA banner */}
      <AuditCtaSection
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
      />
      {/* 10. Built by Web3 Veterans */}
      <TeamSection />
      {/* 11. Ask AI */}
      <AskAiSection />
      {/* 12. Footer is rendered by SiteShell in app/layout.tsx */}
    </main>
  );
}