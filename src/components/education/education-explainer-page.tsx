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
import type { EducationExplainer } from "@/content/education/hse-pathways";
import { EDUCATION_HUB_PATH } from "@/content/education/paths";

export function EducationExplainerPage({ page }: { page: EducationExplainer }) {
  return (
    <ReachGuideShell
      crumbs={[
        { label: "Home", href: "/" },
        { label: "TN Plus Two", href: EDUCATION_HUB_PATH },
        { label: page.crumb },
      ]}
      eyebrow="Education desk"
      title={page.title}
      dek={page.dek}
      related={page.related}
    >
      {page.taPath ? (
        <BilingualToggle enHref={page.path} taHref={page.taPath} current="en" />
      ) : null}
      <GuideDisclaimer kind="education" />
      <PageAdSlot shape="rectangle" placement="tn_plus_two" />
      {page.aeo ? (
        <div className="not-prose my-8">
          <AeoAnswerBlock content={page.aeo} />
        </div>
      ) : null}
      {page.paragraphs.map((p) => (
        <p key={p.slice(0, 48)}>{p}</p>
      ))}
      {page.sections.map((section) => (
        <div key={section.heading}>
          <h2>{section.heading}</h2>
          <ul>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      {page.childLinks.length > 0 ? (
        <>
          <h2>Continue in this cluster</h2>
          <ul>
            {page.childLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {page.officialLinks.length > 0 ? (
        <>
          <h2>Official portals</h2>
          <ul>
            {page.officialLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} rel="noopener noreferrer" target="_blank">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : null}
      {page.faq.length > 0 ? (
        <>
          <h2 id={page.faqFragment}>FAQ</h2>
          {page.faq.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </>
      ) : null}
      <GuideFinePrint extra={EDUCATION_FINE_PRINT_EXTRA} />
    </ReachGuideShell>
  );
}
