"use client";

import { usePathname } from "next/navigation";

import { AnnouncementBar } from "./announcement-bar";
import { SiteShell } from "./site-shell";
import type { SiteSettings } from "@/sanity/lib/queries";

/**
 * Wraps site pages with the global chrome (announcement bar + header/footer)
 * but renders the embedded Sanity Studio (/studio) bare.
 *
 * The Studio is served from app/studio/[[...tool]], which sits under the root
 * layout. Without this gate, the announcement bar and site header/footer would
 * wrap around the Studio. Here we detect the path and skip the chrome for any
 * route under /studio (and /structure, the legacy raw Studio tool path).
 */
export function SiteChrome({
  settings,
  children,
}: {
  settings?: SiteSettings | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return <>{children}</>;

  return (
    <>
      <AnnouncementBar announcement={settings?.announcement} />
      <SiteShell>{children}</SiteShell>
    </>
  );
}
