import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { Providers } from "@/components/layout/providers";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { isLocale, localeDirections, localeMeta, locales, type Locale } from "@/lib/i18n";

interface Props {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  if (!isLocale(resolved.lang)) {
    return {};
  }

  const locale = resolved.lang as Locale;
  const meta = localeMeta[locale];

  return {
    title: {
      default: meta.title,
      template: `%s · likhonsheikh.com`,
    },
    description: meta.description,
    alternates: {
      languages: {
        en: "/en",
        bn: "/bn",
      },
    },
    openGraph: {
      locale: locale === "bn" ? "bn_BD" : "en_US",
      title: meta.title,
      description: meta.description,
    },
  } satisfies Metadata;
}

export default async function LocaleLayout({ children, params }: Props) {
  const resolved = await params;
  if (!isLocale(resolved.lang)) {
    notFound();
  }
  const locale = resolved.lang as Locale;

  return (
    <Providers initialLocale={locale}>
      <div
        className="relative flex min-h-screen flex-col"
        data-locale={locale}
        data-direction={localeDirections[locale]}
      >
        <SiteHeader locale={locale} />
        <main id="main" className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </Providers>
  );
}
