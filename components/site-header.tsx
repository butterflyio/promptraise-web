import Link from "next/link";

const navItems = [
  { href: "#solutions", label: "Solutions" },
  { href: "#pricing", label: "Pricing" },
  { href: "#company", label: "Company" },
  { href: "#resources", label: "Resources" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-default)] bg-[var(--bg-base)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-[var(--text-primary)]"
        >
          PromptRaise
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--text-primary)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://audit.promptraise.com"
          className="inline-flex items-center rounded-full bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
        >
          Get Audit
        </a>
      </div>
    </header>
  );
}
