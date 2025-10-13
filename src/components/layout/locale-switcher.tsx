"use client";

import Link from "next/link";
import type { Route } from "next";
import { usePathname } from "next/navigation";

import { buttonVariants } from "@/components/ui/button-variants";
import { locales, localeLabels } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const pathname = usePathname() ?? "/";
  const segments = pathname.split("/").filter(Boolean);
  const rest = segments.slice(1).join("/");

  return (
    <div role="group" aria-label="Switch language" className="flex items-center gap-2">
      {locales.map((locale) => {
        const active = segments[0] === locale;
        const href = `/${locale}${rest ? `/${rest}` : ""}` as Route;
        const label = active
          ? `You’re viewing ${localeLabels[locale]}`
          : `Switch to ${localeLabels[locale]}`;

        return (
          <Link
            key={locale}
            href={href}
            scroll={false}
            aria-current={active ? "page" : undefined}
            aria-label={label}
            className={cn(
              buttonVariants({ variant: active ? "solid" : "outline", size: "sm" }),
              "min-w-[3.5rem] px-3",
              active && "cursor-default"
            )}
          >
            {localeLabels[locale]}
          </Link>
        );
      })}
    </div>
  );
}
