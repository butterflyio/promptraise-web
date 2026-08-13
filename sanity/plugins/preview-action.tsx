import type { DocumentActionComponent } from "sanity";

/**
 * "Preview" action for page/post/siteSettings documents.
 *
 * Opens the site in Draft Mode with the current document's slug, so
 * unpublished edits render on the deployed site immediately.
 *
 * The URL pattern calls the same origin's /api/draft endpoint (the Studio
 * and the site are served from the same domain on Vercel), so no CORS or
 * hardcoded domain is needed.
 */
const PREVIEWABLE_TYPES = [
  "page",
  "post",
  "siteSettings",
  "homePage",
  "glossary",
];

/** Fixed slugs for single-doc types that live at a non-slug route, and the
 * path prefix for document types that live under a namespace (posts -> /blog). */
const FIXED_PREVIEW_SLUGS: Record<string, string> = {
  siteSettings: "/",
  glossary: "/academy/glossary",
};

const PREVIEW_PATH_PREFIX: Record<string, string> = {
  post: "/blog",
};

function previewUrlFor(doc: {
  _type: string;
  slug?: { current?: string };
}): string {
  const previewSecret = process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET ?? "";
  let slug = "/";
  if (doc._type in FIXED_PREVIEW_SLUGS) {
    slug = FIXED_PREVIEW_SLUGS[doc._type] ?? "/";
  } else if (doc.slug?.current) {
    const s = doc.slug.current.replace(/^\/+|\/+$/g, "");
    const prefix = PREVIEW_PATH_PREFIX[doc._type] ?? "";
    slug = s ? `${prefix}/${s}` : prefix || "/";
  }
  const qs = new URLSearchParams({ slug });
  if (previewSecret) qs.set("secret", previewSecret);
  return `/api/draft?${qs.toString()}`;
}

export const previewAction: DocumentActionComponent = (props) => {
  if (!PREVIEWABLE_TYPES.includes(props.type)) {
    return null;
  }

  return {
    label: "Preview",
    icon: () => <span aria-hidden>👁</span>,
    onHandle: async () => {
      const url = previewUrlFor(
        props.draft ?? {
          _type: props.type,
          slug: { current: "" },
        },
      );
      // Open in a new tab so the editor stays in the Studio.
      window.open(url, "_blank", "noopener,noreferrer");
    },
  };
};
