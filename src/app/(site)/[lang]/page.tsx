import { Suspense } from "react";
import { notFound } from "next/navigation";

import { ArticleGallery } from "@/components/layout/article-gallery";
import { Hero } from "@/components/layout/hero";
import { AboutSection } from "@/components/layout/about-section";
import { SubscribeSection } from "@/components/layout/subscribe-section";
import { PackageMaintenanceSection } from "@/components/layout/package-maintenance-section";
import { MotionSection } from "@/components/layout/motion-section";
import { getAllPosts, getAllTags } from "@/lib/content";
import { isLocale, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function LocalePage({ params }: Props) {
  const resolved = await params;
  if (!isLocale(resolved.lang)) {
    notFound();
  }

  const locale = resolved.lang as Locale;
  const [posts, tags] = await Promise.all([getAllPosts(locale), getAllTags(locale)]);

  return (
    <div className="flex flex-col gap-12">
      <Hero locale={locale} />
      <MotionSection locale={locale} />
      <Suspense fallback={<ArticleGalleryFallback />}>
        <ArticleGallery posts={posts} tags={tags} locale={locale} />
      </Suspense>
      <AboutSection locale={locale} />
      <PackageMaintenanceSection locale={locale} />
      <SubscribeSection locale={locale} />
    </div>
  );
}

function ArticleGalleryFallback() {
  return (
    <section
      aria-busy="true"
      aria-live="polite"
      className="space-y-6"
      aria-label="Loading articles"
    >
      <div className="flex flex-col gap-2">
        <div className="h-6 w-40 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-8 w-16 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]"
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex flex-col gap-4 rounded-3xl border border-[color:var(--color-surface-muted)] p-6"
          >
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded-full bg-[color:var(--color-surface-muted)]" />
              <div className="h-4 w-5/6 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]" />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 2 }).map((_, badgeIndex) => (
                <div
                  key={badgeIndex}
                  className="h-6 w-20 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
