import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface DsCardProps {
  children: ReactNode;
  className?: string;
}

export function DsCard({ children, className }: DsCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-[var(--border-soft)] bg-[var(--bg-surface-panel)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

