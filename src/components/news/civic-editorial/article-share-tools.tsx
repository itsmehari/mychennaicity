"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";

type ShareToolsProps = {
  title: string;
  text: string;
  variant?: "inline" | "rail" | "mobile-bar";
  className?: string;
};

function shareButtonClass(variant: ShareToolsProps["variant"]) {
  if (variant === "rail") {
    return "civic-share-btn civic-share-btn--rail";
  }
  if (variant === "mobile-bar") {
    return "civic-share-btn civic-share-btn--mobile";
  }
  return "civic-share-btn civic-share-btn--inline";
}

function ShareGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="civic-share-btn__icon"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="18" cy="5" r="2.6" />
      <circle cx="6" cy="12" r="2.6" />
      <circle cx="18" cy="19" r="2.6" />
      <path d="M8.7 13.4 15.3 17.4M15.3 6.6 8.7 10.6" />
    </svg>
  );
}

function CopyGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="civic-share-btn__icon"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="8.5" y="8.5" width="11" height="11" rx="1.6" />
      <path d="M5.5 15.5V6.2A1.7 1.7 0 0 1 7.2 4.5H16" />
    </svg>
  );
}

export function ArticleShareTools({
  title,
  text,
  variant = "inline",
  className = "",
}: ShareToolsProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "shared">("idle");

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch {
      setStatus("idle");
    }
  }, []);

  const onShare = useCallback(async () => {
    const url = window.location.href;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text, url });
        setStatus("shared");
        window.setTimeout(() => setStatus("idle"), 2200);
        return;
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
      }
    }
    await copyLink();
  }, [title, text, copyLink]);

  const statusLabel =
    status === "copied"
      ? "Link copied"
      : status === "shared"
        ? "Shared"
        : null;

  return (
    <div className={`civic-share-tools civic-share-tools--${variant} ${className}`.trim()}>
      {variant === "rail" ? (
        <p className="civic-share-tools__kicker">Pass it on</p>
      ) : null}
      <button
        type="button"
        onClick={onShare}
        className={shareButtonClass(variant)}
        aria-label="Share article"
      >
        <ShareGlyph />
        <span>Share</span>
      </button>
      <button
        type="button"
        onClick={copyLink}
        className={shareButtonClass(variant)}
        aria-label="Copy article link"
      >
        <CopyGlyph />
        <span>Copy link</span>
      </button>
      {statusLabel ? (
        <span className="civic-share-status" role="status" aria-live="polite">
          {statusLabel}
        </span>
      ) : null}
    </div>
  );
}

export function ArticleReadingProgress({
  targetId = "civic-article-body",
}: {
  targetId?: string;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const article = document.getElementById(targetId);
    if (!article) return;

    const onScroll = () => {
      const rect = article.getBoundingClientRect();
      const articleTop = window.scrollY + rect.top;
      const articleHeight = article.offsetHeight;
      const viewport = window.innerHeight;
      const scrollable = Math.max(articleHeight - viewport * 0.4, 1);
      const scrolled = window.scrollY - articleTop + viewport * 0.15;
      const pct = Math.min(100, Math.max(0, (scrolled / scrollable) * 100));
      setProgress(pct);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  const pct = Math.round(progress);

  return (
    <div
      className="civic-reading-progress"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
    >
      <div
        className="civic-reading-progress__bar"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

export function ArticleLeftRail({
  toc,
  shareTitle,
  shareText,
}: {
  toc: ReactNode;
  shareTitle: string;
  shareText: string;
}) {
  return (
    <aside className="civic-left-rail" aria-label="Article tools">
      <p className="civic-left-rail__masthead">
        <span className="civic-left-rail__masthead-mark" aria-hidden />
        Story index
      </p>
      <div className="civic-left-rail__stage">
        <ArticleReadingProgress />
        <div className="civic-left-rail__inner">
          {toc}
          <ArticleShareTools
            title={shareTitle}
            text={shareText}
            variant="rail"
          />
        </div>
      </div>
    </aside>
  );
}

export function ArticleMobileShareBar({
  shareTitle,
  shareText,
}: {
  shareTitle: string;
  shareText: string;
}) {
  return (
    <div className="civic-mobile-share-bar lg:hidden">
      <ArticleShareTools
        title={shareTitle}
        text={shareText}
        variant="mobile-bar"
      />
    </div>
  );
}
