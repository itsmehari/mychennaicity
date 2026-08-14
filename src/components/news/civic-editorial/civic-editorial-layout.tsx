import type { ReactNode } from "react";
import { ArticleLeftRail, ArticleMobileShareBar } from "./article-share-tools";

export type CivicEditorialSlots = {
  leftRailToc: ReactNode;
  shareTitle: string;
  shareText: string;
  header: ReactNode;
  hero: ReactNode;
  quickSummary: ReactNode;
  keyDetails: ReactNode;
  countdown?: ReactNode;
  adAfterSummary?: ReactNode;
  officialPdf?: ReactNode;
  main: ReactNode;
  adMid?: ReactNode;
  sources: ReactNode;
  faq?: ReactNode;
  communityBand?: ReactNode;
  related: ReactNode;
  adEnd?: ReactNode;
  back: ReactNode;
  rightSidebar: ReactNode;
};

export function CivicEditorialLayout({
  slots,
  lang,
}: {
  slots: CivicEditorialSlots;
  lang?: string;
}) {
  return (
    <article className="civic-editorial-article" lang={lang}>
      <div className="civic-editorial-grid">
        <ArticleLeftRail
          toc={slots.leftRailToc}
          shareTitle={slots.shareTitle}
          shareText={slots.shareText}
        />

        <div id="civic-article-body" className="civic-editorial-main">
          {slots.header}
          {slots.hero}
          <ArticleMobileShareBar
            shareTitle={slots.shareTitle}
            shareText={slots.shareText}
          />
          {slots.quickSummary}
          {slots.keyDetails}
          {slots.countdown}
          {slots.officialPdf ? (
            <div className="civic-official-pdf">{slots.officialPdf}</div>
          ) : null}
          {slots.adAfterSummary}
          {slots.main}
          {slots.adMid}
          {slots.sources}
          {slots.faq}
          {slots.communityBand}
          {slots.related}
          {slots.adEnd}
          {slots.back}
        </div>

        {slots.rightSidebar}
      </div>
    </article>
  );
}
