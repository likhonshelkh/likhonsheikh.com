import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-[background,transform,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface)] ring-offset-background disabled:pointer-events-none disabled:opacity-60 gap-2",
  {
    variants: {
      variant: {
        default:
          "bg-[color:var(--color-accent-strong)] text-white hover:bg-[color:var(--color-accent)] focus-visible:ring-[color:var(--color-accent-strong)]",
        solid:
          "bg-[color:var(--color-accent-strong)] text-white hover:bg-[color:var(--color-accent)] focus-visible:ring-[color:var(--color-accent-strong)]",
        destructive:
          "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-600",
        outline:
          "border border-[color:var(--color-foreground-muted)] bg-transparent text-[color:var(--color-foreground)] hover:bg-[color:var(--color-surface-muted)]",
        secondary:
          "bg-[color:var(--color-surface-muted)] text-[color:var(--color-foreground)] hover:bg-[color:var(--color-surface)]",
        ghost:
          "bg-transparent text-[color:var(--color-foreground)] hover:bg-[color:var(--color-surface-muted)]",
        link: "text-[color:var(--color-accent-strong)] underline-offset-4 hover:underline",
        subtle:
          "bg-[color:var(--color-surface-muted)] text-[color:var(--color-foreground)] hover:bg-[color:var(--color-surface)]",
      },
      size: {
        default: "h-11 min-w-[44px] px-5 text-sm",
        md: "h-11 min-w-[44px] px-5 text-sm",
        sm: "h-9 min-w-[36px] px-4 text-xs",
        lg: "h-12 min-w-[48px] px-6 text-base",
        icon: "h-10 w-10", 
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)
