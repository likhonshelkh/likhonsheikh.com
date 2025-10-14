"use client";

import type { Route } from "next";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import {
  defaultLocale,
  isLocale,
  localeLabels,
  locales,
  machineLocaleLabels,
  type Locale,
  type MachineLocale,
} from "@/lib/i18n";
import { usePathname, useRouter } from "next/navigation";

type NativeOption = {
  code: Locale;
  label: string;
  type: "native";
};

type MachineOption = {
  code: MachineLocale;
  label: string;
  type: "machine";
};

type TranslateOption = NativeOption | MachineOption;

const machineLanguages: MachineOption[] = (Object.entries(machineLocaleLabels) as Array<[
  MachineLocale,
  string
]>).map(([code, label]) => ({
  code,
  label,
  type: "machine" as const,
}));

const nativeLanguages: NativeOption[] = locales.map((locale) => ({
  code: locale,
  label: localeLabels[locale],
  type: "native" as const,
}));

const translateOptions: TranslateOption[] = [...nativeLanguages, ...machineLanguages];

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: {
      translate?: {
        TranslateElement: new (options: unknown, elementId: string) => unknown;
      };
    };
    __likhonGoogleTranslateReady?: boolean;
  }
}

export function GoogleTranslateToggle() {
  const [activeCode, setActiveCode] = useState<TranslateOption["code"]>(defaultLocale);
  const [announcement, setAnnouncement] = useState("Original English copy");
  const [widgetReady, setWidgetReady] = useState(false);
  const comboRef = useRef<HTMLSelectElement | null>(null);
  const router = useRouter();
  const pathname = usePathname() ?? `/${defaultLocale}`;

  const segments = useMemo(() => pathname.split("/").filter(Boolean), [pathname]);
  const currentLocale: Locale = useMemo(() => {
    const candidate = segments[0];
    return isLocale(candidate) ? candidate : defaultLocale;
  }, [segments]);
  const restPath = useMemo(() => segments.slice(1).join("/"), [segments]);

  const englishPath = useMemo(() => {
    return `/${defaultLocale}${restPath ? `/${restPath}` : ""}`;
  }, [restPath]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const translateParam = params.get("translate");

    if (translateParam && isMachineLocaleCode(translateParam)) {
      setActiveCode(translateParam);
      const targetLabel = labelFor(translateParam);
      setAnnouncement(`Translated to ${targetLabel} with Google Translate`);
      return;
    }

    setActiveCode(currentLocale);
    if (currentLocale === defaultLocale) {
      setAnnouncement("Original English copy");
    } else {
      setAnnouncement(`Switched to curated ${localeLabels[currentLocale]} translation`);
    }
  }, [currentLocale, pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const initializeWidget = () => {
      if (window.__likhonGoogleTranslateReady) {
        bindCombo();
        return;
      }

      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: defaultLocale,
          autoDisplay: false,
          includedLanguages: machineLanguages.map((language) => language.code).join(","),
        },
        "google_translate_container"
      );

      window.__likhonGoogleTranslateReady = true;
      bindCombo();
    };

    const bindCombo = () => {
      const combo = document.querySelector<HTMLSelectElement>(".goog-te-combo");
      if (combo) {
        comboRef.current = combo;
        combo.style.position = "absolute";
        combo.style.opacity = "0";
        combo.style.pointerEvents = "none";
        setWidgetReady(true);
      }
    };

    if (window.__likhonGoogleTranslateReady) {
      bindCombo();
      return;
    }

    window.googleTranslateElementInit = initializeWidget;

    const existingScript = document.querySelector<HTMLScriptElement>("[data-google-translate-script]");
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    const handleError = () => setWidgetReady(false);
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.dataset.googleTranslateScript = "true";
    script.addEventListener("error", handleError);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("error", handleError);
    };
  }, []);

  const applyMachineTranslation = useEffectEvent((code: MachineLocale) => {
    const combo = comboRef.current ?? document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (!combo) return;
    combo.value = code;
    combo.dispatchEvent(new Event("change"));
  });

  const resetMachineTranslation = useEffectEvent(() => {
    const combo = comboRef.current ?? document.querySelector<HTMLSelectElement>(".goog-te-combo");
    if (!combo) return;
    combo.value = "";
    combo.dispatchEvent(new Event("change"));
  });

  const updateQuery = useEffectEvent(async (code: MachineLocale | null, targetPath: string) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.pathname = targetPath;

    if (code) {
      url.searchParams.set("translate", code);
    } else {
      url.searchParams.delete("translate");
    }

    const href = `${url.pathname}${url.search ? `?${url.searchParams.toString()}` : ""}` as Route;

    await router.replace(href, {
      scroll: false,
    });
  });

  const handleSelect = useEffectEvent(async (code: TranslateOption["code"]) => {
    if (isLocale(code as string)) {
      const locale = code as Locale;
      const targetPath = `/${locale}${restPath ? `/${restPath}` : ""}`;
      await updateQuery(null, targetPath);
      setActiveCode(locale);
      resetMachineTranslation();
      setAnnouncement(
        locale === defaultLocale
          ? "Original English copy"
          : `Switched to curated ${localeLabels[locale]} translation`
      );
      return;
    }

    if (!widgetReady) {
      setAnnouncement("Machine translation is preparing");
      return;
    }

    await updateQuery(code as MachineLocale, englishPath);
    setActiveCode(code);
    applyMachineTranslation(code as MachineLocale);
    const label = labelFor(code);
    setAnnouncement(`Translated to ${label} with Google Translate`);
  });

  return (
    <div className="flex flex-col gap-1">
      <div role="group" aria-label="Machine translation" className="flex items-center gap-2">
        {translateOptions.map((option) => {
          const isActive = activeCode === option.code;
          const disabled = option.type === "machine" && !widgetReady;

          return (
            <button
              key={option.code}
              type="button"
              disabled={disabled}
              onClick={() => handleSelect(option.code)}
              aria-pressed={isActive}
              className={cn(
                buttonVariants({ variant: isActive ? "solid" : "outline", size: "sm" }),
                "min-w-[3.5rem] px-3"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div
        id="google_translate_container"
        aria-hidden="true"
        className="absolute h-0 w-0 overflow-hidden"
      />
      <div
        role="status"
        aria-live="polite"
        aria-label="Translation status"
        className="sr-only"
      >
        {announcement}
      </div>
    </div>
  );
}

function labelFor(code: string) {
  return translateOptions.find((option) => option.code === code)?.label ?? code;
}

function isMachineLocaleCode(value: string): value is MachineLocale {
  return Object.prototype.hasOwnProperty.call(machineLocaleLabels, value);
}

function useEffectEvent<TArgs extends unknown[], TResult>(
  handler: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...args: TArgs) => handlerRef.current(...args), []);
}
