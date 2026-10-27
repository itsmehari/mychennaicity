import Link from "next/link";
import { PageAdSlot } from "@/components/ads/page-ad-slot";
import { BilingualToggle } from "@/components/compulsive/bilingual-toggle";
import {
  GuideDisclaimer,
  GuideFinePrint,
} from "@/components/compulsive/guide-trust-blocks";
import { ReachGuideShell } from "@/components/guides/reach-guide-shell";
import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { EDUCATION_FINE_PRINT_EXTRA } from "@/content/education/disclaimers";
import type { EducationMagnet } from "@/content/education/hse-magnets";
import type { EducationLocale } from "@/content/education/paths";

export function EducationCampaignPage({
  page,
  locale = "en",
  title,
  dek,
  paragraphs,
}: {
  page: EducationMagnet;
  locale?: EducationLocale;
  title?: string;
  dek?: string;
  paragraphs?: string[];
}) {
  return (
    <ReachGuideShell
      crumbs={[
        { label: locale === "ta" ? "முகப்பு" : "Home", href: "/" },
        { label: page.crumb },
      ]}
      eyebrow={locale === "ta" ? "கல்வி மேடை · சென்னை" : "Education desk · Campaign"}
      title={title ?? page.title}
      dek={dek ?? page.dek}
      related={page.related}
    >
      <BilingualToggle enHref={page.path} taHref={page.taPath} current={locale} />
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />
      {locale === "en" ? (
        <div className="not-prose my-8">
          <AeoAnswerBlock content={page.aeo} />
        </div>
      ) : null}
      {(paragraphs ?? page.paragraphs).map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
      <h2>{locale === "ta" ? "அடுத்த படி" : "Start here"}</h2>
      <ul>
        {page.ctas.map((link) => (
          <li key={link.href}>
            {link.href.startsWith("http") ? (
              <a href={link.href} rel="noopener noreferrer" target="_blank">
                {link.label}
              </a>
            ) : (
              <Link href={link.href}>{link.label}</Link>
            )}
          </li>
        ))}
      </ul>
      <h2 id={page.faqFragment}>FAQ</h2>
      {page.faq.map((item) => (
        <div key={item.q}>
          <h3>{item.q}</h3>
          <p>{item.a}</p>
        </div>
      ))}
      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
