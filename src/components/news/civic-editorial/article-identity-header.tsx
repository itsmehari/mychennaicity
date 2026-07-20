import Link from "next/link";
import type { ReactNode } from "react";
import { ArticleShareTools } from "./article-share-tools";

export function ArticleIdentityHeader({
  categoryLink,
  locationTag,
  title,
  summary,
  authorByline,
  publishedAt,
  updatedAt,
  readingTime,
  shareTitle,
  shareText,
}: {
  categoryLink: ReactNode;
  locationTag?: ReactNode;
  title: ReactNode;
  summary: ReactNode;
  authorByline: string | null;
  publishedAt: Date | null;
  updatedAt: Date;
  readingTime: string;
  shareTitle: string;
  shareText: string;
}) {
  return (
    <header className="civic-article-header">
      <div className="civic-article-header__meta-row">
        {categoryLink}
        {locationTag}
      </div>
      {title}
      {summary}
      <div className="civic-article-header__byline">
        {authorByline ? (
          <span className="civic-article-header__author">{authorByline}</span>
        ) : (
          <span className="civic-article-header__author">
            MyChennaiCity editorial
          </span>
        )}
        <span className="civic-article-header__divider" aria-hidden>
          ·
        </span>
        {publishedAt ? (
          <time dateTime={publishedAt.toISOString()} className="civic-article-header__date">
            {publishedAt.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeZone: "Asia/Kolkata",
            })}
          </time>
        ) : null}
        <span className="civic-article-header__divider" aria-hidden>
          ·
        </span>
        <span className="civic-article-header__updated">
          Updated{" "}
          {updatedAt.toLocaleString("en-IN", {
            dateStyle: "medium",
            timeZone: "Asia/Kolkata",
          })}
        </span>
        <span className="civic-article-header__divider" aria-hidden>
          ·
        </span>
        <span className="civic-article-header__reading-time">{readingTime}</span>
      </div>
      <div className="civic-article-header__share hidden lg:flex">
        <ArticleShareTools
          title={shareTitle}
          text={shareText}
          variant="inline"
        />
      </div>
    </header>
  );
}

export function ArticleLocationTag({
  areaLabel,
  areaSlug,
}: {
  areaLabel: string;
  areaSlug: string;
}) {
  return (
    <Link href={`/areas/${areaSlug}`} className="civic-location-tag">
      {areaLabel}
    </Link>
  );
}
