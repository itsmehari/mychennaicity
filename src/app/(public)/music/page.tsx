import type { Metadata } from "next";
import { SeasonFront } from "@/components/music/season-front";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import {
  SEASON_SCHEDULE_ANSWER,
  SEASON_SERIES,
} from "@/content/music/season-concerts";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const title = "Chennai music season schedule";

export const metadata: Metadata = {
  title: fullSiteTitle(title),
  description: SEASON_SCHEDULE_ANSWER,
  alternates: { canonical: "/music" },
};

export default function MusicSchedulePage() {
  const base = getSiteUrl().replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: SEASON_SCHEDULE_ANSWER,
    url: `${base}/music`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: SEASON_SERIES.map((series, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: series.title,
        url: `${base}/music#${series.id}`,
      })),
    },
  };

  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Music season" },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeasonFront />
      <div className="mt-10">
        <InteriorCrossNav />
      </div>
    </div>
  );
}
