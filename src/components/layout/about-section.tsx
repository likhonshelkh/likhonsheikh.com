import { localeLabels, type Locale } from "@/lib/i18n";

const copy: Record<Locale, { title: string; body: string; manifesto: string }> = {
  en: {
    title: "Accessible systems for Bangla + English interfaces",
    body:
      "I share workflows for building inclusive design systems, typographic guidelines for Bangla scripts, and production-ready Next.js patterns.",
    manifesto: "Design should not break when the script changes."
  },
  bn: {
    title: "বাংলা ও ইংরেজি ইন্টারফেসের জন্য অ্যাক্সেসিবল সিস্টেম",
    body:
      "অন্তর্ভুক্তিমূলক ডিজাইন সিস্টেম, বাংলা টাইপোগ্রাফির নিয়ম, আর প্রোডাকশন-রেডি নেক্সট.জেএস প্যাটার্ন নিয়ে লিখি।",
    manifesto: "লিপি বদলালে ডিজাইন ভেঙে পড়া উচিত নয়।"
  }
};

export function AboutSection({ locale }: { locale: Locale }) {
  const strings = copy[locale];

  return (
    <section id="about" className="space-y-4 rounded-3xl border border-[color:var(--color-surface-muted)] bg-white/80 p-8">
      <h2 className="text-2xl font-semibold text-[color:var(--color-foreground)]">{strings.title}</h2>
      <p className="text-[color:var(--color-foreground-muted)] text-pretty">{strings.body}</p>
      <blockquote className="rounded-2xl border-l-4 border-[color:var(--color-accent)] bg-[color:var(--color-surface-muted)]/60 px-6 py-4 text-sm font-medium text-[color:var(--color-foreground)]">
        “{strings.manifesto}” — {localeLabels[locale]}
      </blockquote>
    </section>
  );
}
