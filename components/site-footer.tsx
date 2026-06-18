import { getSiteSettings } from "@/sanity/lib/queries";

import { SiteBrand } from "./site-brand";

const defaultFooterLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Usage", href: "/cookies" },
];

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const siteName = settings?.siteName ?? "PromptRaise";
  const logoUrl = settings?.logo?.asset?.url;
  const poweredByText = settings?.footerPoweredByText ?? "powered by Cicada";
  const copyrightText =
    settings?.footerCopyrightText ?? "© 2026 · cicada-mm.com · Dubai, UAE";
  const footerLinks =
    settings?.footerLegalLinks && settings.footerLegalLinks.length > 0
      ? settings.footerLegalLinks
      : defaultFooterLinks;

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[var(--bg-contrast)]">
      <div className="mx-auto flex w-full flex-col items-center justify-center gap-3 px-4 pb-7 pt-[29px] tablet:flex-row tablet:justify-between tablet:gap-0 tablet:px-[52px]">
        <div className="flex items-center justify-center tablet:justify-start">
          <SiteBrand
            siteName={siteName}
            logoUrl={logoUrl}
            className="gap-0"
            markClassName="h-[13px] w-auto shrink-0"
            wordmarkClassName="ml-2 text-[13px] leading-[20.8px] tracking-[0] font-bold text-white"
          />
          <span className="ml-1 text-[13px] leading-[20.8px] tracking-[0] text-[#686B6E]">
            · {poweredByText}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 tablet:items-end">
          <p className="order-2 text-[10px] leading-4 tracking-[0] text-[#686B6E] tablet:order-1">
            {copyrightText}
          </p>

          <nav
            aria-label="Footer links"
            className="order-1 flex items-center gap-1 tablet:order-2 tablet:gap-3"
          >
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-1 py-1 text-[12px] leading-[1.4] tracking-[0] text-white transition-colors hover:text-[var(--accent-primary)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
