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
    { name: "problem", title: "Problem Section" },
    { name: "aiTraining", title: "AI Training Section" },
    { name: "process", title: "Process Section" },
    { name: "comparison", title: "Comparison Section" },
    { name: "whyChoose", title: "Why Choose Section" },
    { name: "plans", title: "Plans / Lead Form" },
    { name: "auditCta", title: "CTA Banner" },
    { name: "team", title: "Team Section" },
    { name: "askAi", title: "Ask AI Section" },
  ],
  fields: [
    defineField({
      name: "aiTraining",
      title: "AI Training Section",
      type: "object",
      group: "aiTraining",
      description: "Editable copy for the 'We create content that trains AI' section.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string", initialValue: "How we solve it" }),
        defineField({ name: "heading", title: "Heading", type: "string", initialValue: "We create content that trains AI" }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue:
            "Each asset is built to answer the questions AI models are already being asked - so you get cited, not skipped.",
        }),
        defineField({
          name: "layers",
          title: "Content Layers",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "contentLayer",
              title: "Content Layer",
              fields: [
                defineField({ name: "number", title: "Number", type: "string" }),
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "description", title: "Description", type: "text" }),
                defineField({
                  name: "benefits",
                  title: "Benefits",
                  type: "array",
                  of: [defineArrayMember({ type: "string" })],
                }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "problem",
      title: "Problem Section",
      type: "object",
      group: "problem",
      description: "Editable copy for the 'theProblem.exe' animated section.",
      fields: [
        defineField({
          name: "windowTitle",
          title: "Window Title",
          type: "string",
          initialValue: "> theProblem.exe",
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "You're invisible where decisions are made",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "Founders, investors, and users discover you through AI. Or they don't.",
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
          initialValue: "Go to Solution",
        }),
        defineField({
          name: "problems",
          title: "Floating Problem Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "problemCard",
              title: "Problem Card",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "desc", title: "Description", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "process",
      title: "Process Section",
      type: "object",
      group: "process",
      description: "Editable copy for the 'From analysis to ChatGPT answer' process section.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string", initialValue: "How it works" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "From analysis to ChatGPT answer",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "A structured process that ends with you in the answer.",
        }),
        defineField({
          name: "steps",
          title: "Process Steps",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "processStep",
              title: "Process Step",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "desc", title: "Description", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "comparison",
      title: "Comparison Section",
      type: "object",
      group: "comparison",
      description: "Editable copy for the 'PromptRaise vs Competitors' table.",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "PromptRaise vs competitors",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "Most agencies stop at content. We close the loop.",
        }),
        defineField({
          name: "features",
          title: "Comparison Features",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "whyChoose",
      title: "Why Choose Section",
      type: "object",
      group: "whyChoose",
      description: "Editable copy for the 'Why Choose PromptRaise' section.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string", initialValue: "Why PromptRaise" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Why choose PromptRaise",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "Built for teams that need results, not reports.",
        }),
        defineField({
          name: "cards",
          title: "Feature Cards",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "whyCard",
              title: "Card",
              fields: [
                defineField({ name: "title", title: "Title", type: "string" }),
                defineField({ name: "desc", title: "Description", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "plans",
      title: "Plans / Lead Form Section",
      type: "object",
      group: "plans",
      description: "Editable copy for the 'Plans That Scale With You' lead form section.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string", initialValue: "Pricing" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Plans That Scale With You",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "Start with a free audit and scale as you grow.",
        }),
        defineField({
          name: "ctaLabel",
          title: "Submit Button Label",
          type: "string",
          initialValue: "Get Pricing",
        }),
      ],
    }),
    defineField({
      name: "auditCta",
      title: "CTA Banner Section",
      type: "object",
      group: "auditCta",
      description: "Editable copy for the final CTA banner.",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Ready to be the answer, not the search result?",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "Start with a free audit and see how AI talks about your project today.",
        }),
        defineField({
          name: "ctaLabel",
          title: "CTA Label",
          type: "string",
          initialValue: "Get Free Audit",
        }),
        defineField({
          name: "checklistHeading",
          title: "Checklist Heading",
          type: "string",
          initialValue: "PromptRaise - full-cycle AI visibility agency for Web3.",
        }),
        defineField({
          name: "checklist",
          title: "Checklist Items",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "team",
      title: "Team Section",
      type: "object",
      group: "team",
      description: "Editable copy for the 'Built by Web3 Veterans' section.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string", initialValue: "Team" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Built by web3 veterans",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "A team that has shipped through multiple market cycles.",
        }),
        defineField({
          name: "members",
          title: "Team Members",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "teamMember",
              title: "Team Member",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "role", title: "Role", type: "string" }),
                defineField({ name: "bio", title: "Bio", type: "text" }),
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "askAi",
      title: "Ask AI Section",
      type: "object",
      group: "askAi",
      description: "Editable copy for the Ask AI deep-link section.",
      fields: [
        defineField({ name: "badge", title: "Badge", type: "string", initialValue: "Ask AI" }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Still deciding? Let the AI decide for you.",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue: "Ask a model directly about PromptRaise and how it can help.",
        }),
        defineField({
          name: "prompt",
          title: "AI Prompt",
          type: "text",
          description:
            "Sent to ChatGPT, Claude and Perplexity when someone clicks the deep links.",
        }),
      ],
    }),
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
                                    "Legacy text symbol. Ignored when a logo URL is set.",
                                }),
                                defineField({
                                  name: "logo",
                                  title: "Logo URL",
                                  type: "string",
                                  description:
                                    "Path to a local logo, e.g. /logos/llm-chatgpt.svg or an https URL.",
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
                                  subtitle: "logo",
                                },
                              },
                            }),
                          ],
                          initialValue: [
                            { name: "ChatGPT", logo: "/logos/llm-chatgpt.svg" },
                            { name: "Claude", logo: "/logos/llm-claude.svg" },
                            { name: "Gemini", logo: "/logos/llm-gemini.svg" },
                            { name: "Perplexity", logo: "/logos/llm-perplexity.svg" },
                            { name: "DeepSeek", logo: "/logos/llm-deepseek.svg" },
                            { name: "Grok", logo: "/logos/llm-grok.svg" },
                            { name: "Llama", logo: "/logos/llm-llama.svg" },
                            { name: "Mistral", logo: "/logos/llm-mistral.svg" },
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
