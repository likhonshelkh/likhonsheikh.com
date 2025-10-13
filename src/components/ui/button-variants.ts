import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full border border-transparent px-5 py-2 text-sm font-medium transition-[background,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        solid: "bg-[color:var(--color-accent-strong)] text-white hover:bg-[color:var(--color-accent)]",
        outline:
          "bg-transparent text-[color:var(--color-foreground)] border-[color:var(--color-foreground-muted)] hover:bg-[color:var(--color-surface-muted)]",
        subtle:
          "bg-[color:var(--color-surface-muted)] text-[color:var(--color-foreground)] hover:bg-[color:var(--color-surface)]",
      },
      size: {
        md: "h-11 min-w-[44px] text-sm",
        sm: "h-9 min-w-[36px] px-4 text-xs",
        lg: "h-12 min-w-[48px] text-base",
      },
    },
    defaultVariants: {
      variant: "solid",
      size: "md",
    },
  }
);
