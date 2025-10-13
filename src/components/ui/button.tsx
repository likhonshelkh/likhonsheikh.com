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
          loading && "relative text-transparent",
          "focus-visible:ring-[color:var(--ring)]"
        )}
        disabled={isDisabled}
        data-loading={loading ? "true" : undefined}
        {...props}
      >
        {loading ? (
          <span
            aria-hidden
            className="absolute inline-flex h-5 w-5 animate-spin items-center justify-center rounded-full border-2 border-white/60 border-t-transparent"
          />
        ) : null}
        <span className="flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
