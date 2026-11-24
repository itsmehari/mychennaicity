import type { Metadata } from "next";
import { FreePostGuidePage } from "@/components/free-posting/free-post-guide";
import { freePostGuideMetadata } from "@/lib/free-posting-metadata";

export const metadata: Metadata = freePostGuideMetadata("pg");

export default function Page() {
  return <FreePostGuidePage kind="pg" />;
}
