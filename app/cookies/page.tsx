export const metadata = {
  title: "Cookie Usage",
  description: "Cookie usage for PromptRaise.",
};

export default function CookiesPage() {
  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-3xl px-4 py-16">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        Legal
      </p>
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Cookie Usage
      </h1>
      <div className="mt-12 flex flex-col gap-6 text-[var(--text-secondary)] leading-relaxed">
        <p>
          PromptRaise does not use tracking or advertising cookies on the
          marketing website.
        </p>
        <p>
          If a future feature requires cookies, we will update this page and the
          privacy notice before enabling them.
        </p>
      </div>
    </main>
  );
}
