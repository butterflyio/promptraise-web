import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * `glossary` document - single source of truth for the Web3 AI Visibility
 * glossary page (promptraise.com/academy/glossary and /glossary).
 *
 * A single document (id "glossary") holds every category and term so the
 * existing one-doc flows work unchanged: Draft Mode preview renders the whole
 * page, and the sync-to-production action copies ALL glossary content at once
 * (no cross-document references to break).
 *
 * `categories[]` is the ordered list that drives the pill nav and section
 * grouping. Each term carries a `category` string that should match one of
 * these names; the page falls back to grouping by term.category in insertion
 * order when a term's category isn't listed.
 */
export const glossaryType = defineType({
  name: "glossary",
  title: "Glossary",
  type: "document",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title (SEO)",
      type: "string",
      description: "Browser/tab title. Defaults to the glossary page title.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description (SEO)",
      type: "text",
      rows: 2,
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "intro",
      title: "Intro paragraph",
      type: "text",
      rows: 3,
      description:
        "Shown under the main heading. Explain what the glossary covers.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      description:
        "Ordered list of glossary categories. Order here = pill nav + section order on the page.",
    }),
    defineField({
      name: "terms",
      title: "Glossary Terms",
      type: "array",
      description:
        "Every glossary entry. Drag to reorder, add, or remove. Each term's 'See also' links come from its related[] field.",
      of: [
        defineArrayMember({
          type: "object",
          name: "glossaryTerm",
          title: "Glossary Term",
          fields: [
            defineField({
              name: "term",
              title: "Term",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "aliases",
              title: "Aliases / also known as",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
              description:
                "Synonyms used in search-as-you-type and as JSON-LD alternateName signals.",
            }),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              description:
                "Must match one of the category names listed in the Categories field above.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "definition",
              title: "Definition",
              type: "text",
              rows: 4,
              description:
                "One or two crisp, quotable sentences. This is emitted as the DefinedTerm description.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "example",
              title: "Example",
              type: "text",
              rows: 3,
              description:
                "Optional one-line example. Rendered as the 'Example:' block.",
            }),
            defineField({
              name: "related",
              title: "See also (related terms)",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
              options: { layout: "tags" },
              description:
                "Names of other terms to cross-link as 'See also' chips and JSON-LD mentions.",
            }),
          ],
          preview: {
            select: { title: "term", subtitle: "category" },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return { title: "Glossary" };
    },
  },
});
