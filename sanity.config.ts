import { defineConfig } from "sanity";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { structureTool } from "sanity/structure";

import { sanityEnv } from "./sanity/lib/env";
import { autoPublishAction } from "./sanity/plugins/auto-publish-action";
import { previewAction } from "./sanity/plugins/preview-action";
import { filterSingletonActions } from "./sanity/plugins/singleton-guard";
import { statusBadge } from "./sanity/plugins/status-badge";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "PromptRaise CMS",
  // Must match the route the Studio is served at (app/studio/[[...tool]]).
  // Without this, the Studio resolves tool names from the root URL - so
  // /studio shows "Tool not found: studio" while /structure works directly.
  basePath: "/studio",
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page")
              .schemaType("page")
              .child(
                S.editor()
                  .schemaType("page")
                  .documentId("page-home")
                  .title("Home Page"),
              ),
            S.listItem()
              .title("Pages")
              .schemaType("page")
              .child(S.documentTypeList("page").title("Pages")),
            S.listItem()
              .title("Blog")
              .schemaType("post")
              .child(
                S.documentTypeList("post")
                  .title("Blog Posts")
                  .defaultOrdering([
                    { field: "publishedAt", direction: "desc" },
                  ]),
              ),
            S.listItem()
              .title("Authors")
              .schemaType("author")
              .child(
                S.documentTypeList("author")
                  .title("Authors")
                  .defaultOrdering([{ field: "name", direction: "asc" }]),
              ),
            S.listItem()
              .title("Glossary")
              .schemaType("glossary")
              .child(
                S.editor()
                  .schemaType("glossary")
                  .documentId("glossary")
                  .title("Glossary"),
              ),
            S.listItem()
              .title("Site Settings")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("site-settings"),
              ),
            S.listItem()
              .title("Audit Landing")
              .schemaType("auditLanding")
              .child(
                S.editor()
                  .schemaType("auditLanding")
                  .documentId("auditLanding")
                  .title("Audit Landing"),
              ),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    badges: (prev) => [...prev, statusBadge],
    actions: (prev, context) => [
      autoPublishAction,
      previewAction,
      ...filterSingletonActions(prev, context.schemaType),
    ],
  },
});
