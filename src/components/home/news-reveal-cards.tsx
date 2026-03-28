"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PublicArticleRow } from "@/domains/news";
import {
  articleHeroUsesNextImage,
  resolveArticleHeroSrc,
} from "@/lib/article-hero-image";

function formatDate(d: Date | null) {
  if (!d) return "";
  return d.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  });
}

function CardHeroImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const useNext = articleHeroUsesNextImage(src);

  return (
    <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-[var(--border)]">
      {useNext ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority={priority}
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- arbitrary editorial CDNs not in remotePatterns
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
          loading={priority ? "eager" : "lazy"}
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
        aria-hidden
      />
    </div>
  );
}

export function NewsRevealCard({
  article,
  variant = "bulletin",
  imagePriority = false,
}: {
  article: PublicArticleRow;
  variant?: "bulletin" | "pick";
  imagePriority?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const href = `/chennai-local-news/${article.slug}`;
  const isPick = variant === "pick";
  const heroSrc = resolveArticleHeroSrc(article);

  return (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border shadow-sm transition hover:shadow-md ${
        isPick
          ? "border-[var(--border)] bg-[var(--foreground)] text-[var(--background)] ring-1 ring-[color-mix(in_srgb,var(--foreground)_12%,transparent)]"
          : "border-[var(--border)] bg-[var(--surface)] ring-1 ring-[color-mix(in_srgb,var(--foreground)_4%,transparent)]"
      } ${open ? "border-[var(--accent)] shadow-md ring-2 ring-[var(--accent)]/25" : ""}`}
    >
      <Link
        href={href}
        className="relative block shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]"
      >
        <CardHeroImage src={heroSrc} alt={article.title} priority={imagePriority} />
      </Link>

      <button
        type="button"
        className="flex w-full flex-col p-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] md:hidden"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span
          className={`text-xs font-semibold uppercase tracking-wide ${
            isPick
              ? "text-[color-mix(in_srgb,var(--background)_70%,transparent)]"
              : "text-[var(--accent)]"
          }`}
        >
          {article.category ?? "Chennai"}
        </span>
        <span
          className={`mt-2 text-base font-semibold leading-snug ${
            isPick ? "" : "text-[var(--foreground)]"
          }`}
        >
          {article.title}
        </span>
        <span
          className={`mt-2 text-xs ${
            isPick
              ? "text-[color-mix(in_srgb,var(--background)_65%,transparent)]"
              : "text-[var(--muted)]"
          }`}
        >
          {formatDate(article.publishedAt)} · Tap for deck
        </span>
        {open ? (
          <span className={`mt-3 text-sm ${isPick ? "opacity-90" : "text-[var(--muted)]"}`}>
            {article.dek ?? article.summary ?? ""}
          </span>
        ) : null}
        {open ? (
          <Link
            href={href}
            className={`mt-4 inline-flex text-sm font-semibold ${
              isPick ? "text-[var(--background)] underline" : "text-[var(--accent)]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            Read full story
          </Link>
        ) : null}
      </button>

      <div className="hidden min-h-0 flex-1 flex-col md:flex">
        <div
          className="flex flex-1 flex-col p-5 pt-4"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${
              isPick
                ? "text-[color-mix(in_srgb,var(--background)_70%,transparent)]"
                : "text-[var(--accent)]"
            }`}
          >
            {article.category ?? "Chennai"}
          </span>
          <Link href={href}>
            <h3
              className={`mt-2 text-base font-semibold leading-snug tracking-tight ${
                isPick ? "" : "text-[var(--foreground)]"
              } hover:underline`}
            >
              {article.title}
            </h3>
          </Link>
          <p
            className={`mt-2 text-xs ${
              isPick
                ? "text-[color-mix(in_srgb,var(--background)_65%,transparent)]"
                : "text-[var(--muted)]"
            }`}
          >
            {formatDate(article.publishedAt)}
          </p>
          <div
            className={`grid flex-1 transition-all duration-200 ${
              open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0 overflow-hidden">
              <p
                className={`mt-3 text-sm leading-relaxed ${
                  isPick ? "opacity-90" : "text-[var(--muted)]"
                }`}
              >
                {article.dek ?? article.summary ?? ""}
              </p>
              <Link
                href={href}
                className={`mt-3 inline-flex text-sm font-semibold ${
                  isPick ? "text-[var(--background)] underline" : "text-[var(--accent)]"
                }`}
              >
                Read full story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function NewsRevealGrid({
  articles,
  variant = "bulletin",
}: {
  articles: PublicArticleRow[];
  variant?: "bulletin" | "pick";
}) {
  if (!articles.length) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--border)] p-6 text-sm text-[var(--muted)]">
        No published articles yet. Set{" "}
        <code className="rounded bg-[var(--surface)] px-1">DATABASE_URL</code> and run{" "}
        <code className="rounded bg-[var(--surface)] px-1">npm run db:seed</code>.
      </p>
    );
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-2 lg:gap-6">
      {articles.map((a, i) => (
        <li key={a.id} className="flex min-h-0">
          <NewsRevealCard article={a} variant={variant} imagePriority={i < 2} />
        </li>
      ))}
    </ul>
  );
}

export function EditorsRevealGrid({ articles }: { articles: PublicArticleRow[] }) {
  if (!articles.length) {
    return (
      <p className="rounded-2xl border border-dashed border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_65%,var(--surface))] p-6 text-sm leading-relaxed text-[var(--muted)]">
        No featured picks loaded yet (same data source as the bulletin). Connect
        the database and seed articles, or{" "}
        <Link
          href="/chennai-local-news"
          className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          browse the news front page
        </Link>
        .
      </p>
    );
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
      {articles.map((a, i) => (
        <li key={a.id} className="flex min-h-0">
          <NewsRevealCard article={a} variant="pick" imagePriority={i < 3} />
        </li>
      ))}
    </ul>
  );
}
