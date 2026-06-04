import { AuditCtaSection } from "@/components/sections/audit-cta-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TeamSection } from "@/components/sections/team-section";
import { getSiteSettings } from "@/sanity/lib/queries";

export default async function Home() {
  const settings = await getSiteSettings();

  return (
    <main>
      <HeroSection
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
      />
      <StatsSection />
      <HowItWorksSection />
      <ComparisonSection />
      <PricingSection />
      <CaseStudiesSection />
      <TeamSection />
      <AuditCtaSection
        telegramUrl={settings?.primaryTelegramCtaUrl}
        auditUrl={settings?.freeAuditCtaUrl}
      />
    </main>
  );
}
