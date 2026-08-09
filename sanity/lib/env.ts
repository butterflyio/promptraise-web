const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2025-01-01";

// Read token is required for draft preview mode (it resolves drafts.* docs).
// Optional for normal static rendering.
const readToken = process.env.SANITY_API_READ_TOKEN ?? "";
const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? "";
const previewSecret = process.env.SANITY_PREVIEW_SECRET ?? "";
const studioSyncSecret = process.env.SANITY_STUDIO_SYNC_SECRET ?? "";

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion,
  readToken,
  writeToken,
  previewSecret,
  studioSyncSecret,
};
