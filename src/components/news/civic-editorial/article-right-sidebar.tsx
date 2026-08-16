import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { categoryToTopicSlug } from "@/lib/news-topics";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
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
  kicker,
  articles,
  numbered = false,
  showCategory = false,
}: {
  title: string;
  kicker: string;
  articles: PublicArticleRow[];
  numbered?: boolean;
  showCategory?: boolean;
}) {
  if (articles.length === 0) return null;

  const titleId = `sidebar-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section
      className={
        numbered
          ? "civic-sidebar-module civic-sidebar-module--ranked"
          : "civic-sidebar-module civic-sidebar-module--updates"
      }
      aria-labelledby={titleId}
    >
      <div className="civic-sidebar-module__head">
        <p className="civic-sidebar-module__kicker">{kicker}</p>
        <h2 id={titleId} className="civic-sidebar-module__title civic-sidebar-module__title--display">
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

function WhatsAppGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="civic-sidebar-wa__icon"
      aria-hidden
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.15 6.4 2.15 11.83c0 1.74.46 3.44 1.34 4.94L2 22l5.4-1.4a10 10 0 0 0 4.64 1.17h.01c5.46 0 9.89-4.4 9.89-9.84C21.94 6.4 17.5 2 12.04 2Zm5.76 14.05c-.24.68-1.4 1.3-1.94 1.38-.5.07-1.13.1-1.82-.11-.42-.13-.96-.31-1.65-.61-2.9-1.26-4.79-4.18-4.94-4.38-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1.01-2.41.26-.28.58-.35.77-.35h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.2-.14.31-.28.48-.14.16-.3.37-.42.5-.14.14-.28.3-.12.58.16.28.7 1.16 1.5 1.88 1.04.93 1.91 1.22 2.19 1.36.28.14.44.12.6-.07.16-.2.7-.81.88-1.09.19-.28.37-.23.62-.14.26.1 1.63.77 1.91.91.28.14.47.21.54.33.07.12.07.68-.17 1.36Z" />
    </svg>
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
      <div className="civic-sidebar-ad">
        <PageAdSlot shape="square" placement="article_sidebar" />
      </div>
      <SidebarArticleList
        kicker="Live desk"
        title="Chennai updates"
        articles={latestArticles}
        showCategory
      />
      {topicSlug && category ? (
        <section className="civic-sidebar-module civic-sidebar-module--cta">
          <div className="civic-sidebar-module__head">
            <p className="civic-sidebar-module__kicker">Keep reading</p>
            <h2 className="civic-sidebar-module__title civic-sidebar-module__title--display">
              {category}
            </h2>
          </div>
          <p className="civic-sidebar-module__text">
            More {category.toLowerCase()} stories and explainers for people who
            live here.
          </p>
          <Link
            href={`/chennai-local-news/topic/${topicSlug}`}
            className="civic-sidebar-topic-link"
          >
            Open the {category} desk
            <span aria-hidden>→</span>
          </Link>
        </section>
      ) : null}
      <SidebarArticleList
        kicker="Most read"
        title="Popular now"
        articles={relatedArticles}
        numbered
      />
      <section className="civic-sidebar-module civic-sidebar-module--community">
        <div className="civic-sidebar-wa__head">
          <WhatsAppGlyph />
          <div>
            <p className="civic-sidebar-module__kicker">Reader desk</p>
            <h2 className="civic-sidebar-module__title civic-sidebar-module__title--display">
              WhatsApp
            </h2>
          </div>
        </div>
        <JoinWhatsAppCommunityCard layout="sidebar" />
      </section>
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
