"use client";

import { useEffect, useRef } from "react";

type TwttrWidgets = {
  load: (el?: HTMLElement | null) => void;
};

type TwttrWindow = Window & {
  twttr?: { widgets?: TwttrWidgets };
};

let widgetsReady: Promise<void> | null = null;

function whenTweetWidgetsReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const w = window as TwttrWindow;
  if (w.twttr?.widgets) return Promise.resolve();
  if (!widgetsReady) {
    widgetsReady = new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://platform.x.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";
      script.onload = () => resolve();
      script.onerror = () => resolve();
      document.body.appendChild(script);
    });
  }
  return widgetsReady;
}

/** Official X embed. The status URL must be the only content of its own paragraph in the article body. */
export function TweetEmbed({
  statusUrl,
  handle,
}: {
  statusUrl: string;
  handle: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    void whenTweetWidgetsReady().then(() => {
      if (cancelled) return;
      (window as TwttrWindow).twttr?.widgets?.load(boxRef.current);
    });
    return () => {
      cancelled = true;
    };
  }, [statusUrl]);

  return (
    <div ref={boxRef} className="not-prose my-6 flex justify-center">
      <blockquote className="twitter-tweet" data-dnt="true" data-theme="light">
        <a href={statusUrl}>Post by @{handle} on X</a>
      </blockquote>
    </div>
  );
}
