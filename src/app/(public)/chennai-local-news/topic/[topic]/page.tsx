import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoryCardCompact } from "@/components/news/newspaper-layout";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  TopicDeskNav,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { listArticlesByCategoryForChennai } from "@/domains/news";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_NEWS_TOPIC_NAV, topicSlugToCategory } from "@/lib/news-topics";

type Props = { params: Promise<{ topic: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { topic } = await params;
  const category = topicSlugToCategory(topic);
  if (!category) {
    return { title: "Topic" };
  }
  const base = getSiteUrl();
  const url = `${base}/chennai-local-news/topic/${topic}`;
  return {
    title: `${category} — Chennai local news`,
    description: `Latest ${category} coverage and analysis for Greater Chennai — desk hub on mychennaicity.in.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${category} | Chennai local news`,
      url,
    },
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
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Chennai local news", href: "/chennai-local-news" },
            { label: category },
          ]}
        />
        <TopicDeskNav currentSlug={topic} />
        <h1 className="type-display text-3xl text-[var(--foreground)] sm:text-4xl">
          {category}
        </h1>
        <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
          No published stories in this desk yet. Browse another desk below, open
          the front page, or wire the database and seed articles so analysis
          pieces appear here automatically.
        </p>
        <div className="mt-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--accent)]">
            Other desks
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
        <InteriorCrossNav />
      </div>
    );
  }

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Chennai local news", href: "/chennai-local-news" },
          { label: category },
        ]}
      />
      <TopicDeskNav currentSlug={topic} />
      <p className="type-eyebrow text-[var(--accent)]">Topic desk</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl lg:text-5xl">
        {category}
      </h1>
      <p className="type-lede mt-3 max-w-2xl text-sm leading-relaxed">
        Reverse-chronological feed for this desk. Each on-site story includes a
        factual summary, Chennai-focused analysis, and a small interactive.
        Switch desks any time — links stay in the row above.
      </p>
      <div className="mt-10 max-w-2xl">
        {items.map((a) => (
          <StoryCardCompact key={a.id} article={a} />
        ))}
      </div>
      <InteriorCrossNav />
    </div>
  );
}
