import type { AuthenticatePronoteCredentialsOptions, AuthenticateQRCodeOptions, AuthenticateTokenOptions, NextAuthenticationCredentials } from "./types";
import { callApiLoginInformations, callApiLoginIdentify, callApiLoginAuthenticate, callApiUserData } from "~/api";
import { PRONOTE_ACCOUNT_TYPES } from "~/constants/accounts";
import { defaultPawnoteFetcher } from "~/utils/fetcher";
import aes from "~/utils/aes";

import Pronote from "~/client/Pronote";
import forge from "node-forge";

export const authenticatePronoteCredentials = async (pronoteStringURL: string, options: AuthenticatePronoteCredentialsOptions): Promise<Pronote> => {
  // Use default fetcher if not provided.
  const fetcher = options.fetcher ?? defaultPawnoteFetcher;

  const pronoteURL = new URL(pronoteStringURL);

  const accountType = PRONOTE_ACCOUNT_TYPES.find((entry) => entry.id === options.accountTypeID);
  if (!accountType) throw new Error(`Invalid account type ID: ${options.accountTypeID}`);

  pronoteURL.pathname += `/${accountType.path}`;

  // Add important properties.
  pronoteURL.searchParams.set("fd", "1");
  // Bypass possible ENT.
  pronoteURL.searchParams.set("bydlg", "A6ABB224-12DD-4E31-AD3E-8A39A1C2C335");
  pronoteURL.searchParams.set("login", "true");

  const pronoteCookies = ["ielang=fr"];

  const { createdSession: session, data: loginInformations } = await callApiLoginInformations(fetcher, {
    accountTypeID: accountType.id,
    pronoteURL: pronoteURL.href,
    cookies: pronoteCookies
  });

  // We add the version to the session (was an empty [])
  session.instance.version = loginInformations.donnees.General.versionPN.split(".").map(Number);

  const { data: loginIdentifier } = await callApiLoginIdentify(fetcher, {
    cookies: pronoteCookies,
    username: options.username,
    session: session,
    useENT: false,
    requestFirstMobileAuthentication: true,
    reuseMobileAuthentication: false,
    requestFromQRCode: false,
    deviceUUID: options.deviceUUID
  });

  if (loginIdentifier.donnees.modeCompLog === 1) {
    options.username = options.username.toLowerCase();
  }

  if (loginIdentifier.donnees.modeCompMdp === 1) {
    options.password = options.password.toLowerCase();
  }

  // Short-hand for later usage.
  if (typeof session.encryption.aes.iv !== "string") throw new Error("AES IV wasn't correctly defined.");
  const aesIvBuffer = forge.util.createBuffer(session.encryption.aes.iv);

  // Generate the hash for the AES key.
  const challengeAesKeyHash = forge.md.sha256.create()
    .update(loginIdentifier.donnees.alea ?? "")
    .update(forge.util.encodeUtf8(options.password))
    .digest()
    .toHex()
    .toUpperCase();

  // Generate the key using the hash.
  const challengeAesKey = options.username + challengeAesKeyHash;
  // Convert the key to a buffer for later usage.
  const challengeAesKeyBuffer = forge.util.createBuffer(challengeAesKey);

  // Decrypt the challenge using the AES key generated.
  const challengeDecryptedBytes = aes.decrypt(loginIdentifier.donnees.challenge, challengeAesKeyBuffer, aesIvBuffer);

  let resolved_challenge: string | undefined;

  try {
    const challengeDecrypted = forge.util.decodeUtf8(challengeDecryptedBytes);

    // Modify the plain text by removing every second character.
    const challengeDecryptedUnscrambledParts = new Array(challengeDecrypted.length);
    for (let i = 0; i < challengeDecrypted.length; i += 1) {
      if (i % 2 === 0) {
        challengeDecryptedUnscrambledParts.push(challengeDecrypted.charAt(i));
      }
    }

    let challengeDecryptedUnscrambled = challengeDecryptedUnscrambledParts.join("");
    challengeDecryptedUnscrambled = "" + challengeDecryptedUnscrambled;
    challengeDecryptedUnscrambled = forge.util.encodeUtf8(challengeDecryptedUnscrambled);

    /// Encrypt the modified text back with AES and encoding it as HEX.
    resolved_challenge = aes.encrypt(challengeDecryptedUnscrambled, challengeAesKeyBuffer, aesIvBuffer);
  }
  catch {
    throw new Error("Unable to resolve the challenge. Please check your credentials.");
  }

  // Send the resolved challenge.
  const { data: authenticationReply } = await callApiLoginAuthenticate(fetcher, {
    solvedChallenge: resolved_challenge,
    cookies: pronoteCookies,
    session
  });

  // If no token was given, we throw an error.
  if (!authenticationReply.donnees.jetonConnexionAppliMobile) throw new Error("Next time token wasn't given.");

  // Decrypt the AES key.
  const decryptedAuthKey = aes.decrypt(authenticationReply.donnees.cle, challengeAesKeyBuffer, aesIvBuffer);

  // Get the new AES key that will be used in our requests.
  const authKeyBytesArray = new Uint8Array(decryptedAuthKey.split(",").map((a) => parseInt(a)));
  const authKey = forge.util.createBuffer(authKeyBytesArray).bytes();
  session.encryption.aes.key = authKey;

  // Retrieve the user data.
  const { data: user } = await callApiUserData(fetcher, { session });

  const credentials: NextAuthenticationCredentials = {
    username: loginIdentifier.donnees.login ?? options.username,
    token: authenticationReply.donnees.jetonConnexionAppliMobile
  };

  // Return the new Pronote instance.
  return new Pronote(fetcher, session, credentials, user.donnees, loginInformations);
};

