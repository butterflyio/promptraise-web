import { getSiteSettings } from "@/sanity/lib/queries";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const socials = settings?.socialLinks;

  const socialLinks = [
    { name: "X", url: socials?.x },
    { name: "Telegram", url: socials?.telegram },
    { name: "Discord", url: socials?.discord },
    { name: "Reddit", url: socials?.reddit },
    { name: "YouTube", url: socials?.youtube },
  ].filter((link) => link.url);

  return (
    <footer className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
      <div className="tablet:flex-row tablet:items-center tablet:justify-between mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10">
        <div>
          <p className="font-semibold tracking-tight text-[var(--text-primary)]">
            {settings?.siteName ?? "PromptRaise"}
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
          {socialLinks.length > 0 ? (
            socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-[var(--text-secondary)]"
              >
                {social.name}
              </a>
            ))
          ) : (
            <>
              <span>X</span>
              <span>Telegram</span>
              <span>Discord</span>
              <span>Reddit</span>
              <span>YouTube</span>
            </>
          )}
        </div>
      </div>
    </footer>
  );
}
