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

  for (const lesson of timetable.classes) {
    if (lesson.is === "activity") {
      console.log(lesson.title, "activity starts the", lesson.startDate.toLocaleString(), "ends the", lesson.endDate.toLocaleString());
      console.log("(attendants) =>", lesson.attendants.join(", ") || "none");
      console.log(`(resourceType->${lesson.resourceTypeName}) => ${lesson.resourceValue}`);
    }
    else if (lesson.is === "detention") {
      console.log(lesson.title ?? "???", "detention starts the", lesson.startDate.toLocaleString(), "ends the", lesson.endDate.toLocaleString());
    }
    else if (lesson.is === "lesson") {
      // Let's use "???" as a placeholder when there's no subject on a lesson.
      const subjectName = lesson.subject?.name ?? "???";
      console.log(subjectName, "lesson starts the", lesson.startDate.toLocaleString(), "ends the", lesson.endDate.toLocaleString());

      console.log("(teachers) =>", lesson.teacherNames.join(", ") || "none");
      console.log("(classrooms) =>", lesson.classrooms.join(", ") || "none");
      console.log("(groups) =>", lesson.groupNames.join(", ") || "none");
      console.log("(personal) =>", lesson.personalNames.join(", ") || "none");

      if (lesson.lessonResourceID) {
        console.log("(info) => has lesson resource/content");
      }

      if (lesson.status) {
        console.log("(status) =>", lesson.status);
      }

      console.log("(exempted) =>", lesson.exempted);
    }

    console.info("(notes) =>", lesson.notes || "none");

    // Break line.
    console.log();
  }
}();


