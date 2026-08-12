import type { Metadata } from "next";

import ReadabilityTool from "@/components/tools/readability-tool";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
  title: "Web3 Readability & AI Citation Checker",
  description:
    "Free Web3 readability checker: Flesch Reading Ease, Flesch-Kincaid Grade Level and a proprietary Citation Readiness score that shows how likely ChatGPT, Perplexity and Claude are to cite your protocol.",
  alternates: { canonical: `${siteUrl}/tools/readability` },
  openGraph: {
    title: "Web3 Readability & AI Citation Checker",
    description:
      "Paste your Web3 copy and see Flesch readability plus how citable it is to answer engines.",
    url: `${siteUrl}/tools/readability`,
  },
};

const FAQ = [
  {
    q: "What is a good Flesch Reading Ease score?",
    a: "A score of 60-70 is generally regarded as plain English that most adults can read easily. Higher scores are easier to read; lower scores are harder.",
  },
  {
    q: "Why does this tool differ from a normal Flesch calculator?",
    a: "PromptRaise's checker is Web3-aware: protocol and chain names (DeFi, ethereum, tokenomics, TVL) are scored with a custom dictionary so legitimate industry terms are not falsely flagged as complex. It also adds a Citation Readiness score for AI visibility.",
  },
  {
    q: "What is the Citation Readiness score?",
    a: "It is a 0-100 PromptRaise signal estimating how likely answer engines are to pull a clean, grounded, citable sentence from your text, based on entity clarity, defined terms, groundable statements and sentence structure.",
  },
];

export default function ReadabilityPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <p className="text-sm tracking-[0.12em] text-[var(--text-muted)] uppercase">
        Free tool
      </p>
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        Web3 Readability &amp; AI Citation Checker
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
        Paste your copy and see two things: how hard it is to read (Flesch), and
        how likely answer engines are to actually cite your protocol. Built for
        Web3 writing - no false &ldquo;complex word&rdquo; penalties on industry
        terms.
      </p>

      <div className="mt-10">
        <ReadabilityTool />
      </div>

      {/* Educational FAQ - also the on-page SEO block */}
      <section className="mt-20 border-t border-[var(--border-default)] pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Flesch &amp; AI citation, explained
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {FAQ.map((f) => (
            <div
              key={f.q}
              className="rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-panel)] p-5"
            >
              <h3 className="font-semibold text-[var(--text-primary)]">
                {f.q}
              </h3>
              <p className="mt-2 leading-relaxed text-[var(--text-secondary)]">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
