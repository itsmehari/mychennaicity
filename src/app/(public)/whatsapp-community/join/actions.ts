"use server";

import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { getDb } from "@/db/client";
import { whatsappJoinVerifications } from "@/db/schema/tables";
import { clientIpFromHeaders } from "@/lib/analytics-ip-exclusion";
import { getPublicContactEmail } from "@/lib/env";
import { rateLimitConsume } from "@/lib/rate-limit";
import {
  WHATSAPP_JOIN_INTENTS,
  type WhatsappJoinIntent,
  type WhatsappJoinStatus,
  hashJoinIp,
  isWhatsappJoinSpamNumber,
  normalizeIndianMobile,
  whatsappJoinLocalities,
  whatsappJoinSavePlan,
} from "@/lib/whatsapp-join";
import { setJoinUnlockCookie } from "@/lib/whatsapp-join-session";
import {
  WHATSAPP_COMMUNITY_JOIN_PATH,
  sanitizeWhatsappJoinSource,
} from "@/lib/whatsapp-community";

export type WhatsappJoinFormState = {
  ok: boolean;
  message: string;
  displayName?: string;
  phone?: string;
  locality?: string;
  intent?: string;
  intro?: string;
  agreed?: boolean;
};

const AREAS = new Set(whatsappJoinLocalities());
const INTENTS = new Set(Object.keys(WHATSAPP_JOIN_INTENTS));

function copy(lang: string, en: string, ta: string): string {
  return lang === "ta" ? ta : en;
}

function isUniqueViolation(err: unknown): boolean {
  const seen = new Set<unknown>();
  let current: unknown = err;
  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const code = (current as { code?: string }).code;
    if (code === "23505") return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}

/**
 * This site has no outbound mailer. The call is here so a later mail transport
 * can be added without changing the form. Failure never blocks the success screen.
 */
async function notifyOwner(_payload: {
  name: string;
  phoneDisplay: string;
  locality: string;
  intent: string;
  intro: string;
  lang: string;
  duplicate: boolean;
}): Promise<boolean> {
  return false;
}

