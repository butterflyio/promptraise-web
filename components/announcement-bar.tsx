import type { SiteSettings } from "@/sanity/lib/queries";

/**
 * Global announcement bar rendered above the header when enabled in
 * Site Settings. Pushed down by the absolute header using a spacer div.
 */
export function AnnouncementBar({
  announcement,
}: {
  announcement?: SiteSettings["announcement"];
}) {
  if (!announcement?.enabled || !announcement.text) return null;

  return (
    <>
      {/* Spacer keeps the absolutely-positioned header below the bar */}
      <div className="h-10 w-full" aria-hidden="true" />
      <div className="fixed inset-x-0 top-0 z-[60]">
        <div className="flex h-10 w-full items-center justify-center gap-3 bg-white px-4 text-center text-[13px] leading-none font-semibold text-black">
          <span>{announcement.text}</span>
          {announcement.linkLabel && announcement.linkUrl ? (
            <a
              href={announcement.linkUrl}
              className="underline decoration-1 underline-offset-2 hover:opacity-70"
              target={announcement.linkUrl.startsWith("http") ? "_blank" : undefined}
              rel={
                announcement.linkUrl.startsWith("http")
                  ? "noreferrer noopener"
                  : undefined
              }
            >
              {announcement.linkLabel}
            </a>
          ) : null}
        </div>
      </div>
    </>
  );
}