import { DsButton, DsSection, DsSectionContainer } from "@/components/design-system";

interface AuditCtaSectionProps {
  telegramUrl?: string;
  auditUrl?: string;
}

export function AuditCtaSection({
  auditUrl = "https://audit.promptraise.com",
}: AuditCtaSectionProps) {
  return (
    <DsSection id="audit" className="ds-section-base">
      <DsSectionContainer className="py-20 tablet:py-28">
        <div className="max-w-[275px]">
          <div className="flex flex-col gap-4">
            <h2 className="text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-white tablet:text-[40px]">
              <span className="text-[var(--accent-primary)]">Ready to be the answer,</span>
              <br />
              <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text font-medium text-transparent">
                not the search result?
              </span>
            </h2>

            <p className="text-[12px] leading-[1.4] tracking-[-0.02em] text-white/40 tablet:text-[16px] tablet:leading-[1.5]">
              Start with a free audit and see how AI talks about your project today.
            </p>

            <DsButton
              href={auditUrl}
              variant="primary"
              showTrailingArrow
              className="w-[192px] justify-between pl-6 pr-1.5 transition-transform hover:scale-[1.02]"
            >
              Get Free Audit
            </DsButton>
          </div>
        </div>
      </DsSectionContainer>
    </DsSection>
  );
}
