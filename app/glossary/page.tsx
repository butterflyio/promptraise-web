import type { Metadata } from "next";

import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from "@/lib/glossary-terms";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
  title: "Web3 AI Visibility Glossary",
  description: `The language of AI visibility for Web3: ${GLOSSARY_TERMS.length} terms answer engines use to discover, read and cite your protocol - from GEO and grounding to DefinedTerm and citation-per-query.`,
  alternates: { canonical: `${siteUrl}/glossary` },
  openGraph: {
    title: "Web3 AI Visibility Glossary",
    description:
      "The language of AI visibility for Web3: how ChatGPT, Perplexity, Claude and Gemini discover, read and cite your protocol.",
    url: `${siteUrl}/glossary`,
  },
};

// A small filter can't hold its own client state as a server component; the
// page is static and fast, and grouping by category already gives quick access.
// Keep this as a server-rendered page for indexability (matches ai-visibility.md).
export default function GlossaryPage() {
  const termsByCategory = GLOSSARY_CATEGORIES.map((category) => ({
    category,
    terms: GLOSSARY_TERMS.filter((t) => t.category === category),
  })).filter((group) => group.terms.length > 0);

  // ItemList + DefinedTerm JSON-LD: the machine-readable facts this page is
  // built to provide (see ai-visibility.md -> DefinedTerm, V2).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Web3 AI Visibility Glossary",
    description:
      "Terms answer engines use to discover, read and cite Web3 protocols.",
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      ...(t.aliases && t.aliases.length
        ? { alternateName: t.aliases.slice(0, 3) }
        : {}),
      inDefinedTermSet: `${siteUrl}/glossary`,
    })),
  };

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        Reference
      </p>
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Web3 AI Visibility Glossary
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
        The language answer engines use to discover, read and cite your
        protocol. If you are wondering why ChatGPT and Perplexity do not mention
        you, these terms explain the machinery - and how to become a source
        instead of a rumor.
      </p>

      <nav
        aria-label="Glossary categories"
        className="mt-8 flex flex-wrap gap-2"
      >
        {GLOSSARY_CATEGORIES.filter((c) =>
          GLOSSARY_TERMS.some((t) => t.category === c),
        ).map((category) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="rounded-full border border-[var(--border-soft)] px-4 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            {category}
            <span className="ml-1.5 text-[var(--text-muted)]">
              {GLOSSARY_TERMS.filter((t) => t.category === category).length}
            </span>
          </a>
        ))}
      </nav>

      <div className="mt-12 flex flex-col gap-12">
        {termsByCategory.map(({ category, terms }) => (
          <section key={category} id={slugify(category)}>
            <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              {category}
              <span className="text-sm font-normal text-[var(--text-muted)]">
                {terms.length} {terms.length === 1 ? "term" : "terms"}
              </span>
            </h2>

            <dl className="mt-6 flex flex-col gap-3">
              {terms.map((t) => (
                <div
                  key={t.term}
                  className="rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-surface-panel)] p-5"
                >
                  <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-lg font-semibold text-[var(--text-primary)]">
                      {t.term}
                    </span>
                    {t.aliases && t.aliases.length ? (
                      <span className="text-sm text-[var(--text-muted)]">
                        {t.aliases.slice(0, 3).join(", ")}
                      </span>
                    ) : null}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-[var(--text-secondary)]">
                    {t.definition}
                    {t.example ? (
                      <span className="mt-2 block border-l-2 border-[var(--accent-primary)] pl-3 text-sm text-[var(--text-muted)]">
                        <span className="font-medium text-[var(--text-secondary)]">
                          Example:{" "}
                        </span>
                        {t.example}
                      </span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
