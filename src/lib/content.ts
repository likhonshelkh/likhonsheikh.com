import path from "node:path";
import { cache, type ReactElement } from "react";
import { readFile, readdir } from "node:fs/promises";
import matter from "gray-matter";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import { z } from "zod";

import type { Locale } from "./i18n";
import { localeDateFormatter, locales } from "./i18n";
import { formatDate, invariant } from "./utils";

const contentRoot = path.join(process.cwd(), "src", "content");

const frontmatterSchema = z
  .object({
    title: z.string().min(3),
    summary: z.string().min(10),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    lang: z.string().optional(),
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
  const files = await readdir(localeDir);
  return files.filter((file) => file.endsWith(".mdx"));
}

async function parseFrontmatter(locale: Locale, fileName: string) {
  const source = await readFile(path.join(contentRoot, locale, fileName), "utf8");
  const { data, content } = matter(source);
  const parsed = frontmatterSchema.parse(data);

  const slug = fileName.replace(/\.mdx?$/, "");
  const stats = readingTime(content);
  const formatter = localeDateFormatter[locale];

  return {
    slug,
    locale,
    title: parsed.title,
    summary: parsed.summary,
    tags: parsed.tags,
    date: parsed.date.toISOString(),
    formattedDate: formatDate(formatter, parsed.date),
    readingTime: stats.text,
  } satisfies PostSummary;
}

const readPostsByLocale = cache(async (locale: Locale) => {
  const files = await readLocaleDirectory(locale);
  const summaries = await Promise.all(files.map((file) => parseFrontmatter(locale, file)));
  return summaries.sort((a, b) => (a.date < b.date ? 1 : -1));
});

const slugLookupCache = cache(async () => {
  const entries = await Promise.all(
    locales.map(async (locale) => {
      const files = await readLocaleDirectory(locale);
      const slugs = new Set(files.map((file) => file.replace(/\.mdx?$/, "")));
      return [locale, slugs] as const;
    })
  );

  return new Map(entries);
});

export interface GetAllPostsOptions {
  withSlugLookup?: boolean;
}

export type SlugLookup = Map<Locale, Set<string>>;

export async function getAllPosts(locale: Locale): Promise<PostSummary[]>;
export async function getAllPosts(
  locale: Locale,
  options: { withSlugLookup: true }
): Promise<{ posts: PostSummary[]; slugLookup: SlugLookup }>;
export async function getAllPosts(
  locale: Locale,
  options?: GetAllPostsOptions
): Promise<PostSummary[] | { posts: PostSummary[]; slugLookup: SlugLookup }> {
  const posts = await readPostsByLocale(locale);

  if (options?.withSlugLookup) {
    const slugLookup = await slugLookupCache();
    return { posts, slugLookup };
  }

  return posts;
}

export const getPost = cache(async (locale: Locale, slug: string) => {
  const filePath = path.join(contentRoot, locale, `${slug}.mdx`);
  const source = await readFile(filePath, "utf8");
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

  const summary = await parseFrontmatter(locale, `${slug}.mdx`);

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
