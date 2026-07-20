import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import type { PublicEventRow } from "@/domains/events";
import { ArticleMedia } from "@/components/news/article-media";
import {
  articleHeroAlt,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";
import {
  estimateReadingTimeMinutes,
  formatReadingTime,
} from "@/lib/article-reading-time";
import { chennaiZones } from "@/lib/chennai-zones";
import { areaHubSlugForArticle } from "@/lib/news-area-hint";
import { CHENNAI_NEWS_TOPIC_NAV } from "@/lib/news-topics";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
} from "@/lib/routes/chennai-jobs";
import { WHATSAPP_COMMUNITY_PAGE_PATH } from "@/lib/whatsapp-community";

const IST = "Asia/Kolkata";

const SIDEBAR_AREAS = [
  { label: "OMR", slug: "omr-perungudi-sholinganallur" },
  { label: "Adyar", slug: "adyar-thiruvanmiyur" },
  { label: "Anna Nagar", slug: "ambattur-annanagar" },
  { label: "T. Nagar", slug: "kodambakkam-t-nagar" },
  { label: "Nungambakkam", slug: "teynampet-nungambakkam" },
  { label: "Guindy", slug: "saidapet-guindy-alandur" },
  { label: "Royapuram", slug: "royapuram-tondiarpet" },
  { label: "Porur", slug: "valasaravakkam-porur" },
] as const;

const AREA_STRIP_SLUGS = [
  "tiruvottiyur-manali-belt",
  "royapuram-tondiarpet",
  "teynampet-nungambakkam",
  "adyar-thiruvanmiyur",
  "omr-perungudi-sholinganallur",
  "ambattur-annanagar",
  "kodambakkam-t-nagar",
  "valasaravakkam-porur",
] as const;

function excerpt(article: PublicArticleRow): string {
  return (article.dek ?? article.summary ?? "").trim();
}

function readingLabel(article: PublicArticleRow): string {
  const text = [excerpt(article), article.body ?? ""].join(" ");
  return formatReadingTime(estimateReadingTimeMinutes(text));
}

function formatDate(d: Date | null | undefined): string {
  if (!d) return "";
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: IST,
  });
}

function formatLongDate(d: Date): string {
  return d.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: IST,
  });
}

