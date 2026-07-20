"use client";

import Image from "next/image";
import { useState } from "react";
import {
  articleHeroUsesNextImage,
  NEWS_IMAGE_FALLBACK_PATH,
} from "@/lib/article-hero-image";

const FALLBACK = NEWS_IMAGE_FALLBACK_PATH;

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

/**
 * Fixed-ratio hero media with branded fallback when the source fails to load.
 * Broken-image icons are never shown; alt remains for screen readers.
 */
export function ArticleMedia({
  src,
  alt,
  sizes,
  priority = false,
  className = "",
}: Props) {
  const [current, setCurrent] = useState(src?.trim() || FALLBACK);
  const useNext = articleHeroUsesNextImage(current);

  const onError = () => {
    setCurrent((prev) => (prev === FALLBACK ? prev : FALLBACK));
  };

  return (
    <span className={`mcc-news-media ${className}`.trim()}>
      {useNext ? (
        <Image
          src={current}
          alt={alt}
          fill
          className="object-cover"
          sizes={sizes}
          priority={priority}
          onError={onError}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- remote CDNs + SVG fallback
        <img
          src={current}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          onError={onError}
        />
      )}
    </span>
  );
}
