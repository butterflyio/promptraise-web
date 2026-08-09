import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";

import { sanityEnv } from "./sanity/lib/env";
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
              .title("Site Settings")
              .schemaType("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("site-settings"),
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
