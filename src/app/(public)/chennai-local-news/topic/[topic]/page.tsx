import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvertisePanel } from "@/components/ads";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import {
  NewsCategoryNav,
  NewsStoryCard,
} from "@/components/news/chennai-news-hub";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
} from "@/components/site/interior-chrome";
import { listArticlesByCategoryForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_NEWS_TOPIC_NAV,
  topicSlugToCategory,
} from "@/lib/news-topics";
import { CHENNAI_GEO_META } from "@/lib/seo/chennai-geo-meta";
import { buildTopicHubJsonLd } from "@/lib/seo/topic-hub-jsonld";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ topic: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const category = topicSlugToCategory(topic);
  if (!category) {
    return { title: { absolute: fullSiteTitle("News topic not found") } };
  }
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/topic/${topic}`;
  const desc = `Latest ${category} news for Chennai and nearby — civic context, neighbourhood angle, and clear takeaways on mychennaicity.in. Covers Greater Chennai including Adyar, OMR, Anna Nagar, and T. Nagar.`;
  const titleSegment = `${category} — Chennai local news`;
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "website",
      locale: "en_IN",
      siteName: "mychennaicity.in",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: ["/twitter-image"],
    },
    other: { ...CHENNAI_GEO_META },
  };
}

export default async function TopicPage({ params }: Props) {
  const { topic } = await params;
  const category = topicSlugToCategory(topic);
  if (!category) {
    notFound();
  }
  let items: Awaited<ReturnType<typeof listArticlesByCategoryForChennai>> = [];
  try {
    items = await listArticlesByCategoryForChennai(category, 40);
  } catch {
    items = [];
  }

  if (!items.length) {
    return (
      <div className="mcc-news-hub-page">
      <div className="mcc-news-hub">
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Chennai local news", href: "/chennai-local-news" },
            { label: category },
          ]}
        />
        <NewsCategoryNav activeSlug={topic} />
        <HubCommunityStrip businessVariant="news" className="mt-6" />
        <h1 className="mcc-news-hero__title" style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)" }}>
          {category}
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
          No stories are filed under {category} yet. Browse all Chennai local
          news or pick another topic.
        </p>
        {topic === "economy" ? (
          <aside
            className="mt-6 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
            aria-label="Chennai jobs and careers"
          >
            <p className="text-sm leading-relaxed text-[var(--foreground)]">
              While this section fills in, see{" "}
              <Link
                href={CHENNAI_JOBS_HUB_PATH}
                className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
              >
                jobs in Chennai
              </Link>{" "}
              and the{" "}
              <Link
                href="/guides/chennai-tech-careers"
                className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
              >
                short guide to job ads
              </Link>
              .
            </p>
          </aside>
        ) : null}
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            Other topics
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {CHENNAI_NEWS_TOPIC_NAV.filter((t) => t.slug !== topic).map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/chennai-local-news/topic/${t.slug}`}
                  className="inline-block rounded-full border border-[var(--border)] px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--accent)]"
                >
                  {t.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6">
          <Link
            href="/chennai-local-news"
            className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
          >
            All Chennai local news
          </Link>
        </p>
        <InteriorCrossNav />
      </div>
      </div>
    );
  }

  const { collectionPage, itemList, breadcrumbs } = buildTopicHubJsonLd(
    topic,
    category,
    items,
  );

  const siblingTopics = CHENNAI_NEWS_TOPIC_NAV.filter((t) => t.slug !== topic);

  return (
    <div className="mcc-news-hub-page">
    <div className="mcc-news-hub">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local news", href: "/chennai-local-news" },
          { label: category },
        ]}
      />
      <header className="mcc-news-hero" style={{ paddingTop: "1.25rem" }}>
        <div className="mcc-news-hero__inner">
          <p className="mcc-news-hero__eyebrow">News topic</p>
          <h1 className="mcc-news-hero__title" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            {category}
          </h1>
          <p className="mcc-news-hero__lede">
            Newest first. Short reports with local context for Chennai readers.
          </p>
        </div>
      </header>
      <NewsCategoryNav activeSlug={topic} />
      <nav
        className="type-lede mt-4 max-w-2xl text-sm leading-relaxed text-[var(--muted)]"
        aria-label="Related sections"
      >
        <span className="font-medium text-[var(--foreground)]">Also see: </span>
        <Link
          href="/chennai-local-news"
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          All Chennai local news
        </Link>
        <span aria-hidden> · </span>
        {siblingTopics.map((t, i) => (
          <span key={t.slug}>
            {i > 0 ? <span aria-hidden> · </span> : null}
            <Link
              href={`/chennai-local-news/topic/${t.slug}`}
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              {t.label}
            </Link>
          </span>
        ))}
        <span aria-hidden> · </span>
        <Link
          href="/#areas"
          className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
        >
          Area map
        </Link>
      </nav>
      <HubCommunityStrip businessVariant="news" className="mt-6" />
      {topic === "economy" ? (
        <aside
          className="mt-6 max-w-2xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
          aria-label="Chennai jobs and careers"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
            Hiring &amp; work
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]">
            Following economy news? See{" "}
            <Link
              href={CHENNAI_JOBS_HUB_PATH}
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              jobs in Chennai
            </Link>{" "}
            on this site and the{" "}
            <Link
              href="/guides/chennai-tech-careers"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              short guide to reading job ads
            </Link>
            .
          </p>
        </aside>
      ) : null}
      <div className="mt-6">
        <PageAdSlot shape="rectangle" placement="news_topic" />
      </div>
      <div className="mcc-news-latest mt-8">
        {items.map((a) => (
          <NewsStoryCard key={a.id} article={a} />
        ))}
      </div>
      <AdvertisePanel
        variant="news"
        layout="section"
        className="mt-10"
        source="news_topic_hub"
      />
      <InteriorCrossNav />
    </div>
    </div>
  );
}
