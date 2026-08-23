import type { SiteSettings } from "@/sanity/lib/queries";

import { SiteBrand } from "./site-brand";

const defaultFooterLinks = [
  { label: "AI Visibility Blog", href: "/blog" },
  { label: "Academy", href: "/academy/glossary" },
  { label: "Trust Center", href: "https://trust.promptraise.com" },
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
      ? COUNTRY_DISPLAY[address.addressCountry] ?? address.addressCountry
      : null,
  ].filter((part): part is string => Boolean(part));
  return parts.length > 0 ? parts.join(", ") : null;
}

export function SiteFooter({ settings }: { settings: SiteSettings | null }) {
  const siteName = settings?.siteName ?? "PromptRaise";
  const logoUrl = settings?.logo?.asset?.url;
  const tagline =
    settings?.footerTagline ?? "Be the answer, not the search result";
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
  const addressText = formatAddress(settings?.address);

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
  if (addressText) {
    contactItems.push({ key: "address", label: addressText });
  }

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[var(--bg-contrast)]">
      <div className="tablet:justify-between tablet:px-[52px] mx-auto flex w-full flex-col items-center gap-4 px-4 pt-[29px] pb-7">
        {/* Row 1: brand + tagline */}
        <div className="flex flex-col items-center gap-1 text-center tablet:flex-row tablet:items-center tablet:gap-3 tablet:text-left">
          <SiteBrand
            siteName={siteName}
            logoUrl={logoUrl}
            className="gap-0"
            markClassName="h-[13px] w-auto shrink-0"
            wordmarkClassName="ml-2 text-[13px] leading-[20.8px] tracking-[0] font-bold text-white"
          />
          {tagline && (
            <span className="max-w-[280px] text-[12px] leading-[18px] tracking-[0] text-[#8A8D91] tablet:border-l tablet:border-[rgba(255,255,255,0.1)] tablet:pl-3">
              {tagline}
            </span>
          )}
        </div>

        {/* Row 2: contact line */}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-center tablet:justify-start">
            {contactItems.map((item) => (
              <span
                key={item.key}
                className="text-[11px] leading-4 tracking-[0] text-[#8A8D91]"
              >
                {item.href ? (
                  <a
                    href={item.href}
                    className="transition-colors hover:text-[var(--accent-primary)]"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
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

        {/* Row 3: nav links + consent */}
        <nav
          aria-label="Footer links"
          className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 tablet:justify-start"
        >
          {footerLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12px] leading-[1.4] tracking-[0] text-white transition-colors hover:text-[var(--accent-primary)]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#"
            className="termly-display-preferences text-[12px] leading-[1.4] tracking-[0] text-white transition-colors hover:text-[var(--accent-primary)]"
          >
            Consent Preferences
          </a>
        </nav>

        {/* Row 4: copyright */}
        <p className="text-[10px] leading-4 tracking-[0] text-[#686B6E]">
          {copyrightText}
        </p>
      </div>
    </footer>
  );
}