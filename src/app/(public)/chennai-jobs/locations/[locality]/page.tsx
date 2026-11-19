import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobSliceListing } from "@/components/jobs/job-slice-listing";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { JOB_LOCALITIES } from "@/content/jobs/job-localities";
import { loadLocalityLanding } from "@/domains/jobs/landings";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsLocationPath } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ locality: string }> };

export function generateStaticParams() {
  return JOB_LOCALITIES.map((item) => ({ locality: item.slug }));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locality: slug } = await params;
  const landing = await loadLocalityLanding(slug).catch(() => null);
  if (!landing) return { title: { absolute: fullSiteTitle("Jobs area not found") } };
  const base = getSiteUrl();
  const title = `Jobs in ${landing.locality.label}, Chennai`;
  const description = landing.indexable
    ? `${landing.total} open listings that name ${landing.locality.label} on MyChennaiCity. Read each notice, then apply on the employer’s own phone or page.`
    : `Chennai job notices that name ${landing.locality.label}. The city board is the full list.`;
  return {
    title,
    description,
    robots: landing.indexable ? undefined : { index: false, follow: true },
    alternates: {
      canonical: landing.indexable
        ? `${base}${chennaiJobsLocationPath(slug)}`
        : `${base}${CHENNAI_JOBS_HUB_PATH}`,
    },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: `${base}${chennaiJobsLocationPath(slug)}`,
    },
  };
}

export default async function ChennaiJobsLocalityPage({ params }: Props) {
  const { locality: slug } = await params;
  const landing = await loadLocalityLanding(slug).catch(() => null);
  if (!landing) notFound();
  const heading = `Jobs in ${landing.locality.label}, Chennai`;
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
          { label: landing.locality.label },
        ]}
      />
      <JobSliceListing
        heading={heading}
        intro={landing.locality.intro}
        rows={landing.rows}
        total={landing.total}
        indexable={landing.indexable}
        areaHref={
          landing.locality.areaHubSlug
            ? `/areas/${landing.locality.areaHubSlug}`
            : null
        }
      />
      <InteriorCrossNav />
    </div>
  );
}
