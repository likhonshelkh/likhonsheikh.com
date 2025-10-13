"use client";

import Link from "next/link";
import { useMemo } from "react";
import { parseAsString, useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { PostSummary } from "@/lib/content";
import { localeDateFormatter, type Locale } from "@/lib/i18n";
import { cn, formatDate } from "@/lib/utils";

interface Props {
  posts: PostSummary[];
  tags: string[];
  locale: Locale;
}

const copy: Record<Locale, { empty: string; reset: string; postsLabel: string }> = {
  en: {
    empty: "No articles match this filter yet.",
    reset: "Reset",
    postsLabel: "All articles",
  },
  bn: {
    empty: "এখনও এই ফিল্টারে কোন লেখা নেই।",
    reset: "রিসেট",
    postsLabel: "সব লেখা",
  },
};

export function ArticleGallery({ posts, tags, locale }: Props) {
  const [tag, setTag] = useQueryState("tag", parseAsString.withDefault(""));
  const formatter = localeDateFormatter[locale];
  const strings = copy[locale];

  const filtered = useMemo(() => {
    if (!tag) return posts;
    return posts.filter((post) => post.tags.includes(tag));
  }, [tag, posts]);

  return (
    <section id="articles" aria-label={strings.postsLabel} className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-semibold text-[color:var(--color-foreground)]">
          {strings.postsLabel}
        </h2>
        {tags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-2" role="toolbar" aria-label="Filter articles by tag">
            {tags.map((current) => {
              const active = current === tag;
              return (
                <button
                  key={current}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setTag(active ? null : current)}
                  className={cn(
                    buttonVariants({ size: "sm", variant: active ? "solid" : "outline" }),
                    "rounded-full"
                  )}
                >
                  <span>{current}</span>
                </button>
              );
            })}
            {tag ? (
              <button
                type="button"
                className={cn(buttonVariants({ size: "sm", variant: "subtle" }))}
                onClick={() => setTag(null)}
                aria-label={strings.reset}
              >
                {strings.reset}
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((post) => (
          <Card key={post.slug} className="focus-within-ring">
            <CardHeader>
              <CardTitle>
                <Link
                  href={`/${post.locale}/${post.slug}`}
                  className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
                >
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription>{post.summary}</CardDescription>
            </CardHeader>
            <CardFooter className="flex-wrap gap-3 text-[color:var(--color-foreground-muted)]">
              <div className="flex items-center gap-2 text-xs">
                <span>{formatDate(formatter, post.date)}</span>
                <span aria-hidden>•</span>
                <span>{post.readingTime}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tagName) => (
                  <Badge
                    key={tagName}
                    variant={tagName === tag ? "default" : "outline"}
                    className={cn(tagName === tag && "ring-2 ring-[color:var(--ring)]")}
                  >
                    {tagName}
                  </Badge>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p role="status" className="rounded-3xl border border-dashed border-[color:var(--color-surface-muted)] p-8 text-center text-sm text-[color:var(--color-foreground-muted)]">
          {strings.empty}
        </p>
      ) : null}
    </section>
  );
}
