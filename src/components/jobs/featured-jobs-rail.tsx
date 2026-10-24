import { FeaturedJobsCatchAllGate } from "@/components/jobs/featured-jobs-catch-all";
import {
  FeaturedJobsRailView,
  featuredJobsRailCopy,
} from "@/components/jobs/featured-jobs-rail-view";
import { loadFeaturedJobsRail } from "@/lib/jobs/featured-jobs";

export async function FeaturedJobsRail({
  placement,
  language = "en",
  areaHubSlug,
  excludeSlug,
  variant = "section",
  className = "",
}: {
  placement: string;
  language?: "en" | "ta";
  areaHubSlug?: string;
  excludeSlug?: string;
  variant?: "section" | "aside" | "links";
  className?: string;
}) {
  let model: Awaited<ReturnType<typeof loadFeaturedJobsRail>> = null;
  try {
    model = await loadFeaturedJobsRail({ language, areaHubSlug, excludeSlug });
  } catch (err) {
    console.error("[featured-jobs] rail failed:", placement, err);
    return null;
  }
  if (!model) return null;

  return (
    <FeaturedJobsRailView
      cards={model.cards}
      copy={featuredJobsRailCopy(placement, language, model.untilLabel)}
      language={language}
      placement={placement}
      variant={variant}
      className={className}
    />
  );
}

/** Footer band on public pages that do not already feature these roles. */
export async function FeaturedJobsCatchAll() {
  try {
    const model = await loadFeaturedJobsRail({ language: "en" });
    if (!model) return null;
    return <FeaturedJobsCatchAllGate model={model} />;
  } catch (err) {
    console.error("[featured-jobs] catch-all failed:", err);
    return null;
  }
}
