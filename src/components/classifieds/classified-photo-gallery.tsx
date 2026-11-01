import {
  photoGalleryAriaLabel,
  photoGalleryGridClassName,
  photoGalleryLayout,
  photoTileLayout,
  photoTileUsesMasonry,
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

  const layout = photoGalleryLayout(urls.length);
  const masonry = photoTileUsesMasonry(layout);

  return (
    <div
      className={photoGalleryGridClassName(layout)}
      aria-label={photoGalleryAriaLabel(urls.length, mode)}
    >
      {urls.map((src, i) => {
        const { frameClass, objectFit } = photoTileLayout(layout, i);
        const alt = urls.length === 1 ? title : `${title} — photo ${i + 1}`;

        if (masonry) {
          return (
            <figure
              key={src}
              className="break-inside-avoid overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]"
            >
              <Image
                src={src}
                alt={alt}
                width={640}
                height={480}
                sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 320px"
                className="h-auto w-full object-cover"
                priority={i === 0}
              />
            </figure>
          );
        }

        return (
          <figure
            key={src}
            className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--background)]"
          >
            <div className={frameClass}>
              <Image
                src={src}
                alt={alt}
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
