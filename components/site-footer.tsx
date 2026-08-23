import type { SiteSettings } from "@/sanity/lib/queries";

import { SiteBrand } from "./site-brand";

const defaultFooterGroups: NonNullable<SiteSettings["footerNavGroups"]> = [
  {
    heading: "Resources",
    links: [
      { label: "AI Visibility Blog", href: "/blog" },
      { label: "Glossary", href: "/glossary" },
      { label: "Free Tools", href: "/free/flesch-kincaid-calculator" },
    ],
  },
  {
    heading: "Services",
    links: [{ label: "Free AI Audit", href: "https://audit.promptraise.com" }],
  },
  {
    heading: "Company",
    links: [
      { label: "Trust Center", href: "https://trust.promptraise.com" },
      { label: "Sitemap", href: "/sitemap.xml" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Usage", href: "/cookies" },
    ],
  },
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
    settings?.footerCopyrightText ?? "© 2026 PromptRaise · All Rights Reserved";

  const groups =
    settings?.footerNavGroups && settings.footerNavGroups.length > 0
      ? settings.footerNavGroups
      : defaultFooterGroups;

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
      <div className="tablet:px-[52px] mx-auto flex w-full flex-col gap-8 px-4 pt-[29px] pb-7">
        {/* Brand + tagline */}
        <div className="flex flex-col items-center gap-2 text-center tablet:flex-row tablet:items-center tablet:gap-3 tablet:text-left">
          <SiteBrand
            siteName={siteName}
            logoUrl={logoUrl}
            className="gap-0"
            markClassName="h-[13px] w-auto shrink-0"
            wordmarkClassName="ml-2 text-[13px] leading-[20.8px] tracking-[0] font-bold text-white"
          />
          {tagline && (
            <span className="max-w-[280px] text-[12px] leading-[18px] tracking-[0] text-[var(--text-muted)] tablet:border-l tablet:border-[rgba(255,255,255,0.1)] tablet:pl-3">
              {tagline}
            </span>
          )}
        </div>

        {/* Nav columns */}
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-6 gap-y-8 tablet:grid-cols-3 lg:grid-cols-4"
        >
          {groups.map((group) => (
            <div key={group.heading} className="flex flex-col gap-3">
              <h3 className="text-[11px] font-semibold tracking-[0.12em] text-[var(--text-muted)] uppercase">
                {group.heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-[13px] leading-[1.4] tracking-[0] text-[#cfd3d8] transition-colors hover:text-[var(--accent-primary)]"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        {/* Contact row - separated */}
        {contactItems.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-center tablet:justify-start">
            {contactItems.map((item, i) => (
              <span
                key={item.key}
                className="flex items-center gap-3 text-[12px] leading-4 tracking-[0] text-[var(--text-muted)]"
              >
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-1 w-1 shrink-0 rounded-full bg-[#3a3f45]"
                  />
                )}
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

        {/* Bottom bar: legal link fallback + consent + copyright */}
        <div className="flex flex-col items-center gap-3 border-t border-[rgba(255,255,255,0.06)] pt-6 tablet:flex-row tablet:justify-between">
          <p className="text-[10px] leading-4 tracking-[0] text-[#686B6E]">
            {copyrightText}
          </p>
          <a
            href="#"
            className="termly-display-preferences text-[10px] leading-4 tracking-[0] text-[#686B6E] transition-colors hover:text-[var(--accent-primary)]"
          >
            Consent Preferences
          </a>
        </div>
      </div>
    </footer>
  );
}