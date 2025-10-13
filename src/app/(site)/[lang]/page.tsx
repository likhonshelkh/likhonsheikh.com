import { notFound } from "next/navigation";

import { ArticleGallery } from "@/components/layout/article-gallery";
import { Hero } from "@/components/layout/hero";
import { AboutSection } from "@/components/layout/about-section";
import { SubscribeSection } from "@/components/layout/subscribe-section";
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
      <ArticleGallery posts={posts} tags={tags} locale={locale} />
      <AboutSection locale={locale} />
      <SubscribeSection locale={locale} />
    </div>
  );
}
