import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BusinessWhatsAppCta } from "@/components/community/business-whatsapp-cta";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { JobDetailResumeDoctorStrip } from "@/components/jobs/job-detail-resumedoctor-strip";
import { JobSeekerPostDetail } from "@/components/jobs/job-seeker-post-detail";
import { getOpenJobSeekerPostBySlug } from "@/domains/job-seekers";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
} from "@/lib/routes/chennai-jobs";
import {
  buildJobSeekerBreadcrumbJsonLd,
  buildJobSeekerPostJsonLd,
} from "@/lib/seo/job-seeker-jsonld";
import {
  buildClippedTitleSegment,
  fullSiteTitle,
} from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function clipDesc(s: string, max = 155): string {
  const t = s.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post: Awaited<ReturnType<typeof getOpenJobSeekerPostBySlug>> = null;
  try {
    post = await getOpenJobSeekerPostBySlug(slug);
  } catch {
    return { title: { absolute: fullSiteTitle("Profile not found") } };
  }
  if (!post) return { title: { absolute: fullSiteTitle("Profile not found") } };
  const base = getSiteUrl();
  const url = `${base}${CHENNAI_JOBS_LOOKING_PATH}/${encodeURIComponent(slug)}`;
  const desc = clipDesc(post.body) || post.title;
  const titleSegment = buildClippedTitleSegment(post.title, " · Looking for work");
  const docTitle = fullSiteTitle(titleSegment);
  return {
    title: titleSegment,
    description: desc,
    alternates: { canonical: url },
    openGraph: {
      title: docTitle,
      description: desc,
      url,
      type: "profile",
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: desc,
      images: ["/twitter-image"],
    },
  };
}

export default async function ChennaiJobSeekerDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getOpenJobSeekerPostBySlug(slug);
  if (!post) notFound();

  const postLd = buildJobSeekerPostJsonLd(post);
  const crumbLd = buildJobSeekerBreadcrumbJsonLd(post.slug, post.title);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbLd) }}
      />
      <div className={interiorMainClassName}>
        <PageBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
            { label: "Looking for work", href: CHENNAI_JOBS_LOOKING_PATH },
            { label: post.title },
          ]}
        />
        <JobDetailResumeDoctorStrip audience="job-seeker" />
        <JobSeekerPostDetail post={post} />
        <div className="mt-12 max-w-2xl">
          <BusinessWhatsAppCta variant="jobs" />
        </div>
        <InteriorCrossNav />
      </div>
    </>
  );
}
