import type { TimetableClass } from "./timetable-class";

export type TimetableClassActivity = TimetableClass & Readonly<{
  is: "activity"

  title: string
  attendants: string[]
  resourceTypeName: string
  resourceValue: string
}>;
