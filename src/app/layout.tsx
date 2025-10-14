import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { SkipNav } from "@/components/layout/skip-nav";
import "./globals.css";
import { fontVariables } from "@/lib/fonts";
import { defaultLocale, isLocale, localeDirections, localeMeta } from "@/lib/i18n";

export const metadata: Metadata = {
  metadataBase: new URL("https://likhonsheikh.com"),
  title: {
    default: localeMeta[defaultLocale].title,
    template: "%s · likhonsheikh.com",
  },
  description: localeMeta[defaultLocale].description,
  applicationName: "likhonsheikh.com",
  generator: "Next.js 15.5",
  keywords: ["Bangla", "Next.js", "MDX", "Design systems", "Accessibility"],
  authors: [{ name: "Likhon Sheikh", url: "https://github.com/likhonshelkh" }],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f7ff" }],
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      bn: "/bn",
    },
  },
  openGraph: {
    title: "Likhon Sheikh — Bangla + English design systems",
    description: localeMeta[defaultLocale].description,
    url: "https://likhonsheikh.com",
    siteName: "likhonsheikh.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Likhon Sheikh",
    creator: "@likhonsheikh",
    description: localeMeta[defaultLocale].description,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f7ff",
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ lang?: string }>;
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const resolved = await params;
  const locale = resolved?.lang && isLocale(resolved.lang) ? resolved.lang : defaultLocale;
  const direction = localeDirections[locale];

  return (
    <html
      lang={locale}
      dir={direction}
      data-locale={locale}
      suppressHydrationWarning
      className={`${fontVariables} antialiased`}
    >
      <body className="min-h-screen bg-[color:var(--color-surface)] text-[color:var(--color-foreground)]">
        <SkipNav />
        {children}
      </body>
    </html>
  );
}
