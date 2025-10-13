import { Button } from "@/components/ui/button";
import type { Locale } from "@/lib/i18n";

const copy: Record<Locale, { title: string; description: string; placeholder: string; submit: string; privacy: string }> = {
  en: {
    title: "Stay in sync",
    description: "A monthly digest covering accessibility, component systems, and Bangla UX research.",
    placeholder: "you@example.com",
    submit: "Join the newsletter",
    privacy: "We respect your inbox. Unsubscribe anytime.",
  },
  bn: {
    title: "নিয়মিত আপডেট পান",
    description: "অ্যাক্সেসিবিলিটি, কম্পোনেন্ট সিস্টেম আর বাংলা ইউএক্স রিসার্চ নিয়ে মাসিক ডাইজেস্ট।",
    placeholder: "you@example.com",
    submit: "নিউজলেটারে যুক্ত হোন",
    privacy: "আপনার ইনবক্স নিরাপদ। যে কোন সময় আনসাবস্ক্রাইব করতে পারবেন।",
  },
};

export function SubscribeSection({ locale }: { locale: Locale }) {
  const strings = copy[locale];

  return (
    <section id="subscribe" aria-labelledby="subscribe-title" className="rounded-3xl border border-[color:var(--color-surface-muted)] bg-white/90 p-8 shadow-sm">
      <div className="space-y-2">
        <h2 id="subscribe-title" className="text-xl font-semibold text-[color:var(--color-foreground)]">
          {strings.title}
        </h2>
        <p className="text-sm text-[color:var(--color-foreground-muted)]">{strings.description}</p>
      </div>
      <form className="mt-6 flex flex-col gap-4 sm:flex-row" noValidate>
        <label className="sr-only" htmlFor="email">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          inputMode="email"
          minLength={5}
          required
          placeholder={strings.placeholder}
          className="h-12 min-w-[240px] flex-1 rounded-full border border-[color:var(--color-surface-muted)] bg-white px-5 text-base text-[color:var(--color-foreground)] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
        />
        <Button type="submit" size="lg" aria-live="polite" data-min-duration="400">
          {strings.submit}
        </Button>
      </form>
      <p className="mt-4 text-xs text-[color:var(--color-foreground-muted)]">{strings.privacy}</p>
    </section>
  );
}
