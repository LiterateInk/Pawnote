import type { TimetableClass } from "./timetable-class";

export type TimetableClassDetention = TimetableClass & Readonly<{
  is: "detention"

  title?: string
  personalNames: string[]
  teacherNames: string[]
  classrooms: string[]
}>;
