import { authenticatePronoteCredentials, PronoteApiAccountId, TimetableActivity, TimetableLesson } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger",
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const timetable = await pronote.getTimetableOverviewForInterval(new Date("2024-04-15"));
  const classes = timetable.parse({
    withSuperposedCanceledClasses: false,
    withCanceledClasses: true,
    withPlannedClasses: true
  });

  classes.forEach((currentClass) => {
    if (currentClass instanceof TimetableActivity) {
      console.log(currentClass.title, "starts the", currentClass.startDate.toLocaleString(), "ends the", currentClass.endDate.toLocaleString());
      console.log("(attendants) =>", currentClass.attendants.join(", ") || "none");
      console.log(`(resourceType->${currentClass.resourceTypeName}) => ${currentClass.resourceValue}`);
    }
    else if (currentClass instanceof TimetableLesson) {
      // Let's use "???" as a placeholder when there's no subject on a lesson.
      const subjectName = currentClass.subject?.name ?? "???";
      console.log(subjectName, "starts the", currentClass.startDate.toLocaleString(), "ends the", currentClass.endDate.toLocaleString());

      console.log("(teachers) =>", currentClass.teacherNames.join(", ") || "none");
      console.log("(classrooms) =>", currentClass.classrooms.join(", ") || "none");
      console.log("(groups) =>", currentClass.groupNames.join(", ") || "none");
      console.log("(personal) =>", currentClass.personalNames.join(", ") || "none");

      if (currentClass.lessonResourceID) {
        console.log("(info) => has lesson resource/content");
      }

      if (currentClass.status) {
        console.log("(status) =>", currentClass.status);
      }

      console.log("(detention) =>", currentClass.isDetention);
      console.log("(exempted) =>", currentClass.exempted);
    }

    console.info("(notes) =>", currentClass.notes || "none");

    // Break line.
    console.log();
  });
})();
