import type { Metadata } from "next";

import { GLOSSARY_CATEGORIES, GLOSSARY_TERMS } from "@/lib/glossary-terms";
import GlossaryScroller from "@/components/glossary-scroller";

import type { GlossaryTerm } from "@/lib/glossary-terms";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
  title: "Web3 AI Visibility Glossary | PromptRaise Academy",
  description: `The PromptRaise Academy glossary: ${GLOSSARY_TERMS.length} Web3 + AI-visibility terms answer engines use to discover, read and cite your protocol - from GEO and grounding to DefinedTerm and citation-per-query.`,
  alternates: { canonical: `${siteUrl}/academy/glossary` },
  openGraph: {
    title: "Web3 AI Visibility Glossary | PromptRaise Academy",
    description:
      "The language of AI visibility for Web3: how ChatGPT, Perplexity, Claude and Gemini discover, read and cite your protocol.",
    url: `${siteUrl}/academy/glossary`,
  },
};

export default function AcademyGlossaryPage() {
  const termsByCategory = GLOSSARY_CATEGORIES.map((category) => ({
    category,
    terms: GLOSSARY_TERMS.filter((t) => t.category === category),
  })).filter((group) => group.terms.length > 0);

  // DefinedTermSet JSON-LD: the machine-readable facts this page exists to
  // provide (see ai-visibility.md -> DefinedTerm). Server-rendered.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Web3 AI Visibility Glossary",
    description:
      "Terms answer engines use to discover, read and cite Web3 protocols. Part of the PromptRaise Academy.",
    url: `${siteUrl}/academy/glossary`,
    hasDefinedTerm: GLOSSARY_TERMS.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      ...(t.aliases && t.aliases.length
        ? { alternateName: t.aliases.slice(0, 4) }
        : {}),
      inDefinedTermSet: `${siteUrl}/academy/glossary`,
    })),
  };

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <p className="text-sm tracking-[0.12em] text-[var(--accent-primary)] uppercase">
        Academy · Reference
      </p>
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Web3 AI Visibility Glossary
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
        The language answer engines use to discover, read and cite your
        protocol. If you are wondering why ChatGPT and Perplexity do not
        mention you, these {GLOSSARY_TERMS.length} terms explain the machinery -
        and how to become a source instead of a rumor.
      </p>

      {/* Category pill nav - static anchor links */}
      <nav
        aria-label="Glossary categories"
        className="mt-8 flex flex-wrap gap-2"
      >
        {termsByCategory.map(({ category, terms }) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="rounded-full border border-[var(--border-soft)] px-4 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            {category}
            <span className="ml-1.5 text-[var(--text-muted)]">
              {terms.length}
            </span>
          </a>
        ))}
      </nav>

      {/* Client enhancement: search + A-Z jump (terms stay SSR'd below) */}
      <GlossaryScroller terms={GLOSSARY_TERMS} categories={[...GLOSSARY_CATEGORIES]} />

      <div className="mt-6 flex flex-col gap-12">
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
                <TermCard key={t.term} term={t} />
              ))}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}

function TermCard({ term }: { term: GlossaryTerm }) {
  return (
    <div
      id={"term-" + slugify(term.term)}
      className="scroll-mt-28 rounded-2xl border border-[var(--border-soft)] bg-[var(--bg-surface-panel)] p-5"
    >
      <dt className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className="text-lg font-semibold text-[var(--text-primary)]">
          {term.term}
        </span>
        {term.aliases && term.aliases.length ? (
          <span className="text-sm text-[var(--text-muted)]">
            {term.aliases.slice(0, 4).join(", ")}
          </span>
        ) : null}
      </dt>
      <dd className="mt-2 leading-relaxed text-[var(--text-secondary)]">
        {term.definition}
        {term.example ? (
          <span className="mt-2 block border-l-2 border-[var(--accent-primary)] pl-3 text-sm text-[var(--text-muted)]">
            <span className="font-medium text-[var(--text-secondary)]">
              Example:{" "}
            </span>
            {term.example}
          </span>
        ) : null}
      </dd>
    </div>
  );
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
