import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface DsSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function DsSection({ children, className, id }: DsSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-[var(--border-default)] bg-[var(--bg-base)]",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface DsSectionContainerProps {
  children: ReactNode;
  className?: string;
}

export function DsSectionContainer({
  children,
  className,
}: DsSectionContainerProps) {
  return (
    <div
      className={cn(
        "mobile:px-6 mx-auto w-full max-w-[1248px] px-4 py-16 tablet:py-24",
        className,
      )}
    >
      {children}
    </div>
  );
}

