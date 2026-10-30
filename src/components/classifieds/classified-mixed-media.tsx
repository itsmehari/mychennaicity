"use client";

import { useState } from "react";
import { ClassifiedPhotoGallery } from "@/components/classifieds/classified-photo-gallery";
import { ClassifiedWalkthroughVideo } from "@/components/classifieds/classified-walkthrough-video";
import type { VideoOrientation } from "@/lib/classifieds/media-layout";

export function ClassifiedMixedMedia({
  videoSrc,
  photos,
  title,
}: {
  videoSrc: string;
  photos: string[];
  title: string;
}) {
  const [orientation, setOrientation] = useState<VideoOrientation>("portrait");

  const sectionClass =
    orientation === "portrait" && photos.length > 0
      ? "flex flex-col gap-4 lg:grid lg:grid-cols-[minmax(240px,360px)_minmax(0,1fr)] lg:items-start lg:gap-5"
      : "flex flex-col gap-4";

  return (
    <div className={sectionClass} data-classified-media="mixed">
      <ClassifiedWalkthroughVideo
        src={videoSrc}
        poster={photos[0] ?? null}
        onOrientationChange={setOrientation}
      />
      <ClassifiedPhotoGallery urls={photos} title={title} mode="mixed" />
    </div>
  );
}
