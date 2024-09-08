import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const session = pronote.createSessionHandle();
  await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  const tab = session.userResource.tabs.get(pronote.TabLocation.Gradebook);
  if (!tab) throw new Error("Cannot retrieve periods for the gradebook tab, you maybe don't have access to it.");
  const selectedPeriod = tab.periods.find((period) => period.name === "Trimestre 1")!;

  console.log("Available periods for this tab ->", tab.periods.map((period) => period.name).join(", "));
  console.log("We selected the default period,", selectedPeriod.name, "!\n");

  const url = await pronote.gradebookPDF(session, selectedPeriod);
  console.log("PDF URL:", url);
}();