function relativeUpdated(from: Date, now = new Date()): string {
  const mins = Math.max(0, Math.round((now.getTime() - from.getTime()) / 60000));
  if (mins < 1) return "Updated just now";
  if (mins < 60) return `Updated ${mins} minute${mins === 1 ? "" : "s"} ago`;
  const hours = Math.round(mins / 60);
  if (hours < 36) return `Updated ${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `Updated ${days} day${days === 1 ? "" : "s"} ago`;
}

function categoryTone(
  category: string | null | undefined,
): "civic" | "politics" | "environment" | "consumer" | "default" {
  const c = (category ?? "").toLowerCase();
  if (c.includes("politic") || c.includes("election")) return "politics";
  if (c.includes("consumer")) return "consumer";
  if (c.includes("environ") || c.includes("water") || c.includes("waste")) {
    return "environment";
  }
  if (c.includes("chennai") || c.includes("civic") || c.includes("mobility")) {
    return "civic";
  }
  return "default";
}

export type EditorialBadge =
  | "investigation"
  | "explainer"
  | "public-notice"
  | "developing"
  | null;

export function editorialBadgeForArticle(
  article: PublicArticleRow,
): EditorialBadge {
  const hay = `${article.title} ${excerpt(article)} ${article.category ?? ""}`.toLowerCase();
  if (
    hay.includes("dvac") ||
    hay.includes("raid") ||
    hay.includes("investigation") ||
    hay.includes("probe")
  ) {
    return "investigation";
  }
  if (
    hay.includes("explain") ||
    hay.includes("bye-law") ||
    hay.includes("byelaw") ||
    hay.includes("what the") ||
    hay.includes("how to")
  ) {
    return "explainer";
  }
  if (
    hay.includes("deadline") ||
    hay.includes("notice") ||
    hay.includes("registration") ||
    hay.includes("public notice")
  ) {
    return "public-notice";
  }
  if (article.featured) return "developing";
  return null;
}

function badgeLabel(kind: NonNullable<EditorialBadge>): string {
  switch (kind) {
    case "investigation":
      return "Investigation";
    case "explainer":
      return "Explainer";
    case "public-notice":
      return "Public notice";
    case "developing":
      return "Developing";
  }
}

function CategoryKicker({
  category,
  badge,
}: {
  category: string | null | undefined;
  badge?: EditorialBadge;
}) {
  const tone = categoryTone(category);
  return (
    <div className="mcc-news-kicker">
      {category ? (
        <span
          className="mcc-news-kicker__cat"
          data-tone={tone === "default" ? undefined : tone}
        >
          {category}
        </span>
      ) : null}
      {badge ? (
        <span className="mcc-news-badge" data-kind={badge}>
          {badgeLabel(badge)}
        </span>
      ) : null}
    </div>
  );
}

function MetaLine({ article }: { article: PublicArticleRow }) {
  const date = formatDate(article.publishedAt);
  const read = readingLabel(article);
  return (
    <span className="mcc-news-card__meta">
      {date}
      {date && read ? " · " : ""}
      {read}
    </span>
  );
}

export function NewsHubHero({
  latestPublishedAt,
  storyCountToday,
}: {
  latestPublishedAt: Date | null;
  storyCountToday: number;
}) {
  const now = new Date();
  return (
    <>
      <header className="mcc-news-hero">
        <div className="mcc-news-hero__inner">
          <p className="mcc-news-hero__eyebrow">mychennaicity.in</p>
          <h1 className="mcc-news-hero__title">Chennai Local News</h1>
          <p className="mcc-news-hero__lede">
            Latest civic updates, public-interest reports, neighbourhood
            developments, government announcements and stories that affect
            Chennai residents.
          </p>
          <div className="mcc-news-hero__meta">
            <time dateTime={now.toISOString()}>{formatLongDate(now)}</time>
            {latestPublishedAt ? (
              <span>{relativeUpdated(latestPublishedAt, now)}</span>
            ) : null}
          </div>
        </div>
      </header>
      <div className="mcc-news-utility" aria-label="Newsroom status">
        {latestPublishedAt ? (
          <span>
            Desk clock{" "}
            <strong>
              {latestPublishedAt.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: IST,
                hour12: false,
              })}{" "}
              IST
            </strong>
          </span>
        ) : null}
        <span>
          <strong>{storyCountToday}</strong>{" "}
          {storyCountToday === 1 ? "story" : "stories"} in today&apos;s file
        </span>
        <Link href="/chennai-local-news/feed.xml">RSS feed</Link>
      </div>
    </>
  );
}

export function NewsCategoryNav({ activeSlug }: { activeSlug?: string }) {
  return (
    <nav className="mcc-news-cats" aria-label="Browse news by topic">
      <Link
        href="/chennai-local-news"
        className={`mcc-news-cats__item${!activeSlug ? " is-active" : ""}`}
      >
        Latest
      </Link>
      {CHENNAI_NEWS_TOPIC_NAV.map((t) => (
        <Link
          key={t.slug}
          href={`/chennai-local-news/topic/${t.slug}`}
          className={`mcc-news-cats__item${
            activeSlug === t.slug ? " is-active" : ""
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

export function NewsBreakingStrip({ article }: { article: PublicArticleRow }) {
  return (
    <div className="mcc-news-breaking" role="status">
      <span className="mcc-news-breaking__label">Breaking</span>
      <Link
        href={`/chennai-local-news/${article.slug}`}
        className="mcc-news-breaking__link"
      >
        {article.title}
      </Link>
    </div>
  );
}

export function NewsLeadCard({ article }: { article: PublicArticleRow }) {
  const src = resolveArticleHeroSrc(article);
  const badge = editorialBadgeForArticle(article);
  return (
    <Link
      href={`/chennai-local-news/${article.slug}`}
      className="mcc-news-lead"
    >
      <span className="mcc-news-lead__media">
        <ArticleMedia
          src={src}
          alt={articleHeroAlt(article)}
          sizes="(max-width: 900px) 100vw, 60vw"
          priority
        />
      </span>
      <div className="mcc-news-lead__body">
        <CategoryKicker category={article.category} badge={badge} />
        <h2 className="mcc-news-lead__title">{article.title}</h2>
        {excerpt(article) ? (
          <p className="mcc-news-lead__excerpt">{excerpt(article)}</p>
        ) : null}
        <div className="mcc-news-lead__meta">
          <span>
            {formatDate(article.publishedAt)}
            {" · "}
            {readingLabel(article)}
          </span>
          <span className="mcc-news-lead__cta">Read full report →</span>
        </div>
      </div>
    </Link>
  );
}

export function NewsSecondaryCard({ article }: { article: PublicArticleRow }) {
  const src = resolveArticleHeroSrc(article);
  return (
    <Link
      href={`/chennai-local-news/${article.slug}`}
      className="mcc-news-secondary"
    >
      <span className="mcc-news-secondary__media">
        <ArticleMedia
          src={src}
          alt={articleHeroAlt(article)}
          sizes="144px"
        />
      </span>
      <div>
        <CategoryKicker
          category={article.category}
          badge={editorialBadgeForArticle(article)}
        />
        <h3 className="mcc-news-secondary__title">{article.title}</h3>
        <p className="mcc-news-secondary__meta">
          {formatDate(article.publishedAt)} · {readingLabel(article)}
        </p>
      </div>
    </Link>
  );
}

export function NewsStoryCard({ article }: { article: PublicArticleRow }) {
  const src = resolveArticleHeroSrc(article);
  return (
    <Link
      href={`/chennai-local-news/${article.slug}`}
      className="mcc-news-card"
    >
      <span className="mcc-news-card__media">
        <ArticleMedia
          src={src}
          alt={articleHeroAlt(article)}
          sizes="(max-width: 640px) 100vw, 420px"
        />
      </span>
      <div className="mcc-news-card__body">
        <CategoryKicker
          category={article.category}
          badge={editorialBadgeForArticle(article)}
        />
        <h3 className="mcc-news-card__title">{article.title}</h3>
        {excerpt(article) ? (
          <p className="mcc-news-card__excerpt">{excerpt(article)}</p>
        ) : null}
        <MetaLine article={article} />
      </div>
    </Link>
  );
}

export function NewsFeaturedBand({
  lead,
  secondary,
}: {
  lead: PublicArticleRow;
  secondary: PublicArticleRow[];
}) {
  return (
    <section className="mcc-news-featured" aria-label="Featured stories">
      <NewsLeadCard article={lead} />
      <div className="mcc-news-featured__side">
        {secondary.map((a) => (
          <NewsSecondaryCard key={a.id} article={a} />
        ))}
      </div>
    </section>
  );
}

export function NewsSidebar({
  trending,
  events,
}: {
  trending: PublicArticleRow[];
  events: PublicEventRow[];
}) {
  return (
    <aside className="mcc-news-sidebar" aria-label="Discover more">
      <div className="mcc-news-panel">
        <h2 className="mcc-news-panel__title">Most read</h2>
        <ol className="mcc-news-trending">
          {trending.slice(0, 5).map((a, i) => (
            <li key={a.id} className="mcc-news-trending__item">
              <span className="mcc-news-trending__num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <Link
                href={`/chennai-local-news/${a.slug}`}
                className="mcc-news-trending__link"
              >
                {a.title}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="mcc-news-panel mcc-news-jobs-panel">
        <h2 className="mcc-news-panel__title">Work in Chennai</h2>
        <p>
          Looking for work in Chennai? Browse verified vacancies across IT,
          retail, healthcare, education and services.
        </p>
        <div className="mcc-news-jobs-panel__actions">
          <Link
            href={CHENNAI_JOBS_HUB_PATH}
            className="mcc-news-btn mcc-news-btn--primary"
          >
            Explore Chennai Jobs
          </Link>
          <Link
            href={CHENNAI_JOBS_LOOKING_PATH}
            className="mcc-news-btn mcc-news-btn--ghost"
          >
            Looking for work
          </Link>
        </div>
      </div>

      <div className="mcc-news-panel">
        <h2 className="mcc-news-panel__title">Explore by area</h2>
        <ul className="mcc-news-areas">
          {SIDEBAR_AREAS.map((a) => (
            <li key={a.slug}>
              <Link href={`/areas/${a.slug}`}>{a.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      {events.length > 0 ? (
        <div className="mcc-news-panel">
          <h2 className="mcc-news-panel__title">Upcoming local events</h2>
          <ul className="mcc-news-events">
            {events.slice(0, 3).map((e) => {
              const start =
                e.startsAt instanceof Date
                  ? e.startsAt
                  : new Date(e.startsAt);
              const day = start.toLocaleDateString("en-IN", {
                day: "numeric",
                timeZone: IST,
              });
              const mon = start.toLocaleDateString("en-IN", {
                month: "short",
                timeZone: IST,
              });
              return (
                <li key={e.id} className="mcc-news-events__item">
                  <div className="mcc-news-events__date" aria-hidden>
                    <strong>{day}</strong>
                    <span>{mon}</span>
                  </div>
                  <div>
                    <Link
                      href={`/chennai-local-events/${e.slug}`}
                      className="mcc-news-events__link"
                    >
                      {e.title}
                    </Link>
                    {e.venueName || e.localityLabel ? (
                      <p className="mcc-news-events__venue">
                        {[e.venueName, e.localityLabel]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          <p style={{ margin: "1rem 0 0" }}>
            <Link
              href="/chennai-local-events"
              className="mcc-news-btn mcc-news-btn--ghost"
              style={{ width: "100%" }}
            >
              All Chennai events
            </Link>
          </p>
        </div>
      ) : null}

      <div className="mcc-news-panel">
        <h2 className="mcc-news-panel__title">Chennai updates</h2>
        <p style={{ margin: "0 0 1rem", fontSize: "0.875rem", lineHeight: 1.5, color: "var(--mcc-news-muted)" }}>
          Get Chennai&apos;s important updates without social-media noise.
        </p>
        <Link
          href={WHATSAPP_COMMUNITY_PAGE_PATH}
          className="mcc-news-btn mcc-news-btn--primary"
        >
          Join WhatsApp Updates
        </Link>
      </div>
    </aside>
  );
}

export function NewsAreaStrip({ articles }: { articles: PublicArticleRow[] }) {
  const byHub = new Map<string, PublicArticleRow>();
  for (const a of articles) {
    const hub = areaHubSlugForArticle(a);
    if (!hub || byHub.has(hub)) continue;
    byHub.set(hub, a);
  }

  const tiles = AREA_STRIP_SLUGS.map((slug) => {
    const zone = chennaiZones.find((z) => z.slug === slug);
    if (!zone) return null;
    const story = byHub.get(slug) ?? null;
    return { zone, story };
  }).filter(Boolean) as {
    zone: (typeof chennaiZones)[number];
    story: PublicArticleRow | null;
  }[];

  return (
    <section className="mcc-news-area-strip" aria-labelledby="area-news-heading">
      <div className="mcc-news-section-head">
        <h2 id="area-news-heading">News from your neighbourhood</h2>
        <Link href="/#areas">City area map</Link>
      </div>
      <p className="mcc-news-area-strip__intro">
        North to OMR — open an area hub for civic notes, local context, and
        nearby listings.
      </p>
      <div className="mcc-news-area-grid">
        {tiles.map(({ zone, story }) => (
          <Link
            key={zone.slug}
            href={
              story
                ? `/chennai-local-news/${story.slug}`
                : `/areas/${zone.slug}`
            }
            className="mcc-news-area-tile"
          >
            <span className="mcc-news-area-tile__name">{zone.label}</span>
            {story ? (
              <p className="mcc-news-area-tile__headline">{story.title}</p>
            ) : (
              <p className="mcc-news-area-tile__headline">{zone.blurb}</p>
            )}
            <span className="mcc-news-area-tile__hint">
              {story ? "Latest story →" : "Open area hub →"}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function NewsTopicShelf({
  title,
  href,
  articles,
}: {
  title: string;
  href: string;
  articles: PublicArticleRow[];
}) {
  if (!articles.length) return null;
  return (
    <section className="mcc-news-shelf" aria-labelledby={`shelf-${href}`}>
      <div className="mcc-news-section-head">
        <h2 id={`shelf-${href}`}>{title}</h2>
        <Link href={href}>View all</Link>
      </div>
      <ul className="mcc-news-briefs">
        {articles.slice(0, 5).map((a) => (
          <li key={a.id} className="mcc-news-briefs__item">
            <Link
              href={`/chennai-local-news/${a.slug}`}
              className="mcc-news-briefs__link"
            >
              <span className="mcc-news-briefs__cat">
                {a.category ?? "Chennai"}
              </span>
              <span className="mcc-news-briefs__title">{a.title}</span>
              <span className="mcc-news-briefs__date">
                {formatDate(a.publishedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function countStoriesPublishedToday(
  articles: PublicArticleRow[],
  now = new Date(),
): number {
  const todayKey = now.toLocaleDateString("en-CA", { timeZone: IST });
  return articles.filter((a) => {
    if (!a.publishedAt) return false;
    const key = a.publishedAt.toLocaleDateString("en-CA", { timeZone: IST });
    return key === todayKey;
  }).length;
}

/** Show breaking strip for featured lead published within 72 hours. */
export function shouldShowBreaking(lead: PublicArticleRow, now = new Date()): boolean {
  if (!lead.featured || !lead.publishedAt) return false;
  const hours =
    (now.getTime() - lead.publishedAt.getTime()) / (1000 * 60 * 60);
  return hours <= 72;
}
