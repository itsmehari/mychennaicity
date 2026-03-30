export type { FestivalRichContent } from "./types";
export {
  MYLAPORE_KAPALI_PANGUNI_2026_REF,
  MYLAPORE_PANGUNI_PDF_PATH,
  mylaporeKapaliPanguni2026Content,
} from "./mylapore-kapali-panguni-2026";

import type { FestivalRichContent } from "./types";
import {
  MYLAPORE_KAPALI_PANGUNI_2026_REF,
  mylaporeKapaliPanguni2026Content,
} from "./mylapore-kapali-panguni-2026";

const byRef: Record<string, FestivalRichContent> = {
  [MYLAPORE_KAPALI_PANGUNI_2026_REF]: mylaporeKapaliPanguni2026Content,
};

/** Returns rich content for a known `content_ref`, or null (caller falls back to standard event page). */
export function getFestivalRichContent(
  contentRef: string | null | undefined,
): FestivalRichContent | null {
  if (!contentRef?.trim()) return null;
  return byRef[contentRef.trim()] ?? null;
}
