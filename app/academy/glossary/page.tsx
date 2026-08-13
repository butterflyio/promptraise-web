import type { Metadata } from "next";
import { draftMode } from "next/headers";

import GlossaryScroller from "@/components/glossary-scroller";
import {
  getGlossaryContent,
  relatedFor,
  termAnchor,
  type GlossaryContent,
} from "@/lib/glossary-content";
import type { GlossaryTerm } from "@/lib/glossary-terms";

export const revalidate = 30;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata(): Promise<Metadata> {
  const { draftMode: dm } = await import("next/headers");
  const isDraft = await dm();
  const content = await getGlossaryContent(isDraft);
  return {
    title:
      content.metaTitle || "Web3 AI Visibility Glossary | PromptRaise Academy",
    description:
      content.metaDescription ||
      `The PromptRaise Academy glossary: ${content.terms.length} Web3 + AI-visibility terms answer engines use to discover, read and cite your protocol - from GEO and grounding to DefinedTerm and citation-per-query.`,
    alternates: { canonical: `${siteUrl}/academy/glossary` },
    openGraph: {
      title: "Web3 AI Visibility Glossary | PromptRaise Academy",
      description:
        "The language of AI visibility for Web3: how ChatGPT, Perplexity, Claude and Gemini discover, read and cite your protocol.",
      url: `${siteUrl}/academy/glossary`,
    },
  };
}

export default async function AcademyGlossaryPage(_props: PageProps) {
  const isDraft = await draftMode();
  const content = await getGlossaryContent(isDraft);
  const { categories, terms, intro } = content;

  const termsByCategory = buildTermsByCategory(categories, terms);

  // DefinedTermSet JSON-LD: the machine-readable facts this page exists to
  // provide (see ai-visibility.md -> DefinedTerm). Server-rendered.
  const jsonLd = buildJsonLd(siteUrl, content);

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
        {intro ??
          `The language answer engines use to discover, read and cite your
        protocol. If you are wondering why ChatGPT and Perplexity do not mention
        you, these ${terms.length} terms explain the machinery - and how
        to become a source instead of a rumor.`}
      </p>

      {/* Category pill nav - static anchor links */}
      <nav
        aria-label="Glossary categories"
        className="mt-8 flex flex-wrap gap-2"
      >
        {termsByCategory.map(({ category, terms: group }) => (
          <a
            key={category}
            href={`#${slugify(category)}`}
            className="rounded-full border border-[var(--border-soft)] px-4 py-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
          >
            {category}
            <span className="ml-1.5 text-[var(--text-muted)]">
              {group.length}
            </span>
          </a>
        ))}
      </nav>

      {/* Client enhancement: search + A-Z jump (terms stay SSR'd below) */}
      <GlossaryScroller terms={terms} categories={[...categories]} />

      <div className="mt-6 flex flex-col gap-12">
        {termsByCategory.map(({ category, terms: group }) => (
          <section key={category} id={slugify(category)}>
            <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
              {category}
              <span className="text-sm font-normal text-[var(--text-muted)]">
                {group.length} {group.length === 1 ? "term" : "terms"}
              </span>
            </h2>

            <dl className="mt-6 flex flex-col gap-3">
              {group.map((t) => (
                <TermCard key={t.term} term={t} content={content} />
              ))}
            </dl>
          </section>
        ))}
      </div>
    </main>
  );
}

function buildTermsByCategory(
  categories: string[],
  terms: GlossaryTerm[],
): Array<{ category: string; terms: GlossaryTerm[] }> {
  return categories
    .map((category) => ({
      category,
      terms: terms.filter((t) => t.category === category),
    }))
    .filter((group) => group.terms.length > 0);
}

function buildJsonLd(siteUrl: string, content: GlossaryContent) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name: "Web3 AI Visibility Glossary",
    description:
      "Terms answer engines use to discover, read and cite Web3 protocols. Part of the PromptRaise Academy.",
    url: `${siteUrl}/academy/glossary`,
    hasDefinedTerm: content.terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.term,
      description: t.definition,
      ...(t.aliases && t.aliases.length
        ? { alternateName: t.aliases.slice(0, 4) }
        : {}),
      ...(relatedFor(content.related, t.term).length
        ? {
            mentions: relatedFor(content.related, t.term).map(
              (r) => `${siteUrl}/academy/glossary#${termAnchor(r)}`,
            ),
          }
        : {}),
      inDefinedTermSet: `${siteUrl}/academy/glossary`,
    })),
  };
}

function TermCard({
  term,
  content,
}: {
  term: GlossaryTerm;
  content: GlossaryContent;
}) {
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
        {relatedFor(content.related, term.term).length ? (
          <span className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-xs tracking-[0.1em] text-[var(--text-muted)] uppercase">
              See also
            </span>
            {relatedFor(content.related, term.term).map((r) => (
              <a
                key={r}
                href={`#${termAnchor(r)}`}
                className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs text-[var(--text-secondary)] transition-colors hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
              >
                {r}
              </a>
            ))}
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
