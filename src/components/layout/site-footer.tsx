import Link from "next/link";
import type { SVGProps } from "react";

import { localeLabels, type Locale } from "@/lib/i18n";

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.69c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.45-1.1-1.45-.9-.61.07-.6.07-.6 1 .07 1.54 1.02 1.54 1.02.89 1.53 2.34 1.08 2.91.83.09-.64.35-1.08.63-1.33-2.22-.26-4.56-1.12-4.56-4.97 0-1.1.4-2 1.03-2.71-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.03a9.56 9.56 0 0 1 5 0c1.9-1.3 2.74-1.03 2.74-1.03.56 1.41.21 2.45.11 2.71.64.71 1.02 1.61 1.02 2.71 0 3.86-2.35 4.71-4.59 4.96.36.31.68.92.68 1.86l-.01 2.76c0 .27.18.59.69.48A10 10 0 0 0 12 2Z"
      />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path
        fill="currentColor"
        d="m20.94 4.28-17.3 6.7c-1.18.45-1.17 1.09-.21 1.38l4.44 1.39 10.27-6.48c.49-.3.94-.14.57.19l-8.33 7.51-.32 4.78c.46 0 .66-.21.93-.46l2.24-2.17 4.66 3.44c.86.48 1.48.23 1.7-.8l3.07-14.44c.31-1.25-.48-1.82-1.7-1.04Z"
      />
    </svg>
  );
}

const copy: Record<Locale, { crafted: string; rights: string }> = {
  en: {
    crafted: "Crafted for inclusive Bangla + English storytelling.",
    rights: "All rights reserved.",
  },
  bn: {
    crafted: "বাংলা ও ইংরেজি গল্প বলার জন্য বানানো।",
    rights: "সকল স্বত্ব সংরক্ষিত।",
  },
};

export function SiteFooter({ locale }: { locale: Locale }) {
  const strings = copy[locale];

  return (
    <footer id="contact" className="border-t border-[color:var(--color-surface-muted)] bg-white/70 py-12">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2 text-sm text-[color:var(--color-foreground-muted)]">
          <p>{strings.crafted}</p>
          <p>{strings.rights}</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-3 text-sm">
          <Link className="hover:text-[color:var(--color-accent-strong)]" href={`/${locale}`}>
            {localeLabels[locale]}
          </Link>
          <Link
            className="flex items-center gap-1.5 hover:text-[color:var(--color-accent-strong)]"
            href="https://github.com/likhonshelkh"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
          <Link
            className="flex items-center gap-1.5 hover:text-[color:var(--color-accent-strong)]"
            href="https://t.me/likhonsheikh"
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram channel"
          >
            <TelegramIcon className="h-4 w-4" />
            <span>Telegram</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
