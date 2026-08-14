import { defineArrayMember, defineField, defineType } from "sanity";

import { sectionBlockNames } from "./sectionBlocks";
import { seoSlugify, truncateSlug } from "../../lib/seo-slug";

/**
 * `page` document type - the composition layer's core.
 *
 * A page is: slug + metadata + a sections[] array. The home page is an
 * ordinary page doc with slug "/". New pages are created in the Studio
 * (or via the Sanity API by an agent) without any code change.
 */
export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "Internal name shown in the CMS (e.g. 'Campaign X - Landing').",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description:
        "URL path. Use '/' (single slash) for the home page. Generate follows Google URL-structure + RFC 3986 (STD 66).",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input: string) => truncateSlug(seoSlugify(input), 96),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description:
        "Overrides the browser/tab title. Falls back to the page title.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Used as the og:image for this page when shared.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noindex",
      title: "Block search indexing",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, this page is kept out of search engines (robots noindex).",
    }),
    defineField({
      name: "faq",
      title: "FAQ (structured data)",
      type: "array",
      description:
        "Question/answer pairs rendered as FAQPage JSON-LD - eligible for rich results and LLM citations.",
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
          preview: {
            select: {
              title: "question",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      description:
        "Ordered list of page sections. Drag to reorder, add, or remove.",
      of: sectionBlockNames.map((blockName) =>
        defineArrayMember({
          type: blockName,
          name: blockName,
        }),
      ),
      initialValue: sectionBlockNames.map((blockName) => ({
        _type: blockName,
      })),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
    prepare({ title, subtitle }) {
      return {
        title: title ?? "Untitled page",
        subtitle: subtitle ? `/${subtitle}` : "No slug",
      };
    },
  },
});
