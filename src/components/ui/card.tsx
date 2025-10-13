import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-3xl border border-[color:var(--color-surface-muted)] bg-white/90 p-6 transition hover:translate-y-[-2px] hover:card-shadow focus-within-ring",
        "dark:bg-[color:var(--color-surface)]/90",
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight text-[color:var(--color-foreground)] group-hover:text-[color:var(--color-accent-strong)]",
        className
      )}
      {...props}
    />
  );
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-[color:var(--color-foreground-muted)]", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between gap-3 text-xs", className)} {...props} />;
}
