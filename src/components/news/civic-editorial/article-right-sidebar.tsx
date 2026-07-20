import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { ArticleAdRegion } from "@/ads/article-ad-region";
import { JoinWhatsAppCommunityCard } from "@/components/community/join-whatsapp-community";

function formatSidebarDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function SidebarArticleList({
  title,
  articles,
  numbered = false,
  showCategory = false,
}: {
  title: string;
  articles: PublicArticleRow[];
  numbered?: boolean;
  showCategory?: boolean;
}) {
  if (articles.length === 0) return null;

  const titleId = `sidebar-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section
      className="civic-sidebar-module"
      aria-labelledby={titleId}
    >
      <div className="civic-sidebar-module__head">
        <h2 id={titleId} className="civic-sidebar-module__title">
          {title}
        </h2>
      </div>
      <ul
        className={
          numbered
            ? "civic-sidebar-module__list civic-sidebar-module__list--numbered"
            : "civic-sidebar-module__list"
        }
      >
        {articles.map((a, i) => (
          <li key={a.id} className="civic-sidebar-module__item">
            <Link
              href={`/chennai-local-news/${a.slug}`}
              className="civic-sidebar-link"
            >
              {numbered ? (
                <span className="civic-sidebar-link__index" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              ) : null}
              <span className="civic-sidebar-link__body">
                {showCategory && a.category ? (
                  <span className="civic-sidebar-link__chip">{a.category}</span>
                ) : null}
                <span className="civic-sidebar-link__title">{a.title}</span>
                {a.publishedAt ? (
                  <time
                    dateTime={a.publishedAt.toISOString()}
                    className="civic-sidebar-link__date"
                  >
                    {formatSidebarDate(a.publishedAt)}
                  </time>
                ) : null}
              </span>
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
      <SidebarArticleList
        title="Chennai updates"
        articles={latestArticles}
        showCategory
      />
      {topicSlug && category ? (
        <section className="civic-sidebar-module civic-sidebar-module--cta">
          <div className="civic-sidebar-module__head">
            <h2 className="civic-sidebar-module__title">Related guides</h2>
          </div>
          <p className="civic-sidebar-module__text">
            More {category.toLowerCase()} stories and explainers for Chennai
            residents.
          </p>
          <Link
            href={`/chennai-local-news/topic/${topicSlug}`}
            className="civic-sidebar-topic-link"
          >
            Browse {category} topic
            <span aria-hidden> →</span>
          </Link>
        </section>
      ) : null}
      <SidebarArticleList
        title="Popular now"
        articles={relatedArticles}
        numbered
      />
      <div className="civic-sidebar-module civic-sidebar-module--community">
        <JoinWhatsAppCommunityCard layout="inline" />
      </div>
      <div className="civic-sidebar-module civic-sidebar-module--ad">
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
