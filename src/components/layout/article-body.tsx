import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import type { PostDetail } from "@/lib/content";
import { localeDateFormatter, type Locale } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

const copy: Record<Locale, { readingTime: string; tags: string }> = {
  en: {
    readingTime: "Reading time",
    tags: "Tags",
  },
  bn: {
    readingTime: "পড়ার সময়",
    tags: "ট্যাগ",
  },
};

export function ArticleBody({
  post,
}: {
  post: PostDetail & { content: ReactElement };
}) {
  const strings = copy[post.locale];
  const formatter = localeDateFormatter[post.locale];

  return (
    <article className="prose prose-neutral max-w-3xl text-base" data-locale={post.locale}>
      <header className="mb-10 space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-[color:var(--color-foreground-muted)]">
          {formatDate(formatter, post.date)}
        </p>
        <h1 className="text-balance text-4xl font-bold text-[color:var(--color-foreground)]">{post.title}</h1>
        <p className="text-pretty text-[color:var(--color-foreground-muted)]">{post.summary}</p>
        <dl className="flex flex-wrap items-center gap-4 text-xs text-[color:var(--color-foreground-muted)]">
          <div className="flex items-center gap-2">
            <dt className="font-semibold">{strings.readingTime}</dt>
            <dd>{post.readingTime}</dd>
          </div>
          {post.tags.length ? (
            <div className="flex flex-wrap items-center gap-2">
              <dt className="font-semibold">{strings.tags}</dt>
              <dd className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </dd>
            </div>
          ) : null}
        </dl>
      </header>
      <div className="prose prose-lg prose-headings:font-semibold prose-a:text-[color:var(--color-accent-strong)] prose-pre:rounded-2xl prose-pre:bg-[color:var(--color-surface-muted)] prose-code:font-medium">
        {post.content}
      </div>
    </article>
  );
}
