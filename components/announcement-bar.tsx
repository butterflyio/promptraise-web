"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import type { SiteSettings } from "@/sanity/lib/queries";

/** CSS variable the header + spacer read to offset below the bar. */
const OFFSET_VAR = "--announce-offset";
/** Browser-scoped key so a visitor only sees the bar once. */
const DISMISS_KEY = "promptraise.announce-dismissed";
/** Fallback height before the client measures: 40px band + safe-area inset. */
const FALLBACK_OFFSET = "calc(2.5rem + env(safe-area-inset-top))";

/**
 * Global announcement bar rendered above the header when enabled in Site
 * Settings. A fixed strip at the very top (z-60). It is a client component
 * because:
 *  - it is user-dismissible (persisted to localStorage for the session),
 *  - it self-measures via ResizeObserver so the header + spacer offsets stay
 *    in sync even if the text wraps or a safe-area inset is present.
 *
 * The measured height is written to `--announce-offset` on <html>. The header
 * and the in-flow spacer both read that variable, so they never drift apart.
 */
export function AnnouncementBar({
  announcement,
}: {
  announcement?: SiteSettings["announcement"];
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  const active = Boolean(announcement?.enabled && announcement?.text);
  const shown = active && !dismissed;

  // Publish the bar's real height (handles wrap + safe-area) to the CSS var.
  useEffect(() => {
    const root = document.documentElement;
    const el = barRef.current;
    if (!shown || !el) {
      root.style.setProperty(OFFSET_VAR, "0px");
      return;
    }
    const measure = () =>
      root.style.setProperty(OFFSET_VAR, `${el.offsetHeight}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      ro.disconnect();
      // On unmount/disable, collapse the offset back to 0.
      root.style.setProperty(OFFSET_VAR, "0px");
    };
  }, [shown]);

  // Restore a prior dismissal from localStorage (client-only).
  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      /* storage unavailable - just show the bar */
    }
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!announcement || !active) return null;

  return (
    <>
      {/* In-flow spacer reserves the bar's height so page content isn't hidden. */}
      <div
        aria-hidden="true"
        style={{ height: `var(${OFFSET_VAR}, ${FALLBACK_OFFSET})` }}
      />
      {shown && (
        <div
          ref={barRef}
          className="fixed inset-x-0 top-0 z-[60]"
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
          <div className="flex h-10 w-full items-center justify-center gap-2.5 border-b border-black/10 bg-white/70 px-4 text-center text-[13px] leading-none font-semibold text-black shadow-sm backdrop-blur-xl backdrop-saturate-150">
            <span className="min-w-0 truncate">{announcement.text}</span>
            {announcement.linkLabel && announcement.linkUrl ? (
              <AnnounceCta
                label={announcement.linkLabel}
                href={announcement.linkUrl}
              />
            ) : null}
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss announcement"
              className="ml-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[15px] leading-none text-black/45 transition-colors hover:bg-black/10 hover:text-black"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/** CTA as a small pill - clearer affordance than a bare text link. */
function AnnounceCta({ label, href }: { label: string; href: string }) {
  const className =
    "shrink-0 rounded-full bg-black px-3 py-1 text-[12px] font-semibold leading-none text-white transition-opacity hover:opacity-80";
  const external = href.startsWith("http");
  if (external) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noreferrer noopener"
      >
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}
