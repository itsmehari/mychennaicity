/** Tamil Nadu Council of Ministers government desk — public paths. */

export const GOVERNMENT_HUB_PATH = "/guides/tn-council-of-ministers";
export const GOVERNMENT_HUB_TA_PATH = "/guides/tn-council-of-ministers-tamil";
export const GOVERNMENT_OFFICIAL_SOURCES_PATH = `${GOVERNMENT_HUB_PATH}/official-sources`;
export const GOVERNMENT_DEPARTMENTS_PATH = `${GOVERNMENT_HUB_PATH}/departments`;
export const GOVERNMENT_CHENNAI_PATH = `${GOVERNMENT_HUB_PATH}/chennai`;
export const GOVERNMENT_IAS_PATH = `${GOVERNMENT_HUB_PATH}/ias-leadership`;

export const GOVERNMENT_OFFICIAL_SOURCES_TA_PATH = `${GOVERNMENT_HUB_TA_PATH}/official-sources`;
export const GOVERNMENT_DEPARTMENTS_TA_PATH = `${GOVERNMENT_HUB_TA_PATH}/departments`;
export const GOVERNMENT_CHENNAI_TA_PATH = `${GOVERNMENT_HUB_TA_PATH}/chennai`;
export const GOVERNMENT_IAS_TA_PATH = `${GOVERNMENT_HUB_TA_PATH}/ias-leadership`;

export const GOVERNMENT_EDITION = "May 2026 expanded cabinet";
export const GOVERNMENT_VERSION = "v1.0";
export const GOVERNMENT_ISSUED = "21 May 2026 · Lok Bhavan PR 40";

export const PR38_PDF_PATH =
  "/documents/tamil-nadu-cabinet-portfolios-may-2026/lok-bhavan-press-release-no-38-16-05-2026.pdf";
export const PR40_PDF_PATH =
  "/documents/tn-council-of-ministers-may-2026/lok-bhavan-press-release-no-40-21-05-2026.pdf";

export const CABINET_NEWS_MAY16_PATH =
  "/chennai-local-news/tamil-nadu-cabinet-portfolios-may-2026";
export const CABINET_NEWS_EXPANSION_PATH =
  "/chennai-local-news/tamil-nadu-cabinet-expansion-35-ministers-may-2026";

export function ministerPath(slug: string, locale: "en" | "ta" = "en"): string {
  const base =
    locale === "ta" ? GOVERNMENT_HUB_TA_PATH : GOVERNMENT_HUB_PATH;
  return `${base}/ministers/${slug}`;
}

export function governmentHreflang(
  enPath: string,
  taPath: string,
  base: string,
) {
  return {
    canonical: `${base}${enPath}`,
    languages: {
      "en-IN": `${base}${enPath}`,
      "ta-IN": `${base}${taPath}`,
      "x-default": `${base}${enPath}`,
    },
  };
}
