import Link from "next/link";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import type { MinisterRow } from "@/content/government/ministers-may-2026";
import { ministerDisplayName } from "@/content/government/ministers-may-2026";
import { getMinisterTamil } from "@/content/government/ministers-ta";
import { chennaiConcernForMinister } from "@/content/government/chennai-relevance";
import {
  GOVERNMENT_DISCLAIMER_EXTRA,
  GOVERNMENT_DISCLAIMER_EXTRA_TA,
  GOVERNMENT_FINE_PRINT_EXTRA,
  GOVERNMENT_FINE_PRINT_EXTRA_TA,
} from "@/content/government/disclaimers";
import {
  GOVERNMENT_DEPARTMENTS_PATH,
  GOVERNMENT_HUB_PATH,
  GOVERNMENT_HUB_TA_PATH,
  ministerPath,
} from "@/content/government/paths";
import { GOVERNMENT_HUB_RELATED, GOVERNMENT_HUB_RELATED_TA } from "@/content/government/reshuffle-links";

type Props = {
  minister: MinisterRow;
  locale?: "en" | "ta";
};

export function MinisterPageContent({ minister, locale = "en" }: Props) {
  const ta = locale === "ta" ? getMinisterTamil(minister.slug) : undefined;
  const concerns = chennaiConcernForMinister(minister.slug);
  const hubPath = locale === "ta" ? GOVERNMENT_HUB_TA_PATH : GOVERNMENT_HUB_PATH;
  const related = locale === "ta" ? GOVERNMENT_HUB_RELATED_TA : GOVERNMENT_HUB_RELATED;
  const deptPath =
    locale === "ta"
      ? `${GOVERNMENT_HUB_TA_PATH}/departments`
      : GOVERNMENT_DEPARTMENTS_PATH;

  const designation = ta?.designation ?? minister.designation;
  const ministryTitle = ta?.ministryTitle ?? minister.ministryTitle;
  const portfolios = ta?.portfolios ?? minister.portfolios;
  const chennaiText = ta?.chennaiRelevance ?? minister.chennaiRelevance;

  return (
    <ReachGuideShell
      crumbs={[
        { label: locale === "ta" ? "முகப்பு" : "Home", href: "/" },
        {
          label: locale === "ta" ? "அமைச்சரவை" : "Council of Ministers",
          href: hubPath,
        },
        { label: ministerDisplayName(minister) },
      ]}
      eyebrow={
        locale === "ta"
          ? `அரசு desk · #${minister.order}`
          : `Government desk · Minister ${minister.order} of 35`
      }
      title={ministerDisplayName(minister)}
      dek={designation}
      related={related}
    >
      <GuideDisclaimer
        kind="civic"
        extra={locale === "ta" ? GOVERNMENT_DISCLAIMER_EXTRA_TA : GOVERNMENT_DISCLAIMER_EXTRA}
      />

      <p className="text-lg font-semibold text-[var(--foreground)]">{ministryTitle}</p>

      <h2>{locale === "ta" ? "Portfolio" : "Portfolios"}</h2>
      <ul>
        {portfolios.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      {chennaiText ? (
        <>
          <h2>{locale === "ta" ? "சென்னை தொடர்பு" : "Chennai relevance"}</h2>
          <p>{chennaiText}</p>
        </>
      ) : null}

      {concerns.length > 0 ? (
        <>
          <h2>{locale === "ta" ? "Citizen shelf" : "On the Chennai shelf"}</h2>
          <ul>
            {concerns.map((c) => (
              <li key={c.concern}>
                {locale === "ta" ? c.concernTa : c.concern}
                {c.civicToolHref ? (
                  <>
                    {" "}
                    —{" "}
                    <Link href={c.civicToolHref} className="font-semibold">
                      {c.civicToolLabel}
                    </Link>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {minister.newsSlugs && minister.newsSlugs.length > 0 ? (
        <>
          <h2>{locale === "ta" ? "Related news" : "Related reading"}</h2>
          <ul>
            {minister.newsSlugs.map((slug) => (
              <li key={slug}>
                <Link href={`/chennai-local-news/${slug}`}>{slug.replace(/-/g, " ")}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <p>
        <Link href={deptPath} className="font-semibold">
          {locale === "ta" ? "Department lookup" : "Department lookup"}
        </Link>
        {" · "}
        <Link href={hubPath} className="font-semibold">
          {locale === "ta" ? "Full roster" : "Full minister roster"}
        </Link>
        {" · "}
        <Link
          href={
            locale === "ta"
              ? ministerPath(minister.slug, "en")
              : ministerPath(minister.slug, "ta")
          }
          className="font-semibold"
        >
          {locale === "ta" ? "English" : "தமிழ்"}
        </Link>
      </p>

      <GuideFinePrint
        extra={locale === "ta" ? GOVERNMENT_FINE_PRINT_EXTRA_TA : GOVERNMENT_FINE_PRINT_EXTRA}
      />
    </ReachGuideShell>
  );
}
