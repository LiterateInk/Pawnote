import * as pronote from "../src";
import { credentials } from "./_credentials";

void async function main () {
  console.log("------ CREDENTIALS:");

  const handle = pronote.createSessionHandle(credentials.pronoteURL);

  const refresh = await pronote.loginCredentials(handle, {
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  });

  console.info("Username:", refresh.username);
  console.info("Token:", refresh.token);
  console.log(handle);

  // Demonstration instances can't use next-time tokens.
  if (!handle.information.demo) {
    // We login now using the token to prove the point.
    console.log("\n------ TOKEN:");

    // const nextPronote = await authenticateToken(pronoteBaseURL, {
    //   // We can use informations from last session.
    //   accountTypeID: pronote.accountTypeID,
    //   username: pronote.username,
    //   // And here, we **must** use the token given.
    //   token: pronote.nextTimeToken,

    //   // You MUST use the same device UUID as the one you used for the first authentication.
    //   // The UUID used in the first request won't be stored in the class, so you must
    //   // have a way to get it again.
    //   deviceUUID: "my-device-uuid"
    // });

    // console.info("Username:", nextPronote.username);
    // console.info("Next-Time Token:", nextPronote.nextTimeToken);
  }
  else console.info("\nYou're connected to a demonstration instance, thus you're not able to use the next-time token.");
}();
