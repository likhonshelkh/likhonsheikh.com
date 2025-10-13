import Link from "next/link";

import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { localeLabels, type Locale } from "@/lib/i18n";

interface HeroCopy {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
}

const copy: Record<Locale, HeroCopy> = {
  en: {
    eyebrow: "Bangla-first design systems",
    title: "Designing bilingual experiences without losing rhythm",
    description:
      "A starter blog template with accessible typography, MDX content workflows, and partial pre-rendering tuned for Bangla and English readers.",
    cta: "Browse articles",
  },
  bn: {
    eyebrow: "বাংলা-প্রথম ডিজাইন সিস্টেম",
    title: "দুই ভাষায় অভিজ্ঞতা, একই তাল",
    description:
      "একটি ব্লগ টেমপ্লেট যেখানে আছে সহজ এমডিএক্স কনটেন্ট, অ্যাক্সেসিবল টাইপোগ্রাফি, আর দ্রুত লোডিং।",
    cta: "সব লেখা দেখুন",
  },
};

export function Hero({ locale }: { locale: Locale }) {
  const strings = copy[locale];

  return (
    <section className="relative isolate overflow-hidden rounded-4xl border border-[color:var(--color-surface-muted)] bg-white px-6 py-16 shadow-sm sm:px-12" aria-labelledby="hero-title">
      <div className="absolute inset-y-0 end-[-40%] w-[60%] rounded-full bg-[color:var(--color-accent)]/10 blur-3xl" aria-hidden />
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-foreground-muted)]">
        {strings.eyebrow}
      </p>
      <h1 id="hero-title" className="mt-4 max-w-2xl text-balance text-4xl font-bold leading-snug text-[color:var(--color-foreground)] sm:text-5xl">
        {strings.title}
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-base text-[color:var(--color-foreground-muted)] sm:text-lg">
        {strings.description}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Link
          href={`/${locale}#articles`}
          className={cn(buttonVariants({ size: "lg" }), "min-w-[48px]")}
        >
          {strings.cta}
        </Link>
        <span className="text-sm text-[color:var(--color-foreground-muted)]">
          {localeLabels[locale]} • APCA contrast ≥ 60
        </span>
      </div>
    </section>
  );
}
