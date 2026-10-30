export type ClassifiedMediaMode = "none" | "photos" | "video" | "mixed";

export type VideoOrientation = "portrait" | "landscape" | "square";

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

export function photoGalleryGridClassName(
  count: number,
  mode: ClassifiedMediaMode,
): string {
  if (count <= 0) return "";
  if (count === 1) return "grid grid-cols-1";
  if (count === 2) return "grid grid-cols-2 gap-3";
  if (count === 3) return "grid grid-cols-2 gap-3";
  return "grid grid-cols-2 gap-3";
}

export function photoTileLayout(
  count: number,
  index: number,
): { frameClass: string; objectFit: "cover" | "contain" } {
  if (count <= 0) {
    return { frameClass: "relative aspect-[4/3]", objectFit: "cover" };
  }
  if (count === 1) {
    return {
      frameClass:
        "relative aspect-[4/3] max-h-[28rem] bg-[var(--background)] sm:aspect-[16/10]",
      objectFit: "contain",
    };
  }
  if (count === 2) {
    return { frameClass: "relative aspect-[4/3]", objectFit: "cover" };
  }
  if (count === 3) {
    if (index === 0) {
      return {
        frameClass: "relative col-span-2 aspect-[16/10]",
        objectFit: "cover",
      };
    }
    return { frameClass: "relative aspect-[4/3]", objectFit: "cover" };
  }
  if (count >= 5 && index === 0) {
    return {
      frameClass: "relative col-span-2 aspect-[16/10]",
      objectFit: "cover",
    };
  }
  return { frameClass: "relative aspect-[4/3]", objectFit: "cover" };
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
