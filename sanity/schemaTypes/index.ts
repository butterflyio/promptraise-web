import { type SchemaTypeDefinition } from "sanity";

import { auditLandingType } from "./auditLandingType";
import { glossaryType } from "./glossaryType";
import { pageType } from "./pageType";
import { postType } from "./postType";
import { sectionBlockTypes } from "./sectionBlocks";
import { siteSettingsType } from "./siteSettingsType";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  auditLandingType,
  glossaryType,
  pageType,
  postType,
  ...sectionBlockTypes,
];
