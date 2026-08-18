import type { Metadata } from "next";
import { draftMode } from "next/headers";

import FaqAccordion from "@/components/tools/faq-accordion";
import ReadabilityTool from "@/components/tools/readability-tool";
import { DEFAULT_COPY, type FleschCopy } from "@/lib/flesch-copy";
import { linkGlossaryTerms } from "@/lib/glossary-links";
import { mergeCopy } from "@/lib/flesch-merge";
import {
  getFleschKincaidLanding,
  getFleschKincaidLandingPreview,
} from "@/sanity/lib/queries";

export const revalidate = 30;

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
  title: "Flesch-Kincaid Calculator for Web3",
  description:
    "Free Web3 readability calculator: Flesch Reading Ease, Flesch-Kincaid Grade Level and a proprietary Citation Readiness score that shows how likely ChatGPT, Perplexity and Claude are to cite your protocol.",
  alternates: { canonical: `${siteUrl}/free/flesch-kincaid-calculator` },
  openGraph: {
    title: "Flesch-Kincaid Calculator for Web3",
    description:
      "Paste your Web3 copy and see Flesch readability plus how citable it is to answer engines.",
    url: `${siteUrl}/free/flesch-kincaid-calculator`,
  },
};

const EMBED_SNIPPET = `<iframe src="${siteUrl}/free/flesch-kincaid-calculator/embed" width="100%" height="900" style="border:1px solid #dde0e5;border-radius:12px" title="Flesch-Kincaid calculator by PromptRaise" loading="lazy"></iframe>`;

const API_SNIPPET = `curl -s -X POST ${siteUrl}/api/readability \\
  -H 'Content-Type: application/json' \\
  -d '{"text": "Your Web3 copy goes here..."}'`;

function CodeBlock({ code }: { code: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-2xl border border-[var(--border-default)] bg-[#0c0f14] p-4 text-xs leading-relaxed text-[var(--text-secondary)]">
      <code>{code}</code>
    </pre>
  );
}

export default async function ReadabilityPage() {
  const isDraft = (await draftMode()).isEnabled;
  const doc = isDraft
    ? await getFleschKincaidLandingPreview()
    : await getFleschKincaidLanding();
  const copy = mergeCopy(doc);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to check the readability and AI citation readiness of Web3 copy",
    description:
      "Paste your Web3 copy to get six readability formulas plus a Citation Readiness score that estimates how likely ChatGPT, Perplexity, Claude and Gemini are to cite your protocol.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Paste your Web3 copy",
        text: "Paste a whitepaper section, landing page, blog post or docs into the text area.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Choose your content type",
        text: "Pick General, Web3 Explainer, Whitepaper, Tutorial or Social media to set the target reading range.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Run the analysis",
        text: "Click Analyze text to compute six readability formulas, metric counts, Web3 term detection and a Citation Readiness score.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Apply the suggestions",
        text: "Review the improvement tips and per-engine verdicts to make your copy more citable by answer engines.",
      },
    ],
  };

  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Flesch-Kincaid Calculator for Web3",
    description:
      "Free Web3 readability and AI citation checker. Runs Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau and ARI, plus a Citation Readiness score for AI visibility.",
    url: `${siteUrl}/free/flesch-kincaid-calculator`,
    isPartOf: { "@type": "WebSite", name: "PromptRaise", url: siteUrl },
  };

  return (
    <main className="mobile:px-6 tablet:py-20 mx-auto w-full max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <h1 className="tablet:text-4xl mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
        {copy.heroTitle}
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
        {copy.heroSubtitle}
      </p>

      <div
        role="note"
        className="mt-5 flex flex-col gap-2 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5"
      >
        <span className="text-sm font-semibold tracking-wide text-white">
          {copy.privacyBadge}
        </span>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-muted)]">
          {copy.privacyBody}
        </p>
        <p className="text-xs font-medium text-[var(--accent-primary)]">
          {copy.trustLine}
        </p>
      </div>

      <div className="mt-10">
        <ReadabilityTool copy={copy} />
      </div>

      {/* Educational SEO content - server-rendered for crawlers and AI engines */}
      <section className="mt-20 border-t border-[var(--border-default)] pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {copy.introSectionTitle}
        </h2>
        <div className="mt-4 flex flex-col gap-4 leading-relaxed text-[var(--text-secondary)]">
          <p>{linkGlossaryTerms(copy.introBody1)}</p>
          <p>{linkGlossaryTerms(copy.introBody2)}</p>
        </div>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {copy.faqSectionTitle}
        </h2>
        <div className="mt-6">
          <FaqAccordion
            items={copy.faq.map((f) => ({
              q: f.question,
              a: linkGlossaryTerms(f.answer),
            }))}
          />
        </div>
      </section>

      {/* Embed widget - distribution + backlinks */}
      <section className="mt-16 border-t border-[var(--border-default)] pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {copy.embedSectionTitle}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {copy.embedBody}
        </p>
        <CodeBlock code={EMBED_SNIPPET} />
      </section>

      {/* AI-agent / developer API */}
      <section className="mt-16 border-t border-[var(--border-default)] pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {copy.apiSectionTitle}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {copy.apiBody}
        </p>
        <CodeBlock code={API_SNIPPET} />
      </section>

      {/* Methodology + contact - small, modeled on readabilitycheck.com/about */}
      <section className="mt-16 border-t border-[var(--border-default)] pt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          {copy.methodologyTitle}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-[var(--text-secondary)]">
          {linkGlossaryTerms(copy.methodologyBody)}
        </p>
        <p className="mt-4 text-sm text-[var(--text-muted)]">
          {copy.contactEmailLabel}{" "}
          <a
            href={`mailto:${copy.contactEmail}`}
            className="text-[var(--accent-primary)] hover:underline"
          >
            {copy.contactEmail}
          </a>
        </p>
      </section>
    </main>
  );
}
