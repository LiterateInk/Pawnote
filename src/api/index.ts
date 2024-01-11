export { callApiLoginInformations } from "./login/informations";
export { callApiLoginIdentify } from "./login/identify";
export { callApiLoginAuthenticate } from "./login/authenticate";
export { callApiUserData } from "./user/data";
export { callApiUserHomework } from "./user/homework";
export { callApiUserHomeworkStatus } from "./user/homeworkStatus";
export { callApiUserTimetable } from "./user/timetable";
export { callApiGeolocation } from "./geolocation";

export type { ApiLoginInformations, PronoteApiLoginInformations } from "./login/informations/types";
export type { ApiLoginIdentify, PronoteApiLoginIdentify } from "./login/identify/types";
export type { ApiLoginAuthenticate, PronoteApiLoginAuthenticate } from "./login/authenticate/types";
export type { ApiUserData, PronoteApiUserData } from "./user/data/types";
export type { ApiUserHomework, PronoteApiUserHomework } from "./user/homework/types";
export type { ApiUserHomeworkStatus, PronoteApiUserHomeworkStatus } from "./user/homeworkStatus/types";
export type { ApiUserTimetable, PronoteApiUserTimetable } from "./user/timetable/types";
export type { ApiGeolocation, PronoteApiGeolocation } from "./geolocation/types";
