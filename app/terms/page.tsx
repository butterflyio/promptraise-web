export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for PromptRaise.",
};

export default function TermsPage() {
  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-3xl px-4 py-16">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        Legal
      </p>
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Terms of Service
      </h1>
      <div className="mt-12 flex flex-col gap-6 text-[var(--text-secondary)] leading-relaxed">
        <p>
          PromptRaise provides marketing and visibility services for Web3 teams.
        </p>
        <p>
          Use of the website and services is subject to separate commercial
          agreements, scopes of work, and invoicing terms shared with each
          client.
        </p>
        <p>
          Contact the team for the current service terms before starting work.
        </p>
      </div>
    </main>
  );
}
