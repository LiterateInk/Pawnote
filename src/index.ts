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
export { PronoteApiNewsQuestionType } from "~/constants/news";
export { PronoteApiAccountId } from "~/constants/accounts";

// Exporting main classes.
export { default as Pronote } from "~/client/Pronote";
export { StudentSubject } from "~/parser/subject";
export { StudentAttachment } from "~/parser/attachment";
export { StudentHomework } from "~/parser/homework";
export { StudentTheme } from "~/parser/theme";
export { StudentGrade } from "~/parser/grade";
export { Period, OngletPeriod } from "~/parser/period";
export { StudentNews, StudentNewsCategory, StudentNewsItem, StudentNewsItemQuestion } from "~/parser/news";
export { StudentAbsence, StudentDelay, StudentPunishment } from "~/parser/attendance";
