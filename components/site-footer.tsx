const socialLinks = ["X", "Telegram", "Discord", "Reddit", "YouTube"];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold tracking-tight">PromptRaise</p>
          <p className="mt-1 text-sm text-[var(--color-text-muted)]">
            AI visibility for Web3 teams.
          </p>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap gap-4 text-sm">
          <a href="/aivisibility" className="hover:underline">
            Brand Assets
          </a>
          <a href="/how-we-built-this" className="hover:underline">
            How We Built This
          </a>
          <a href="/glossary" className="hover:underline">
            Glossary
          </a>
        </nav>

        <div className="flex flex-wrap gap-3 text-xs tracking-wide text-[var(--color-text-muted)] uppercase">
          {socialLinks.map((social) => (
            <span key={social}>{social}</span>
          ))}
        </div>
      </div>
    </footer>
  );
}
