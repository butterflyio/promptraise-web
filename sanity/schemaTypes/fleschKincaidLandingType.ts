import { defineArrayMember, defineField, defineType } from "sanity";

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
                "readingEase | gradeLevel | gunningFog | smog | colemanLiau | ari",
              validation: (rule) => rule.required(),
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
