import { defineField, defineType } from "sanity";
import { seoSlugify, truncateSlug } from "../../lib/seo-slug";

/**
 * Author document - the canonical "who wrote this" entity.
 *
 * PURPOSE (E-E-A-T): a named, contactable author who owns a cluster of posts
 * signals Experience/Expertise/Authoritativeness/Trustworthiness far better
 * than an anonymous brand byline. Each author gets a canonical archive page
 * (/blog/authors/<slug>) and a Person JSON-LD block with sameAs links, so
 * Google can tie "Zain Khan the author" to the real person's LinkedIn/X.
 *
 * Posts reference this doc (post.author -> author) instead of duplicating
 * author details inline. Fill the editor fields here ONCE (bio, avatar,
 * socials) and every post by that author inherits them.
 *
 * The "Promptraise Research Team" author is the fallback for group/ops posts;
 * individual humans carry the stronger personal E-E-A-T signal.
 */
export const authorType = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Full published name, e.g. Zain Khan.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input: string) => truncateSlug(seoSlugify(input), 96),
      },
      description:
        "Canonical author page URL: /blog/authors/<slug>. The Generate button follows Google URL-structure + RFC 3986 (STD 66): lowercase, hyphens, no reserved chars. Keep stable once live.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string",
      description: "e.g. Co-founder, PromptRaise.",
    }),
    defineField({
      name: "avatar",
      title: "Avatar / Headshot",
      type: "image",
      options: { hotspot: true },
      description: "Shown on the author page and post byline.",
    }),
    defineField({
      name: "shortBio",
      title: "Short bio",
      type: "text",
      rows: 2,
      description: "One-liner shown on the post byline. Keep ~25-40 words.",
    }),
    defineField({
      name: "longBio",
      title: "Full bio",
      type: "array",
      of: [{ type: "block" }],
      description:
        "Full profile for the author page. Lead with Experience: what you've built, audited, or measured first-hand.",
    }),
    // ── sameAs social links ────────────────────────────────────────────
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
      description: "Full profile URL. Used in Person JSON-LD sameAs.",
    }),
    defineField({
      name: "twitter",
      title: "X / Twitter URL",
      type: "url",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "website",
      title: "Website / Other profile URL",
      type: "url",
      description:
        "Optional personal site or another authoritative profile (also included in sameAs).",
    }),
    // ── SEO ────────────────────────────────────────────────────────────
    defineField({
      name: "metaTitle",
      title: "SEO Meta Title",
      type: "string",
      description: "Defaults to the author name. Keep ~60 characters.",
      validation: (rule) => rule.max(70),
    }),
    defineField({
      name: "metaDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
      description: "Defaults to the short bio. Keep ~160 characters.",
      validation: (rule) => rule.max(180),
    }),
    defineField({
      name: "openGraphImage",
      title: "Social / Open Graph Image",
      type: "image",
      options: { hotspot: true },
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
      title: "Name, A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "avatar",
    },
  },
});
