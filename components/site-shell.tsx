import type { ReactNode } from "react";

import type { SiteSettings } from "@/sanity/lib/queries";
import { AnnouncementBar } from "./announcement-bar";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type SiteShellProps = {
  settings: SiteSettings | null;
  children: ReactNode;
};

export function SiteShell({ settings, children }: SiteShellProps) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--bg-base)] text-[var(--text-primary)]">
      <AnnouncementBar announcement={settings?.announcement} />
      <SiteHeader settings={settings} />
      <div className="flex-1">{children}</div>
      <SiteFooter settings={settings} />
    </div>
  );
}
