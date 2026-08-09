import type { DocumentActionComponent } from "sanity";

/**
 * "Approve & Sync to Production" action.
 *
 * Copies the current document to the production dataset via the server-side
 * /api/studio/sync route (the write token stays on the server). Shows a
 * confirmation dialog first so this stays an explicit, review-first action -
 * matching the project rule: the user alone publishes to production.
 */
const SYNCABLE_TYPES = ["page", "post", "siteSettings"];

export const syncToProductionAction: DocumentActionComponent = (props) => {
  if (!SYNCABLE_TYPES.includes(props.type)) {
    return null;
  }

  const syncSecret = process.env.NEXT_PUBLIC_SANITY_STUDIO_SYNC_SECRET ?? "";

  return {
    label: "Approve & Sync to Production",
    icon: () => <span aria-hidden>🚀</span>,
    tone: "positive",
    onHandle: () => {
      const doc = props.draft ?? props.published;
      if (!doc?._id) return;

      void (async () => {
        if (!window.confirm("Copy this document to the PRODUCTION dataset?")) {
          return;
        }
        try {
          const res = await fetch("/api/studio/sync", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...(syncSecret ? { "x-sync-secret": syncSecret } : {}),
            },
            body: JSON.stringify({ _id: doc._id, _type: doc._type }),
          });
          const data = (await res.json()) as { ok?: boolean; error?: string };
          if (data.ok) {
            window.alert("Synced to production ✓");
          } else {
            window.alert(`Sync failed: ${data.error ?? "unknown error"}`);
          }
        } catch (err) {
          window.alert(
            `Sync failed: ${err instanceof Error ? err.message : "network error"}`,
          );
        }
      })();
    },
  };
};