import { defineField, defineType } from "sanity";

/**
 * Blog post document. Blog list/detail pages are built on top of this
 * schema (planned after the production cutover). Includes SEO + publish
 * state fields so a post can be drafted internally and published in one step.
 */
export const postType = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description:
        "Short summary used in the blog list, meta description and LLM/AI digestibility.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description: "Example: AI Visibility, Web3 Marketing, SEO",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        {
          type: "code",
          options: {
            language: "shell",
            languageAlternatives: [
              { title: "Shell", value: "shell" },
              { title: "JavaScript", value: "javascript" },
              { title: "JSON", value: "json" },
            ],
            withFilename: true,
          },
        },
      ],
      description: "Rich text content. Code blocks supported for guides.",
    }),
    defineField({
      name: "authorName",
      title: "Author Name",
      type: "string",
      initialValue: "PromptRaise",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      description:
        "Post appears on the site from this timestamp. Leave empty until ready.",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Review", value: "review" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    // ── SEO ─────────────────────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      description: "Defaults to the post title. Keep under ~60 characters.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
      description: "Defaults to the excerpt. Keep under ~160 characters.",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "openGraphImage",
      title: "Social / Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "Overrides the default site OG image when shared.",
    }),
    defineField({
      name: "noindex",
      title: "Hide from search engines (noindex)",
      type: "boolean",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "coverImage",
    },
  },
});
