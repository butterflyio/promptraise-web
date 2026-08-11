import { createClient } from "next-sanity";

import { sanityEnv } from "./env";

/**
 * Published CDN client used for static/ISR rendering. Fast, cached,
 * never sees drafts.
 */
export const sanityClient = createClient({
  projectId: sanityEnv.projectId,
  dataset: sanityEnv.dataset,
  apiVersion: sanityEnv.apiVersion,
  useCdn: true,
  perspective: "published",
});

/**
 * Preview client - uncached, uses the read token so it can resolve
 * `drafts.*` documents. Only created when Next draft mode is enabled.
 */
let previewClient: ReturnType<typeof createClient> | null = null;

export function getPreviewClient() {
  if (!previewClient) {
    previewClient = createClient({
      projectId: sanityEnv.projectId,
      dataset: sanityEnv.dataset,
      apiVersion: sanityEnv.apiVersion,
      useCdn: false,
      perspective: "previewDrafts",
      token: sanityEnv.readToken,
    });
  }
  return previewClient;
}
