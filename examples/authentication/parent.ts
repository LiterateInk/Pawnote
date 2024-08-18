import * as pronote from "../../src";
import { credentials } from "../_credentials";

void async function main () {
  console.log("------ CREDENTIALS:");

  const handle = pronote.createSessionHandle();

  const refresh = await pronote.loginCredentials(handle, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.PARENT,
    username: credentials.parent_username,
    password: credentials.parent_password,
    deviceUUID: credentials.deviceUUID
  });

  console.info("Username:", refresh.username);
  console.info("Token:", refresh.token);

  // Demonstration instances can't use next-time tokens.
  if (!handle.information.demo) {
    // We login now using the token to prove the point.
    console.log("\n------ TOKEN:");

    const next_handle = pronote.createSessionHandle();

    const next_refresh = await pronote.loginToken(next_handle, {
      url: refresh.url,
      kind: refresh.kind,
      username: refresh.username,
      token: refresh.token,
      deviceUUID: credentials.deviceUUID
    });

    console.info("Username:", next_refresh.username);
    console.info("Next-Time Token:", next_refresh.token);
  }
  else console.info("\nYou're connected to a demonstration instance, thus you're not able to use the next-time token.");
}();
