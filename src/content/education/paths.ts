/** Tamil Nadu Plus Two education desk — public paths. */

export const EDUCATION_HUB_PATH = "/guides/tn-plus-two";
export const EDUCATION_SCIENCE_PATH = `${EDUCATION_HUB_PATH}/science`;
export const EDUCATION_COMMERCE_PATH = `${EDUCATION_HUB_PATH}/commerce`;
export const EDUCATION_TEXTBOOKS_PATH = `${EDUCATION_HUB_PATH}/textbooks`;
export const EDUCATION_AFTER_12TH_PATH = `${EDUCATION_HUB_PATH}/after-12th`;
export const EDUCATION_COMPARE_PATH = `${EDUCATION_HUB_PATH}/compare`;
export const EDUCATION_STRUCTURE_PATH = `${EDUCATION_HUB_PATH}/hse-structure`;
export const EDUCATION_CHOOSE_PATH = `${EDUCATION_HUB_PATH}/how-to-choose`;

export const EDUCATION_M1_PATH = "/class-11-groups-chennai";
export const EDUCATION_M2_PATH = "/plus-two-textbooks-pdf";

export const EDUCATION_EDITION = "2026 Edition";
export const EDUCATION_VERSION = "v1.0";
export const EDUCATION_ISSUED = "August 2026";

export function educationGroupPath(code: string): string {
  return `${EDUCATION_HUB_PATH}/groups/${code}`;
}

export const DGE_HOME_URL = "https://dge.tn.gov.in/";
export const TNEA_HOME_URL = "https://www.tneaonline.org/";
export const NEET_NTA_URL = "https://neet.nta.nic.in/";
export const ICAI_HOME_URL = "https://www.icai.org/";
