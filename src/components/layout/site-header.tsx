import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { localeLabels, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

import { LocaleSwitcher } from "./locale-switcher";

interface HeaderCopy {
  articles: string;
  about: string;
  contact: string;
  cta: string;
}

const copy: Record<Locale, HeaderCopy> = {
  en: {
    articles: "Articles",
    about: "About",
    contact: "Contact",
    cta: "Subscribe",
  },
  bn: {
    articles: "লেখা",
    about: "সম্পর্কে",
    contact: "যোগাযোগ",
    cta: "সাবস্ক্রাইব",
  },
};

export function SiteHeader({ locale }: { locale: Locale }) {
  const strings = copy[locale];
  const homeLabel = `${localeLabels[locale]} home`;

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--color-surface-muted)] bg-[color:var(--color-surface)]/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-6 px-4 py-4">
        <div className="flex items-center gap-4">
          <Link
            href={`/${locale}`}
            className="rounded-full px-3 py-2 text-sm font-semibold tracking-tight text-[color:var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            aria-label={homeLabel}
          >
            likhonsheikh.com
          </Link>
          <nav className="hidden items-center gap-3 text-sm font-medium sm:flex" aria-label="Primary">
            <Link className="hover:text-[color:var(--color-accent-strong)]" href={`/${locale}#articles`}>
              {strings.articles}
            </Link>
            <Link className="hover:text-[color:var(--color-accent-strong)]" href={`/${locale}#about`}>
              {strings.about}
            </Link>
            <Link className="hover:text-[color:var(--color-accent-strong)]" href={`/${locale}#contact`}>
              {strings.contact}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <Link
            href={`/${locale}#subscribe`}
            className={cn(buttonVariants({ variant: "subtle" }), "hidden sm:inline-flex")}
          >
            {strings.cta}
            <span aria-hidden className="text-xl">…</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
