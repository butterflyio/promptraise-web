import { AuditCtaSection } from "@/components/sections/audit-cta-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { ComparisonSection } from "@/components/sections/comparison-section";
import { HeroSection } from "@/components/sections/hero-section";
import { HowItWorksSection } from "@/components/sections/how-it-works-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { StatsSection } from "@/components/sections/stats-section";
import { TeamSection } from "@/components/sections/team-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <ComparisonSection />
      <PricingSection />
      <CaseStudiesSection />
      <TeamSection />
      <AuditCtaSection />
    </main>
  );
}
