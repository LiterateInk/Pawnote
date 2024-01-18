export { default as Pronote } from "~/client/Pronote";
export { PronoteApiAccountId } from "~/constants/accounts";
export { authenticatePronoteCredentials, authenticateToken, authenticatePronoteQRCode } from "~/authenticate";
export { PronoteApiGradeType } from "./pronote/grades";

export {
  callApiGeolocation as findPronoteInstances,
  callApiInstance as getPronoteInstanceInformation
} from "~/api";

import type { ApiGeolocation, ApiInstance } from "~/api";

/**
 * Helper type for return type of `findPronoteInstances` function.
 * This type is a single item from the array returned by the function.
 */
export type PronoteInstance = ApiGeolocation["output"][number];

/**
 * Helper type for return type of `getPronoteInstanceInformation` function.
 */
export type PronoteInstanceInformation = ApiInstance["output"];

export type { Period } from "~/parser/period";
export { type PawnoteFetcher, defaultPawnoteFetcher } from "~/utils/fetcher";
