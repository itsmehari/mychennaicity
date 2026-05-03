import { AdSlot } from "@/ads/render-ad-slot";
import { CHENNAI_JOBS_PARTNER_CREATIVE_IDS } from "@/ads/registry";

type JobsBannerSlot = "jobs-index-top" | "jobs-detail-mid";

/**
 * Rotates [ResumeDoctor](https://www.resumedoctor.in/) and
 * [Vacancy Chennai](https://vacancychennai.in/) — new random pick each server
 * render (page load / visitor), independent per slot on the hub vs detail page.
 */
export function ChennaiJobsPartnerBanner({
  slotId,
  className = "mt-6",
}: {
  slotId: JobsBannerSlot;
  className?: string;
}) {
  return (
    <div className={className}>
      <AdSlot
        slotId={slotId}
        size="728x90"
        creativeIds={CHENNAI_JOBS_PARTNER_CREATIVE_IDS}
      />
    </div>
  );
}
