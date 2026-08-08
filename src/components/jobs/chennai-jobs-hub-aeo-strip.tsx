import { AeoAnswerBlock } from "@/components/seo/aeo-answer-block";
import { CHENNAI_JOBS_HUB_AEO } from "@/content/aeo/hub-answers";

type Props = {
  openJobsCount: number;
};

export function ChennaiJobsHubAeoStrip({ openJobsCount }: Props) {
  const extra =
    openJobsCount > 0
      ? [
          {
            term: "Open now",
            definition: `${openJobsCount} job${openJobsCount === 1 ? "" : "s"} currently listed as open on this hub.`,
          },
        ]
      : undefined;

  return (
    <AeoAnswerBlock
      content={CHENNAI_JOBS_HUB_AEO}
      extraFacts={extra}
      className="mt-8"
    />
  );
}
