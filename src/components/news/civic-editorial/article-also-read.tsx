import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import {
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";

type AlsoReadArticle = Pick<
  PublicArticleRow,
  "id" | "slug" | "title" | "heroImageUrl"
>;

/**
 * Hindu-style inline “Also Read” rail — sits mid-report after the lead,
 * not in the end-of-article related grid.
 */
export function ArticleAlsoRead({
  article,
  label = "Also Read:",
}: {
  article: AlsoReadArticle;
  /** Prefixed label; Tamil pages pass `இதையும் படிக்க:` */
  label?: string;
}) {
  const href = `/chennai-local-news/${article.slug}`;
  const src = resolveArticleHeroSrc(article);
  const useNext = articleHeroUsesNextImage(src);

  return (
    <aside className="civic-also-read" aria-label={label.replace(/:$/, "")}>
      <Link href={href} className="civic-also-read__link">
        <div className="civic-also-read__copy">
          <span className="civic-also-read__label">{label}</span>{" "}
          <span className="civic-also-read__headline">{article.title}</span>
        </div>
        <div className="civic-also-read__thumb" aria-hidden>
          {useNext ? (
            <Image
              src={src}
              alt=""
              fill
              className="object-cover"
              sizes="72px"
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt="" className="civic-also-read__thumb-img" />
          )}
        </div>
      </Link>
    </aside>
  );
}
