import type { SessionHandle, TimetableClassActivity } from "~/models";
import { decodeTimetableClass } from "./timetable-class";

export const decodeTimetableClassActivity = (item: any, session: SessionHandle): TimetableClassActivity => {
  return {
    is: "activity",
    ...decodeTimetableClass(item, session),

    title: item.motif,
    attendants: item.accompagnateurs,
    resourceTypeName: item.strGenreRess,
    resourceValue: item.strRess
  };
};
