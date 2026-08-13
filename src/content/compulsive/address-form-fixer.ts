import { compulsivePath } from "@/content/compulsive/index";
import { CIVIC_TOOL_PATHS } from "@/lib/routes/civic-tools";

export const ADDRESS_FORM_FIXER_PATH = compulsivePath("address-fixer");

export type AddressConcept = {
  id: "pin" | "ward" | "zone";
  label: string;
  short: string;
  detail: string;
  formTip: string;
};

/** PIN ≠ ward ≠ zone — the three fields forms mix up. */
export const ADDRESS_CONCEPTS: AddressConcept[] = [
  {
    id: "pin",
    label: "PIN code",
    short: "India Post delivery area (6 digits).",
    detail:
      "A PIN (e.g. 600020) is a postal sorting code. One PIN can cover parts of several GCC wards, and one ward can touch more than one PIN. PIN alone does not prove your Corporation ward.",
    formTip:
      "Use PIN when the form asks for postal code / pincode. Do not invent a ward from a PIN dropdown.",
  },
  {
    id: "ward",
    label: "Ward",
    short: "GCC electoral / service unit (number).",
    detail:
      "Your ward is a numbered Greater Chennai Corporation unit used for councillor representation and many civic files (complaints, some tax desks). Ward numbers change when GCC reorganises — old letters or WhatsApp forwards can be stale.",
    formTip:
      "Use ward when the form asks for Corporation ward / division. Prefer a current lookup over memory or old EB bills alone.",
  },
  {
    id: "zone",
    label: "Zone",
    short: "GCC administrative cluster of wards.",
    detail:
      "A zone groups several wards under a zonal office (today’s operational map is 15 zones; proposals talk about 20). Zone name or number is not interchangeable with PIN or ward on most bank, school, or portal forms.",
    formTip:
      "Use zone only when the form explicitly asks for Corporation zone. If it asks for “area” or “locality”, prefer the named neighbourhood, not the zone label.",
  },
];

export type AddressDecisionStep = {
  id: string;
  title: string;
  body: string;
  /** Optional deep link into existing civic tools */
  href?: string;
  hrefLabel?: string;
};

export const ADDRESS_DECISION_STEPS: AddressDecisionStep[] = [
  {
    id: "read-label",
    title: "Read the field label, not the placeholder",
    body: "If it says PIN / pincode / postal code → six digits. If it says ward / division → GCC ward number. If it says zone → Corporation zone. “Area”, “locality”, and “city” are usually not ward or zone.",
  },
  {
    id: "lookup-current",
    title: "Confirm current zone & ward",
    body: "Before fighting a dropdown, look up your address on the Zone & Ward Finder (locality, PIN, map pin, or GPS). Treat the current 15-zone result as primary unless the form is explicitly about a proposed map.",
    href: CIVIC_TOOL_PATHS.zoneWardFinder,
    hrefLabel: "Open Zone & Ward Finder",
  },
  {
    id: "check-migration",
    title: "If your old ward number no longer appears",
    body: "Reorganisation proposals and gazette updates can renumber or reassign wards. Use Ward Migration Lookup with your known ward number, then update the form with the verified present assignment.",
    href: CIVIC_TOOL_PATHS.wardMigration,
    hrefLabel: "Open Ward Migration Lookup",
  },
  {
    id: "pin-mismatch",
    title: "When PIN and ward disagree on the form",
    body: "That is normal geography, not always a bug. Enter the PIN India Post uses for delivery and the ward GCC uses for civic service. Do not change your ward just to satisfy a PIN auto-suggest unless an official source says they must match.",
  },
  {
    id: "save-proof",
    title: "Keep a proof pack",
    body: "Screenshot the finder result, note ward + zone + PIN, and keep assessment / EB / rental papers handy. Many counters ask for the same trio twice.",
  },
];

export const ADDRESS_FORM_FAQ = [
  {
    q: "Why does my PIN map to the wrong ward in an app?",
    a: "Most apps approximate PIN centroids. Chennai PINs are not ward polygons. Use GCC ward lookup (or our Zone & Ward Finder) for Corporation fields, and India Post for postal fields.",
  },
  {
    q: "Is zone the same as assembly constituency?",
    a: "No. GCC zone is a municipal administration layer. Assembly constituency and Lok Sabha seats are electoral layers with different boundaries.",
  },
  {
    q: "My school / bank form only has a zone dropdown from years ago",
    a: "Ask the institution which map year they use. If they cannot say, enter locality + PIN accurately and attach a note with your current GCC ward from an official or verified lookup.",
  },
  {
    q: "Does a zone change automatically change property tax?",
    a: "Not by itself. Tax follows assessment rules on the GCC revenue portal. Zone/ward labels help route files; they are not a tax calculator.",
  },
];
