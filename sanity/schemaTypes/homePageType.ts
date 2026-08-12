import { defineField, defineType } from "sanity";

/**
 * Legacy home page document type.
 *
 * Kept for the transition period: the renderer prefers the `page` doc with
 * slug "/", and falls back to this doc while the `/` page doc is being
 * created. Each field references the shared section block types from
 * sectionBlocks.ts, so the copy structure is identical and no data
 * migration is required. Remove this type once the `/` page doc is live.
 */
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
      name: "hero",
      title: "Hero",
      type: "hero",
      group: "hero",
      description:
        "Editable content for the Figma landing hero. Visual layout stays controlled by the design system.",
    }),
    defineField({
      name: "visibilitySection",
      title: "Visibility Section",
      type: "visibility",
      group: "visibility",
      description:
        "Editable copy and stat cards for the second Figma section. The orbit/brand mark remains token-driven.",
    }),
    defineField({
      name: "problem",
      title: "Problem Section",
      type: "problem",
      group: "problem",
      description: "Editable copy for the 'theProblem.exe' animated section.",
    }),
    defineField({
      name: "aiTraining",
      title: "AI Training Section",
      type: "aiTraining",
      group: "aiTraining",
      description:
        "Editable copy for the 'We create content that trains AI' section.",
    }),
    defineField({
      name: "process",
      title: "Process Section",
      type: "process",
      group: "process",
      description:
        "Editable copy for the 'From analysis to ChatGPT answer' process section.",
    }),
    defineField({
      name: "comparison",
      title: "Comparison Section",
      type: "comparison",
      group: "comparison",
      description: "Editable copy for the 'PromptRaise vs Competitors' table.",
    }),
    defineField({
      name: "whyChoose",
      title: "Why Choose Section",
      type: "whyChoose",
      group: "whyChoose",
      description: "Editable copy for the 'Why Choose PromptRaise' section.",
    }),
    defineField({
      name: "plans",
      title: "Plans / Lead Form Section",
      type: "plans",
      group: "plans",
      description:
        "Editable copy for the 'Plans That Scale With You' lead form section.",
    }),
    defineField({
      name: "auditCta",
      title: "CTA Banner Section",
      type: "auditCta",
      group: "auditCta",
      description: "Editable copy for the final CTA banner.",
    }),
    defineField({
      name: "team",
      title: "Team Section",
      type: "team",
      group: "team",
      description: "Editable copy for the 'Built by Web3 Veterans' section.",
    }),
    defineField({
      name: "askAi",
      title: "Ask AI Section",
      type: "askAi",
      group: "askAi",
      description: "Editable copy for the Ask AI deep-link section.",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Home Page",
      subtitle: "Landing page hero and visibility sections",
    }),
  },
});
