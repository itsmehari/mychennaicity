import Image from "next/image";
import type { PublicArticleRow } from "@/domains/news";
import {
  articleHeroAlt,
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";

type ArticleHeroPick = Pick<
  PublicArticleRow,
  "slug" | "heroImageUrl" | "title" | "category"
>;

export function ArticleHeroImage({
  article,
  className = "",
  imgClassName = "object-cover",
  priority = false,
  sizes = "(max-width: 768px) 100vw, min(1100px, 96vw)",
  aspectWrapperClass = "relative aspect-[16/10] w-full",
}: {
  article: ArticleHeroPick;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  /** Outer figure classes; inner div gets aspect ratio */
  aspectWrapperClass?: string;
}) {
  const src = resolveArticleHeroSrc(article);
  const alt = articleHeroAlt(article);
  const useNext = articleHeroUsesNextImage(src);

  return (
    <figure
      className={`overflow-hidden bg-[var(--surface)] ring-1 ring-[var(--border)] ${className}`.trim()}
    >
      <div className={aspectWrapperClass}>
        {useNext ? (
          <Image
            src={src}
            alt={alt}
            fill
            className={imgClassName}
            sizes={sizes}
            priority={priority}
          />
        ) : (
          // Remote host may not be in next.config — still show image
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className={`absolute inset-0 h-full w-full ${imgClassName}`.trim()}
          />
        )}
      </div>
      <figcaption className="sr-only">{alt}</figcaption>
    </figure>
  );
}
