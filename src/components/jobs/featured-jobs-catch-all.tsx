"use client";

import { usePathname } from "next/navigation";
import { pageHidesFeaturedJobsCatchAll } from "@/content/jobs/featured-job-campaigns";
import {
  FeaturedJobsRailView,
  featuredJobsRailCopy,
} from "@/components/jobs/featured-jobs-rail-view";
import type { FeaturedJobsRailModel } from "@/lib/jobs/featured-jobs";

export function FeaturedJobsCatchAllGate({
  model,
}: {
  model: FeaturedJobsRailModel;
}) {
  const pathname = usePathname() ?? "/";
  if (pageHidesFeaturedJobsCatchAll(pathname)) return null;

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 pb-2 pt-8">
      <FeaturedJobsRailView
        cards={model.cards}
        copy={featuredJobsRailCopy("site_catch_all", "en", model.untilLabel)}
        placement="site_catch_all"
      />
    </div>
  );
}
