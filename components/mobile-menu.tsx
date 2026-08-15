"use client";

import { useEffect, useState } from "react";

import { DsButton } from "@/components/design-system";
import { MenuIcon } from "@/components/design-system";

export type MobileNavItem = {
  href: string;
  label: string;
};

interface MobileMenuProps {
  navItems: MobileNavItem[];
  auditUrl: string;
  auditLabel: string;
}

/**
 * Mobile navigation drawer (Figma mobile frame 393).
 *
 * The burger button toggles a full-height overlay containing the primary nav
 * links + the header CTA. Body scroll is locked while open, Escape closes it,
 * and the menu closes on any link click. Dark glass styling matches the rest
 * of the site (bg #0f0f0f, green accent #67FF67).
 */
export function MobileMenu({
  navItems,
  auditUrl,
  auditLabel,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="tablet:hidden inline-flex h-6 w-6 items-center justify-center text-white"
      >
        {open ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <MenuIcon className="h-6 w-6" />
        )}
      </button>

      {/* Overlay drawer */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="tablet:hidden fixed inset-x-0 top-0 bottom-0 z-[80]"
        style={{
          background: "rgba(10,10,12,0.88)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
        }}
      >
        <div className="flex h-full flex-col px-5 pt-6 pb-10">
          <div className="mb-8 flex h-9 items-center justify-between">
            <span className="text-[18px] leading-[1.5] font-normal tracking-[-0.396px] text-white">
              Menu
            </span>
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => setOpen(false)}
              className="inline-flex h-6 w-6 items-center justify-center text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="h-6 w-6"
              >
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-4 py-3 text-[24px] leading-[1.4] tracking-[-0.48px] text-white transition-colors hover:bg-white/5 hover:text-[var(--accent-primary)]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto">
            <DsButton
              href={auditUrl}
              variant="light"
              size="md"
              className="w-full justify-center"
              onClick={() => setOpen(false)}
            >
              {auditLabel}
            </DsButton>
          </div>
        </div>
      </div>
    </>
  );
}
