import { getSiteSettings } from "@/sanity/lib/queries";
import { DsButton, MenuIcon } from "@/components/design-system";
import { SiteBrand } from "./site-brand";

const defaultNavItems = [
  { href: "#solutions", label: "Solutions" },
  { href: "#pricing", label: "Pricing" },
  { href: "#company", label: "Company" },
  { href: "#resources", label: "Resources" },
];

export async function SiteHeader() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "PromptRaise";
  const auditUrl =
    settings?.headerCtaUrl ??
    settings?.freeAuditCtaUrl ??
    "https://audit.promptraise.com";
  const headerCtaLabel = settings?.headerCtaLabel ?? "Get Audit";
  const logoUrl = settings?.logo?.asset?.url;
  const navItems =
    settings?.headerNavItems && settings.headerNavItems.length > 0
      ? settings.headerNavItems
      : defaultNavItems;

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex w-full flex-col items-start px-4 py-6 tablet:px-9 desktop:px-24">
        <div className="flex w-full items-center justify-between rounded-[9999px] backdrop-blur-[14.012px]">
          <div className="flex items-center gap-6">
            <button
              type="button"
              aria-label="Open navigation"
              className="tablet:hidden inline-flex h-6 w-6 items-center justify-center text-white"
            >
              <MenuIcon className="h-6 w-6" />
            </button>

            <SiteBrand
              siteName={siteName}
              logoUrl={logoUrl}
              className="gap-3"
              markClassName="h-4 w-auto shrink-0 mix-blend-luminosity"
              wordmarkClassName="text-[18px] leading-[1.5] tracking-[-0.396px] font-normal text-white"
            />
          </div>

          <nav
            aria-label="Primary"
            className="tablet:flex hidden items-center gap-1.5"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-[16px] leading-[1.5] tracking-[-0.32px] text-white transition-colors hover:text-white/85"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <DsButton
            href={auditUrl}
            variant="light"
            size="md"
            className="h-auto px-6 py-3 text-[16px] leading-[1.5] tracking-[-0.32px]"
          >
            {headerCtaLabel}
          </DsButton>
        </div>
      </div>
    </header>
  );
}
