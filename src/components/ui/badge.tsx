import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[24px] min-w-[24px] items-center justify-center rounded-full px-3 text-xs font-medium tracking-wide",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]",
        variant === "outline"
          ? "border border-[color:var(--color-foreground-muted)] text-[color:var(--color-foreground)]"
          : "bg-[color:var(--color-accent-strong)] text-white",
        className
      )}
      {...props}
    />
  );
}
