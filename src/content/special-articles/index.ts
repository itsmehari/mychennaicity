import type { PublicArticleRow } from "@/domains/news";
import type { ComponentType } from "react";
import { FiscalWhitePaperArticle } from "@/components/news/special/fiscal-white-paper-article";
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
];

export function getSpecialArticleEntry(
  slug: string,
): SpecialArticleEntry | null {
  return registry.find((e) => e.slug === slug) ?? null;
}
