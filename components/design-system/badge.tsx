import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type BadgeVariant =
  | "muted"
  | "hero"
  | "section"
  | "dark"
  | "glass";

interface DsBadgeProps {
  children: ReactNode;
  className?: string;
  variant?: BadgeVariant;
}

const badgeVariantClasses: Record<BadgeVariant, string> = {
  muted:
    "border border-white/10 bg-white/[0.03] text-white/45",
  hero: "bg-white/10 text-white/70 backdrop-blur-md",
  section:
    "border border-white/10 bg-white/[0.03] text-[var(--text-muted)] backdrop-blur-[12px]",
  dark: "border border-[rgba(0,0,0,0.91)] bg-black/35 text-white backdrop-blur-[6px]",
  glass:
    "border border-[rgba(0,0,0,0.91)] bg-[var(--bg-glass-strong)] text-white backdrop-blur-[6px]",
};

export function DsBadge({
  children,
  className,
  variant = "muted",
}: DsBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-4 py-2 text-[12px] leading-[1.4] tracking-[0]",
        badgeVariantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}

