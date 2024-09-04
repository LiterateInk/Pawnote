import * as pronote from "../../src";
import { credentials } from "../_credentials";
import { select } from "@inquirer/prompts";

// Defaults for this example !
const _customPassword = "1234567890";
const _source = "TEST_PAWNOTE";
const _pin = "0000";

const selectMode = async (): Promise<pronote.DoubleAuthMode> => {
  const mode = await select({
    message: "What double-authentication mode do you want to use?",
    choices: [
      {
        name: "PIN",
        value: pronote.DoubleAuthMode.MGDA_SaisieCodePIN
      },
      {
        name: "Notification",
        value: pronote.DoubleAuthMode.MGDA_NotificationSeulement
      },
      {
        name: "Nothing",
        value: pronote.DoubleAuthMode.MGDA_Inactive
      }
    ]
  });

  return mode;
};

const handleSecurity = async (session: pronote.SessionHandle, error: pronote.SecurityError): Promise<pronote.RefreshInformation> => {
  if (error instanceof pronote.SecurityError) {
    let mode: pronote.DoubleAuthMode | undefined;
    let password: string | undefined;
    let pin: string | undefined;

    if (error.handle.shouldCustomPassword) {
      console.warn(`=> Set password to '${_customPassword}'`);
      password = _customPassword;

      const isPasswordCorrect = await pronote.securityCheckCustomPassword(session, password);
      if (!isPasswordCorrect) throw new Error(`Password '${password}' cannot be set on your instance, it should match the 'rules' policy.`);
    }

    if (error.handle.shouldCustomDoubleAuth) {
      mode = await selectMode();

      if (mode === pronote.DoubleAuthMode.MGDA_SaisieCodePIN) {
        console.warn(`=> Set security strategy to PIN with '${_pin}' as code`);
        pin = _pin;
      }
    }

    if (error.handle.shouldEnterPIN) {
      console.warn(`=> PIN required, will use '${_pin}'`);
      pin = _pin;

      const isPinCorrect = await pronote.securityCheckPIN(session, pin);
      if (!isPinCorrect) throw new Error("The PIN is incorrect");
    }

    const deviceName = _source;
    console.warn(`=> '${deviceName}' was registered as trusted source to authenticate`);

    const isAlreadyKnown = await pronote.securitySource(session, deviceName);
    if (isAlreadyKnown) console.warn("The source is already known, registration will be ignored.");

    // This is the function that will save/confirm the security settings.
    await pronote.securitySave(session, error.handle, {
      mode,
      pin,
      password,
      deviceName
    });

    // We finish the login manually by calling the last authentication method.
    const context = error.handle.context;
    return pronote.finishLoginManually(session, context.authentication, context.identity, context.initialUsername);
  }

  throw error;
};

void async function main () {
  console.log("------ CREDENTIALS:");

  const session = pronote.createSessionHandle();

  const refresh = await pronote.loginCredentials(session, {
    url: credentials.pronoteURL,
    kind: pronote.AccountKind.STUDENT,
    username: credentials.username,
    password: credentials.password,
    deviceUUID: credentials.deviceUUID
  }).catch((error) => handleSecurity(session, error));

  console.info("Username:", refresh.username);
  console.info("Token:", refresh.token);

  // Demonstration instances can't use next-time tokens.
  if (!session.information.demo) {
    // We login now using the token to prove the point.
    console.log("\n------ TOKEN:");

    const nextSession = pronote.createSessionHandle();

    const nextRefresh = await pronote.loginToken(nextSession, {
      url: refresh.url,
      kind: refresh.kind,
      username: refresh.username,
      token: refresh.token,
      deviceUUID: credentials.deviceUUID,
      navigatorIdentifier: refresh.navigatorIdentifier
    }).catch((error) => handleSecurity(nextSession, error));

    console.info("Username:", nextRefresh.username);
    console.info("Next-Time Token:", nextRefresh.token);
  }
  else console.info("\nYou're connected to a demonstration instance, thus you're not able to use the next-time token.");
}();
