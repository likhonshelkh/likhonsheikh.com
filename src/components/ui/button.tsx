"use client";

import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./button-variants";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

type ButtonVariants = VariantProps<typeof buttonVariants>;

export type Props = ButtonProps & ButtonVariants;

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, loading = false, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants(props),
          className,
          "focus-visible:ring-[color:var(--ring)]",
          loading ? "gap-2" : "gap-0"
        )}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        <span
          aria-hidden
          className={cn(
            "flex h-5 items-center justify-center overflow-hidden transition-[width,opacity] duration-150",
            loading ? "w-5 opacity-100" : "w-0 opacity-0"
          )}
        >
          {loading ? (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
          ) : null}
        </span>
        <span className="flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
