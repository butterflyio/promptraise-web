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
      description: "Used for Open Graph and Organization schema.",
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
  ],
  preview: {
    select: {
      title: "siteName",
    },
  },
});
