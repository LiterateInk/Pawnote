import { authenticatePronoteCredentials, PronoteApiAccountId, TimetableDetention, TimetableLesson, TimetableOverview } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger",
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const overview = await pronote.getTimetableOverviewForWeek(1);

  // const overview = await pronote.getTimetableOverviewForInterval(
  //   new Date("2024-09-02"),
  //   new Date("2024-09-06")
  // );

  const timetable = overview.parse({
    withSuperposedCanceledClasses: false,
    withCanceledClasses: true,
    withPlannedClasses: true
  });

  for (const lesson of timetable) {
    if (lesson.isActivity()) {
      console.log("Activity:", lesson.title);
    }
    else if (lesson.isDetention()) {
      console.log("Detention:", lesson.title);
    }
    else if (lesson.isLesson()) {
      console.log("Lesson:", lesson.subject?.name || "(unknown subject)");
    }
  }
})();


