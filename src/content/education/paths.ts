/** Tamil Nadu Plus Two education desk — public paths. */

export const EDUCATION_HUB_PATH = "/guides/tn-plus-two";
export const EDUCATION_HUB_TA_PATH = "/guides/tn-plus-two-tamil";
export const EDUCATION_SCIENCE_PATH = `${EDUCATION_HUB_PATH}/science`;
export const EDUCATION_COMMERCE_PATH = `${EDUCATION_HUB_PATH}/commerce`;
export const EDUCATION_TEXTBOOKS_PATH = `${EDUCATION_HUB_PATH}/textbooks`;
export const EDUCATION_AFTER_12TH_PATH = `${EDUCATION_HUB_PATH}/after-12th`;
export const EDUCATION_COMPARE_PATH = `${EDUCATION_HUB_PATH}/compare`;
export const EDUCATION_STRUCTURE_PATH = `${EDUCATION_HUB_PATH}/hse-structure`;
export const EDUCATION_CHOOSE_PATH = `${EDUCATION_HUB_PATH}/how-to-choose`;
export const EDUCATION_WORKSHEET_PATH = `${EDUCATION_HUB_PATH}/worksheet`;
export const EDUCATION_2502_VS_2503_PATH = `${EDUCATION_HUB_PATH}/2502-vs-2503`;
export const EDUCATION_2702_VS_2708_PATH = `${EDUCATION_HUB_PATH}/2702-vs-2708`;

export const EDUCATION_M1_PATH = "/class-11-groups-chennai";
export const EDUCATION_M2_PATH = "/plus-two-textbooks-pdf";
export const EDUCATION_M1_TA_PATH = "/class-11-groups-chennai-tamil";
export const EDUCATION_M2_TA_PATH = "/plus-two-textbooks-pdf-tamil";

export const EDUCATION_EDITION = "2026 Edition";
export const EDUCATION_VERSION = "v1.0";
export const EDUCATION_ISSUED = "August 2026";

export type EducationLocale = "en" | "ta";

function hubBase(locale: EducationLocale): string {
  return locale === "ta" ? EDUCATION_HUB_TA_PATH : EDUCATION_HUB_PATH;
}

export function educationGroupPath(code: string, locale: EducationLocale = "en"): string {
  return `${hubBase(locale)}/groups/${code}`;
}

export function educationTextbookPath(
  slug: string,
  locale: EducationLocale = "en",
): string {
  return `${hubBase(locale)}/textbooks/${slug}`;
}

export function educationClusterPath(
  segment: string,
  locale: EducationLocale = "en",
): string {
  return `${hubBase(locale)}/${segment}`;
}

export function educationHreflang(enPath: string, taPath: string, base: string) {
  return {
    canonical: `${base}${enPath}`,
    languages: {
      "en-IN": `${base}${enPath}`,
      "ta-IN": `${base}${taPath}`,
      "x-default": `${base}${enPath}`,
    },
  };
}

export const DGE_HOME_URL = "https://dge.tn.gov.in/";
export const TNEA_HOME_URL = "https://www.tneaonline.org/";
export const NEET_NTA_URL = "https://neet.nta.nic.in/";
export const ICAI_HOME_URL = "https://www.icai.org/";
export const ICMAI_HOME_URL = "https://icmai.in/";
export const ICSI_HOME_URL = "https://www.icsi.edu/";
/** Tamil Nadu Textbook and Educational Services Corporation — verified HEAD 200 on 2026-09-12. */
export const TEXTBOOK_CORP_HOME_URL = "https://www.textbookcorp.in/";
/** Historic / alternate official host. TLS from some clients fails; keep as a portal to try, not a hotlink. */
export const TEXTBOOK_CORP_TN_URL = "https://textbookcorp.tn.gov.in/";
