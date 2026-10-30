import {
  photoGalleryAriaLabel,
  photoGalleryGridClassName,
  photoTileLayout,
  resolveClassifiedMediaMode,
} from "@/lib/classifieds/media-layout";
import Image from "next/image";

export function ClassifiedPhotoGallery({
  urls,
  title,
  mode,
}: {
  urls: string[];
  title: string;
  mode: ReturnType<typeof resolveClassifiedMediaMode>;
}) {
  if (urls.length === 0) return null;

  return (
    <div
      className={photoGalleryGridClassName(urls.length, mode)}
      aria-label={photoGalleryAriaLabel(urls.length, mode)}
    >
      {urls.map((src, i) => {
        const { frameClass, objectFit } = photoTileLayout(urls.length, i);
        return (
          <figure
            key={src}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]"
          >
            <div className={frameClass}>
              <Image
                src={src}
                alt={urls.length === 1 ? title : `${title} — photo ${i + 1}`}
                fill
                sizes={
                  urls.length === 1
                    ? "(max-width: 1100px) 100vw, 720px"
                    : "(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 360px"
                }
                className={
                  objectFit === "contain" ? "object-contain" : "object-cover"
                }
                priority={i === 0}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
