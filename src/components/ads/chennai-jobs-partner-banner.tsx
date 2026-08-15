import { PageAdSlot } from "@/components/ads/page-ad-slot";

type JobsBannerSlot =
  | "jobs-index-top"
  | "jobs-index-mid"
  | "jobs-detail-mid";

/**
 * Jobs hub/detail partner unit. Prefer `<PageAdSlot />` on new pages.
 * Kept so older jobs templates keep working.
 */
export function ChennaiJobsPartnerBanner({
  slotId,
  className = "mt-6",
}: {
  slotId: JobsBannerSlot;
  className?: string;
}) {
  if (slotId === "jobs-detail-mid") {
    return (
      <PageAdSlot
        shape="square"
        placement="job_detail_square"
        className={className}
      />
    );
  }
  return (
    <PageAdSlot
      shape="rectangle"
      placement="jobs_hub_mid"
      className={className}
    />
  );
}
