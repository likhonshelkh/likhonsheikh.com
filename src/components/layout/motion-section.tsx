'use client';

import { motion, useReducedMotion } from "motion/react";

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

const DEFAULT_EASE = [0.16, 1, 0.3, 1] as const;

const copy: Record<Locale, Copy> = {
  en: {
    eyebrow: "Motion Animation Library",
    title: "Motion delivers production-grade web animations for React, JavaScript, and Vue",
    description:
      "Create cinematic UI choreography with a single API that spans component transitions, timelines, and scroll-driven storytelling.",
    note: "Free and open source with first-class docs at motion.dev/docs.",
    primaryCta: { label: "View docs", href: "https://motion.dev/docs" },
    secondaryCta: { label: "Explore examples", href: "https://motion.dev/examples" },
    commandLabel: "Install with Bun",
    command: "bun add motion",
    features: [
      {
        title: "Production-ready motion",
        description:
          "Compose timelines, share tokens, and orchestrate interactive states with the same primitives shipped to Fortune 100 teams.",
      },
      {
        title: "Framework agnostic",
        description:
          "Drop the runtime into React, vanilla JavaScript, or Vue projects without rewriting animation logic.",
      },
      {
        title: "Accessibility aware",
        description:
          "Honors reduced-motion preferences automatically and exposes deterministic fallback states out of the box.",
      },
    ],
  },
  bn: {
    eyebrow: "Motion অ্যানিমেশন লাইব্রেরি",
    title: "React, JavaScript ও Vue-র জন্য প্রোডাকশন-গ্রেড ওয়েব অ্যানিমেশন এখন Motion-এ",
    description:
      "একটি এপিআই দিয়েই কম্পোনেন্ট ট্রানজিশন, টাইমলাইন এবং স্ক্রল-নির্ভর গল্প বলাকে সিনেমাটিক করে তুলুন।",
    note: "motion.dev/docs এ বিনামূল্যের বিশদ ডকুমেন্টেশন পাওয়া যায়।",
    primaryCta: { label: "ডকস দেখুন", href: "https://motion.dev/docs" },
    secondaryCta: { label: "উদাহরণ দেখুন", href: "https://motion.dev/examples" },
    commandLabel: "Bun দিয়ে ইনস্টল করুন",
    command: "bun add motion",
    features: [
      {
        title: "প্রোডাকশন-রেডি মোশন",
        description:
          "একই প্রিমিটিভ দিয়ে টাইমলাইন গড়ুন, টোকেন শেয়ার করুন এবং ইন্টারঅ্যাকটিভ স্টেট পরিচালনা করুন—যা বিশ্বসেরা টিমগুলো ব্যবহার করে।",
      },
      {
        title: "ফ্রেমওয়ার্ক-নিরপেক্ষ",
        description:
          "React, ভ্যানিলা জাভাস্ক্রিপ্ট বা Vue—যেখানেই লাগান, অ্যানিমেশন লজিক আবার লিখতে হবে না।",
      },
      {
        title: "অ্যাক্সেসিবিলিটি সচেতন",
        description:
          "প্রেফারস-রিডিউসড-মোশন সিগন্যাল স্বয়ংক্রিয়ভাবে মানে এবং ডিটারমিনিস্টিক ফলব্যাক স্টেট সরাসরি দেয়।",
      },
    ],
  },
};

export function MotionSection({ locale }: { locale: Locale }) {
  const strings = copy[locale];
  const shouldReduceMotion = useReducedMotion();

  const sectionAnimationProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.65, ease: DEFAULT_EASE },
        viewport: { once: true, margin: "-10% 0px -10% 0px" },
      };

  return (
    <motion.section
      aria-labelledby="motion-section-title"
      className="relative isolate overflow-hidden rounded-4xl border border-[color:var(--color-surface-muted)] bg-white px-6 py-12 shadow-sm sm:px-12"
      {...sectionAnimationProps}
    >
      <div className="pointer-events-none absolute -end-20 -top-24 h-72 w-72 rounded-full bg-[color:var(--color-accent)]/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 start-12 h-64 w-64 rounded-full bg-[color:var(--color-accent)]/25 blur-3xl" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-start">
        <motion.div
          className="space-y-6"
          {...(shouldReduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.05, ease: DEFAULT_EASE },
                viewport: { once: true, margin: "-15% 0px -15% 0px" },
              })}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-foreground-muted)]">
            {strings.eyebrow}
          </p>
          <div className="space-y-4">
            <h2 id="motion-section-title" className="text-balance text-3xl font-semibold text-[color:var(--color-foreground)] sm:text-4xl">
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
        </motion.div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {strings.features.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="h-full rounded-3xl border border-[color:var(--color-surface-muted)] bg-white/90 p-5 shadow-xs backdrop-blur"
              {...(shouldReduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 24 },
                    whileInView: { opacity: 1, y: 0 },
                    transition: { duration: 0.55, delay: 0.1 + index * 0.05, ease: DEFAULT_EASE },
                    viewport: { once: true, margin: "-15% 0px -15% 0px" },
                  })}
            >
              <h3 className="text-lg font-semibold text-[color:var(--color-foreground)]">{feature.title}</h3>
              <p className="mt-2 text-sm text-[color:var(--color-foreground-muted)] text-pretty">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
