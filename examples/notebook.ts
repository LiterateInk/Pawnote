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

  // Read the user resources to find the tab's periods.
  const user = session.user.resources[0];

  const tab = user.tabs.get(pronote.TabLocation.Notebook);
  if (!tab) throw new Error("Cannot retrieve periods for the notebook tab, you maybe don't have access to it.");
  const selectedPeriod = tab.defaultPeriod!;

  console.log("Available periods for this tab ->", tab.periods.map((period) => period.name).join(", "));
  console.log("We selected the default period,", selectedPeriod.name, "!\n");

  const notebook = await pronote.notebook(session, selectedPeriod);
  console.log(JSON.stringify(notebook, null, 2));
}();
