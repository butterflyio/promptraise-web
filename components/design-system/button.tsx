import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

import { ArrowUpRightIcon } from "./icons";

type ButtonVariant =
  | "light"
  | "primary"
  | "secondary"
  | "hero-secondary";

type ButtonSize = "md" | "lg";

interface DsButtonProps {
  children: ReactNode;
  href: string;
  className?: string;
  iconBubbleClassName?: string;
  iconClassName?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  showTrailingArrow?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  light: "bg-white text-black border border-[var(--border-strong)]",
  primary:
    "bg-[var(--accent-primary)] text-[var(--accent-foreground)] border border-[var(--border-strong)] shadow-[var(--shadow-cta)]",
  secondary:
    "bg-[var(--bg-surface)] text-white border border-[var(--border-soft)]",
  "hero-secondary":
    "prompt-hero-secondary-cta text-white border border-[var(--border-strong)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-12 px-5 text-[15px]",
  lg: "h-14 px-6 text-[16px]",
};

export function DsButton({
  children,
  href,
  className,
  iconBubbleClassName,
  iconClassName,
  variant = "primary",
  size = "lg",
  showTrailingArrow = false,
}: DsButtonProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center rounded-full leading-none tracking-[0] font-normal transition-all hover:opacity-90",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
    >
      <span>{children}</span>
      {showTrailingArrow ? (
        <span
          className={cn(
            "ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--accent-primary)]",
            size === "lg" ? "h-12 w-12" : "",
            iconBubbleClassName,
          )}
        >
          <ArrowUpRightIcon className={cn("h-6 w-6", iconClassName)} />
        </span>
      ) : null}
    </a>
  );
}
