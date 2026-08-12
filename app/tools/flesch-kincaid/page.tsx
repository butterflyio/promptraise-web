import type { Metadata } from "next";

import FaqAccordion from "@/components/tools/faq-accordion";
import ReadabilityTool from "@/components/tools/readability-tool";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.promptraise.com";

export const metadata: Metadata = {
  title: "Flesch-Kincaid Calculator for Web3",
  description:
    "Free Web3 readability calculator: Flesch Reading Ease, Flesch-Kincaid Grade Level and a proprietary Citation Readiness score that shows how likely ChatGPT, Perplexity and Claude are to cite your protocol.",
  alternates: { canonical: `${siteUrl}/tools/flesch-kincaid` },
  openGraph: {
    title: "Flesch-Kincaid Calculator for Web3",
    description:
      "Paste your Web3 copy and see Flesch readability plus how citable it is to answer engines.",
    url: `${siteUrl}/tools/flesch-kincaid`,
  },
};

const FAQ = [
  {
    q: "What is a good Flesch Reading Ease score?",
    a: "A score of 60-70 is generally regarded as plain English that most adults can read easily. Higher scores are easier to read; lower scores are harder. For Web3 content, a 45-60 range is often appropriate for technical explainers.",
  },
  {
    q: "Why does this tool differ from a normal Flesch calculator?",
    a: "PromptRaise's checker is Web3-aware: protocol and chain names (DeFi, ethereum, tokenomics, TVL) are scored with a custom dictionary so legitimate industry terms are not falsely flagged as complex. It also adds a Citation Readiness score for AI visibility.",
  },
  {
    q: "What is the Citation Readiness score?",
    a: "It is a 0-100 PromptRaise signal estimating how likely answer engines are to pull a clean, grounded, citable sentence from your text, based on entity clarity, defined terms, groundable statements and sentence structure.",
  },
  {
    q: "Which readability formulas are included?",
    a: "The calculator runs six formulas at once: Flesch Reading Ease, Flesch-Kincaid Grade Level, Gunning Fog, SMOG, Coleman-Liau and the Automated Readability Index (ARI). Seeing them together shows where they disagree, which is usually more informative than any single figure.",
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
    url: `${siteUrl}/tools/flesch-kincaid`,
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
        Flesch-Kincaid Calculator for Web3
      </h1>
      <p className="mt-4 max-w-2xl leading-relaxed text-[var(--text-secondary)]">
        Paste your copy and see two things: how hard it is to read (Flesch + 4
        more formulas), and how likely answer engines are to actually cite your
        protocol. Built for Web3 writing - no false &ldquo;complex word&rdquo;
        penalties on industry terms.
      </p>

      <div className="mt-10">
        <ReadabilityTool />
      </div>

      {/* Educational SEO content - server-rendered for crawlers and AI engines */}
      <section className="mt-20 border-t border-[var(--border-default)] pt-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Why readability and AI citation matter for Web3
        </h2>
        <div className="mt-4 flex flex-col gap-4 leading-relaxed text-[var(--text-secondary)]">
          <p>
            Answer engines like ChatGPT, Perplexity, Claude and Gemini favor
            content that is easy to parse and grounded in verifiable facts. When
            your protocol documentation is clearly written and defines its
            terms, these engines are far more likely to quote it directly -
            turning your docs into a source of AI referral traffic.
          </p>
          <p>
            PromptRaise&rsquo;s Flesch-Kincaid calculator for Web3 is
            Web3-aware: it recognizes protocol and chain vocabulary (DeFi, TVL,
            AMM, tokenomics, liquidity) so legitimate industry language is not
            falsely counted as complex. The Citation Readiness score layers on
            top of classic readability to estimate how likely each answer engine
            is to cite your text.
          </p>
        </div>

        <h2 className="mt-12 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Flesch &amp; AI citation, explained
        </h2>
        <div className="mt-6">
          <FaqAccordion items={FAQ} />
        </div>
      </section>
    </main>
  );
}
