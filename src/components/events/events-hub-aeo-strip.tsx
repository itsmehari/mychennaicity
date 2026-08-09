import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { CHENNAI_EVENTS_HUB_AEO } from "@/content/aeo/hub-answers";

type Props = {
  eventCount: number;
};

/** Full AEO facts block — placed after the browse grid so it does not bury listings. */
export function EventsHubAeoStrip({ eventCount }: Props) {
  const extra =
    eventCount > 0
      ? [
          {
            term: "Listed now",
            definition: `${eventCount} upcoming event${eventCount === 1 ? "" : "s"} currently scheduled on this hub.`,
          },
        ]
      : undefined;

  return (
    <AeoAnswerBlock
      content={CHENNAI_EVENTS_HUB_AEO}
      extraFacts={extra}
      className="mt-12"
    />
  );
}
