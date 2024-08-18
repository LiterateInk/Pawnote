import * as pronote from "../../src";
import { credentials } from "../_credentials";

void async function main () {
  const handle = pronote.createSessionHandle();
  await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  const homepage = await pronote.homepage(handle, new Date());
  console.log(homepage);
}();
