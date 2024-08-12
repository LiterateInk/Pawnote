import type { ApiLoginInformations, PronoteApiLoginInformations } from "./types";

import { makeApiHandler } from "~/utils/api";
import { PRONOTE_ACCOUNT_TYPES } from "~/constants/accounts";
import { downloadPronotePage } from "~/pronote/page";
import { extractPronoteSessionFromHTML } from "~/pronote/session";
import { Session, SessionEncryptionRSAMethod } from "~/session";
import { cleanPronoteUrl } from "~/pronote/url";
import { PronoteApiFunctions } from "~/constants/functions";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import forge from "node-forge";

export const callApiLoginInformations = makeApiHandler<ApiLoginInformations>(async (fetcher, input) => {
  const accountType = PRONOTE_ACCOUNT_TYPES.find((entry) => entry.id === input.accountTypeID);
  if (!accountType) throw new Error(`Invalid account type ID: ${input.accountTypeID}`);

  const pronotePage = await downloadPronotePage(fetcher, {
    pronoteURL: input.pronoteURL,
    // Those cookies are very important since they're like the *initializer*.
    //
    // When logging in for the first time using ENT, you'll have three important cookies here.
    // If they're not present, the whole authentication process will fail.
    cookies: input.cookies
  });

  // Extract session data from the downloaded instance page.
  const sessionData = extractPronoteSessionFromHTML(pronotePage.body);

  // Create a new session from the extracted data.
  const session = Session.importFromPage(cleanPronoteUrl(input.pronoteURL), sessionData);

  // Create RSA using given modulos.
  const rsa_key = forge.pki.rsa.setPublicKey(
    new forge.jsbn.BigInteger(session.encryption.rsa.modulus, 16),
    new forge.jsbn.BigInteger(session.encryption.rsa.exponent, 16)
  );

  const aes_iv = session.encryption.aes.iv;
  // Create "Uuid" property for the request.
  let rsa_uuid: string;

  switch (session.encryption.rsa.method) {
    case SessionEncryptionRSAMethod.FROM_SESSION_DATA:
      rsa_uuid = forge.util.encode64(rsa_key.encrypt(aes_iv));
      break;
    case SessionEncryptionRSAMethod.CONSTANTS:
      rsa_uuid = forge.util.encode64(session.instance.http ? rsa_key.encrypt(aes_iv) : aes_iv, 64);
      break;
  }

  const cookies = input.cookies ?? [];
  for (const cookie of pronotePage.cookies) {
    cookies.push(cookie);
  }

  const request_payload = session.writePronoteFunctionPayload<PronoteApiLoginInformations["request"]>({
    donnees: {
      identifiantNav: null,
      Uuid: rsa_uuid
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Informations, {
    cookies,
    payload: request_payload,
    session_instance: session.instance
  });

  const received = session.readPronoteFunctionPayload<PronoteApiLoginInformations["response"]>(response.payload);

  return {
    createdSession: session,
    data: received,

    setup: typeof sessionData.e !== "undefined" && typeof sessionData.f !== "undefined"
      ? {
        username: sessionData.e,
        password: sessionData.f
      }
      : undefined
  };
});
