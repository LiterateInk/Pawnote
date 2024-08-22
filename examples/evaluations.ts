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

  const tab = user.tabs.get(pronote.TabLocation.Evaluations);
  if (!tab) throw new Error("Cannot retrieve periods for the evaluations tab, you maybe don't have access to it.");
  const selectedPeriod = tab.periods.find((period) => period.name === "Trimestre 1")!;

  console.log("Available periods for this tab ->", tab.periods.map((period) => period.name).join(", "));
  console.log("We selected the default period,", selectedPeriod.name, "!\n");

  const evaluations = await pronote.evaluations(session, selectedPeriod);

  for (const evaluation of evaluations) {
    console.log(evaluation.name, "::", evaluation.description || "(no description)");
    console.log("Submitted the", evaluation.date.toLocaleString());

    console.group("-> Skills");

    evaluation.skills.forEach((skill) => {
      console.group(`-> ${skill.itemName ?? "Unknown skill"}`);
      console.log(`${skill.level} : ${skill.abbreviation} (x${skill.coefficient})`);
      console.log(`${skill.pillarName} in the domain of ${skill.domainName}`);
      console.groupEnd();
    });

    console.groupEnd();

    // Line break for next iteration.
    console.log();
  }
}();
