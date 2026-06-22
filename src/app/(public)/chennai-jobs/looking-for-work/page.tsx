import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/home/section";
import {
  InteriorCrossNav,
  PageBreadcrumbs,
  interiorMainClassName,
} from "@/components/site/interior-chrome";
import { ChennaiJobsHubTabs } from "@/components/jobs/chennai-jobs-hub-tabs";
import { HubCommunityStrip } from "@/components/community/hub-community-strip";
import { WhatsAppCommunityJoinLink } from "@/components/community/whatsapp-community-join-link";
import {
  countOpenJobPostingsForChennaiHub,
} from "@/domains/jobs";
import {
  countOpenJobSeekerPostsForChennaiHub,
  listOpenJobSeekerPostsForChennaiHub,
} from "@/domains/job-seekers";
import { getSiteUrl } from "@/lib/env";
import {
  CHENNAI_JOBS_HUB_PATH,
  CHENNAI_JOBS_LOOKING_PATH,
  chennaiJobSeekerDetailPath,
} from "@/lib/routes/chennai-jobs";
import { buildJobSeekersHubJsonLd } from "@/lib/seo/job-seeker-jsonld";
import { formatIndiaLongDate } from "@/lib/presentation-dates";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const hubTitleSegment = "Looking for work in Chennai";

const PAGE_SIZE = 20;