export const authenticateToken = async (pronoteStringURL: string, options: AuthenticateTokenOptions): Promise<Pronote> => {
  // Use default fetcher if not provided.
  const fetcher = options.fetcher ?? defaultPawnoteFetcher;

  const accountType = PRONOTE_ACCOUNT_TYPES.find((entry) => entry.id === options.accountTypeID);
  if (!accountType) throw new Error(`Invalid account type ID: ${options.accountTypeID}`);

  const pronoteURL = new URL(pronoteStringURL);
  pronoteURL.pathname += `/${accountType.path}`;

  // Add important property.
  pronoteURL.searchParams.set("fd", "1");
  pronoteURL.searchParams.set("login", "true");

  const pronoteCookies = ["ielang=fr", "appliMobile=1"];

  const { createdSession: session, data: loginInformations } = await callApiLoginInformations(fetcher, {
    accountTypeID: accountType.id,
    pronoteURL: pronoteURL.href,
    cookies: pronoteCookies
  });

  // We add the version to the session (was an empty [])
  session.instance.version = loginInformations.donnees.General.versionPN.split(".").map(Number);

  const { data: loginIdentifier } = await callApiLoginIdentify(fetcher, {
    cookies: pronoteCookies,
    username: options.username,
    session: session,
    useENT: false,
    requestFirstMobileAuthentication: false,
    reuseMobileAuthentication: true,
    requestFromQRCode: false,
    deviceUUID: options.deviceUUID
  });

  if (loginIdentifier.donnees.modeCompLog === 1) {
    options.username = options.username.toLowerCase();
  }

  if (loginIdentifier.donnees.modeCompMdp === 1) {
    options.token = options.token.toLowerCase();
  }

  // Short-hand for later usage.
  if (typeof session.encryption.aes.iv !== "string") throw new Error("AES IV wasn't correctly defined.");
  const aesIvBuffer = forge.util.createBuffer(session.encryption.aes.iv);

  // Generate the hash for the AES key.
  const challengeAesKeyHash = forge.md.sha256.create()
    .update(loginIdentifier.donnees.alea ?? "")
    .update(forge.util.encodeUtf8(options.token))
    .digest()
    .toHex()
    .toUpperCase();

  // Generate the key using the hash.
  const challengeAesKey = options.username + challengeAesKeyHash;
  // Convert the key to a buffer for later usage.
  const challengeAesKeyBuffer = forge.util.createBuffer(challengeAesKey);

  // Decrypt the challenge using the AES key generated.
  const challengeDecryptedBytes = aes.decrypt(loginIdentifier.donnees.challenge, challengeAesKeyBuffer, aesIvBuffer);

  let resolved_challenge: string | undefined;

  try {
    const challengeDecrypted = forge.util.decodeUtf8(challengeDecryptedBytes);

    // Modify the plain text by removing every second character.
    const challengeDecryptedUnscrambledParts = new Array(challengeDecrypted.length);
    for (let i = 0; i < challengeDecrypted.length; i += 1) {
      if (i % 2 === 0) {
        challengeDecryptedUnscrambledParts.push(challengeDecrypted.charAt(i));
      }
    }

    let challengeDecryptedUnscrambled = challengeDecryptedUnscrambledParts.join("");
    challengeDecryptedUnscrambled = "" + challengeDecryptedUnscrambled;
    challengeDecryptedUnscrambled = forge.util.encodeUtf8(challengeDecryptedUnscrambled);

    /// Encrypt the modified text back with AES and encoding it as HEX.
    resolved_challenge = aes.encrypt(challengeDecryptedUnscrambled, challengeAesKeyBuffer, aesIvBuffer);
  }
  catch {
    throw new Error("Unable to resolve the challenge. The given token is maybe incorrect or not for t.");
  }

  // Send the resolved challenge.
  const { data: authenticationReply } = await callApiLoginAuthenticate(fetcher, {
    solvedChallenge: resolved_challenge,
    cookies: pronoteCookies,
    session
  });

  // If no token was given, we throw an error.
  if (!authenticationReply.donnees.jetonConnexionAppliMobile) throw new Error("Unable to authenticate.");

  // Decrypt the AES key.
  const decryptedAuthKey = aes.decrypt(authenticationReply.donnees.cle, challengeAesKeyBuffer, aesIvBuffer);

  // Get the new AES key that will be used in our requests.
  const authKeyBytesArray = new Uint8Array(decryptedAuthKey.split(",").map((a) => parseInt(a)));
  const authKey = forge.util.createBuffer(authKeyBytesArray).bytes();
  session.encryption.aes.key = authKey;

  // Retrieve the user data.
  const { data: user } = await callApiUserData(fetcher, { session });

  const credentials: NextAuthenticationCredentials = {
    username: loginIdentifier.donnees.login ?? options.username,
    token: authenticationReply.donnees.jetonConnexionAppliMobile
  };

  // Return the new Pronote instance.
  return new Pronote(fetcher, session, credentials, user.donnees, loginInformations);
};

