import type { TimetableClassActivity } from "./timetable-class-activity";
import type { TimetableClassDetention } from "./timetable-class-detention";
import type { TimetableClassLesson } from "./timetable-class-lesson";

export type Timetable = Readonly<{
  classes: Array<TimetableClassLesson | TimetableClassActivity | TimetableClassDetention>;
  absences: any; // TODO
  withCanceledClasses: boolean
}>;
