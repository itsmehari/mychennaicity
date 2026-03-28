import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicArticleRow } from "@/domains/news";
import {
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";
import { categoryToTopicSlug } from "@/lib/news-topics";

function ArticleListThumbnail({
  article,
}: {
  article: Pick<PublicArticleRow, "slug" | "heroImageUrl" | "title">;
}) {
  const src = resolveArticleHeroSrc(article);
  const useNext = articleHeroUsesNextImage(src);
  return (
    <div
      className="relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-md bg-[var(--border)] ring-1 ring-[color-mix(in_srgb,var(--foreground)_8%,transparent)] sm:h-16 sm:w-24"
      aria-hidden
    >
      {useNext ? (
        <Image
          src={src}
          alt=""
          fill
          className="object-cover transition duration-200 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 72px, 96px"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary editorial CDNs not in remotePatterns
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-200 group-hover:scale-[1.04]"
          loading="lazy"
        />
      )}
    </div>
  );
}

export function NewspaperMasthead({
  title = "Chennai local news",
  tagline = "Greater Chennai — report, analysis, and what to do next",
}: {
  title?: string;
  tagline?: string;
}) {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Kolkata",
  });
  return (
    <header className="border-b-2 border-[var(--foreground)] pb-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--muted)]">
            mychennaicity.in
          </p>
          <h1 className="type-display mt-1 text-4xl text-[var(--foreground)] sm:text-5xl">
            {title}
          </h1>
          <p className="type-lede mt-2 max-w-xl text-sm">{tagline}</p>
        </div>
        <p className="font-mono text-sm text-[var(--muted)]">{today}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Topics
        </span>
        {["Politics", "Chennai", "Elections", "Economy", "Consumer", "Mobility"].map(
          (cat) => (
            <Link
              key={cat}
              href={`/chennai-local-news/topic/${categoryToTopicSlug(cat)}`}
              className="rounded-full border border-[var(--border)] px-3 py-1 text-xs font-medium text-[var(--foreground)] hover:border-[var(--accent)]"
            >
              {cat}
            </Link>
          ),
        )}
        <Link
          href="/chennai-local-news/feed.xml"
          className="ml-auto text-xs font-medium text-[var(--accent)] hover:underline"
        >
          RSS
        </Link>
      </div>
    </header>
  );
}

export function LeadStory({
  article,
}: {
  article: PublicArticleRow;
}) {
  return (
    <article className="group lg:col-span-2">
      <Link href={`/chennai-local-news/${article.slug}`} className="block">
        {article.category ? (
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent-warm)]">
            {article.category}
          </span>
        ) : null}
        <h2 className="type-display mt-2 text-2xl leading-tight text-[var(--foreground)] group-hover:underline sm:text-3xl">
          {article.title}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          {article.dek ?? article.summary ?? ""}
        </p>
        {article.publishedAt ? (
          <time
            className="mt-3 block font-mono text-xs text-[var(--muted)]"
            dateTime={article.publishedAt.toISOString()}
          >
            {article.publishedAt.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeZone: "Asia/Kolkata",
            })}
          </time>
        ) : null}
      </Link>
    </article>
  );
}

export function StoryCardCompact({ article }: { article: PublicArticleRow }) {
  return (
    <article className="group break-inside-avoid border-b border-[var(--border)] py-4 last:border-0">
      <Link
        href={`/chennai-local-news/${article.slug}`}
        className="flex gap-3 sm:gap-4"
      >
        <ArticleListThumbnail article={article} />
        <div className="min-w-0 flex-1">
          {article.category ? (
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent)]">
              {article.category}
            </span>
          ) : null}
          <h3 className="mt-1 text-base font-semibold leading-snug tracking-tight text-[var(--foreground)] group-hover:underline">
            {article.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-[var(--muted)]">
            {article.dek ?? article.summary ?? ""}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function NewspaperGrid({
  lead,
  rest,
  sidebar,
}: {
  lead: PublicArticleRow;
  rest: PublicArticleRow[];
  sidebar?: ReactNode;
}) {
  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-3">
      <div className="space-y-8 lg:col-span-2">
        <LeadStory article={lead} />
        <div className="columns-1 gap-8 sm:columns-2">
          {rest.map((a) => (
            <StoryCardCompact key={a.id} article={a} />
          ))}
        </div>
      </div>
      <aside className="space-y-6 lg:border-l lg:border-[var(--border)] lg:pl-8">
        {sidebar}
      </aside>
    </div>
  );
}
