export const locales = ["en", "bn"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  bn: "বাংলা",
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && locales.includes(value as Locale);
}

export const localeDirections: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  bn: "ltr",
};

export const localeDateFormatter: Record<Locale, Intl.DateTimeFormat> = {
  en: new Intl.DateTimeFormat("en-US", { dateStyle: "long" }),
  bn: new Intl.DateTimeFormat("bn-BD", { dateStyle: "long" }),
};

export const localeMeta: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Likhon Sheikh — Writing about design systems & Bangla web",
    description:
      "Modern Bangla + English blog template built with Next.js 15, React 19, Tailwind CSS 4, MDX, and shadcn/ui.",
  },
  bn: {
    title: "লিখন শেখ — ডিজাইন সিস্টেম ও বাংলা ওয়েব নিয়ে লেখা",
    description:
      "নেক্সট.জেএস ১৫, রিয়্যাক্ট ১৯, টেইলউইন্ড ৪ ও এমডিএক্স দিয়ে বানানো বাংলা-ইংরেজি ব্লগ টেমপ্লেট।",
  },
};
