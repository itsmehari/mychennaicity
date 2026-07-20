import type { PinWardHint } from "../../src/lib/civic-geo/types";

/**
 * PIN → ward hints. Only rows with publishable provenance are used for lookup.
 * Soft locality hints may be shown when ward is not verified.
 */
export const PIN_WARD_HINTS_SEED: PinWardHint[] = [];
