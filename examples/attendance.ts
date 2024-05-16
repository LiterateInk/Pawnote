import { authenticatePronoteCredentials, PronoteApiAccountId, StudentPrecautionaryMeasure } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const period = pronote.readDefaultPeriodForAttendance();
  // Note that by default, it'll use the default period if you pass no argument.
  const attendanceOverview = await pronote.getAttendance(period);

  for (const attendance of attendanceOverview) {
    if (attendance instanceof StudentPrecautionaryMeasure) {
      console.log("Mesure Conservatoire:", attendance.circumstances);
      console.log(attendance.comments);
    }
  }
})();

