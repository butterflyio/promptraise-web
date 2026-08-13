import { defineField, defineType } from "sanity";

/**
 * Blog post document - fully CMS-editable (promptraise.com/blog).
 *
 * Every field an editor needs is here: title, slug, excerpt, cover image,
 * author details (name/role/avatar/bio/socials), categories, a rich portable
 * text body (headings, paragraphs, links, images, video embeds, code, block
 * quotes), plus SEO + publish-state fields (draft -> review -> published).
 *
 * Publishing a post is a pure CMS action: draft in the Studio, Preview via
 * Draft Mode, fl>ip status to Published with publishedAt, and ISR makes it
 * live (~30s) with no code deploy.
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
      description: "Hero image shown on the blog card and post header.",
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      description:
        "Example: AI Strategy, Research, Protocol Insights, Case Study, Product",
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        { type: "image" },
        {
          type: "object",
          name: "video",
          title: "Video embed",
          fields: [
            defineField({
              name: "url",
              title: "Video URL",
              type: "url",
              description:
                "YouTube / Vimeo / mp4 URL to embed in the post body.",
            }),
            defineField({
              name: "caption",
              title: "Caption",
              type: "string",
              description: "Optional caption below the video.",
            }),
          ],
        },
        {
          type: "code",
          options: {
            language: "shell",
            languageAlternatives: [
              { title: "Shell", value: "shell" },
              { title: "JavaScript", value: "javascript" },
              { title: "TypeScript", value: "typescript" },
              { title: "JSON", value: "json" },
            ],
            withFilename: true,
          },
        },
      ],
      description:
        "Rich text content. Headings, paragraphs, links, images, video embeds and code blocks supported.",
    }),
    // ── Author details ───────────────────────────────────────────────────
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      description: "Author shown on the post byline and cards.",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          initialValue: "PromptRaise",
        }),
        defineField({
          name: "role",
          title: "Role / Title",
          type: "string",
          description: "e.g. PromptRaise Research, Co-founder, Analyst.",
        }),
        defineField({
          name: "avatar",
          title: "Avatar",
          type: "image",
          options: { hotspot: true },
        }),
        defineField({
          name: "bio",
          title: "Short bio",
          type: "text",
          rows: 2,
        }),
        defineField({
          name: "twitter",
          title: "X / Twitter URL",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn URL",
          type: "url",
        }),
      ],
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
    defineField({
      name: "featured",
      title: "Featured post",
      type: "boolean",
      initialValue: false,
      description:
        "When enabled, this post is highlighted at the top of the blog list (first featured wins).",
    }),
  ],
  orderings: [
    {
      title: "Published date, newest first",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Created date, newest first",
      name: "createdAtDesc",
      by: [{ field: "_createdAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "status",
      media: "coverImage",
      author: "author.name",
    },
    prepare({ title, subtitle, media, author }) {
      return {
        title: title ?? "Untitled post",
        subtitle: subtitle
          ? `${subtitle}${author ? ` - ${author}` : ""}`
          : (author ?? ""),
        media,
      };
    },
  },
});
