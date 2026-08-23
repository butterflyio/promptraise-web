import type { SiteSettings } from "@/sanity/lib/queries";

import { SiteBrand } from "./site-brand";

const defaultFooterLinks = [
  { label: "AI Visibility Blog", href: "/blog" },
  { label: "Academy", href: "/academy/glossary" },
  { label: "Free Tools", href: "/free/flesch-kincaid-calculator" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Cookie Usage", href: "/cookies" },
];

const COUNTRY_DISPLAY: Record<string, string> = {
  AE: "UAE",
  US: "USA",
  GB: "UK",
};

function formatAddress(address: SiteSettings["address"]): string | null {
  if (!address) return null;
  const parts = [
    address.streetAddress,
    address.addressLocality,
    address.addressRegion && address.addressRegion !== address.addressLocality
      ? address.addressRegion
      : null,
    address.addressCountry
      ? (COUNTRY_DISPLAY[address.addressCountry] ?? address.addressCountry)
      : null,
  ].filter((part): part is string => Boolean(part));
  return parts.length > 0 ? parts.join(", ") : null;
}

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const siteName = settings?.siteName ?? "PromptRaise";
  const logoUrl = settings?.logo?.asset?.url;
  const poweredByText = settings?.footerPoweredByText ?? "powered by Cicada";
  const copyrightText =
    settings?.footerCopyrightText ?? "© 2026 · cicada-mm.com · Dubai, UAE";
  const footerLinks =
    settings?.footerLegalLinks && settings.footerLegalLinks.length > 0
      ? settings.footerLegalLinks
      : defaultFooterLinks;

  const contactEmail = settings?.contactEmail;
  const telegramHandle = settings?.telegramHandleDisplay;
  const telegramUrl =
    settings?.socialLinks?.telegram ?? settings?.primaryTelegramCtaUrl;
  const telephone = settings?.telephone;
  const addressLine = formatAddress(settings?.address);

  const contactItems: Array<{ key: string; href?: string; label: string }> = [];
  if (contactEmail) {
    contactItems.push({
      key: "email",
      href: `mailto:${contactEmail}`,
      label: contactEmail,
    });
  }
  if (telegramHandle && telegramUrl) {
    contactItems.push({
      key: "telegram",
      href: telegramUrl,
      label: telegramHandle,
    });
  }
  if (telephone) {
    contactItems.push({
      key: "telephone",
      href: `tel:${telephone.replace(/[^+0-9]/g, "")}`,
      label: telephone,
    });
  }
  if (addressLine) {
    contactItems.push({ key: "address", label: addressLine });
  }

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[var(--bg-contrast)]">
      <div className="tablet:flex-row tablet:justify-between tablet:gap-0 tablet:px-[52px] mx-auto flex w-full flex-col items-center justify-center gap-3 px-4 pt-[29px] pb-7">
        <div className="tablet:justify-start flex items-center justify-center">
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

        <div className="tablet:items-end flex flex-col items-center gap-1">
          {contactItems.length > 0 && (
            <div className="tablet:flex-row tablet:gap-3 flex flex-col items-center gap-1">
              {contactItems.map((item) => (
                <span
                  key={item.key}
                  className="text-[10px] leading-4 tracking-[0] text-[#686B6E]"
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      className="transition-colors hover:text-[var(--accent-primary)]"
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {item.label}
                    </a>
                  ) : (
                    item.label
                  )}
                </span>
              ))}
            </div>
          )}

          <p className="tablet:order-1 order-2 text-[10px] leading-4 tracking-[0] text-[#686B6E]">
            {copyrightText}
          </p>

          <nav
            aria-label="Footer links"
            className="tablet:order-2 tablet:gap-3 order-1 flex items-center gap-1"
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
            <a
              href="#"
              className="termly-display-preferences px-1 py-1 text-[12px] leading-[1.4] tracking-[0] text-white transition-colors hover:text-[var(--accent-primary)]"
            >
              Consent Preferences
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
