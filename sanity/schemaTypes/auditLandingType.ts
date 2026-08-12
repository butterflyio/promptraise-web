import { defineField, defineType } from "sanity";

/**
 * Audit landing copy — editable marketing content for audit.promptraise.com.
 * This is a single document ("auditLanding") whose fields map 1:1 onto the
 * landing page of the audit web app. Editable in the shared Studio (project
 * 4pws3pyj), fetched at render time by the audit app, with the app falling
 * back to hardcoded defaults when the CMS is unreachable.
 */
export const auditLandingType = defineType({
  name: "auditLanding",
  title: "Audit Landing",
  type: "document",
  fields: [
    defineField({
      name: "eyebrowBadge",
      title: "Hero Badge",
      type: "string",
      description:
        "Small pill above the headline, e.g. AI Visibility Audit · Free",
      initialValue: "AI Visibility Audit · Free",
    }),
    defineField({
      name: "heroHeadlinePrefix",
      title: "Hero Headline (before highlight)",
      type: "string",
      description: "First line of the hero headline, e.g. Is Your Web3 Project",
    }),
    defineField({
      name: "heroHeadlineHighlight",
      title: "Hero Headline (highlight)",
      type: "string",
      description:
        "Highlighted line in the gradient green, e.g. Invisible to AI?",
    }),
    defineField({
      name: "heroBody",
      title: "Hero Subheading",
      type: "text",
      description: "Paragraph below the headline.",
    }),
    defineField({
      name: "inputPlaceholder",
      title: "URL Input Placeholder",
      type: "string",
      description: "e.g. yourprotocol.xyz",
    }),
    defineField({
      name: "submitLabel",
      title: "Submit Button Label",
      type: "string",
      description: "e.g. Check my site",
    }),
    defineField({
      name: "methodologyNote",
      title: "Methodology Note",
      type: "string",
      description:
        "Small line under the form, e.g. Raw HTML analysis · No JS rendering",
    }),
    defineField({
      name: "aILogos",
      title: "AI Logos Strip",
      type: "array",
      of: [
        {
          type: "object",
          name: "aiLogo",
          fields: [
            defineField({
              name: "name",
              title: "Name",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "color",
              title: "Dot Color (hex)",
              type: "string",
            }),
          ],
          preview: { select: { title: "name" } },
        },
      ],
      initialValue: [
        { name: "ChatGPT", color: "#3ACF89" },
        { name: "Perplexity", color: "#20B8F5" },
        { name: "Claude", color: "#D97757" },
        { name: "Gemini", color: "#4285F4" },
      ],
    }),
    defineField({
      name: "featuresSectionLabel",
      title: "Features Section Label",
      type: "string",
      description: "e.g. What we check",
    }),
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      of: [
        {
          type: "object",
          name: "feature",
          title: "Feature",
          fields: [
            defineField({
              name: "icon",
              title: "Icon (bot|code|token|shield)",
              type: "string",
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({ name: "desc", title: "Description", type: "text" }),
          ],
          preview: { select: { title: "title" } },
        },
      ],
    }),
    defineField({
      name: "valueCallout",
      title: "Value Callout",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Text", type: "text" }),
        defineField({
          name: "highlight",
          title: "Highlighted segment",
          type: "string",
        }),
        defineField({ name: "bold", title: "Bold segment", type: "string" }),
      ],
    }),
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      description: "e.g. AI visibility for Web3 · GEO · LLM Visibility",
    }),
  ],
  preview: {
    select: { title: "heroHeadlinePrefix", subtitle: "heroHeadlineHighlight" },
  },
});
