"use client";

import { useState } from "react";
import {
  videoElementClassName,
  videoOrientationFromDimensions,
  videoShellClassName,
  type VideoOrientation,
} from "@/lib/classifieds/media-layout";

export function ClassifiedWalkthroughVideo({
  src,
  poster,
  onOrientationChange,
}: {
  src: string;
  poster: string | null;
  onOrientationChange?: (orientation: VideoOrientation) => void;
}) {
  const [orientation, setOrientation] = useState<VideoOrientation>("portrait");

  return (
    <figure
      className={`overflow-hidden rounded-2xl border border-[var(--border)] bg-black ${videoShellClassName(orientation)}`}
    >
      <video
        controls
        playsInline
        preload="metadata"
        poster={poster ?? undefined}
        className={videoElementClassName(orientation)}
        onLoadedMetadata={(event) => {
          const el = event.currentTarget;
          const next = videoOrientationFromDimensions(
            el.videoWidth,
            el.videoHeight,
          );
          setOrientation(next);
          onOrientationChange?.(next);
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="bg-[var(--surface)] px-4 py-2 text-xs text-[var(--muted)]">
        Walkthrough from the person who posted the ad
      </figcaption>
    </figure>
  );
}
