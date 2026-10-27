/** Canonical public path for the Chennai jobs hub (keyword-aligned URL). */
export const CHENNAI_JOBS_HUB_PATH = "/chennai-jobs";

/** Hub tab: people looking for work in Chennai. */
export const CHENNAI_JOBS_LOOKING_PATH = "/chennai-jobs/looking-for-work";

/** Legacy path; permanent redirect to {@link CHENNAI_JOBS_HUB_PATH} in `next.config.ts`. */
export const CHENNAI_JOBS_LEGACY_HUB_PATH = "/jobs";

export function chennaiJobsDetailPath(slug: string): string {
  // Tamil-script slugs are stored already percent-encoded. The page param
  // arrives encoded; generateMetadata receives the decoded Tamil string.
  // Encoding an already-encoded slug again would break the URL.
  const segment = /%[0-9A-Fa-f]{2}/.test(slug) ? slug : encodeURIComponent(slug);
  return `${CHENNAI_JOBS_HUB_PATH}/${segment}`;
}

export function chennaiJobSeekerDetailPath(slug: string): string {
  return `${CHENNAI_JOBS_LOOKING_PATH}/${encodeURIComponent(slug)}`;
}
