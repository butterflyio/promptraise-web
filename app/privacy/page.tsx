export const metadata = {
  title: "Privacy Notice",
  description:
    "How PromptRaise handles data, cookies, and visitor privacy. No tracking cookies. No personal data storage.",
};

export default function PrivacyPage() {
  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-3xl px-4 py-16">
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        Legal
      </p>
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Privacy Notice
      </h1>

      <div className="mt-12 flex flex-col gap-8 text-[var(--text-secondary)]">
        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            No Cookies, No Tracking
          </h2>
          <p className="mt-3 leading-relaxed">
            PromptRaise does not use cookies for tracking, advertising, or
            analytics. We do not store any personal data about visitors to this
            website. No consent banner is required because we do not collect
            identifiable information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Analytics
          </h2>
          <p className="mt-3 leading-relaxed">
            We use cookieless analytics to understand aggregate traffic
            patterns. This data is anonymized and cannot be used to identify
            individual visitors. No third-party tracking scripts are loaded.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Contact Forms
          </h2>
          <p className="mt-3 leading-relaxed">
            If you submit a contact form or audit request, your information is
            used solely to respond to your inquiry. We do not store this data in
            a database; it is delivered via email and retained only as long as
            necessary to complete your request.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Third-Party Links
          </h2>
          <p className="mt-3 leading-relaxed">
            This site links to external services (Telegram, audit platform). We
            are not responsible for the privacy practices of these third-party
            services. Please review their privacy policies separately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Changes to This Notice
          </h2>
          <p className="mt-3 leading-relaxed">
            We may update this privacy notice from time to time. Changes will be
            posted on this page with an updated effective date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">
            Contact
          </h2>
          <p className="mt-3 leading-relaxed">
            For privacy-related questions, contact us via{" "}
            <a
              href="https://t.me/placeholder"
              className="text-[var(--accent-primary)] hover:underline"
            >
              Telegram
            </a>{" "}
            or{" "}
            <a
              href="https://audit.promptraise.com"
              className="text-[var(--accent-primary)] hover:underline"
            >
              request an audit
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
