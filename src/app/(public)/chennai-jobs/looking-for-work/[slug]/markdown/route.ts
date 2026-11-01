import { notFound } from "next/navigation";
import { getOpenJobSeekerPostBySlug } from "@/domains/job-seekers";
import { getSiteUrl } from "@/lib/env";
import { chennaiJobSeekerDetailPath } from "@/lib/routes/chennai-jobs";
import { buildJobSeekerMarkdown, markdownResponse } from "@/lib/seo/content-markdown";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const post = await getOpenJobSeekerPostBySlug(slug);
  if (!post) notFound();

  const origin = getSiteUrl().replace(/\/$/, "");
  const canonical = `${origin}${chennaiJobSeekerDetailPath(post.slug)}`;

  return markdownResponse(
    buildJobSeekerMarkdown({
      title: post.title,
      canonical,
      markdownUrl: `${canonical}/markdown`,
      role: post.roleSought ?? post.seekerLabel,
      location: post.locationLabel,
      availability: post.availability,
      needsAccommodation: post.needsAccommodation,
      phone: post.contactPhone,
      whatsApp: post.contactWhatsApp,
      email: post.contactEmail,
      body: post.body,
      origin,
    }),
  );
}
