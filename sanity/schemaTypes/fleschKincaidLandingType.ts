import { defineArrayMember, defineField, defineType } from "sanity";

/** Compact string-field helper for the UI labels object below. */
const uiString = (name: string, title: string, description?: string) =>
  defineField({ name, title, type: "string", description });

/**
 * Flesch-Kincaid calculator page copy - editable marketing content for
 * promptraise.com/free/flesch-kincaid-calculator.
 *
 * This is a single document ("fleschKincaidLanding") whose fields map onto
 * every text string rendered by the calculator page and tool. Editable in the
 * shared Studio, fetched at render time by the Next page, with the app falling
 * back to hardcoded defaults (lib/flesch-copy.ts) when the CMS is unreachable.
 *
 * The six formula keys must match the ReadabilityResult keys used in
 * lib/readability.ts: readingEase, gradeLevel, gunningFog, smog,
 * colemanLiau, ari.
 */
export const fleschKincaidLandingType = defineType({
  name: "fleschKincaidLanding",
  title: "Flesch-Kincaid Calculator",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title (H1)",
      type: "string",
      initialValue: "Flesch-Kincaid Calculator for Web3",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "text",
      rows: 3,
      description:
        "Paragraph under the H1. Keep it tight - it sets the page's core message.",
    }),
    defineField({
      name: "privacyBadge",
      title: "Privacy Badge",
      type: "string",
      description: "Bold line of the offline/privacy note.",
      initialValue: "Runs 100% in your browser - fully offline",
    }),
    defineField({
      name: "privacyTitle",
      title: "Privacy Note Title",
      type: "string",
    }),
    defineField({
      name: "privacyBody",
      title: "Privacy Note Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "trustLine",
      title: "Trust Line (badge strip)",
      type: "string",
      description:
        "Badge strip under the privacy note. Default: Forever Free · No signup · No word limit · No data capture, ever · 100% offline in your browser",
    }),
    defineField({
      name: "contentTypeLabel",
      title: "Content Type Label",
      type: "string",
      description: "Label before the genre pills (General, Whitepaper...).",
      initialValue: "Content type:",
    }),
    defineField({
      name: "emptyTextError",
      title: "Empty Input Error",
      type: "string",
      description:
        "Shown when someone hits Analyze with no text. Default: Please paste or type some text to analyze.",
    }),
    defineField({
      name: "tooShortError",
      title: "Too-Little-Text Error",
      type: "string",
      description:
        "Shown when input is below the min words threshold. Include the min word count (8) so users know the bar.",
    }),
    defineField({
      name: "linkError",
      title: "Link / URL Error",
      type: "string",
      description:
        "Shown when a URL, link or bare domain (aave.com) is pasted instead of text. Default: It looks like you pasted a link or URL...",
    }),
    defineField({
      name: "invalidContentError",
      title: "Invalid Content Error",
      type: "string",
      description:
        "Shown when the input has no letters (pure numbers/symbols/code). Default: That doesn't look like readable text...",
    }),
    defineField({
      name: "fetchError",
      title: "URL Fetch Error",
      type: "string",
      description:
        "Shown when a URL could not be fetched (blocked, 403, timeout). Default: Couldn't fetch that page...",
    }),
    defineField({
      name: "disclaimerText",
      title: "Interpretation Disclaimer",
      type: "string",
      description:
        "Small disclaimer under the scores. Default: Use the Citation Readiness score to spot what to look at - but use your judgment to decide what to change.",
    }),
    defineField({
      name: "truncationNote",
      title: "Fetch Truncation Note",
      type: "string",
      description:
        "Shown when a fetched page is larger than 50k characters and was truncated. Default: This page is large - analyzing the first 50,000 characters...",
    }),
    defineField({
      name: "methodologyTitle",
      title: "Methodology Section Title",
      type: "string",
      description:
        "Heading for the small methodology + contact section at the bottom of the page.",
      initialValue: "Methodology & how it works",
    }),
    defineField({
      name: "methodologyBody",
      title: "Methodology Body",
      type: "text",
      rows: 6,
      description:
        "How the tool works: client-side, formula origins, Web3-aware dictionary, Citation Readiness heuristics. Modeled on readabilitycheck.com/about.",
    }),
    defineField({
      name: "contactEmailLabel",
      title: "Contact Label",
      type: "string",
      description:
        "Small label before the contact email. Default: Questions or feedback?",
      initialValue: "Questions or feedback?",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      description: "mailto target shown in the methodology section.",
      initialValue: "readability@promptraise.com",
    }),
    defineField({
      name: "faqSectionTitle",
      title: "FAQ Section Title (H2)",
      type: "string",
      description: "Heading above the FAQ accordion.",
      initialValue: "Flesch & AI citation, explained",
    }),
    defineField({
      name: "genres",
      title: "Content Types (genre pills)",
      type: "array",
      description:
        "The selectable content-type pills. id must stay one of general/explainer/whitepaper/tutorial/social; edit label, target range and note freely. Targets are Flesch Reading Ease ranges.",
      of: [
        defineArrayMember({
          type: "object",
          name: "genre",
          title: "Content Type",
          fields: [
            defineField({
              name: "id",
              title: "ID (do not change)",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "targetMin",
              title: "Target Flesch Min",
              type: "number",
            }),
            defineField({
              name: "targetMax",
              title: "Target Flesch Max",
              type: "number",
            }),
            defineField({
              name: "note",
              title: "Note",
              type: "string",
              description: "Small line under the pills, e.g. Flesch 60-70.",
            }),
          ],
          preview: { select: { title: "label", subtitle: "note" } },
        }),
      ],
    }),
    defineField({
      name: "sampleText",
      title: "Try Web3 Example Text",
      type: "text",
      rows: 8,
      description:
        "The text loaded when someone clicks 'Try Web3 example'. Should name a brand, say what it does, and include a verifiable number - that is a good demonstration.",
      initialValue:
        "Promptraise helps Web3 projects get cited by AI. It is a visibility platform that measures how often ChatGPT, Perplexity and Claude mention your protocol. Protocol teams paste their docs or landing page and get a 0-100 AI Visibility score in seconds, plus a clear list of exactly what to fix. As of this quarter, Promptraise tracks how over 40 leading answer engines refer to projects across DeFi and Web3.",
    }),
    defineField({
      name: "introSectionTitle",
      title: "Intro Section Title (H2)",
      type: "string",
      initialValue: "Why readability and AI citation matter for Web3",
    }),
    defineField({
      name: "introBody1",
      title: "Intro Paragraph 1",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "introBody2",
      title: "Intro Paragraph 2",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "formulasTitle",
      title: "Formulas Section Title",
      type: "string",
      initialValue: "Readability formulas",
    }),
    defineField({
      name: "formulasSubtext",
      title: "Formulas Subtext",
      type: "string",
      description:
        "Small line under the formulas title explaining how to read the grid.",
    }),
    defineField({
      name: "glossaryLinkLabel",
      title: "Glossary Link (under formulas)",
      type: "string",
      description:
        "Text of the internal link from the formulas grid to the glossary. Default: New to these formulas? Every one is explained in the Web3 AI Visibility glossary.",
    }),
    defineField({
      name: "formulaDefinitions",
      title: "Formula Explainer",
      type: "array",
      description:
        "One short explainer per formula. The 'key' must stay as-is; only edit the description.",
      of: [
        defineArrayMember({
          type: "object",
          name: "formulaDefinition",
          title: "Formula Definition",
          fields: [
            defineField({
              name: "key",
              title: "Formula Key",
              type: "string",
              description:
                "readingEase | gradeLevel | gunningFog | smog | colemanLiau | ari (do not change)",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Display Name",
              type: "string",
              description:
                "Name shown on the formula card, e.g. Gunning Fog. Leave blank to use the default.",
            }),
            defineField({
              name: "description",
              title: "Short Explainer",
              type: "text",
              rows: 2,
              description:
                "One or two sentences: what it measures and how to read it.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "key", subtitle: "description" },
          },
        }),
      ],
    }),
    defineField({
      name: "engineVerdictTitle",
      title: "Answer Engine Verdict Title",
      type: "string",
      initialValue: "Answer engine verdict",
    }),
    defineField({
      name: "engineVerdictIntro",
      title: "Answer Engine Verdict Description",
      type: "text",
      rows: 3,
      description:
        "Short explainer under the 'Answer engine verdict' heading so visitors know what the per-engine scores mean.",
    }),
    defineField({
      name: "citationSectionTitle",
      title: "Citation Section Title",
      type: "string",
      initialValue: "How to make this more citable",
    }),
    defineField({
      name: "citationSectionIntro",
      title: "Citation Section Intro",
      type: "text",
      rows: 3,
      description:
        "Short intro above the actionable citation tips - frame them as concrete next actions.",
    }),
    defineField({
      name: "ui",
      title: "UI Labels & Strings",
      type: "object",
      description:
        "Every remaining button label, heading and hint on the calculator. Leave a field blank to keep the default.",
      fields: [
        uiString("analyzeLabel", "Analyze Button", "Default: Analyze text"),
        uiString("exampleLabel", "Example Button", "Default: Try Web3 example"),
        uiString("clearLabel", "Clear Button", "Default: Clear"),
        uiString(
          "textareaPlaceholder",
          "Textarea Placeholder",
          "Default: Paste your Web3 copy, whitepaper excerpt...",
        ),
        uiString(
          "pasteHint",
          "Empty-State Hint",
          "Shown before any analysis. Default: Paste text above and hit Analyze...",
        ),
        uiString("pasteModeLabel", "Paste Mode Toggle", "Default: Paste text"),
        uiString("urlModeLabel", "URL Mode Toggle", "Default: Fetch a URL"),
        uiString(
          "urlInputPlaceholder",
          "URL Input Placeholder",
          "Default: https://your.protocol.xyz",
        ),
        uiString("fetchButtonLabel", "Fetch Button", "Default: Fetch"),
        uiString("fetchingLabel", "Fetching State", "Default: Fetching..."),
        uiString(
          "fetchedWordsLabel",
          "Fetched-Words Note",
          "Template with {words} and {url} placeholders. Default: Fetched {words} words from {url}",
        ),
        uiString(
          "shareButtonLabel",
          "Share Button",
          "Default: Copy report link",
        ),
        uiString("copiedLabel", "Copied Feedback", "Default: Copied!"),
        uiString(
          "sharedStripLabel",
          "Shared-Report Strip",
          "Small note when the report was opened from a share link. Default: Report shared from promptraise.com",
        ),
        uiString(
          "citationScoreTitle",
          "Citation Score Card Title",
          "Default: Citation Readiness",
        ),
        uiString(
          "readingEaseTitle",
          "Reading Ease Card Title",
          "Default: Flesch Reading Ease",
        ),
        uiString("scoreSuffix", "Score Suffix", "Default: /100"),
        uiString(
          "citationScoreDesc",
          "Citation Score Description",
          "Small text under the citation score.",
        ),
        uiString("inTargetLabel", "In-Target Label", "Default: In target"),
        uiString("offTargetLabel", "Off-Target Label", "Default: Off target"),
        uiString("forGenreSuffix", "Genre Suffix", "Default:  for "),
        uiString(
          "gradeLevelPrefix",
          "Grade-Level Label",
          "Default: Grade level",
        ),
        uiString(
          "formulaTargetPrefix",
          "Formula Target Prefix",
          "Default: target",
        ),
        uiString("tipPrefix", "Verdict Tip Prefix", "Default: Tip:"),
        uiString(
          "verdictFootnote",
          "Verdict Footnote",
          "Small disclaimer under the per-engine verdicts.",
        ),
        uiString("metricWords", "Metric: Words"),
        uiString("metricSentences", "Metric: Sentences"),
        uiString("metricSyllables", "Metric: Syllables"),
        uiString("metricCharacters", "Metric: Characters"),
        uiString("metricComplexWords", "Metric: Complex words"),
        uiString("metricAvgSentence", "Metric: Avg sentence"),
        uiString("metricAvgSyllables", "Metric: Avg syllables/word"),
        uiString("metricReadingTime", "Metric: Reading time"),
        uiString("complexWordsTitle", "Complex Words Panel Title"),
        uiString("longestSentencesTitle", "Longest Sentences Panel Title"),
        uiString(
          "noComplexWords",
          "Empty Complex Words Text",
          "Default: No complex words. Nice.",
        ),
        uiString(
          "noSentences",
          "Empty Sentences Text",
          "Default: No sentences to review.",
        ),
        uiString(
          "web3TermsTitlePrefix",
          "Web3 Terms Title Prefix",
          "Rendered as: {prefix} (count)",
        ),
        uiString("web3TermsFootnote", "Web3 Terms Footnote"),
        uiString("legendComplexWord", "Highlight Legend: Complex Word"),
        uiString("legendLongSentence", "Highlight Legend: Long Sentence"),
        uiString("legendWeb3Term", "Highlight Legend: Web3 Term"),
        uiString(
          "autoDetectedLabel",
          "Auto-Detected Badge",
          "Small badge next to the content-type note when the genre was picked automatically. Default: auto-detected",
        ),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ (structured data)",
      type: "array",
      description:
        "Question/answer pairs rendered as FAQPage JSON-LD (rich-result and LLM-citation eligible).",
      of: [
        defineArrayMember({
          type: "object",
          name: "faqItem",
          title: "FAQ Item",
          fields: [
            defineField({
              name: "question",
              title: "Question",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Answer",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
    }),
    defineField({
      name: "ctaHeading",
      title: "Lead CTA Heading",
      type: "string",
      initialValue: "Want AI to actually cite your protocol?",
    }),
    defineField({
      name: "ctaBody",
      title: "Lead CTA Body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ctaLabel",
      title: "Lead CTA Button Label",
      type: "string",
      initialValue: "Get free audit",
    }),
    defineField({
      name: "ctaHref",
      title: "Lead CTA Button URL",
      type: "url",
      initialValue: "https://audit.promptraise.com",
    }),
  ],
  preview: {
    select: { title: "heroTitle" },
  },
});
