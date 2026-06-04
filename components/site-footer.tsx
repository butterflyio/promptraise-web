const socialLinks = ["X", "Telegram", "Discord", "Reddit", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-tight text-[var(--text-primary)]">
            PromptRaise
          </p>
          <p className="mt-1 text-sm text-[var(--text-muted)]">
            AI visibility for Web3 teams.
          </p>
          <p className="mt-2 text-xs text-[var(--text-muted)]">
            powered by Pencil
          </p>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap gap-4 text-sm">
          <a
            href="/privacy"
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            Privacy Policy
          </a>
        </nav>

        <div className="flex flex-wrap gap-3 text-xs tracking-wide text-[var(--text-muted)] uppercase">
          {socialLinks.map((social) => (
            <span
              key={social}
              className="cursor-pointer transition-colors hover:text-[var(--text-secondary)]"
            >
              {social}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
