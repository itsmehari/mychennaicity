import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import { ArticleRelatedGrid } from "@/components/news/civic-editorial/article-related-grid";
import { CHENNAI_JOBS_HUB_PATH } from "@/lib/routes/chennai-jobs";

type Props = {
  articles: PublicArticleRow[];
  areaLabel?: string | null;
  areaSlug?: string | null;
  category?: string | null;
  topicHref?: string | null;
};

/**
 * Dense topical cluster for AEO: related news + area + jobs + events hubs.
 */
export function ArticleChennaiContextCluster({
  articles,
  areaLabel,
  areaSlug,
  category,
  topicHref,
}: Props) {
  const hubs: { href: string; label: string; hint: string }[] = [
    {
      href: "/chennai-local-news",
      label: "Chennai local news",
      hint: "Civic and neighbourhood reporting",
    },
    {
      href: CHENNAI_JOBS_HUB_PATH,
      label: "Jobs in Chennai",
      hint: "Open local roles and walk-ins",
    },
    {
      href: "/chennai-local-events",
      label: "Chennai local events",
      hint: "Concerts, comedy and city gatherings",
    },
  ];

  if (areaSlug && areaLabel) {
    hubs.unshift({
      href: `/areas/${areaSlug}`,
      label: areaLabel,
      hint: "Neighbourhood hub",
    });
  }

  if (topicHref && category) {
    hubs.push({
      href: topicHref,
      label: `${category} desk`,
      hint: "More stories in this topic",
    });
  }

  return (
    <div className="mcc-context-cluster space-y-10">
      <ArticleRelatedGrid
        articles={articles}
        title="More Chennai context"
      />

      <nav
        className="mcc-context-cluster__hubs"
        aria-labelledby="chennai-context-hubs-heading"
      >
        <h2
          id="chennai-context-hubs-heading"
          className="civic-related__title"
        >
          Explore Chennai on this site
        </h2>
        <ul className="mcc-context-cluster__list">
          {hubs.map((h) => (
            <li key={h.href}>
              <Link href={h.href} className="mcc-context-cluster__link">
                <span className="mcc-context-cluster__link-label">{h.label}</span>
                <span className="mcc-context-cluster__link-hint">{h.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
