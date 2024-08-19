import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const handle = pronote.createSessionHandle();
  await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  const timetable = await pronote.timetableFromWeek(handle, 3);
  pronote.parseTimetable(handle, timetable, {
    withSuperposedCanceledClasses: false,
    withCanceledClasses: true,
    withPlannedClasses: true
  });

  const prefix = (lesson: pronote.TimetableClass): string => lesson.startDate.toLocaleString("fr-FR") + " |";
  for (const lesson of timetable.classes) {
    switch (lesson.is) {
      case "activity":
        console.log(prefix(lesson), "ACTIVITY:", lesson.title);
        break;
      case "detention":
        console.log(prefix(lesson), "DETENTION:", lesson.title);
        break;
      case "lesson":
        console.log(prefix(lesson), "LESSON:", lesson.subject?.name || "(unknown subject)");
    }
  }
}();


