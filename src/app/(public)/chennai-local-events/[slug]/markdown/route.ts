import { notFound } from "next/navigation";
import { getPublicEventBySlug } from "@/domains/events";
import { getSiteUrl } from "@/lib/env";
import { buildEventMarkdown, markdownResponse } from "@/lib/seo/content-markdown";
import { formatIstDate } from "@/lib/seo/llms-live-catalog";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

function eventWhen(startsAt: Date, endsAt: Date | null, allDay: boolean): string {
  const start = formatIstDate(startsAt, !allDay);
  if (!endsAt) return allDay ? start : `${start} IST`;
  const end = formatIstDate(endsAt, !allDay);
  if (start === end) return allDay ? start : `${start} IST`;
  return `${start} – ${end} IST`;
}

export async function GET(_request: Request, { params }: Props) {
  const { slug } = await params;
  const event = await getPublicEventBySlug(slug);
  if (!event) notFound();

  const origin = getSiteUrl().replace(/\/$/, "");
  const canonical = `${origin}/chennai-local-events/${event.slug}`;

  return markdownResponse(
    buildEventMarkdown({
      title: event.title,
      canonical,
      markdownUrl: `${canonical}/markdown`,
      when: eventWhen(event.startsAt, event.endsAt, event.allDay),
      venue: event.venueName,
      locality: event.localityLabel,
      address: event.venueAddress,
      description: event.description,
      origin,
    }),
  );
}
