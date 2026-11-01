import { revalidatePath } from "next/cache";
import { revalidateSitemapSurfaces } from "@/lib/revalidate-sitemap-surfaces";
import { CHENNAI_CLASSIFIEDS_HUB_PATH } from "@/lib/routes/chennai-classifieds";
import { CHENNAI_JOBS_HUB_PATH, CHENNAI_JOBS_LOOKING_PATH } from "@/lib/routes/chennai-jobs";

const AI_DISCOVERY_PATHS = [
  "/llms.txt",
  "/llms-full.txt",
  "/aeo/chennai.md",
  "/chennai-jobs/feed.xml",
  "/chennai-local-events/feed.xml",
] as const;

function revalidateAiDiscovery(): void {
  for (const path of AI_DISCOVERY_PATHS) revalidatePath(path);
}

/**
 * Bust cached routes for jobs/events hubs, sitemap, AI discovery files, and optional detail pages.
 * Safe after DB seeds or future admin publish.
 */
export function revalidateListingsSurfaces(options?: {
  jobSlug?: string;
  jobSeekerSlug?: string;
  classifiedSlug?: string;
  eventSlug?: string;
  directoryType?: string;
  directorySlug?: string;
}): void {
  revalidateSitemapSurfaces();
  revalidateAiDiscovery();
  revalidatePath("/");
  revalidatePath(CHENNAI_JOBS_HUB_PATH);
  revalidatePath(CHENNAI_JOBS_LOOKING_PATH);
  revalidatePath(CHENNAI_CLASSIFIEDS_HUB_PATH);
  revalidatePath("/chennai-local-events");
  revalidatePath("/directory");
  const jobSlug = options?.jobSlug?.trim();
  if (jobSlug) {
    revalidatePath(`/chennai-jobs/${jobSlug}`);
    revalidatePath(`/chennai-jobs/${jobSlug}/markdown`);
  }
  const jobSeekerSlug = options?.jobSeekerSlug?.trim();
  if (jobSeekerSlug) {
    revalidatePath(`${CHENNAI_JOBS_LOOKING_PATH}/${jobSeekerSlug}`);
    revalidatePath(`${CHENNAI_JOBS_LOOKING_PATH}/${jobSeekerSlug}/markdown`);
  }
  const classifiedSlug = options?.classifiedSlug?.trim();
  if (classifiedSlug) {
    revalidatePath(`${CHENNAI_CLASSIFIEDS_HUB_PATH}/${classifiedSlug}`);
  }
  const eventSlug = options?.eventSlug?.trim();
  if (eventSlug) {
    revalidatePath(`/chennai-local-events/${eventSlug}`);
    revalidatePath(`/chennai-local-events/${eventSlug}/markdown`);
  }
  const directoryType = options?.directoryType?.trim();
  const directorySlug = options?.directorySlug?.trim();
  if (directoryType && directorySlug) {
    revalidatePath(`/directory/${directoryType}/${directorySlug}`);
  }
}
