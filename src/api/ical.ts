import type { SessionHandle } from "~/models";

export const timetableICalURL = (session: SessionHandle, iCalToken: string, fileName = "timetable"): string => {
  const version = session.instance.version.join(".");
  return `${session.information.url}/ical/${fileName}.ics?icalsecurise=${iCalToken}&version=${version}&param=266f3d32`;
};
