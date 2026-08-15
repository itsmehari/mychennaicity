"use client";

import { CopyShareButton } from "@/components/compulsive/copy-share-button";

export function EcrShareButton({ text }: { text: string }) {
  return (
    <CopyShareButton
      hubId="ecr-weekend-plan"
      label="Copy weekend plan"
      buildText={() => text}
    />
  );
}
