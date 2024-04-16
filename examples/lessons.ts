import { authenticatePronoteCredentials, PronoteApiAccountId } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger",
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const from = new Date("2024-04-17");
  // const to = new Date("2023-09-20");

  const lessons = await pronote.getLessonsForInterval(from);
  lessons.forEach((lesson) => {
    // Let's use "???" as a placeholder when there's no subject on a lesson.
    const subjectName = lesson.subject?.name ?? "???";


    console.log(subjectName, "starts the", lesson.start.toLocaleString(), "and ends the", lesson.end.toLocaleString());
    console.info("(teachers) =>", lesson.teacherNames.join(", ") || "none");
    console.info("(classrooms) =>", lesson.classrooms.join(", ") || "none");
    console.info("(groups) =>", lesson.groupNames.join(", ") || "none");
    console.info("(personal) =>", lesson.personalNames.join(", ") || "none");

    if (lesson.haveLessonResource) {
      console.log("(info) => has lesson resource/content");
    }

    // Break line.
    console.log();
  });
})();
