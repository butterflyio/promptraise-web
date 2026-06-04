import Link from "next/link";

const navItems = [
  { href: "#case-studies", label: "Case Studies" },
  { href: "#resources", label: "Resources" },
  { href: "#audit", label: "Free Audit" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-border)] bg-[var(--color-surface)]/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-semibold tracking-tight">
          PromptRaise
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="https://t.me/placeholder"
          className="inline-flex items-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-[var(--color-primary-foreground)] transition-opacity hover:opacity-90"
        >
          Join Telegram
        </a>
      </div>
    </header>
  );
}
