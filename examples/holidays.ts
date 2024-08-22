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

  for (const holiday of session.instance.holidays) {
    console.info("=>", holiday.name);
    console.info("Starts", holiday.startDate.toLocaleDateString(), "until", holiday.endDate.toLocaleDateString());
  }
}();
