/**
 * Posters that name several roles on one URL. JobPosting is one vacancy.
 * Editors can also turn schema off per row.
 */
const MULTI_ROLE_SLUG_MARKERS = [
  "pre-opening-team",
  "it-jobs-freshers-isoftronics",
  "visual-editor-graphic-designer",
] as const;

export function jobPostingSchemaEligible(job: {
  slug: string;
  schemaEligible?: boolean | null;
}): boolean {
  if (job.schemaEligible === false) return false;
  return !MULTI_ROLE_SLUG_MARKERS.some((marker) => job.slug.includes(marker));
}
