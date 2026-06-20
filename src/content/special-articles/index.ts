import type { PublicArticleRow } from "@/domains/news";
import type { ComponentType } from "react";
import { FiscalWhitePaperArticle } from "@/components/news/special/fiscal-white-paper-article";
import { YogaDay2026Article } from "@/components/news/special/yoga-day-2026-article";
import { YOGA_DAY_2026_SLUG } from "./international-yoga-day-2026-chennai";
import { TN_FISCAL_WHITE_PAPER_SLUG } from "./tn-fiscal-white-paper-2026";

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
];

export function getSpecialArticleEntry(
  slug: string,
): SpecialArticleEntry | null {
  return registry.find((e) => e.slug === slug) ?? null;
}
