import Link from "next/link";
import { loadWhatsappProofStrip, loadWhatsappSocialProof } from "@/lib/whatsapp-join-proof";
import {
  whatsappApprovalHours,
  whatsappMemberCount,
} from "@/lib/whatsapp-community-flags";

export async function WhatsAppProofStrip({ lang = "en" }: { lang?: "en" | "ta" }) {
  const [proof, social] = await Promise.all([
    loadWhatsappProofStrip(),
    loadWhatsappSocialProof(),
  ]);
  const hours = whatsappApprovalHours();
  const members = whatsappMemberCount();
  const ta = lang === "ta";

  return (
    <section
      className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
      aria-labelledby="wa-proof-heading"
    >
      <h2 id="wa-proof-heading" className="text-lg font-semibold text-[var(--foreground)]">
        {ta ? "ஏன் இந்தக் குழு" : "Why this group"}
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {ta
          ? "mychennaicity.in நடத்துகிறது, சென்னை. நிர்வாகி படிவ எண்ணை WhatsApp நிலுவையுடன் பொருத்துகிறார்."
          : "Run by mychennaicity.in, Chennai. An admin matches your form number to WhatsApp’s pending list."}
      </p>
      <p className="mt-2 text-sm text-[var(--muted)]">
        {ta
          ? `அனுமதி பொதுவாக ${hours} மணி நேரத்துக்குள்.`
          : `Approval usually within ${hours} hours.`}
        {members ? (
          <>
            {" "}
            {ta
              ? `உறுப்பினர்கள் சுமார் ${members.count} (புதுப்பிப்பு ${members.updated}).`
              : `About ${members.count} members (updated ${members.updated}).`}
          </>
        ) : null}
      </p>
      {social ? (
        <p className="mt-3 text-sm text-[var(--foreground)]">
          {ta
            ? `இந்த வாரம் ${social.requestedThisWeek} அண்டை சேர கோரினர்.`
            : `${social.requestedThisWeek} neighbours requested to join this week.`}
          {social.localities.length > 0
            ? ta
              ? ` சமீபத்தில்: ${social.localities.join(", ")}.`
              : ` Joined recently from ${social.localities.join(", ")}.`
            : null}
        </p>
      ) : null}
      {proof && (proof.news || proof.job || proof.event) ? (
        <ul className="mt-4 space-y-2 text-sm">
          {proof.news ? (
            <li>
              {ta ? "செய்தி: " : "Latest news: "}
              <Link href={proof.news.href} className="font-semibold text-[var(--accent)] hover:underline">
                {proof.news.label}
              </Link>
            </li>
          ) : null}
          {proof.job ? (
            <li>
              {ta ? "வேலை: " : "Open job: "}
              <Link href={proof.job.href} className="font-semibold text-[var(--accent)] hover:underline">
                {proof.job.label}
              </Link>
            </li>
          ) : null}
          {proof.event ? (
            <li>
              {ta ? "நிகழ்வு: " : "Upcoming event: "}
              <Link href={proof.event.href} className="font-semibold text-[var(--accent)] hover:underline">
                {proof.event.label}
              </Link>
            </li>
          ) : null}
        </ul>
      ) : null}
    </section>
  );
}
