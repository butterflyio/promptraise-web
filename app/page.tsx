import { AiTrainingSection } from "@/components/sections/ai-training-section";
import { AskAiSection } from "@/components/sections/ask-ai-section";
import { AuditCtaSection } from "@/components/sections/audit-cta-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PlansSection } from "@/components/sections/plans-section";
import { ProcessSection } from "@/components/sections/process-section";
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
      {/* 2-3. How we solve it / We create content that trains AI */}
      <AiTrainingSection />
      {/* 4. Process / Audit */}
      <ProcessSection />
      {/* 5. PromptRaise vs Competitors */}
      <ComparisonSection />
      {/* 6. Why Choose PromptRaise */}
      <WhyChooseSection />
      {/* 7. Plans That Scale With You + lead form */}
      <PlansSection />
      {/* 8. CTA banner */}
      <AuditCtaSection
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
      />
      {/* 9. Built by Web3 Veterans */}
      <TeamSection />
      {/* 10. Ask AI */}
      <AskAiSection />
      {/* 11. Footer is rendered by SiteShell in app/layout.tsx */}
    </main>
  );
}