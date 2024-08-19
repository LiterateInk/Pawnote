import type { SessionHandle, TimetableClassDetention } from "~/models";
import { decodeTimetableClass } from "./timetable-class";

export const decodeTimetableClassDetention = (item: any, session: SessionHandle): TimetableClassDetention => {
  let title: string | undefined;

  const personalNames: string[] = [];
  const teacherNames: string[] = [];
  const classrooms: string[] = [];

  if ("ListeContenus" in item) {
    for (const data of item.ListeContenus.V) {
      const label = data.L;

      if (data.estHoraire) {
        title = label;
      }
      else if ("G" in data) {
        switch (data.G) {
          case 3: // Teacher
            teacherNames.push(label);
            break;
          case 34: // Personal
            personalNames.push(label);
            break;
          case 17: // Room
            classrooms.push(label);
            break;
        }
      }
    }
  }

  return {
    is: "detention",
    ...decodeTimetableClass(item, session),

    title,
    personalNames,
    teacherNames,
    classrooms
  };
};
