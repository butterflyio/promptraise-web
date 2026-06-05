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
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-white"
        >
          PromptRaise
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={auditUrl}
          className="inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90"
        >
          Get Audit
        </a>
      </div>
    </header>
  );
}

