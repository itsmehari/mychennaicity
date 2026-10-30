import { mediaSectionClassName, resolveClassifiedMediaMode } from "@/lib/classifieds/media-layout";
import { ClassifiedMixedMedia } from "@/components/classifieds/classified-mixed-media";
import { ClassifiedPhotoGallery } from "@/components/classifieds/classified-photo-gallery";
import { ClassifiedWalkthroughVideo } from "@/components/classifieds/classified-walkthrough-video";

export function ClassifiedListingMedia({
  photos,
  videoSrc,
  title,
}: {
  photos: string[];
  videoSrc: string | null;
  title: string;
}) {
  const mode = resolveClassifiedMediaMode(photos.length, Boolean(videoSrc));
  if (mode === "none") return null;

  if (mode === "video" && videoSrc) {
    return (
      <div className={mediaSectionClassName(mode)} data-classified-media={mode}>
        <ClassifiedWalkthroughVideo src={videoSrc} poster={photos[0] ?? null} />
      </div>
    );
  }

  if (mode === "photos") {
    return (
      <div className={mediaSectionClassName(mode)} data-classified-media={mode}>
        <ClassifiedPhotoGallery urls={photos} title={title} mode={mode} />
      </div>
    );
  }

  if (mode === "mixed" && videoSrc) {
    return (
      <div className={mediaSectionClassName(mode)}>
        <ClassifiedMixedMedia
          videoSrc={videoSrc}
          photos={photos}
          title={title}
        />
      </div>
    );
  }

  return null;
}
