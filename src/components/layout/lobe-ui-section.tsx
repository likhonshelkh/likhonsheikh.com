import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

interface Feature {
  title: string;
  description: string;
}

interface Copy {
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  commandLabel: string;
  command: string;
  features: Feature[];
}

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "LobeHub UI Kit",
    title: "Lobe UI brings AIGC-ready components with Ant Design compatibility",
    description:
      "Explore an open-source library of composable building blocks tuned for AI-first web apps. Mix Ant Design primitives with modern theming controls for production interfaces.",
    note: "The component API mirrors Ant Design, and ships with antd-style for zero-config theming.",
    primaryCta: { label: "GitHub", href: "https://github.com/lobehub/lobe-ui" },
    secondaryCta: { label: "Get started", href: "https://ui.lobehub.com" },
    commandLabel: "Install with Bun",
    command: "bun add @lobehub/ui",
    features: [
      {
        title: "Themeable",
        description:
          "Override fonts, color tokens, and breakpoints from a single theme provider without ejecting from Ant Design.",
      },
      {
        title: "Fast",
        description:
          "Eliminates runtime style props and keeps bundles lean with precompiled tokens and tree-shakable imports.",
      },
      {
        title: "Light & dark aware",
        description:
          "Detects HTML theme changes automatically so your components swap palettes in sync with the OS mode.",
      },
    ],
  },
  bn: {
    eyebrow: "LobeHub UI কিট",
    title: "এআইজিসি প্রস্তুত কম্পোনেন্ট, অ্যান্ট ডিজাইনের সাথে পূর্ণ সামঞ্জস্য",
    description:
      "এটি একটি ওপেন সোর্স লাইব্রেরি যেখানে এআই-কেন্দ্রিক ওয়েব অ্যাপ বানাতে দরকারি কম্পোজেবল ব্লক রয়েছে। অ্যান্ট ডিজাইনের প্রিমিটিভের সাথে আধুনিক থিমিং সহজে মিলিয়ে নিন।",
    note: "কম্পোনেন্ট এপিআই অ্যান্ট ডিজাইন-এর মতো এবং শূন্য কনফিগারেশনে antd-style থিমিং নিয়ে আসে।",
    primaryCta: { label: "গিটহাব", href: "https://github.com/lobehub/lobe-ui" },
    secondaryCta: { label: "শুরু করুন", href: "https://ui.lobehub.com" },
    commandLabel: "Bun দিয়ে ইনস্টল করুন",
    command: "bun add @lobehub/ui",
    features: [
      {
        title: "থিম বদলানো সহজ",
        description:
          "একটি থিম প্রোভাইডারের মাধ্যমেই ফন্ট, কালার টোকেন এবং ব্রেকপয়েন্ট কাস্টমাইজ করুন, অ্যান্ট ডিজাইন ছাড়াই।",
      },
      {
        title: "দ্রুত",
        description:
          "রানটাইম স্টাইল প্রপ বাদ দিয়ে প্রিকম্পাইলড টোকেনের সাহায্যে বান্ডেলকে হালকা রাখে।",
      },
      {
        title: "লাইট ও ডার্ক মোড সচেতন",
        description:
          "এইচটিএমএল থিম পরিবর্তন স্বয়ংক্রিয়ভাবে শনাক্ত করে ওএস মোডের সাথে মিল রেখে প্যালেট বদলে ফেলে।",
      },
    ],
  },
};

export function LobeUiSection({ locale }: { locale: Locale }) {
  const strings = copy[locale];

  return (
    <section
      aria-labelledby="lobe-ui-title"
      className="relative isolate overflow-hidden rounded-4xl border border-[color:var(--color-surface-muted)] bg-white px-6 py-12 shadow-sm sm:px-12"
    >
      <div className="pointer-events-none absolute -end-20 -top-24 h-72 w-72 rounded-full bg-[color:var(--color-accent)]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 start-12 h-64 w-64 rounded-full bg-[color:var(--color-accent)]/25 blur-3xl" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
        <div className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-foreground-muted)]">
            {strings.eyebrow}
          </p>
          <div className="space-y-4">
            <h2 id="lobe-ui-title" className="text-balance text-3xl font-semibold text-[color:var(--color-foreground)] sm:text-4xl">
              {strings.title}
            </h2>
            <p className="text-pretty text-base text-[color:var(--color-foreground-muted)] sm:text-lg">
              {strings.description}
            </p>
            <p className="text-sm text-[color:var(--color-foreground-muted)]">{strings.note}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={strings.primaryCta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ size: "lg" }), "min-w-[48px]")}
            >
              {strings.primaryCta.label}
            </a>
            <a
              href={strings.secondaryCta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "min-w-[48px]")}
            >
              {strings.secondaryCta.label}
            </a>
          </div>
          <div className="flex flex-col gap-2 rounded-2xl border border-dashed border-[color:var(--color-surface-muted)] bg-[color:var(--color-surface-muted)]/60 p-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-sm font-medium text-[color:var(--color-foreground)]">{strings.commandLabel}</span>
            <code
              className="w-full overflow-x-auto rounded-xl bg-[color:var(--color-surface)] px-3 py-2 text-sm text-[color:var(--color-foreground)] sm:w-auto"
              aria-label={strings.command}
            >
              {strings.command}
            </code>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {strings.features.map((feature) => (
            <article
              key={feature.title}
              className="h-full rounded-3xl border border-[color:var(--color-surface-muted)] bg-white/90 p-5 shadow-xs backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-[color:var(--color-foreground)]">{feature.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-foreground-muted)] text-pretty">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
