import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { ArticleAdRegion } from "@/ads/article-ad-region";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";

function formatDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  });
}

function SidebarArticleList({
  title,
  articles,
}: {
  title: string;
  articles: PublicArticleRow[];
}) {
  if (articles.length === 0) return null;

  return (
    <section className="civic-sidebar-block" aria-labelledby={`sidebar-${title}`}>
      <h2 id={`sidebar-${title}`} className="civic-sidebar-block__title">
        {title}
      </h2>
      <ul className="civic-sidebar-block__list">
        {articles.map((a) => (
          <li key={a.id}>
            <Link
              href={`/chennai-local-news/${a.slug}`}
              className="civic-sidebar-link"
            >
              <span className="civic-sidebar-link__title">{a.title}</span>
              {a.publishedAt ? (
                <time
                  dateTime={a.publishedAt.toISOString()}
                  className="civic-sidebar-link__date"
                >
                  {formatDate(a.publishedAt)}
                </time>
              ) : null}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArticleRightSidebar({
  latestArticles,
  relatedArticles,
  category,
}: {
  latestArticles: PublicArticleRow[];
  relatedArticles: PublicArticleRow[];
  category: string | null;
}) {
  const topicSlug = category ? categoryToTopicSlug(category) : null;

  return (
    <aside className="civic-right-sidebar" aria-label="Chennai updates and guides">
      <SidebarArticleList title="Chennai updates" articles={latestArticles} />
      {topicSlug && category ? (
        <section className="civic-sidebar-block" aria-label="Related guides">
          <h2 className="civic-sidebar-block__title">Related guides</h2>
          <p className="civic-sidebar-block__text">
            More {category.toLowerCase()} stories and explainers for Chennai
            residents.
          </p>
          <Link
            href={`/chennai-local-news/topic/${topicSlug}`}
            className="civic-sidebar-topic-link"
          >
            Browse {category} topic →
          </Link>
        </section>
      ) : null}
      <SidebarArticleList title="Popular now" articles={relatedArticles} />
      <div className="civic-sidebar-block">
        <JoinWhatsAppCommunityCard layout="inline" />
      </div>
      <div className="civic-sidebar-ad">
        <ArticleAdRegion
          slotId="article-sidebar"
          size="300x250"
          adsenseSlotEnvKey="ARTICLE_MID"
        />
      </div>
    </aside>
  );
}

export function OfficialSourcesBlock({
  sourceName,
  sourceUrl,
}: {
  sourceName: string | null;
  sourceUrl: string | null;
}) {
  if (!sourceUrl && !sourceName) return null;

  return (
    <section className="civic-sources" aria-labelledby="civic-sources-heading">
      <h2 id="civic-sources-heading" className="civic-sources__title">
        Official sources
      </h2>
      <p className="civic-sources__intro">
        This page is an editorial rephrase and analysis based on publicly
        reported information. Read the original source for full context.
      </p>
      <ul className="civic-sources__list">
        {sourceUrl && sourceName ? (
          <li className="civic-source-card">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="civic-source-card__link"
            >
              <span className="civic-source-card__name">{sourceName}</span>
              <span className="civic-source-card__desc">
                Primary source — open original report
              </span>
              <span className="civic-source-card__external" aria-hidden>
                ↗
              </span>
            </a>
          </li>
        ) : null}
        <li className="civic-source-card">
          <Link href="/chennai-local-news" className="civic-source-card__link">
            <span className="civic-source-card__name">MyChennaiCity news desk</span>
            <span className="civic-source-card__desc">
              Chennai local news and civic explainers
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
