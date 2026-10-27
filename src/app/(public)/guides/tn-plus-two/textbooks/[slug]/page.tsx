import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EducationTextbookFinder } from "@/components/education/education-textbook-finder";
import {
  getTextbookFinder,
  textbooksForFinder,
  TEXTBOOK_FINDER_SLUGS,
  type TextbookFinderSlug,
} from "@/content/education/hse-textbooks";
import {
  EDUCATION_HUB_PATH,
  educationHreflang,
  educationTextbookPath,
} from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { buildEducationTextbookJsonLd } from "@/lib/seo/education-jsonld";
import { fullSiteTitle } from "@/lib/seo/site-titles";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return TEXTBOOK_FINDER_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const finder = getTextbookFinder(slug);
  if (!finder) return { title: "Textbook finder" };
  const path = educationTextbookPath(finder.slug);
  const ta =
    finder.slug === "class-11" || finder.slug === "class-12"
      ? educationTextbookPath(finder.slug, "ta")
      : undefined;
  return {
    title: finder.seoTitle,
    description: finder.seoDescription,
    alternates: ta
      ? educationHreflang(path, ta, getSiteUrl())
      : { canonical: `${getSiteUrl()}${path}` },
    openGraph: {
      title: fullSiteTitle(finder.seoTitle),
      description: finder.seoDescription,
      url: `${getSiteUrl()}${path}`,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function TextbookFinderPage({ params }: Props) {
  const { slug } = await params;
  const finder = getTextbookFinder(slug);
  if (!finder) notFound();
  const books = textbooksForFinder(finder.slug as TextbookFinderSlug);
  const pdfs = books
    .map((b) => b.officialPdfUrl)
    .filter((url): url is string => Boolean(url));
  const jsonLd = buildEducationTextbookJsonLd({
    path: educationTextbookPath(finder.slug),
    name: finder.seoTitle,
    description: finder.seoDescription,
    officialPdfUrls: pdfs,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <EducationTextbookFinder finder={finder} books={books} />
      <span className="sr-only">{EDUCATION_HUB_PATH}</span>
    </>
  );
}
