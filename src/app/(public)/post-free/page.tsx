import type { Metadata } from "next";
import { FreePostHubPage } from "@/components/free-posting/free-post-hub";
import { freePostHubMetadata } from "@/lib/free-posting-metadata";

export const metadata: Metadata = freePostHubMetadata();

export default function PostFreePage() {
  return <FreePostHubPage />;
}