async function sameOrigin(): Promise<boolean> {
  const headerList = await headers();
  const origin = headerList.get("origin");
  const host = headerList.get("host");
  if (!origin || !host) return true;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function submitWhatsappJoin(
  _prev: WhatsappJoinFormState | null,
  formData: FormData,
): Promise<WhatsappJoinFormState> {
  const lang = String(formData.get("lang") ?? "") === "ta" ? "ta" : "en";
  const blocked = copy(
    lang,
    "Submission blocked. Please try again in a few minutes.",
    "சமர்ப்பிப்பு தடுக்கப்பட்டது. சிறிது நேரம் கழித்து முயலவும்.",
  );

  if (String(formData.get("website") ?? "").trim() || !(await sameOrigin())) {
    return { ok: false, message: blocked };
  }

  const headerList = await headers();
  const ip = clientIpFromHeaders(headerList) ?? "unknown";
  const limit = rateLimitConsume(`wa-join:${ip}`, 5, 10 * 60 * 1000);
  if (!limit.ok) {
    return { ok: false, message: blocked };
  }

  const displayName = String(formData.get("display_name") ?? "").trim();
  const locality = String(formData.get("locality") ?? "").trim();
  const intent = String(formData.get("intent") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const phoneRaw = String(formData.get("phone") ?? "").trim();
  const agree = formData.get("agree") === "on" || formData.get("agree") === "1";
  const source = sanitizeWhatsappJoinSource(String(formData.get("source") ?? ""));
  const phone = normalizeIndianMobile(phoneRaw);
  const kept = {
    displayName,
    phone: phoneRaw,
    locality,
    intent,
    intro,
    agreed: agree,
  };
  const fail = (message: string): WhatsappJoinFormState => ({
    ok: false,
    message,
    ...kept,
  });

  if (displayName.length < 2 || displayName.length > 120) {
    return fail(
      copy(
        lang,
        "Please enter your name as it appears on WhatsApp.",
        "வாட்ஸ்அப்பில் உள்ள பெயரை உள்ளிடவும்.",
      ),
    );
  }
  if (!AREAS.has(locality)) {
    return fail(
      copy(
        lang,
        "Please choose your area in Chennai.",
        "சென்னையில் உங்கள் பகுதியைத் தேர்ந்தெடுக்கவும்.",
      ),
    );
  }
  if (!INTENTS.has(intent)) {
    return fail(
      copy(
        lang,
        "Please say why you want to join.",
        "ஏன் சேர விரும்புகிறீர்கள் என்று தேர்ந்தெடுக்கவும்.",
      ),
    );
  }
  if (intro.length > 500) {
    return fail(
      copy(
        lang,
        "Keep the intro under 500 characters.",
        "அறிமுகத்தை 500 எழுத்துகளுக்குள் வைக்கவும்.",
      ),
    );
  }
  if (!agree) {
    return fail(
      copy(
        lang,
        "Please confirm you will not spam the group.",
        "குழுவில் ஸ்பேம் செய்யமாட்டேன் என்று உறுதிப்படுத்தவும்.",
      ),
    );
  }
  if (!phone) {
    return fail(
      copy(
        lang,
        "Enter a valid 10-digit Indian mobile number.",
        "சரியான 10 இலக்க இந்திய மொபைல் எண்ணை உள்ளிடவும்.",
      ),
    );
  }

  const contact = getPublicContactEmail();
  const spamMessage = copy(
    lang,
    `This number cannot be used to join. If this is a mistake, email ${contact}.`,
    `இந்த எண்ணைப் பயன்படுத்தி சேர முடியாது. தவறு என்றால் ${contact}க்கு மின்னஞ்சல் அனுப்புங்கள்.`,
  );
  if (isWhatsappJoinSpamNumber(phone.e164)) {
    return fail(spamMessage);
  }

  const ua = (headerList.get("user-agent") ?? "").slice(0, 255);
  const now = new Date();
  const db = getDb();

  let duplicate = false;
  try {
    const [existing] = await db
      .select({
        id: whatsappJoinVerifications.id,
        status: whatsappJoinVerifications.status,
      })
      .from(whatsappJoinVerifications)
      .where(eq(whatsappJoinVerifications.phoneE164, phone.e164))
      .limit(1);

    const plan = whatsappJoinSavePlan(
      (existing?.status as WhatsappJoinStatus | undefined) ?? null,
      phone.e164,
    );
    if (plan === "reject-spam") {
      return fail(spamMessage);
    }

    const values = {
      displayName,
      phoneRaw: phone.raw.slice(0, 32),
      phoneLast4: phone.last4,
      locality,
      intent,
      intro: intro || null,
      status: "submitted" as const,
      source,
      ipHash: hashJoinIp(ip),
      userAgent: ua || null,
      updatedAt: now,
      approvedAt: null,
      approvedBy: null,
    };

    if (plan === "update" && existing) {
      duplicate = true;
      await db
        .update(whatsappJoinVerifications)
        .set(values)
        .where(eq(whatsappJoinVerifications.id, existing.id));
    } else {
      await db.insert(whatsappJoinVerifications).values({
        ...values,
        phoneE164: phone.e164,
      });
    }
  } catch (err) {
    if (!isUniqueViolation(err)) {
      return { ok: false, message: blocked };
    }
    const [existing] = await db
      .select({
        id: whatsappJoinVerifications.id,
        status: whatsappJoinVerifications.status,
      })
      .from(whatsappJoinVerifications)
      .where(eq(whatsappJoinVerifications.phoneE164, phone.e164))
      .limit(1);
    if (!existing || existing.status === "spam") {
      return fail(spamMessage);
    }
    duplicate = true;
    await db
      .update(whatsappJoinVerifications)
      .set({
        displayName,
        phoneRaw: phone.raw.slice(0, 32),
        phoneLast4: phone.last4,
        locality,
        intent,
        intro: intro || null,
        status: "submitted",
        source,
        ipHash: hashJoinIp(ip),
        userAgent: ua || null,
        updatedAt: now,
        approvedAt: null,
        approvedBy: null,
      })
      .where(eq(whatsappJoinVerifications.id, existing.id));
  }

  try {
    await notifyOwner({
      name: displayName,
      phoneDisplay: phone.display,
      locality,
      intent: WHATSAPP_JOIN_INTENTS[intent as WhatsappJoinIntent],
      intro,
      lang,
      duplicate,
    });
  } catch {
    // Mail must not block the success screen.
  }

  const unlocked = await setJoinUnlockCookie(displayName, phone.display);
  if (!unlocked) {
    return { ok: false, message: blocked };
  }

  const next = new URLSearchParams({ ok: "1", lang, src: source });
  redirect(`${WHATSAPP_COMMUNITY_JOIN_PATH}?${next.toString()}`);
}
