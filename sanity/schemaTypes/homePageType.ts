import { defineArrayMember, defineField, defineType } from "sanity";

const ctaFields = [
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
    description: "Example: https://audit.promptraise.com or #how-it-works",
    validation: (rule) => rule.required(),
  }),
];

export const homePageType = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "visibility", title: "Visibility Section" },
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      description:
        "Editable content for the Figma landing hero. Visual layout stays controlled by the design system.",
      fields: [
        defineField({
          name: "eyebrow",
          title: "Eyebrow",
          type: "string",
          initialValue: "GEO · LLM Visibility · Web3",
        }),
        defineField({
          name: "headlinePrefix",
          title: "Headline Prefix",
          type: "string",
          initialValue: "Be the",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "headlineHighlight",
          title: "Headline Highlight",
          type: "string",
          initialValue: "answer",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "headlineSuffix",
          title: "Headline Suffix",
          type: "string",
          initialValue: "not the search result.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
          initialValue: [
            "When an investor asks ChatGPT about your niche — they get 2–7 names.",
            "PromptRaise makes sure one of them is yours.",
          ],
          validation: (rule) => rule.max(3),
        }),
        defineField({
          name: "primaryCta",
          title: "Primary CTA",
          type: "object",
          fields: ctaFields,
          initialValue: {
            label: "Get Free Audit",
            href: "https://audit.promptraise.com",
          },
        }),
        defineField({
          name: "secondaryCta",
          title: "Secondary CTA",
          type: "object",
          fields: ctaFields,
          initialValue: {
            label: "How it works",
            href: "#how-it-works",
          },
        }),
        defineField({
          name: "trustBar",
          title: "Trust Bar",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              initialValue: "Tracking visibility in",
            }),
            defineField({
              name: "badge",
              title: "Badge",
              type: "string",
              initialValue: "48 LLMs",
            }),
            defineField({
              name: "logos",
              title: "Logo Row",
              type: "array",
              of: [
                defineArrayMember({
                  type: "object",
                  name: "trustLogo",
                  title: "Trust Logo",
                  fields: [
                    defineField({
                      name: "name",
                      title: "Name",
                      type: "string",
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: "symbol",
                      title: "Symbol",
                      type: "string",
                      description:
                        "Temporary text symbol until final vector logos are supplied.",
                    }),
                    defineField({
                      name: "dimmed",
                      title: "Dimmed at edge",
                      type: "boolean",
                      initialValue: false,
                    }),
                  ],
                  preview: {
                    select: {
                      title: "name",
                      subtitle: "symbol",
                    },
                  },
                }),
              ],
              initialValue: [
                { name: "Octals", symbol: "◌", dimmed: true },
                { name: "45 Degrees°", symbol: "↗" },
                { name: "Acme Corp", symbol: "✦" },
                { name: "AlphaWave", symbol: "⬢" },
                { name: "Alt+Shift", symbol: "◍" },
                { name: "Capsule", symbol: "●" },
                { name: "Basis", symbol: "✶", dimmed: true },
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "visibilitySection",
      title: "Visibility Section",
      type: "object",
      group: "visibility",
      description:
        "Editable copy and stat cards for the second Figma section. The orbit/brand mark remains token-driven.",
      fields: [
        defineField({
          name: "headline",
          title: "Headline",
          type: "object",
          fields: [
            defineField({
              name: "lineOne",
              title: "Line One",
              type: "string",
              initialValue:
                "If you are not in the AI responses — you do not exist,",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "lineTwo",
              title: "Line Two",
              type: "string",
              initialValue: "and PromptRaise fixes that.",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
        defineField({
          name: "statCards",
          title: "Stat Cards",
          type: "array",
          validation: (rule) => rule.min(4).max(4),
          of: [
            defineArrayMember({
              type: "object",
              name: "visibilityStatCard",
              title: "Visibility Stat Card",
              fields: [
                defineField({
                  name: "value",
                  title: "Value",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (rule) => rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "value",
                  subtitle: "label",
                },
              },
            }),
          ],
          initialValue: [
            { value: "58%", label: "of searches today go through AI" },
            { value: "3–5x growth", label: "growth in 90 days" },
            { value: "2–7 projects", label: "per answer" },
            { value: "+40%", label: "inbound growth" },
          ],
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Home Page",
      subtitle: "Landing page hero and visibility sections",
    }),
  },
});
