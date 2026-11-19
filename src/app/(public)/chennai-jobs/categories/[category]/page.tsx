import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JobSliceListing } from "@/components/jobs/job-slice-listing";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { JOB_CATEGORIES } from "@/content/jobs/job-categories";
import { loadCategoryLanding } from "@/domains/jobs/landings";
import { getSiteUrl } from "@/lib/env";
import { CHENNAI_JOBS_HUB_PATH, chennaiJobsCategoryPath } from "@/lib/routes/chennai-jobs";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ category: string }> };

export function generateStaticParams() {
  return JOB_CATEGORIES.map((item) => ({ category: item.slug }));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const landing = await loadCategoryLanding(slug).catch(() => null);
  if (!landing) return { title: { absolute: fullSiteTitle("Job category not found") } };
  const base = getSiteUrl();
  const title = landing.category.h1;
  const description = landing.indexable
    ? `${landing.total} open ${landing.category.label.toLowerCase()} listings in Chennai on MyChennaiCity. Read the notice, then apply on the employer’s own channel.`
    : `${landing.category.h1}. The full list of open roles is the Chennai jobs board.`;
  return {
    title,
    description,
    robots: landing.indexable ? undefined : { index: false, follow: true },
    alternates: {
      canonical: landing.indexable
        ? `${base}${chennaiJobsCategoryPath(slug)}`
        : `${base}${CHENNAI_JOBS_HUB_PATH}`,
    },
    openGraph: {
      title: fullSiteTitle(title),
      description,
      url: `${base}${chennaiJobsCategoryPath(slug)}`,
    },
  };
}

export default async function ChennaiJobsCategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const landing = await loadCategoryLanding(slug).catch(() => null);
  if (!landing) notFound();
  return (
    <div className={interiorMainClassName}>
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
          { label: landing.category.label },
        ]}
      />
      <JobSliceListing
        heading={landing.category.h1}
        intro={landing.category.intro}
        rows={landing.rows}
        total={landing.total}
        indexable={landing.indexable}
      />
      <InteriorCrossNav />
    </div>
  );
}
