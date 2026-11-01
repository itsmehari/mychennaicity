export type ClassifiedMediaMode = "none" | "photos" | "video" | "mixed";

export type VideoOrientation = "portrait" | "landscape" | "square";

/** Responsive gallery pattern from photo count. */
export type PhotoGalleryLayout =
  | "single"
  | "duo"
  | "feature"
  | "quad"
  | "masonry";

/** How a listing header should treat uploaded media. */
export function resolveClassifiedMediaMode(
  photoCount: number,
  hasVideo: boolean,
): ClassifiedMediaMode {
  if (photoCount <= 0 && !hasVideo) return "none";
  if (hasVideo && photoCount <= 0) return "video";
  if (hasVideo && photoCount > 0) return "mixed";
  return "photos";
}

export function photoGalleryLayout(photoCount: number): PhotoGalleryLayout {
  if (photoCount <= 1) return "single";
  if (photoCount === 2) return "duo";
  if (photoCount === 3) return "feature";
  if (photoCount === 4) return "quad";
  return "masonry";
}

export function videoOrientationFromDimensions(
  width: number,
  height: number,
): VideoOrientation {
  if (width <= 0 || height <= 0) return "portrait";
  const ratio = width / height;
  if (ratio > 1.12) return "landscape";
  if (ratio < 0.88) return "portrait";
  return "square";
}

export function videoShellClassName(orientation: VideoOrientation): string {
  switch (orientation) {
    case "landscape":
      return "w-full";
    case "square":
      return "mx-auto w-full max-w-lg";
    default:
      return "mx-auto w-full max-w-[min(100%,22rem)] sm:max-w-sm";
  }
}

export function videoElementClassName(orientation: VideoOrientation): string {
  const base = "w-full bg-black object-contain";
  switch (orientation) {
    case "landscape":
      return `${base} aspect-video max-h-[32rem]`;
    case "square":
      return `${base} aspect-square max-h-[24rem]`;
    default:
      return `${base} aspect-[9/16] max-h-[70vh]`;
  }
}

export function mediaSectionClassName(mode: ClassifiedMediaMode): string {
  if (mode === "none") return "";
  return "mt-5";
}

export function photoGalleryGridClassName(layout: PhotoGalleryLayout): string {
  switch (layout) {
    case "single":
      return "grid grid-cols-1";
    case "duo":
      return "grid grid-cols-1 gap-3 sm:grid-cols-2";
    case "feature":
      return "grid grid-cols-1 gap-3 sm:grid-cols-2";
    case "quad":
      return "grid grid-cols-2 gap-3";
    case "masonry":
      return "columns-2 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3";
    default:
      return "grid grid-cols-1 gap-3";
  }
}

export function photoTileUsesMasonry(layout: PhotoGalleryLayout): boolean {
  return layout === "masonry";
}

export function photoTileLayout(
  layout: PhotoGalleryLayout,
  index: number,
): { frameClass: string; objectFit: "cover" | "contain" } {
  if (layout === "single") {
    return {
      frameClass:
        "relative aspect-[4/3] max-h-[28rem] bg-[var(--background)] sm:aspect-[16/10]",
      objectFit: "contain",
    };
  }
  if (layout === "duo") {
    return { frameClass: "relative aspect-[4/3] sm:aspect-[3/4]", objectFit: "cover" };
  }
  if (layout === "feature") {
    if (index === 0) {
      return {
        frameClass: "relative aspect-[16/10] sm:col-span-2",
        objectFit: "cover",
      };
    }
    return { frameClass: "relative aspect-[4/3]", objectFit: "cover" };
  }
  if (layout === "quad") {
    return { frameClass: "relative aspect-square sm:aspect-[4/3]", objectFit: "cover" };
  }
  return { frameClass: "", objectFit: "cover" };
}

export function photoGalleryAriaLabel(
  count: number,
  mode: ClassifiedMediaMode,
): string {
  if (mode === "mixed") {
    return count === 1 ? "Listing photo" : `Listing photos (${count})`;
  }
  return count === 1 ? "Listing photo" : "Listing photos";
}
