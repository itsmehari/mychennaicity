import Link from "next/link";
import type { ReactNode } from "react";
import type { PublicArticleRow } from "@/domains/news";
import { NewsStoryCard } from "@/components/news/chennai-news-hub";
import { categoryToTopicSlug } from "@/lib/news-topics";

/**
 * Compact topic-list card — same visual language as the news hub grid.
 * Kept for topic hubs and any callers that still import from this module.
 */
export function StoryCardCompact({ article }: { article: PublicArticleRow }) {
  return <NewsStoryCard article={article} />;
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
    <header className="mcc-news-hero" style={{ paddingTop: "1.5rem" }}>
      <div className="mcc-news-hero__inner">
        <p className="mcc-news-hero__eyebrow">mychennaicity.in</p>
        <h1 className="mcc-news-hero__title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
          {title}
        </h1>
        <p className="mcc-news-hero__lede">{tagline}</p>
        <div className="mcc-news-hero__meta">
          <time dateTime={new Date().toISOString()}>{today}</time>
        </div>
      </div>
      <div className="mcc-news-cats" style={{ position: "relative", zIndex: 1 }}>
        {["Politics", "Chennai", "Elections", "Economy", "Consumer", "Mobility"].map(
          (cat) => (
            <Link
              key={cat}
              href={`/chennai-local-news/topic/${categoryToTopicSlug(cat)}`}
              className="mcc-news-cats__item"
            >
              {cat}
            </Link>
          ),
        )}
        <Link
          href="/chennai-local-news/feed.xml"
          className="mcc-news-cats__item"
        >
          RSS
        </Link>
      </div>
    </header>
  );
}

/** @deprecated Prefer the Chennai news hub layout on `/chennai-local-news`. */
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
    <div className="mcc-news-layout" style={{ marginTop: "2rem" }}>
      <div className="mcc-news-layout__main">
        <div className="mcc-news-latest">
          <NewsStoryCard article={lead} />
          {rest.map((a) => (
            <NewsStoryCard key={a.id} article={a} />
          ))}
        </div>
      </div>
      {sidebar ? (
        <aside className="mcc-news-sidebar">{sidebar}</aside>
      ) : null}
    </div>
  );
}
