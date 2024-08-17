import type { AccountKind, RefreshInformation, SessionHandle } from "~/models";
import { sessionInformation } from "../session-information";
import { instanceParameters } from "../private/instance-parameters";
import { cleanURL } from "./clean-url";
import { identify } from "../private/identify";
import forge from "node-forge";
import { AES } from "../private/aes";
import { authenticate } from "../private/authenticate";
import { userParameters } from "../private/user-parameters";

export const loginCredentials = async (session: SessionHandle, auth: {
  url: string
  username: string
  password: string
  kind: AccountKind
  deviceUUID: string
}): Promise<RefreshInformation> => {
  const base = cleanURL(auth.url);

  // Make the request.
  session.information = await sessionInformation({
    base,
    kind: auth.kind,
    params: {
      fd: "1",
      login: "true",
      bydlg: "A6ABB224-12DD-4E31-AD3E-8A39A1C2C335"
    }
  }, session.fetcher);

  session.instance = await instanceParameters(session);
  const identity = await identify(session, {
    username: auth.username,
    deviceUUID: auth.deviceUUID,

    requestFirstMobileAuthentication: true,
    reuseMobileAuthentication: false,
    requestFromQRCode: false,
    useCAS: false
  });

  if (identity.modeCompLog === 1) {
    auth.username = auth.username.toLowerCase();
  }

  if (identity.modeCompMdp === 1) {
    auth.password = auth.password.toLowerCase();
  }

  const key = createMiddlewareKey(identity, auth.username, auth.password);
  const challenge = solveChallenge(session, identity, key);
  const authentication = await authenticate(session, challenge);
  switchToAuthKey(session, authentication, key);

  session.user = await userParameters(session);

  return {
    token: authentication.jetonConnexionAppliMobile,
    username: identity.login ?? auth.username,
    kind: auth.kind
  };
};

/**
 * @param identity
 * @param username Username to authenticate with.
 * @param mod Could be the password or the token.
 */
const createMiddlewareKey = (identity: any, username: string, mod: string) => {
  const hash = forge.md.sha256.create()
    .update(identity.alea ?? "")
    .update(forge.util.encodeUtf8(mod))
    .digest()
    .toHex()
    .toUpperCase();

  return forge.util.createBuffer(username + hash);
};

/**
 * Resolve the authentication challenge.
 * Should be sent to the authenticate function.
 *
 * @param session Handle containing session information.
 * @param identity Response from `identify()` request.

 * @returns
 */
const solveChallenge = (session: SessionHandle, identity: any, key: forge.util.ByteStringBuffer): string => {
  const iv = forge.util.createBuffer(session.information.aesIV);
  const bytes = forge.util.decodeUtf8(AES.decrypt(identity.challenge, key, iv));

  try {
    // Modify the plain text by removing every second character.
    const unscrambled = new Array(bytes.length);
    for (let i = 0; i < bytes.length; i += 1) {
      if (i % 2 === 0) {
        unscrambled.push(bytes.charAt(i));
      }
    }

    const solution = forge.util.encodeUtf8(unscrambled.join(""));
    return AES.encrypt(solution, key, iv);
  }
  catch {
    throw new Error("Unable to resolve the challenge, probably bad credentials.");
  }
};

const switchToAuthKey = (session: SessionHandle, authentication: any, key: forge.util.ByteStringBuffer): void => {
  const iv = forge.util.createBuffer(session.information.aesIV);
  const authKeyDecrypted = AES.decrypt(authentication.cle, key, iv);
  const authKey = authKeyDecrypted.split(",").map((char) => String.fromCharCode(parseInt(char))).join("");

  session.information.aesKey = authKey;
};
