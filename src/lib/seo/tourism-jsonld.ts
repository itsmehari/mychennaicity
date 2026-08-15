import { getSiteUrl } from "@/lib/env";
import { buildFaqPageJsonLdFromItems } from "@/lib/seo/faq-jsonld";
import {
  CHENNAI_TOURISM_HUB_PATH,
  ECR_WEEKEND_PLAN_PATH,
} from "@/content/tourism";
import {
  ECR_STOPS,
  ECR_WEEKEND_FAQ,
  ECR_WEEKEND_WINDOW,
} from "@/content/tourism/ecr-weekend-plan";

export function buildTourismHubJsonLd() {
  const base = getSiteUrl();
  const page = `${base}${CHENNAI_TOURISM_HUB_PATH}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Chennai tourism",
    url: page,
    description:
      "Chennai-first tourism desk — East Coast Road weekend loops, Mamallapuram, and Tamil Nadu Tourism stops you can actually drive.",
    isPartOf: { "@type": "WebSite", name: "mychennaicity.in", url: base },
  };
}

export function buildEcrWeekendPlanJsonLdGraph(): unknown[] {
  const base = getSiteUrl();
  const page = `${base}${ECR_WEEKEND_PLAN_PATH}`;

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: base,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Chennai tourism",
        item: `${base}${CHENNAI_TOURISM_HUB_PATH}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "This weekend ECR plan",
        item: page,
      },
    ],
  };

  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "This weekend ECR plan",
    description:
      "Tamil Nadu Tourism / TTDC suggested Chennai–East Coast Road loop: Marundeeswarar Temple, DakshinaChitra, Muttukkadu boating, TTDC lunch, Mamallapuram kite festival, UNESCO Shore Temple, and the Shore Temple Classic surf event.",
    url: page,
    touristType: "Family weekend from Chennai",
    itinerary: {
      "@type": "ItemList",
      numberOfItems: ECR_STOPS.length,
      itemListElement: ECR_STOPS.map((stop, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: stop.name,
        description: `${stop.place}. ${stop.blurb.replace(/\*\*/g, "")}`,
      })),
    },
    temporalCoverage: ECR_WEEKEND_WINDOW.label,
  };

  const faq = buildFaqPageJsonLdFromItems(ECR_WEEKEND_FAQ, {
    pageUrl: page,
    fragment: "ecr-plan-faq",
  });

  const nodes: unknown[] = [breadcrumb, trip];
  if (faq) nodes.push(faq);
  return nodes;
}
