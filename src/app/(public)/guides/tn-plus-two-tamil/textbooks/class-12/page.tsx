import type { Metadata } from "next";
import { EducationTextbookFinder } from "@/components/education/education-textbook-finder";
import { HSE_CLASS_BOOK_TA } from "@/content/education/hse-tamil";
import { getTextbookFinder, textbooksForFinder } from "@/content/education/hse-textbooks";
import { educationHreflang, educationTextbookPath } from "@/content/education/paths";
import { getSiteUrl } from "@/lib/env";
import { fullSiteTitle } from "@/lib/seo/site-titles";

const copy = HSE_CLASS_BOOK_TA["class-12"];
const finder = getTextbookFinder("class-12")!;

export const metadata: Metadata = {
  title: copy.seoTitle,
  description: copy.seoDescription,
  alternates: educationHreflang(
    educationTextbookPath("class-12"),
    educationTextbookPath("class-12", "ta"),
    getSiteUrl(),
  ),
  openGraph: {
    title: fullSiteTitle(copy.seoTitle),
    description: copy.seoDescription,
    url: `${getSiteUrl()}${educationTextbookPath("class-12", "ta")}`,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return (
    <EducationTextbookFinder
      finder={finder}
      books={textbooksForFinder("class-12")}
      locale="ta"
      title={copy.title}
      dek={copy.dek}
      paragraphs={copy.paragraphs}
    />
  );
}
