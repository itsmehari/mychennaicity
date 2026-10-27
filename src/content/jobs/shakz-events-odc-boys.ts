/**
 * Shakz Events — one outdoor-catering shift, Sunday 18 Oct 2026.
 * One JobPosting for all outlets. The notice names areas and codes, not door numbers.
 * Pay is “spot payment”; the amount is not printed.
 */

export const SHAKZ_ODC_SLUG =
  "catering-odc-boys-shakz-events-chennai-18-oct-2026";

export const SHAKZ_ODC_EMPLOYER_SLUG = "shakz-events";
export const SHAKZ_ODC_EMPLOYER_NAME = "Shakz Events";
export const SHAKZ_ODC_TITLE =
  "Catering ODC boys · 80 vacancies · Shakz Events · 18 Oct 2026";
export const SHAKZ_ODC_LOCATION_LABEL = "Chennai — 30 outlets";
export const SHAKZ_ODC_PHONES = [
  { display: "90873 23700", tel: "tel:+919087323700", whatsapp: "919087323700" },
  { display: "883 825 7701", tel: "tel:+918838257701", whatsapp: "918838257701" },
] as const;

export const SHAKZ_ODC_PHONE_DISPLAY = SHAKZ_ODC_PHONES.map((p) => p.display).join(" or ");
export const SHAKZ_ODC_PHONE_TEL = SHAKZ_ODC_PHONES[0].tel;
export const SHAKZ_ODC_WHATSAPP = SHAKZ_ODC_PHONES[0].whatsapp;

export const SHAKZ_ODC_OUTLETS = [
  { code: "CH02", area: "Nungambakkam", boys: 2 },
  { code: "CH03", area: "T. Nagar", boys: 3 },
  { code: "CH04", area: "Velachery", boys: 4 },
  { code: "CH06", area: "Besant Nagar", boys: 2 },
  { code: "CH08", area: "Ashok Nagar", boys: 3 },
  { code: "CH09", area: "Ramavaram", boys: 2 },
  { code: "CH11", area: "OMR", boys: 2 },
  { code: "CH13", area: "Medavakkam", boys: 2 },
  { code: "CH14", area: "Tambaram", boys: 2 },
  { code: "CH15", area: "Mount Road", boys: 4 },
  { code: "CH16", area: "Mogappair", boys: 2 },
  { code: "CH17", area: "Poonamallee", boys: 2 },
  { code: "CH18", area: "Guindy", boys: 3 },
  { code: "CH19", area: "Valasaravakkam", boys: 2 },
  { code: "CH20", area: "Kanchipuram", boys: 2 },
  { code: "CH21", area: "Shanthi Colony", boys: 3 },
  { code: "CH22", area: "Camp Road", boys: 3 },
  { code: "CH23", area: "Chrompet", boys: 2 },
  { code: "CH24", area: "Vandalur", boys: 6 },
  { code: "CH25", area: "Perambur", boys: 5 },
  { code: "CH26", area: "Ambattur", boys: 4 },
  { code: "CH27", area: "Navalur", boys: 2 },
  { code: "CH31", area: "Padur", boys: 3 },
  { code: "CH32", area: "ECR 2", boys: 2 },
  { code: "CH35", area: "Pallikaranai", boys: 1 },
  { code: "CH36", area: "Siruseri", boys: 2 },
  { code: "CH37", area: "Avadi", boys: 4 },
  { code: "CH38", area: "Mogappair 2", boys: 2 },
  { code: "CH39", area: "Kattupakkam", boys: 2 },
  { code: "CH29", area: "Anna Nagar", boys: 2 },
] as const;

export const SHAKZ_ODC_TOTAL_BOYS = SHAKZ_ODC_OUTLETS.reduce(
  (sum, row) => sum + row.boys,
  0,
);

export function shakzOdcWhatsAppUrl(whatsapp = SHAKZ_ODC_WHATSAPP): string {
  const text =
    "Hi, I saw the Shakz Events catering ODC shift for Sunday 18 October 2026 on MyChennaiCity. I can work. Please share the outlet and the spot-payment amount.";
  return `https://wa.me/${whatsapp}?text=${encodeURIComponent(text)}`;
}

export function buildShakzOdcBody(): string {
  const roster = SHAKZ_ODC_OUTLETS.map(
    (row) =>
      `- **${row.code}** — ${row.area}: ${row.boys} ${row.boys === 1 ? "boy" : "boys"}`,
  ).join("\n");

  return `Shakz Events needs 80 catering boys on Sunday 18 October 2026 for outdoor catering across 30 Chennai outlets. The shift is 10:30 AM to 4:00 PM.

**Shakz Events** (direct catering) has one same-day outdoor catering call. The notice asks for **boys**. Dress is a **white shirt**, **black pant**, and **any shoes**. Payment is **spot payment**. The notice does not print the amount — ask for it on WhatsApp before you travel. Outlet codes name the area only. There is no street or door number in the notice.

## Shift

- **Date:** Sunday, 18 October 2026
- **Timing:** 10:30 AM to 4:00 PM
- **Dress:** White shirt, black pant, any shoes
- **Work:** Outdoor catering (ODC), direct catering by Shakz Events
- **Pay:** Spot payment. Amount is shared on DM, not printed here
- **Openings:** 80 boys across 30 outlets
- **Employer:** Shakz Events

## Outlets

${roster}

**Total: ${SHAKZ_ODC_TOTAL_BOYS} boys.** First come, first served. Confirm which code still has a seat, and the exact venue, before you leave home.

## How to apply

Call or WhatsApp **${SHAKZ_ODC_PHONE_DISPLAY}**. Say you saw the Sunday 18 October catering shift on MyChennaiCity, and name the outlet code you can reach (for example CH04 Velachery).

Do not pay anyone a fee to be put on this shift. Confirm the spot-payment amount in writing on WhatsApp before you travel.

## Common questions

### When is the Shakz Events catering shift?

Sunday 18 October 2026, from 10:30 AM to 4:00 PM. It is a one-day outdoor catering shift, not a monthly job.

### What should I wear?

White shirt, black pant, and any shoes, as printed on the notice.

### How much is the spot payment?

The notice says spot payment and asks candidates to DM for the amount. It does not print a rupee figure. Confirm the amount with Shakz Events on ${SHAKZ_ODC_PHONE_DISPLAY} before you travel.

### Which Chennai outlets need boys?

The notice lists 30 codes, from Nungambakkam, T. Nagar, Velachery, and Besant Nagar through Vandalur, Perambur, Ambattur, Avadi, and Anna Nagar. Vandalur (CH24) needs 6, Perambur (CH25) needs 5, and Pallikaranai (CH35) needs 1. The full code list is on this page. Kanchipuram (CH20) is on the same notice.
`;
}
