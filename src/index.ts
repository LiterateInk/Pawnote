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

// Exporting API calls that are not related to a specific user.
export {
  callApiGeolocation as findPronoteInstances,
  callApiInstance as getPronoteInstanceInformation
} from "~/api";

// Exporting main calls that are related to a specific user.
export {
  authenticatePronoteCredentials,
  authenticatePronoteQRCode,
  authenticateToken
} from "~/authenticate";

// Exporting the fetcher type and the default fetcher.
export { type PawnoteFetcher, defaultPawnoteFetcher } from "~/utils/fetcher";

export { PawnoteError, PawnoteErrorCodes } from "~/errors/constants";
export { PawnoteNetworkFail } from "~/errors/NetworkFail";

// Exporting custom values read by Pawnote.
export { PronoteApiGradeType } from "./pronote/grades";

// Exporting constants from Pronote API.
export { PronoteApiHomeworkDifficulty, PronoteApiHomeworkReturnType } from "~/constants/homework";
export { PronoteApiLessonContentCategory } from "~/constants/lessonCategory";
export { PronoteApiAttachmentType } from "~/constants/attachments";
export { PronoteApiAccountId } from "~/constants/accounts";

// Type re-exports for parser classes, can be useful
// when you pass data around your application and need to type it.
export type { default as Pronote } from "~/client/Pronote";
export type { StudentSubject } from "~/parser/subject";
export type { StudentAttachment } from "~/parser/attachment";
export type { StudentHomework } from "~/parser/homework";
export type { StudentTheme } from "~/parser/theme";
export type { StudentGrade } from "~/parser/grade";
export type { Period } from "~/parser/period";
