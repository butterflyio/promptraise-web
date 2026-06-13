import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "PromptRaise",
    }),
    defineField({
      name: "organizationLegalName",
      title: "Organization Legal Name",
      type: "string",
      description: "Used in Organization structured data.",
      initialValue: "PromptRaise",
    }),
    defineField({
      name: "logo",
      title: "Organization Logo",
      type: "image",
      options: { hotspot: true },
      description: "Used for branding and metadata.",
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      options: { hotspot: true },
      description: "Used for the browser tab icon and favicon variants.",
    }),
    defineField({
      name: "openGraphImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "Used when the site is shared on social platforms.",
    }),
    defineField({
      name: "primaryTelegramCtaUrl",
      title: "Primary Telegram CTA URL",
      type: "url",
      description: "Example: https://t.me/promptraise",
      validation: (rule) =>
        rule.uri({ scheme: ["https"] }).custom((value) => {
          if (!value) return true;
          return value.includes("t.me/")
            ? true
            : "Use a valid Telegram URL (https://t.me/...)";
        }),
    }),
    defineField({
      name: "freeAuditCtaUrl",
      title: "Free Audit CTA URL",
      type: "url",
      description: "Current target is the audit web app.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
      initialValue: "https://audit.promptraise.com",
    }),
    defineField({
      name: "headerCtaLabel",
      title: "Header CTA Label",
      type: "string",
      description: "Top-right button label in the header.",
      initialValue: "Get Audit",
    }),
    defineField({
      name: "headerCtaUrl",
      title: "Header CTA URL",
      type: "url",
      description: "Top-right button destination in the header.",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
      initialValue: "https://audit.promptraise.com",
    }),
    defineField({
      name: "headerNavItems",
      title: "Header Navigation",
      type: "array",
      description: "Top navigation labels and anchors from the Figma header.",
      of: [
        {
          type: "object",
          name: "headerNavItem",
          title: "Navigation Item",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL or Anchor",
              type: "string",
              description: "Example: #solutions, /privacy, https://...",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
      initialValue: [
        { label: "Solutions", href: "#solutions" },
        { label: "Pricing", href: "#pricing" },
        { label: "Company", href: "#company" },
        { label: "Resources", href: "#resources" },
      ],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "x", type: "url", title: "X" }),
        defineField({ name: "telegram", type: "url", title: "Telegram" }),
        defineField({ name: "discord", type: "url", title: "Discord" }),
        defineField({ name: "reddit", type: "url", title: "Reddit" }),
        defineField({ name: "youtube", type: "url", title: "YouTube" }),
      ],
    }),
    defineField({
      name: "footerPoweredByText",
      title: "Footer Powered By Text",
      type: "string",
      description: "Appears after the dot in “PromptRaise · ...”.",
      initialValue: "powered by Cicada",
    }),
    defineField({
      name: "footerCopyrightText",
      title: "Footer Copyright Text",
      type: "string",
      initialValue: "© 2026 · cicada-mm.com · Dubai, UAE",
    }),
    defineField({
      name: "footerLegalLinks",
      title: "Footer Legal Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "footerLegalLink",
          title: "Footer Link",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL or Path",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        },
      ],
      initialValue: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Usage", href: "/cookies" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
