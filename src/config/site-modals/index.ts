export type {
  SiteModalCampaign,
  SiteModalCta,
  SiteModalPoolItem,
  SiteModalPolicy,
  SiteModalRotationSlot,
} from "./types";

export {
  siteModalPolicy,
  isSiteModalAutoPathAllowed,
  isSiteModalPathSuppressed,
} from "./policy";

export {
  siteModalCampaigns,
  campaignById,
  campaignByCtaKey,
  pickWeightedCampaign,
} from "./campaigns";

/** CustomEvent + data-site-cta contract */
export const SITE_MODAL_OPEN_EVENT = "mcc:open-site-modal";

export type SiteModalOpenDetail = {
  key: string;
  trigger?: "click" | "first_visit" | "rotation" | "programmatic";
};

export function dispatchOpenSiteModal(
  key: string,
  trigger: SiteModalOpenDetail["trigger"] = "programmatic",
): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent(SITE_MODAL_OPEN_EVENT, {
      detail: { key, trigger } satisfies SiteModalOpenDetail,
    }),
  );
}
