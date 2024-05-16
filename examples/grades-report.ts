import { authenticatePronoteCredentials, PronoteApiAccountId, PronoteApiGradeType } from "../src";

(async () => {
  const pronote = await authenticatePronoteCredentials("https://pronote-vm.dev/pronote", {
    accountTypeID: PronoteApiAccountId.Student,
    username: "lisa.boulanger", // using my VM credentials here because the demo instance doesn't have any messages.
    password: "12345678",

    // Because this is just an example, don't forget to change this.
    deviceUUID: "my-device-uuid"
  });

  const periods = pronote.readPeriodsForGradesReport();
  const period = periods.find((period) => period.name === "Semestre 1");
  if (!period) throw new Error("Period not found.");

  console.log("Fetching for period:", period.name, "\n");
  const reportURL = await pronote.generateGradesReportPDF(period);

  console.log("Report URL:", reportURL);
})();
