import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  const handle = pronote.createSessionHandle();
  await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  for (const period of handle.instance.periods) {
    console.info(period.name, "starts the", period.startDate.toLocaleString(), "ends the", period.endDate.toLocaleString());
  }
}();
