import type { ReactNode } from "react";
import type { ArticleLayoutVariant } from "@/lib/news-article-layout";

function ReadingColumn({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[720px] space-y-10">{children}</div>
  );
}

/** Composable blocks so each shell can reorder hero vs typographic stack. */
export type ArticleDetailSlots = {
  categoryLink: ReactNode;
  title: ReactNode;
  dek: ReactNode;
  summaryLead: ReactNode;
  takeaways: ReactNode;
  areaZone: ReactNode;
  publishedRow: ReactNode;
  hero: ReactNode;
  /** Display ad (e.g. `article-top` leaderboard) — first in reading column. */
  adTop?: ReactNode;
  toc: ReactNode;
  main: ReactNode;
  attribution: ReactNode;
  related: ReactNode;
  back: ReactNode;
};

function MastheadLayout({ s }: { s: ArticleDetailSlots }) {
  return (
    <article className="article-shell article-shell--masthead mx-auto w-full max-w-[1100px]">
      <div className="mb-8 sm:mb-10">{s.hero}</div>
      <header className="border-b border-[var(--border)] pb-8">
        {s.categoryLink}
        {s.title}
        {s.dek}
        {s.summaryLead}
        {s.takeaways}
        {s.areaZone}
        {s.publishedRow}
      </header>
      <ReadingColumn>
        {s.adTop}
        {s.toc}
        {s.main}
        {s.attribution}
        {s.related}
        {s.back}
      </ReadingColumn>
    </article>
  );
}

function MetroColumnsLayout({ s }: { s: ArticleDetailSlots }) {
  return (
    <article className="article-shell article-shell--metro mx-auto grid w-full max-w-[1100px] gap-8 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:gap-10">
      <div
        className="hidden select-none items-start justify-center pt-2 lg:flex"
        aria-hidden
      >
        <p className="max-h-[min(420px,50vh)] text-[11px] font-bold uppercase tracking-[0.35em] text-[var(--accent)] [writing-mode:vertical-rl] rotate-180">
          Chennai desk
        </p>
      </div>
      <div className="min-w-0">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="min-w-0 border-b border-[var(--border)] pb-6 lg:border-0 lg:pb-0">
            {s.categoryLink}
            {s.title}
            {s.dek}
            {s.summaryLead}
          </div>
          <div className="min-w-0 lg:pt-1">{s.hero}</div>
        </div>
        <div className="mt-6 space-y-4 border-b border-[var(--border)] pb-8 lg:mt-8">
          {s.takeaways}
          {s.areaZone}
          {s.publishedRow}
        </div>
        <ReadingColumn>
          {s.adTop}
          {s.toc}
          {s.main}
          {s.attribution}
          {s.related}
          {s.back}
        </ReadingColumn>
      </div>
    </article>
  );
}

function FeatureRibbonLayout({ s }: { s: ArticleDetailSlots }) {
  return (
    <article className="article-shell article-shell--ribbon mx-auto w-full max-w-[1100px]">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:gap-10 lg:items-start">
        <aside className="order-2 flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[color-mix(in_srgb,var(--surface)_88%,var(--accent)_6%)] p-5 ring-1 ring-[color-mix(in_srgb,var(--foreground)_5%,transparent)] lg:order-1">
          {s.categoryLink}
          {s.dek}
          {s.publishedRow}
        </aside>
        <div className="order-1 min-w-0 space-y-6 lg:order-2">
          {s.hero}
          {s.title}
          {s.summaryLead}
          {s.takeaways}
          {s.areaZone}
        </div>
      </div>
      <hr className="my-8 border-[var(--border)] lg:my-10" />
      <ReadingColumn>
        {s.adTop}
        {s.toc}
        {s.main}
        {s.attribution}
        {s.related}
        {s.back}
      </ReadingColumn>
    </article>
  );
}

function EditorialGridLayout({ s }: { s: ArticleDetailSlots }) {
  return (
    <article className="article-shell article-shell--grid mx-auto w-full max-w-[1100px]">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
        <div className="min-w-0 flex-1 border-b border-[var(--border)] pb-6 lg:border-0 lg:pb-0">
          {s.categoryLink}
          {s.title}
          {s.dek}
          {s.summaryLead}
        </div>
        <div className="mx-auto w-full max-w-md shrink-0 lg:mx-0 lg:max-w-[340px] lg:pt-1">
          {s.hero}
        </div>
      </div>
      <div className="mt-6 space-y-4 border-b border-[var(--border)] pb-8 lg:mt-2">
        {s.takeaways}
        {s.areaZone}
        {s.publishedRow}
      </div>
      <ReadingColumn>
        {s.adTop}
        {s.toc}
        {s.main}
        {s.attribution}
        {s.related}
        {s.back}
      </ReadingColumn>
    </article>
  );
}

export function ArticleDetailLayout({
  variant,
  slots,
}: {
  variant: ArticleLayoutVariant;
  slots: ArticleDetailSlots;
}) {
  switch (variant) {
    case "masthead":
      return <MastheadLayout s={slots} />;
    case "metro-columns":
      return <MetroColumnsLayout s={slots} />;
    case "feature-ribbon":
      return <FeatureRibbonLayout s={slots} />;
    case "editorial-grid":
      return <EditorialGridLayout s={slots} />;
    default:
      return <MastheadLayout s={slots} />;
  }
}
