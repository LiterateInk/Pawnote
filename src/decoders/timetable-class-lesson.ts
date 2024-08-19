import { SessionHandle, Subject, TimetableClassLesson } from "~/models";
import { decodeTimetableClass } from "./timetable-class";
import { decodeSubject } from "./subject";

export const decodeTimetableClassLesson = (item: any, session: SessionHandle): TimetableClassLesson => {
  const virtualClassrooms: string[] = [];
  const teacherNames: string[] = [];
  const personalNames: string[] = [];
  const classrooms: string[] = [];
  const groupNames: string[] = [];
  let subject: Subject | undefined;
  let lessonResourceID: string | undefined;

  if (item.listeVisios) {
    for (const virtualClassroom of item.listeVisios.V) {
      virtualClassrooms.push(virtualClassroom.url);
    }
  }

  if (item.ListeContenus) {
    for (const data of item.ListeContenus.V) {
      switch (data.G) {
        case 16: // Subject
          subject = decodeSubject(data);
          break;
        case 3: // Teacher
          teacherNames.push(data.L);
          break;
        case 34: // Personal
          personalNames.push(data.L);
          break;
        case 17: // Room
          classrooms.push(data.L);
          break;
        case 2: // Group
          groupNames.push(data.L);
          break;
      }
    }
  }

  if (item.AvecCdT && item.cahierDeTextes) {
    lessonResourceID = item.cahierDeTextes.V.N;
  }

  return {
    is: "lesson",
    ...decodeTimetableClass(item, session),
    kind: item.G,
    status: item.Statut,
    canceled: item.estAnnule ?? false,
    exempted: item.dispenseEleve ?? false,
    test: item.cahierDeTextes?.V.estDevoir ?? false,
    virtualClassrooms,
    personalNames,
    teacherNames,
    classrooms,
    groupNames,
    subject,
    lessonResourceID
  };
};