export const authenticatePronoteQRCode = async (options: AuthenticateQRCodeOptions): Promise<Pronote> => {
  // Use default fetcher if not provided.
  const fetcher = options.fetcher ?? defaultPawnoteFetcher;

  const pinBuffer = forge.util.createBuffer(options.pinCode);

  let username = aes.decrypt(forge.util.encodeUtf8(options.dataFromQRCode.login), pinBuffer, forge.util.createBuffer());
  let password = aes.decrypt(forge.util.encodeUtf8(options.dataFromQRCode.jeton), pinBuffer, forge.util.createBuffer());

  const lastPath = options.dataFromQRCode.url.split("/").pop();
  const accountType = PRONOTE_ACCOUNT_TYPES.find((entry) => entry.path === lastPath);
  if (!accountType) throw new Error(`Invalid account type path: ${lastPath}`);

  const pronoteURL = new URL(options.dataFromQRCode.url);
  // Add important property.
  pronoteURL.searchParams.set("fd", "1");

  const pronoteCookies = ["ielang=fr", "appliMobile=1"];

  const { createdSession: session, data: loginInformations } = await callApiLoginInformations(fetcher, {
    accountTypeID: accountType.id,
    pronoteURL: pronoteURL.href,
    cookies: pronoteCookies
  });

  // We add the version to the session (was an empty [])
  session.instance.version = loginInformations.donnees.General.versionPN.split(".").map(Number);

  const { data: loginIdentifier } = await callApiLoginIdentify(fetcher, {
    cookies: pronoteCookies,
    username: username,
    session: session,
    useENT: false,
    requestFirstMobileAuthentication: true,
    reuseMobileAuthentication: false,
    requestFromQRCode: true,
    deviceUUID: options.deviceUUID
  });

  if (loginIdentifier.donnees.modeCompLog === 1) {
    username = username.toLowerCase();
  }

  if (loginIdentifier.donnees.modeCompMdp === 1) {
    password = password.toLowerCase();
  }

  // Short-hand for later usage.
  if (typeof session.encryption.aes.iv !== "string") throw new Error("AES IV wasn't correctly defined.");
  const aesIvBuffer = forge.util.createBuffer(session.encryption.aes.iv);

  // Generate the hash for the AES key.
  const challengeAesKeyHash = forge.md.sha256.create()
    .update(loginIdentifier.donnees.alea ?? "")
    .update(forge.util.encodeUtf8(password))
    .digest()
    .toHex()
    .toUpperCase();

  // Generate the key using the hash.
  const challengeAesKey = username + challengeAesKeyHash;
  // Convert the key to a buffer for later usage.
  const challengeAesKeyBuffer = forge.util.createBuffer(challengeAesKey);

  // Decrypt the challenge using the AES key generated.
  const challengeDecryptedBytes = aes.decrypt(loginIdentifier.donnees.challenge, challengeAesKeyBuffer, aesIvBuffer);

  let resolved_challenge: string | undefined;

  try {
    const challengeDecrypted = forge.util.decodeUtf8(challengeDecryptedBytes);

    // Modify the plain text by removing every second character.
    const challengeDecryptedUnscrambledParts = new Array(challengeDecrypted.length);
    for (let i = 0; i < challengeDecrypted.length; i += 1) {
      if (i % 2 === 0) {
        challengeDecryptedUnscrambledParts.push(challengeDecrypted.charAt(i));
      }
    }

    let challengeDecryptedUnscrambled = challengeDecryptedUnscrambledParts.join("");
    challengeDecryptedUnscrambled = "" + challengeDecryptedUnscrambled;
    challengeDecryptedUnscrambled = forge.util.encodeUtf8(challengeDecryptedUnscrambled);

    /// Encrypt the modified text back with AES and encoding it as HEX.
    resolved_challenge = aes.encrypt(challengeDecryptedUnscrambled, challengeAesKeyBuffer, aesIvBuffer);
  }
  catch {
    throw new Error("Unable to resolve the challenge. The given token is maybe incorrect or not for t.");
  }

  // Send the resolved challenge.
  const { data: authenticationReply } = await callApiLoginAuthenticate(fetcher, {
    solvedChallenge: resolved_challenge,
    cookies: pronoteCookies,
    session
  });

  // If no token was given, we throw an error.
  if (!authenticationReply.donnees.jetonConnexionAppliMobile) throw new Error("Unable to authenticate.");

  // Decrypt the AES key.
  const decryptedAuthKey = aes.decrypt(authenticationReply.donnees.cle, challengeAesKeyBuffer, aesIvBuffer);

  // Get the new AES key that will be used in our requests.
  const authKeyBytesArray = new Uint8Array(decryptedAuthKey.split(",").map((a) => parseInt(a)));
  const authKey = forge.util.createBuffer(authKeyBytesArray).bytes();
  session.encryption.aes.key = authKey;

  // Retrieve the user data.
  const { data: user } = await callApiUserData(fetcher, { session });

  const credentials: NextAuthenticationCredentials = {
    username: loginIdentifier.donnees.login ?? username,
    token: authenticationReply.donnees.jetonConnexionAppliMobile
  };

  // Return the new Pronote instance.
  return new Pronote(fetcher, session, credentials, user.donnees, loginInformations);
};
