import { authenticatePronoteCredentials, PronoteApiAccountId, TimetableActivity, TimetableLesson } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger",
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const overview = await pronote.getTimetableOverview(new Date("2024-04-15"));
  const lessons = overview.parseLessons({
    withSuperposedCanceledLessons: false,
    withCanceledLessons: true,
    withPlannedLessons: true
  });

  lessons.forEach((item) => {
    if (item instanceof TimetableActivity) {
      console.log(item.title, "starts the", item.startDate.toLocaleString(), "ends the", item.endDate.toLocaleString());
      console.log("(attendants) =>", item.attendants.join(", ") || "none");
      console.log(`(resourceType->${item.resourceTypeName}) => ${item.resourceValue}`);
    }
    else if (item instanceof TimetableLesson) {
      // Let's use "???" as a placeholder when there's no subject on a lesson.
      const subjectName = item.subject?.name ?? "???";
      console.log(subjectName, "starts the", item.startDate.toLocaleString(), "ends the", item.endDate.toLocaleString());

      console.log("(teachers) =>", item.teacherNames.join(", ") || "none");
      console.log("(classrooms) =>", item.classrooms.join(", ") || "none");
      console.log("(groups) =>", item.groupNames.join(", ") || "none");
      console.log("(personal) =>", item.personalNames.join(", ") || "none");

      if (item.lessonResourceID) {
        console.log("(info) => has lesson resource/content");
      }

      if (item.status) {
        console.log("(status) =>", item.status);
      }

      console.log("(detention) =>", item.detention);
      console.log("(exempted) =>", item.exempted);
    }

    console.info("(notes) =>", item.notes || "none");

    // Break line.
    console.log();
  });
})();
