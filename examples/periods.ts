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

  console.info("-- REGISTERED PERIODS");
  console.info("Those are periods that are registered in the instance globally, they're not linked yet to tabs.");

  for (const period of session.instance.periods) {
    console.info("+", period.name, "starts the", period.startDate.toLocaleString(), "ends the", period.endDate.toLocaleString());
  }

  console.info("-- SCOPED PERIODS");
  console.info("Those are periods defined for each tabs. That allows to know the available correct selections and also know which one is the current default one.");

  for (const tabID of session.user.authorizations.tabs) {
    // We're on a student account, there's only one resource.
    const tab = session.userResource.tabs.get(tabID);
    if (!tab) {
      console.warn(`Skipping tab ${tabID} since no period is required there.`);
      continue;
    }

    // Note that `tab.location` is the same as `tabID`.
    console.info("+", tab.location, "=>", tab.defaultPeriod?.name ?? "(no default period)");
    console.info("(also available:", tab.periods.map((period) => period.name).join(", "), "for this tab.)");
  }
}();
