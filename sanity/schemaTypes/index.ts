import { type SchemaTypeDefinition } from "sanity";

import { homePageType } from "./homePageType";
import { pageType } from "./pageType";
import { sectionBlockTypes } from "./sectionBlocks";
import { siteSettingsType } from "./siteSettingsType";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  homePageType,
  pageType,
  ...sectionBlockTypes,
];