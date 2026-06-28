import Image from "next/image";
import Link from "next/link";
import type { PublicArticleRow } from "@/domains/news";
import {
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";

function formatArticleDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  });
}

export function ArticleRelatedGrid({
  articles,
  title = "More from MyChennaiCity",
}: {
  articles: PublicArticleRow[];
  title?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <section className="civic-related" aria-labelledby="civic-related-heading">
      <h2 id="civic-related-heading" className="civic-related__title">
        {title}
      </h2>
      <div className="civic-related__grid">
        {articles.map((article) => {
          const src = resolveArticleHeroSrc(article);
          const useNext = articleHeroUsesNextImage(src);
          const href = `/chennai-local-news/${article.slug}`;
          const desc =
            article.dek?.trim() ||
            article.summary?.trim() ||
            "";

          return (
            <article key={article.id} className="civic-related-card">
              <Link href={href} className="civic-related-card__link group">
                <div className="civic-related-card__media">
                  {useNext ? (
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 280px, 320px"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={src}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="civic-related-card__body">
                  {article.category ? (
                    <p className="civic-related-card__category">
                      {article.category}
                    </p>
                  ) : null}
                  <h3 className="civic-related-card__headline">{article.title}</h3>
                  {desc ? (
                    <p className="civic-related-card__desc">{desc}</p>
                  ) : null}
                  {article.publishedAt ? (
                    <time
                      dateTime={article.publishedAt.toISOString()}
                      className="civic-related-card__date"
                    >
                      {formatArticleDate(article.publishedAt)}
                    </time>
                  ) : null}
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
