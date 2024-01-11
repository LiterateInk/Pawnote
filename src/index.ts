export { default as Pronote } from "~/client/Pronote";
export { PronoteApiAccountId } from "~/constants/accounts";
export { authenticatePronoteCredentials, authenticateToken } from "~/authenticate";

// Geolocation.
export { callApiGeolocation as findPronoteInstances } from "~/api";
import type { ApiGeolocation } from "~/api";

/**
 * Helper type for return type of `findPronoteInstances` function.
 * This type is a single item from the array returned by the function.
 */
export type PronoteInstance = ApiGeolocation["output"][number];