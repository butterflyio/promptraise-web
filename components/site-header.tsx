import type { SiteSettings } from "@/sanity/lib/queries";
import { Flame } from "lucide-react";
import { DsButton } from "@/components/design-system";
import { SiteBrand } from "./site-brand";
import { MobileMenu } from "./mobile-menu";

const defaultNavItems = [
  { href: "/blog", label: "Solutions" },
  { href: "#plans", label: "Pricing" },
  { href: "#company", label: "Team" },
  { href: "/glossary", label: "Resources", hot: true },
];

/**
 * Normalize nav hrefs so anchors work from ANY page, not just the homepage.
 * "#plans" -> "/#plans" (jumps to the homepage section from anywhere).
 * Absolute URLs and real paths pass through unchanged.
 */
function normalizeHref(href: string): string {
  if (href.startsWith("#")) return `/${href}`;
  return href;
}

/** Small inline "hot" flame marker shown next to a highlighted nav link. */
function HotBadge() {
  return (
    <span
      aria-label="Hot"
      title="Hot"
      className="ml-1 inline-flex items-center text-[#ff6b1a]"
    >
      <Flame aria-label="Hot" className="h-3.5 w-3.5 text-[#ff6b1a]" />
    </span>
  );
}

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
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

  // When the announcement bar is active it is a fixed 40px strip at the very
  // top (z-60). The header is absolutely positioned, so it must offset below
  // it - otherwise the bar covers the logo and CTA buttons.
  const announcementActive = Boolean(
    settings?.announcement?.enabled && settings?.announcement?.text,
  );

  return (
    <header
      className={`absolute inset-x-0 z-50 ${
        announcementActive ? "top-10" : "top-0"
      }`}
    >
      <div className="tablet:px-9 desktop:px-24 mx-auto flex w-full flex-col items-start px-4 py-6">
        <div className="flex w-full items-center justify-between rounded-[9999px] backdrop-blur-[14.012px]">
          <div className="flex items-center gap-6">
            <MobileMenu
              navItems={[
                ...navItems.map((item) => ({
                  href: normalizeHref(item.href),
                  label: item.label,
                  hot: Boolean((item as { hot?: boolean }).hot),
                })),
                { href: auditUrl, label: headerCtaLabel },
              ]}
              auditUrl={auditUrl}
              auditLabel={headerCtaLabel}
            />

            <SiteBrand
              siteName={siteName}
              logoUrl={logoUrl}
              className="gap-3"
              markClassName="h-8 w-8 shrink-0 rounded-full object-cover"
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
                href={normalizeHref(item.href)}
                className="rounded-full px-3 py-2 text-[16px] leading-[1.5] tracking-[-0.32px] text-white transition-colors hover:text-white/85"
              >
                {item.label}
                {Boolean((item as { hot?: boolean }).hot) ? <HotBadge /> : null}
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
