import type { Subject } from "./subject";
import type { TimetableClass } from "./timetable-class";

export type TimetableClassLesson = TimetableClass & Readonly<{
  is: "lesson"

  kind: number
  /**
   * @example "Classe absente"
   */
  status?: string
  /**
   * Whether this lesson has been canceled or not.
   */
  canceled: boolean
  /**
   * Whether the user is exempted from this lesson or not.
   */
  exempted: boolean
  /**
   * Whether there will be a test in the lesson or not.
   */
  test: boolean

  /**
   * List of URLs for virtual classrooms.
   */
  virtualClassrooms: string[]
  /**
   * List of personal names.
   */
  personalNames: string[]
  /**
   * List of teacher names.
   */
  teacherNames: string[]
  /**
   * List of classrooms.
   */
  classrooms: string[]
  /**
   * List of group names.
   */
  groupNames: string[]

  /**
   * Subject of the lesson.
   */
  subject?: Subject

  /**
   * Returns `undefined` when there's no resource attached to this lesson.
   * Otherwise, it'll return an ID that can be used in `lessonResource()` method.
   */
  lessonResourceID?: string
}>;
