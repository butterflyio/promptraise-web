import { type SchemaTypeDefinition } from "sanity";

import { homePageType } from "./homePageType";
import { siteSettingsType } from "./siteSettingsType";

export const schemaTypes: SchemaTypeDefinition[] = [
  siteSettingsType,
  homePageType,
];
