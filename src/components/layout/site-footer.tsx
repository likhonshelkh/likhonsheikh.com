import Link from "next/link";

import { localeLabels, type Locale } from "@/lib/i18n";

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
          <Link className="hover:text-[color:var(--color-accent-strong)]" href="https://github.com/zen69coder" target="_blank" rel="noreferrer">
            GitHub
          </Link>
          <Link className="hover:text-[color:var(--color-accent-strong)]" href="https://t.me/likhonsheikh" target="_blank" rel="noreferrer">
            Telegram
          </Link>
        </nav>
      </div>
    </footer>
  );
}
