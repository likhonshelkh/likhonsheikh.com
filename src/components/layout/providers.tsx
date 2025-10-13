"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { defaultLocale, isLocale, localeDirections, type Locale } from "@/lib/i18n";

const LocaleContext = createContext<Locale>(defaultLocale);

export function useLocale() {
  return useContext(LocaleContext);
}

export function Providers({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const locale = useMemo<Locale>(() => {
    const segment = pathname?.split("/").filter(Boolean)[0];
    return isLocale(segment) ? segment : defaultLocale;
  }, [pathname]);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    html.lang = locale;
    html.dir = localeDirections[locale];
    html.dataset.locale = locale;
    body.dataset.locale = locale;
  }, [locale]);

  return (
    <NuqsAdapter>
      <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
    </NuqsAdapter>
  );
}
