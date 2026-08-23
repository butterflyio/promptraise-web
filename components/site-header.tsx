import type { SiteSettings } from "@/sanity/lib/queries";
import { Flame } from "lucide-react";
import { DsButton } from "@/components/design-system";
import { SiteBrand } from "./site-brand";
import { MobileMenu } from "./mobile-menu";

const defaultNavItems = [
  { href: "#company", label: "Team" },
  { href: "/glossary", label: "Glossary", hot: true },
  { href: "/blog", label: "Blog" },
  { href: "#plans", label: "Pricing" },
  { href: "/free/flesch-kincaid-calculator", label: "Free Tools" },
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

  // The announcement bar is a fixed strip that publishes its measured height
  // to the CSS variable --announce-offset (set client-side, so it can also
  // collapse to 0 when dismissed). The header is absolutely positioned, so it
  // offsets from that variable to sit below the bar - and back to the top when
  // the bar is gone. The fallback matches the bar's height on first paint so
  // there is no overlap flash before the client measures it.
  const announcementEnabled = Boolean(
    settings?.announcement?.enabled && settings?.announcement?.text,
  );
  const fallbackOffset = announcementEnabled
    ? "calc(2.5rem + env(safe-area-inset-top))"
    : "0px";
  const announceOffset = `var(--announce-offset, ${fallbackOffset})`;

  return (
    <header className="absolute inset-x-0 z-50" style={{ top: announceOffset }}>
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
            className="hidden items-center gap-7 lg:flex"
          >
            {navItems.map((item) => (
              <a
                key={item.href + item.label}
                href={normalizeHref(item.href)}
                className="rounded-full px-3 py-2 text-[16px] leading-[1.5] tracking-[-0.32px] text-white transition-colors hover:text-white/85"
              >
                {item.label}
                {Boolean((item as { hot?: boolean }).hot) ? <HotBadge /> : null}
              </a>
            ))}

            <DsButton
              href={auditUrl}
              variant="primary"
              size="md"
              className="rounded-full"
            >
              {headerCtaLabel}
            </DsButton>
          </nav>
        </div>
      </div>
    </header>
  );
}
