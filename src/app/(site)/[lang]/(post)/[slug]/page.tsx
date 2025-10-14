import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button-variants";
import { ArticleBody } from "@/components/layout/article-body";
import { getAllPosts, getPost } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

const copy: Record<Locale, { back: string }> = {
  en: {
    back: "Back to articles",
  },
  bn: {
    back: "সব লেখায় ফিরুন",
  },
};

export async function generateStaticParams() {
  const results = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllPosts(locale);
      return posts.map((post) => ({ lang: locale, slug: post.slug }));
    })
  );

  return results.flat();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  if (!isLocale(resolved.lang)) {
    return {};
  }

  const locale = resolved.lang as Locale;
  const { posts, slugLookup } = await getAllPosts(locale, { withSlugLookup: true });
  const post = posts.find((entry) => entry.slug === resolved.slug);

  if (!post) {
    return {};
  }

  const languages: Record<string, string> = {};

  for (const [language, slugs] of slugLookup) {
    if (slugs.has(resolved.slug)) {
      languages[language] = `/${language}/${post.slug}`;
    }
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      languages,
    },
    openGraph: {
      title: post.title,
      description: post.summary,
      locale: locale === "bn" ? "bn_BD" : "en_US",
    },
  } satisfies Metadata;
}

export default async function PostPage({ params }: Props) {
  const resolved = await params;
  if (!isLocale(resolved.lang)) {
    notFound();
  }
  const locale = resolved.lang as Locale;
  const post = await getPost(locale, resolved.slug);
  const strings = copy[locale];

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
      <div>
        <Link href={`/${locale}`} prefetch className={buttonVariants({ variant: "subtle" })}>
          ← {strings.back}
        </Link>
      </div>
      <ArticleBody post={post} />
    </div>
  );
}
