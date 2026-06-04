export function AuditCtaSection() {
  return (
    <section id="audit" className="border-b border-[var(--border-default)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center md:py-20">
        <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
          Free Audit
        </p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
          See how your project ranks across AI surfaces
        </h2>
        <p className="max-w-xl text-[var(--text-secondary)]">
          Get a comprehensive analysis of your AI visibility in 48 hours. No
          commitment required.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://audit.promptraise.com"
            className="inline-flex items-center rounded-full bg-[var(--accent-primary)] px-6 py-3 text-sm font-medium text-[var(--accent-foreground)] transition-opacity hover:opacity-90"
          >
            Get Free Audit
          </a>
          <a
            href="https://t.me/placeholder"
            className="inline-flex items-center rounded-full border border-[var(--border-default)] px-6 py-3 text-sm font-medium text-[var(--text-primary)] transition-colors hover:border-[var(--text-muted)]"
          >
            Join Telegram
          </a>
        </div>
      </div>
    </section>
  );
}