type PageProps = { searchParams: Promise<{ page?: string }> };

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const base = getSiteUrl();
  const hubUrl = `${base}${CHENNAI_JOBS_LOOKING_PATH}`;
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  let total = 0;
  try {
    total = await countOpenJobSeekerPostsForChennaiHub();
  } catch {
    total = 0;
  }
  const description =
    total > 0
      ? `${total} people in Chennai looking for work — watchmen, caretakers, household help, and more. Employers can reach out directly.`
      : "Chennai residents posting that they are available for hire — watchman, caretaker, and household roles with stay when needed.";

  const canonical =
    pageNum <= 1 ? hubUrl : `${hubUrl}?page=${pageNum}`;

  const titleSegment =
    pageNum <= 1 ? hubTitleSegment : `${hubTitleSegment} — Page ${pageNum}`;

  return {
    title: titleSegment,
    description,
    alternates: { canonical },
    openGraph: {
      title: fullSiteTitle(titleSegment),
      description,
      url: canonical,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullSiteTitle(titleSegment),
      description,
      images: ["/twitter-image"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function ChennaiJobsLookingForWorkPage({
  searchParams,
}: PageProps) {
  const sp = await searchParams;
  const pageNum = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const offset = (pageNum - 1) * PAGE_SIZE;

  let openingsTotal = 0;
  let total = 0;
  let posts: Awaited<ReturnType<typeof listOpenJobSeekerPostsForChennaiHub>> =
    [];
  try {
    openingsTotal = await countOpenJobPostingsForChennaiHub();
    total = await countOpenJobSeekerPostsForChennaiHub();
    posts = await listOpenJobSeekerPostsForChennaiHub(PAGE_SIZE, offset);
  } catch {
    posts = [];
    total = 0;
    openingsTotal = 0;
  }

  const useDb = total > 0;
  const hubLd = useDb ? buildJobSeekersHubJsonLd(posts) : null;
  const totalPages = useDb ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : 1;
  const hasPrev = pageNum > 1;
  const hasNext = useDb && pageNum < totalPages;
  const snapshotAsOf = formatIndiaLongDate();

  return (
    <div className={interiorMainClassName}>
      {hubLd ? (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(hubLd.collectionPage),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(hubLd.itemList) }}
          />
        </>
      ) : null}
      <PageBreadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Jobs in Chennai", href: CHENNAI_JOBS_HUB_PATH },
          { label: "Looking for work" },
        ]}
      />
      <p className="type-eyebrow text-[var(--accent)]">Work</p>
      <h1 className="type-display mt-2 text-3xl text-[var(--foreground)] sm:text-4xl">
        Looking for work in Chennai
      </h1>
      <p className="type-lede mt-4 max-w-2xl text-sm leading-relaxed">
        People in Chennai posting that they are <strong className="font-medium text-[var(--foreground)]">available to hire</strong>{" "}
        — watchmen, caretakers, household help, and similar roles. If you are
        hiring, read the profile and reach out directly.{" "}
        {useDb ? (
          <>
            <strong className="font-medium text-[var(--foreground)]">
              {total} {total === 1 ? "profile" : "profiles"}
            </strong>{" "}
            listed as of {snapshotAsOf}.
          </>
        ) : (
          <>
            Know someone looking? Send details via{" "}
            <Link
              href="/contact#jobs"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Contact → Jobs
            </Link>
            .
          </>
        )}
      </p>

      <ChennaiJobsHubTabs
        active="seeking"
        openingsCount={openingsTotal}
        seekingCount={total}
      />

      <p className="mt-6">
        <WhatsAppCommunityJoinLink
          utmContent="jobs-looking-hub"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-[0.97]"
        >
          Job alerts on WhatsApp
        </WhatsAppCommunityJoinLink>
      </p>

      <HubCommunityStrip businessVariant="jobs" />

      <ul className="mt-10 space-y-4">
        {useDb
          ? posts.map((post) => (
              <li
                key={post.id}
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-sm"
              >
                <Link
                  href={chennaiJobSeekerDetailPath(post.slug)}
                  className="block text-[var(--foreground)] transition hover:text-[var(--accent)]"
                >
                  <span className="text-sm font-semibold">{post.title}</span>
                  <span className="mt-1 block text-xs text-[var(--muted)]">
                    {post.roleSought ?? "Available for hire"}
                    {post.locationLabel ? ` · ${post.locationLabel}` : " · Chennai"}
                    {post.needsAccommodation ? (
                      <span className="text-[var(--accent)]"> · Stay needed</span>
                    ) : null}
                    {post.availability ? ` · ${post.availability}` : null}
                  </span>
                </Link>
              </li>
            ))
          : (
              <li className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)] px-5 py-6 text-sm text-[var(--muted)]">
                No profiles yet. Share availability via{" "}
                <Link
                  href="/contact#jobs"
                  className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                >
                  Contact → Jobs
                </Link>
                .
              </li>
            )}
      </ul>

      {useDb && totalPages > 1 ? (
        <nav
          className="mt-8 flex flex-wrap items-center gap-3 text-sm"
          aria-label="Looking for work pages"
        >
          {hasPrev ? (
            <Link
              href={
                pageNum === 2
                  ? CHENNAI_JOBS_LOOKING_PATH
                  : `${CHENNAI_JOBS_LOOKING_PATH}?page=${pageNum - 1}`
              }
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Previous
            </Link>
          ) : (
            <span className="text-[var(--muted)]">Previous</span>
          )}
          <span className="text-[var(--muted)]">
            Page {pageNum} of {totalPages}
          </span>
          {hasNext ? (
            <Link
              href={`${CHENNAI_JOBS_LOOKING_PATH}?page=${pageNum + 1}`}
              className="font-medium text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Next
            </Link>
          ) : (
            <span className="text-[var(--muted)]">Next</span>
          )}
        </nav>
      ) : null}

      <Section
        className="mt-14"
        eyebrow="For employers"
        title="Hiring from these posts"
        subtitle="Treat each profile like a referral — verify identity, duties, and pay before you commit."
      >
        <ul className="max-w-2xl space-y-3 text-sm leading-relaxed text-[var(--muted)]">
          <li>
            <strong className="text-[var(--foreground)]">Accommodation.</strong>{" "}
            Many seekers need on-site or quarters stay for their family — confirm
            what you can offer before you interview.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">List a vacancy.</strong>{" "}
            Have an open role instead? Post via{" "}
            <Link
              href="/contact#jobs"
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Contact → Jobs
            </Link>{" "}
            or browse{" "}
            <Link
              href={CHENNAI_JOBS_HUB_PATH}
              className="font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              open jobs
            </Link>
            .
          </li>
        </ul>
      </Section>

      <InteriorCrossNav />
    </div>
  );
}
