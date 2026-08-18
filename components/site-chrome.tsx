"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps site pages with the global chrome (announcement bar + header/footer)
 * but renders the embedded Sanity Studio (/studio) bare.
 *
 * The Studio is served from app/studio/[[...tool]], which sits under the root
 * layout. Without this gate, the announcement bar and site header/footer would
 * wrap around the Studio. Here we detect the path and skip the chrome for any
 * route under /studio (and /structure, the legacy raw Studio tool path).
 *
 * The chrome itself is passed in as SERVER-RENDERED `chrome`/`bare` slots from
 * the layout, so SiteShell and the async SiteHeader/SiteFooter stay server
 * components and never run their data fetch in the browser.
 */
export function SiteChrome({
  chrome,
  bare,
}: {
  chrome: ReactNode;
  bare: ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  if (isStudio) return <>{bare}</>;
  return <>{chrome}</>;
}
