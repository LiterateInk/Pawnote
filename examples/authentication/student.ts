import * as pronote from "../../src";
import { credentials } from "../_credentials";

void async function main () {
  console.log("------ CREDENTIALS:");

  const session = pronote.createSessionHandle();

  const refresh = await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  }).catch(async (error) => {
    if (error instanceof pronote.SecurityError) {
      console.warn("Double authentication is required, we're going to handle it automatically for you.");
      console.warn("Please note that it only works if the password rules are all disabled and length is set on minimum 10 !");

      // Load defaults.
      const customPassword = "1234567890";
      const source = "test_" + Date.now();
      const pin = "1234";

      if (error.handle.shouldCustomPassword) {
        // TODO: add a prompt that follows the password rules
        const correct = await pronote.securityCheckCustomPassword(session, customPassword);
        console.log({ correct});

        if (!correct) throw new Error("Your instance need a password more secure.");
      }

      if (error.handle.shouldCustomDoubleAuth) {
        if (error.handle.availableSecurityModes.includes(pronote.DoubleAuthMode.MGDA_SaisieCodePIN)) {
          const alreadyKnown = await pronote.securitySource(session, source);
          console.log({ alreadyKnown });
          // TODO: add a prompt for PIN
        }
        else if (error.handle.availableSecurityModes.includes(pronote.DoubleAuthMode.MGDA_NotificationSeulement)) {
          // not reversed yet
          throw error;
        }
      }

      await pronote.securitySave(session, {
        password: customPassword,
        deviceName: source,
        pin,
        mode: pronote.DoubleAuthMode.MGDA_SaisieCodePIN
      });

      const context = error.handle.context;
      return pronote.finishLoginManually(session, context.authentication, context.identity, context.initialUsername);
    }

    throw error;
  });

  console.info("Username:", refresh.username);
  console.info("Token:", refresh.token);

  // Demonstration instances can't use next-time tokens.
  if (!session.information.demo) {
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
