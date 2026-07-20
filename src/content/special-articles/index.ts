import type { PublicArticleRow } from "@/domains/news";
import type { ComponentType } from "react";
import { ChennaiCorporationZonesArticle } from "@/components/news/special/chennai-corporation-zones-article";
import { FiscalWhitePaperArticle } from "@/components/news/special/fiscal-white-paper-article";
import { TiruvallurAmmoniaLeak2026Article } from "@/components/news/special/tiruvallur-ammonia-leak-2026-article";
import { YogaDay2026Article } from "@/components/news/special/yoga-day-2026-article";
import { CHENNAI_ZONES_SLUG } from "./chennai-corporation-zones-15-vs-20";
import { YOGA_DAY_2026_SLUG } from "./international-yoga-day-2026-chennai";
import { TN_FISCAL_WHITE_PAPER_SLUG } from "./tn-fiscal-white-paper-2026";
import { TIRUVALLUR_AMMONIA_LEAK_SLUG } from "./tiruvallur-ammonia-leak-2026";

export type SpecialArticleEntry = {
  slug: string;
  Component: ComponentType<{ article: PublicArticleRow }>;
};

const registry: SpecialArticleEntry[] = [
  {
    slug: TN_FISCAL_WHITE_PAPER_SLUG,
    Component: FiscalWhitePaperArticle,
  },
  {
    slug: YOGA_DAY_2026_SLUG,
    Component: YogaDay2026Article,
  },
  {
    slug: TIRUVALLUR_AMMONIA_LEAK_SLUG,
    Component: TiruvallurAmmoniaLeak2026Article,
  },
  {
    slug: CHENNAI_ZONES_SLUG,
    Component: ChennaiCorporationZonesArticle,
  },
];

export function getSpecialArticleEntry(
  slug: string,
): SpecialArticleEntry | null {
  return registry.find((e) => e.slug === slug) ?? null;
}
