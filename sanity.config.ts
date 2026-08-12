import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

import { sanityEnv } from "./sanity/lib/env";
import { previewAction } from "./sanity/plugins/preview-action";
import { syncToProductionAction } from "./sanity/plugins/sync-to-production-action";
import { schemaTypes } from "./sanity/schemaTypes";

export default defineConfig({
  name: "default",
  title: "PromptRaise CMS",
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  plugins: [
    deskTool({
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
              .child(S.documentTypeList("post").title("Blog Posts")),
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
    actions: (prev) => [previewAction, syncToProductionAction, ...prev],
  },
});
