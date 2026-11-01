import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { SuperAdminPostDetail } from "@/components/super-admin/post-detail-view";
import {
  loadEngagementSeries,
  loadRecentEngagement,
  type EngagementDay,
  type RecentEngagement,
} from "@/domains/analytics/content-engagement";
import { loadTrackedPost } from "@/domains/analytics/super-admin-catalog";
import { contentKindFromParam, isTrackedSlug } from "@/lib/analytics/engagement-events";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { readSuperAdminSession, SUPER_ADMIN_COOKIE } from "@/lib/super-admin/session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: { absolute: fullSiteTitle("Post analytics") },
  robots: { index: false, follow: false },
};

type Props = { params: Promise<{ kind: string; slug: string }> };

export default async function SuperAdminPostPage({ params }: Props) {
  const jar = await cookies();
  const session = readSuperAdminSession(jar.get(SUPER_ADMIN_COOKIE)?.value);
  if (!session) redirect("/super-admin");

  const { kind: kindParam, slug: rawSlug } = await params;
  const kind = contentKindFromParam(kindParam);
  const slug = decodeURIComponent(rawSlug);
  if (!kind || !isTrackedSlug(slug)) notFound();

  const item = await loadTrackedPost(kind, slug);
  if (!item) notFound();

  let days: EngagementDay[] = [];
  let recent: RecentEngagement[] = [];
  try {
    [days, recent] = await Promise.all([
      loadEngagementSeries(kind, slug),
      loadRecentEngagement(kind, slug),
    ]);
  } catch {
    days = [];
    recent = [];
  }

  return <SuperAdminPostDetail item={item} days={days} recent={recent} />;
}
