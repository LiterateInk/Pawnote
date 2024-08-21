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

  // TODO: find a way to get the max cycle number
  for (let weekNumber = 1; weekNumber <= 62; weekNumber++) {
    const weekFrequency = pronote.frequency(session, weekNumber);

    if (weekFrequency) {
      console.log(`Week ${weekNumber}: ${weekFrequency.label} (${weekFrequency.fortnight})`);
    }
    else {
      console.log(`Week ${weekNumber}: No frequency (year probably already ended)`);
    }
  }
}();
