"use client";

import { useEffect, useRef } from "react";
import type { DocumentActionComponent } from "sanity";

/**
 * Auto-Publish on Save.
 *
 * Replaces the manual "Publish" / "Approve & Sync to Production" step for
 * CMS-editable docs. Whenever the draft changes in Studio (i.e. you hit
 * Save), it POSTs to /api/studio/publish which copies the draft to the
 * published document in the same dataset and revalidates the live site - so
 * edits made in the CMS are reflected on the main site automatically.
 *
 * Debounced to fire once per save (not per keystroke). The write token and
 * revalidation secret stay server-side.
 */
const AUTOPUBLISH_TYPES = ["siteSettings", "page", "post", "homePage"];

export const autoPublishAction: DocumentActionComponent = (props) => {
  const lastFiredRev = useRef<string | null>(null);

  useEffect(() => {
    if (!AUTOPUBLISH_TYPES.includes(props.type)) return;
    const draft = props.draft;
    if (!draft?._id) return;

    const rev = draft._rev ?? "";
    if (!rev || lastFiredRev.current === rev) return;
    lastFiredRev.current = rev;

    const syncSecret = process.env.NEXT_PUBLIC_SANITY_STUDIO_SYNC_SECRET ?? "";

    const timer = setTimeout(() => {
      void (async () => {
        try {
          await fetch("/api/studio/publish", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(syncSecret ? { "x-sync-secret": syncSecret } : {}),
            },
            body: JSON.stringify({ _id: draft._id, _type: draft._type }),
          });
        } catch {
          // best-effort: the next save will retry
        }
      })();
    }, 800);

    return () => clearTimeout(timer);
  }, [props.type, props.draft]);

  // No visible button - this runs silently in the background.
  return null;
};
