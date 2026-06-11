import Link from "next/link";

import { getSiteSettings } from "@/sanity/lib/queries";

const navItems = [
  { href: "#solutions", label: "Solutions" },
  { href: "#pricing", label: "Pricing" },
  { href: "#company", label: "Company" },
  { href: "#resources", label: "Resources" },
];

export async function SiteHeader() {
  const settings = await getSiteSettings();
  const auditUrl = settings?.freeAuditCtaUrl ?? "https://audit.promptraise.com";

  return (
    <header className="absolute top-0 right-0 left-0 z-50">
      <div className="mobile:px-6 desktop:px-[76px] wide:px-24 mx-auto flex h-24 w-full items-center justify-between px-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-[13px] leading-none font-medium text-white"
          aria-label="PromptRaise home"
        >
          <svg
            width="26"
            height="13"
            viewBox="0 0 26 13"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              fill="currentColor"
              d="M6.83.5H25L20.37 5.1h-8.19l-1.04 1.76h7.36l-5.66 5.64H7.03l3.34-5.64H6.1L2.77 12.5H.2L6.83.5Z"
            />
            <path
              fill="var(--bg-base)"
              d="M9.15 2.72h10.22l-1.38 1.36H8.34l.81-1.36Z"
            />
          </svg>
          <span>PromptRaise</span>
        </Link>

        <nav
          aria-label="Primary"
          className="tablet:flex hidden items-center gap-8 text-[12px] leading-none"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/80 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={auditUrl}
          className="inline-flex min-h-9 items-center rounded-full bg-white px-5 text-[12px] leading-none font-medium text-black transition-opacity hover:opacity-90"
        >
          Get Audit
        </a>
      </div>
    </header>
  );
}
