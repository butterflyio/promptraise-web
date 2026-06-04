const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "your-project-id";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.SANITY_API_VERSION ?? "2025-01-01";

export const sanityEnv = {
  projectId,
  dataset,
  apiVersion,
};
