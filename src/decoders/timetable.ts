import type { SessionHandle, Timetable, TimetableClass } from "~/models";
import { decodeTimetableClassActivity } from "./timetable-class-activity";
import { decodeTimetableClassDetention } from "./timetable-class-detention";
import { decodeTimetableClassLesson } from "./timetable-class-lesson";

const isTimetableClassActivity = (item: any): boolean => {
  return "estSortiePedagogique" in item && item.estSortiePedagogique;
};

const isTimetableClassDetention = (item: any): boolean => {
  return "estRetenue" in item && typeof item.estRetenue !== "undefined";
};

export const decodeTimetable = (timetable: any, session: SessionHandle): Timetable => {
  return {
    absences: timetable.absences,
    withCanceledClasses: timetable.avecCoursAnnule ?? true,

    classes: (timetable.ListeCours ?? []).map((item: any) => {
      if (isTimetableClassActivity(item)) {
        return decodeTimetableClassActivity(item, session);
      }

      if (isTimetableClassDetention(item)) {
        return decodeTimetableClassDetention(item, session);
      }

      return decodeTimetableClassLesson(item, session);
    })
      .sort((a: TimetableClass, b: TimetableClass) => (
        a.startDate.getTime() - b.startDate.getTime()
      ))
  };
};
