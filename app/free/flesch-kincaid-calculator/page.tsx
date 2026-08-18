import type { Metadata } from "next";
import { draftMode } from "next/headers";

import FaqAccordion from "@/components/tools/faq-accordion";
import ReadabilityTool from "@/components/tools/readability-tool";
import { DEFAULT_COPY, type FleschCopy } from "@/lib/flesch-copy";
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

/**
 * Merge the CMS doc over the in-code defaults so a blank or missing CMS field
 * never drops a section. `formulaDefinitions` and `faq` are arrays, so replace
 * them wholesale when the CMS provides non-empty arrays, else keep defaults.
 */
function mergeCopy(doc: Record<string, unknown> | null): FleschCopy {
  if (!doc) return DEFAULT_COPY;
  const copy = { ...DEFAULT_COPY };

  const simpleKeys: (keyof FleschCopy)[] = [
    "heroTitle",
    "heroSubtitle",
    "privacyBadge",
    "privacyTitle",
    "privacyBody",
    "contentTypeLabel",
    "sampleText",
    "introSectionTitle",
    "introBody1",
    "introBody2",
    "formulasTitle",
    "formulasSubtext",
    "engineVerdictTitle",
    "engineVerdictIntro",
    "citationSectionTitle",
    "citationSectionIntro",
    "ctaHeading",
    "ctaBody",
    "ctaLabel",
    "ctaHref",
  ];
  for (const key of simpleKeys) {
    const val = doc[key];
    if (typeof val === "string" && val.trim().length > 0) {
      (copy as Record<string, unknown>)[key] = val;
    }
  }

  const formulas = doc["formulaDefinitions"];
  if (Array.isArray(formulas) && formulas.length > 0) {
    const mapped = formulas
      .map((f) => {
        const entry = f as { key?: string; description?: string };
        if (!entry.key || typeof entry.description !== "string") return null;
        return { key: entry.key, description: entry.description };
      })
      .filter((x): x is { key: string; description: string } => x !== null);
    if (mapped.length > 0) copy.formulaDefinitions = mapped;
  }

  const faq = doc["faq"];
  if (Array.isArray(faq) && faq.length > 0) {
    const mapped = faq
      .map((f) => {
        const entry = f as { question?: string; answer?: string };
        if (
          typeof entry.question !== "string" ||
          typeof entry.answer !== "string"
        ) {
          return null;
        }
        return { question: entry.question, answer: entry.answer };
      })
      .filter(
        (x): x is { question: string; answer: string } =>
          x !== null &&
          x.question.trim().length > 0 &&
          x.answer.trim().length > 0,
      );
    if (mapped.length > 0) copy.faq = mapped;
  }

  return copy;
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
        text: "Pick General, Web3 Explainer, Whitepaper or Tutorial to set the target reading range.",
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
          <p>{copy.introBody1}</p>
          <p>{copy.introBody2}</p>
        </div>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Flesch &amp; AI citation, explained
        </h2>
        <div className="mt-6">
          <FaqAccordion
            items={copy.faq.map((f) => ({ q: f.question, a: f.answer }))}
          />
        </div>
      </section>
    </main>
  );
}
