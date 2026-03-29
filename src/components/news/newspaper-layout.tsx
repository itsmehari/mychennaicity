import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicArticleRow } from "@/domains/news";
import {
  articleHeroAlt,
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";
import { categoryToTopicSlug } from "@/lib/news-topics";

function categoryLabelTone(category: string | null | undefined): "warm" | "cool" {
  if (!category) return "cool";
  const c = category.toLowerCase();
  if (
    c.includes("election") ||
    c.includes("politic") ||
    c.includes("party") ||
    c.includes("mla") ||
    c.includes("nda")
  ) {
    return "warm";
  }
  return "cool";
}

function CategoryEyebrow({ category }: { category: string | null | undefined }) {
  if (!category) return null;
  const tone = categoryLabelTone(category);
  return (
    <span
      className={`inline-block text-[10px] font-bold uppercase tracking-[0.14em] sm:text-[11px] ${
        tone === "warm"
          ? "text-[var(--accent-warm)]"
          : "text-[var(--accent)]"
      }`}
    >
      {category}
    </span>
  );
}

type HeroPick = Pick<
  PublicArticleRow,
  "slug" | "heroImageUrl" | "title" | "category"
>;

function ArticleListThumbnail({ article }: { article: HeroPick }) {
  const src = resolveArticleHeroSrc(article);
  const useNext = articleHeroUsesNextImage(src);
  return (
    <div
      className="relative aspect-[4/3] w-[5.25rem] shrink-0 overflow-hidden rounded-xl bg-[var(--border)] shadow-[0_1px_3px_color-mix(in_srgb,var(--foreground)_12%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--foreground)_6%,transparent)] transition-[box-shadow,ring-color] duration-200 group-hover:shadow-md group-hover:ring-[color-mix(in_srgb,var(--accent)_35%,transparent)] sm:w-[6.75rem]"
      aria-hidden
    >
      {useNext ? (
        <Image
          src={src}
          alt={articleHeroAlt(article)}
          fill
          className="object-cover transition duration-300 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 84px, 108px"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary editorial CDNs not in remotePatterns
        <img
          src={src}
          alt={articleHeroAlt(article)}
          className="absolute inset-0 h-full w-full object-cover transition duration-300 ease-out group-hover:scale-[1.05]"
          loading="lazy"
        />
      )}
    </div>
  );
}

function LeadStoryHero({ article }: { article: HeroPick }) {
  const src = resolveArticleHeroSrc(article);
  const useNext = articleHeroUsesNextImage(src);
  return (
    <div
      className="relative mb-6 aspect-[2/1] w-full overflow-hidden rounded-2xl bg-[var(--border)] shadow-[0_4px_24px_color-mix(in_srgb,var(--foreground)_10%,transparent)] ring-1 ring-[color-mix(in_srgb,var(--foreground)_8%,transparent)] transition duration-300 group-hover:ring-[color-mix(in_srgb,var(--accent)_28%,transparent)] sm:aspect-[21/9]"
      aria-hidden
    >
      {useNext ? (
        <Image
          src={src}
          alt={articleHeroAlt(article)}
          fill
          className="object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 66vw"
          priority
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary editorial CDNs not in remotePatterns
        <img
          src={src}
          alt={articleHeroAlt(article)}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
          loading="eager"
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color-mix(in_srgb,var(--foreground)_45%,transparent)] via-transparent to-transparent opacity-80"
        aria-hidden
      />
    </div>
  );
}

export function NewspaperMasthead({
  title = "Chennai local news",
  tagline = "Chennai and nearby — what happened and why it matters",
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
        <LeadStoryHero article={article} />
        <div className="max-w-3xl">
          <CategoryEyebrow category={article.category} />
          <h2 className="type-display mt-3 text-2xl leading-[1.2] text-[var(--foreground)] decoration-[var(--accent)] decoration-2 underline-offset-4 group-hover:underline sm:text-3xl sm:leading-[1.15]">
            {article.title}
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--muted)] sm:text-base">
            {article.dek ?? article.summary ?? ""}
          </p>
          {article.publishedAt ? (
            <time
              className="mt-4 block font-mono text-[11px] uppercase tracking-wider text-[var(--muted)]"
              dateTime={article.publishedAt.toISOString()}
            >
              {article.publishedAt.toLocaleString("en-IN", {
                dateStyle: "medium",
                timeZone: "Asia/Kolkata",
              })}
            </time>
          ) : null}
        </div>
      </Link>
    </article>
  );
}

export function StoryCardCompact({ article }: { article: PublicArticleRow }) {
  return (
    <article className="group break-inside-avoid mb-5 last:mb-0 sm:mb-6">
      <Link
        href={`/chennai-local-news/${article.slug}`}
        className="-mx-1 flex items-start gap-4 rounded-xl px-1 py-3 transition-colors duration-200 sm:gap-5 sm:px-2 sm:py-4 hover:bg-[color-mix(in_srgb,var(--accent)_5%,var(--surface))] dark:hover:bg-[color-mix(in_srgb,var(--accent)_8%,var(--surface))]"
      >
        <ArticleListThumbnail article={article} />
        <div className="min-w-0 flex-1 pt-0.5">
          <CategoryEyebrow category={article.category} />
          <h3 className="mt-2 text-[1.0625rem] font-semibold leading-snug tracking-tight text-[var(--foreground)] sm:text-lg sm:leading-snug">
            <span className="[text-decoration-color:transparent] decoration-2 underline-offset-[0.2em] transition-colors duration-200 group-hover:underline group-hover:[text-decoration-color:var(--accent)]">
              {article.title}
            </span>
          </h3>
          <p className="mt-2 line-clamp-2 text-[0.8125rem] leading-relaxed text-[var(--muted)] sm:text-sm">
            {article.dek ?? article.summary ?? ""}
          </p>
          {article.publishedAt ? (
            <time
              className="mt-2.5 block font-mono text-[10px] uppercase tracking-wider text-[color-mix(in_srgb,var(--muted)_88%,var(--foreground))]"
              dateTime={article.publishedAt.toISOString()}
            >
              {article.publishedAt.toLocaleString("en-IN", {
                dateStyle: "medium",
                timeZone: "Asia/Kolkata",
              })}
            </time>
          ) : null}
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
        <div className="columns-1 gap-x-10 gap-y-0 sm:columns-2">
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
