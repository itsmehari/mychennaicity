import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import {
  CHENNAI_TOURISM_HUB_PATH,
  ECR_WEEKEND_PLAN_PATH,
  TTDC_ECR_NEWS_PATH,
  TTDC_ECR_POSTER_PATH,
} from "@/content/tourism";
import {
  ECR_WEEKEND_PILLARS,
  ECR_WEEKEND_POSTER_ALT,
  ECR_WEEKEND_WINDOW,
} from "@/content/tourism/ecr-weekend-plan";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";
import { buildTourismHubJsonLd } from "@/lib/seo/tourism-jsonld";

const titleSegment = "Chennai tourism";

export const metadata: Metadata = {
  title: titleSegment,
  description:
    "Chennai tourism desk — East Coast Road weekend loops, Mamallapuram, temples, boats, and Tamil Nadu Tourism stops you can actually drive from the city.",
  alternates: { canonical: `${getSiteUrl()}${CHENNAI_TOURISM_HUB_PATH}` },
  openGraph: {
    title: fullSiteTitle(titleSegment),
    description:
      "ECR weekend plans, Mamallapuram, and TTDC stops — a Chennai-first tourism desk, not an official agency site.",
    url: `${getSiteUrl()}${CHENNAI_TOURISM_HUB_PATH}`,
    images: [{ url: TTDC_ECR_POSTER_PATH, width: 512, height: 640 }],
  },
};

export default function ChennaiTourismHubPage() {
  const jsonLd = buildTourismHubJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReachGuideShell
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Chennai tourism" },
        ]}
        eyebrow="Tourism · East Coast Road"
        title="Chennai tourism"
        dek="A resident’s desk for weekends you can actually drive — ECR, Mamallapuram, temples, boats, and Tamil Nadu Tourism stops — with the official poster unpacked, not copied as a brochure."
        related={[
          { href: ECR_WEEKEND_PLAN_PATH, label: "This weekend ECR plan" },
          { href: TTDC_ECR_NEWS_PATH, label: "News: TTDC ECR weekend loop" },
          { href: "/chennai-local-events#events-weekend", label: "Events this weekend" },
          { href: "/guides/chennai-festivals-calendar", label: "Festivals calendar" },
        ]}
      >
        <GuideDisclaimer
          kind="culture"
          extra="This hub is independent civic / travel journalism. It is not the Tamil Nadu Tourism or TTDC website. Tickets, boat slots, and ₹99 meal availability must be confirmed on the ground or on official portals."
        />

        <h2>This weekend on ECR</h2>
        <p>
          Tamil Nadu Tourism circulated a loop titled <strong>This Weekend ECR Plan</strong> —{" "}
          {ECR_WEEKEND_PILLARS.join(" · ").toLowerCase()} — from Chennai down East Coast Road and
          back. The kite festival and WSL surf championship both land on{" "}
          <strong>{ECR_WEEKEND_WINDOW.label}</strong>.
        </p>

        <div className="not-prose my-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          <Link href={ECR_WEEKEND_PLAN_PATH} className="block cursor-pointer">
            <Image
              src={TTDC_ECR_POSTER_PATH}
              alt={ECR_WEEKEND_POSTER_ALT}
              width={512}
              height={640}
              className="h-auto w-full"
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </Link>
          <div className="space-y-3 p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent)]">
              Featured itinerary
            </p>
            <h3 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              This weekend ECR plan
            </h3>
            <p className="text-sm leading-relaxed text-[var(--muted)]">
              Marundeeswarar Temple → DakshinaChitra → Muttukkadu boats → TTDC ₹99 chicken
              biryani → kite festival → UNESCO Shore Temple → surfing championship — then back to
              Chennai.
            </p>
            <Link
              href={ECR_WEEKEND_PLAN_PATH}
              className="inline-flex min-h-11 items-center font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
            >
              Open the full stop-by-stop plan
            </Link>
          </div>
        </div>

        <h2>What this desk is for</h2>
        <ul>
          <li>Unpack official Tamil Nadu Tourism posters into driveable Chennai loops.</li>
          <li>Pair festival weekends with events already listed on our local calendar.</li>
          <li>
            Stay honest about tickets, closures, and promotions (including the ₹99 biryani) that
            can differ by kitchen.
          </li>
        </ul>

        <GuideFinePrint />
      </ReachGuideShell>
    </>
  );
}
