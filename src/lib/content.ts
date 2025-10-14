import path from "node:path";
import { cache, type ReactElement } from "react";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import type { Locale } from "./i18n";
import { defaultLocale, localeDateFormatter } from "./i18n";
import { formatDate, invariant } from "./utils";

const contentRoot = path.join(process.cwd(), "src", "content");

const frontmatterSchema = z
  .object({
    title: z.string().min(3),
    summary: z.string().min(10),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.string().min(2),
    translatedFrom: z.string().min(2).optional(),
    translationSource: z.string().optional(),
    hero: z.string().optional(),
  })
  .transform((data) => ({
    ...data,
    tags: [...new Set(data.tags.map((tag) => tag.trim()))],
  }));

export type PostFrontmatter = z.infer<typeof frontmatterSchema>;

export interface PostSummary {
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  tags: string[];
  date: string;
  formattedDate: string;
  readingTime: string;
}

export interface PostDetail extends PostSummary {
  content: ReactElement;
}

async function readLocaleDirectory(locale: Locale) {
  const localeDir = path.join(contentRoot, locale);
  try {
    const files = await readdir(localeDir);
    return files.filter((file) => file.endsWith(".mdx"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

async function readPostSource(preferredLocale: Locale, slug: string) {
  const attempts = Array.from(new Set<Locale>([preferredLocale, defaultLocale]));

  for (const locale of attempts) {
    try {
      const source = await readFile(path.join(contentRoot, locale, `${slug}.mdx`), "utf8");
      return { source, fileLocale: locale };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
        throw error;
      }
    }
  }

  throw new Error(`Post '${slug}' not found for locales: ${attempts.join(", ")}`);
}

function createPostSummary({
  source,
  slug,
  displayLocale,
}: {
  source: string;
  slug: string;
  displayLocale: Locale;
}) {
  const { data, content } = matter(source);
  const parsed = frontmatterSchema.parse(data);

  const stats = readingTime(content);
  const formatter = localeDateFormatter[displayLocale];

  return {
    slug,
    locale: displayLocale,
    title: parsed.title,
    summary: parsed.summary,
    tags: parsed.tags,
    date: parsed.date.toISOString(),
    formattedDate: formatDate(formatter, parsed.date),
    readingTime: stats.text,
  } satisfies PostSummary;
}

export const getAllPosts = cache(async (locale: Locale) => {
  const localeFiles = await readLocaleDirectory(locale);
  const defaultFiles =
    locale === defaultLocale ? localeFiles : await readLocaleDirectory(defaultLocale);
  const slugs = new Set(
    [...localeFiles, ...defaultFiles].map((file) => file.replace(/\.mdx?$/, "")),
  );

  const summaries = await Promise.all(
    Array.from(slugs).map(async (slug) => {
      const { source } = await readPostSource(locale, slug);
      return createPostSummary({ source, slug, displayLocale: locale });
    }),
  );

  return summaries.sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPost = cache(async (locale: Locale, slug: string) => {
  const { source } = await readPostSource(locale, slug);
  const { data } = matter(source);
  const frontmatter = frontmatterSchema.parse(data);
  const { compileMDX } = await import("next-mdx-remote/rsc");
  const { content } = await compileMDX<PostFrontmatter>({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
    components: {},
  });

  const summary = createPostSummary({ source, slug, displayLocale: locale });

  invariant(frontmatter, `Missing frontmatter for ${slug}`);

  return {
    ...summary,
    content,
  } satisfies PostDetail;
});

export const getAllTags = cache(async (locale: Locale) => {
  const posts = await getAllPosts(locale);
  return Array.from(new Set(posts.flatMap((post) => post.tags))).sort((a, b) => a.localeCompare(b));
});
