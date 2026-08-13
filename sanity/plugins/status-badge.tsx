"use client";

import type { DocumentBadgeComponent } from "sanity";

/**
 * Draft vs Live status badge shown in the Studio document header.
 *
 * A read-only "LIVE" / "DRAFT" chip so, at a glance, you and Hermes can tell
 * whether the currently-open document is what's actually served on the site
 * (published) or has unpublished changes (draft). Purely informational - it
 * never mutates anything.
 */
export const statusBadge: DocumentBadgeComponent = (props) => {
  const hasDraft = Boolean(props.draft);

  return {
    label: hasDraft ? "DRAFT" : "LIVE",
    title: hasDraft
      ? "This document has unpublished changes. Hit Publish to make it live."
      : "This document is published and live on the site.",
    tone: hasDraft ? "caution" : "positive",
  };
};
