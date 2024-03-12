import type { PronoteApiAccountId } from "~/constants/accounts";

export enum PronoteApiSessionAccessType {
  CookieConnection = 5,
  DirectConnection = 2,
  AccountConnection = 1,
  TokenDirectConnection = 4,
  TokenAccountConnection = 3,
  Account = 0
}

export interface PronoteApiSession {
  /**
   * Session ID as a string.
   * Can be converted to a number, if needed.
   */
  h: string

  /**
   * Account Type ID.
   */
  a: PronoteApiAccountId

  /** Whether the instance is demo or not. */
  d?: boolean

  /** ENT Username. */
  e?: string

  /** ENT Password. */
  f?: string

  /**
   * How the session is accessed.
   * @default PronoteApiSessionAccessType.Account
   */
  g?: PronoteApiSessionAccessType

  /**
   * Modulus for RSA encryption.
   * @deprecated Since Pronote 2023, use hardcoded constant `RSA_MODULO_1024`.
   */
  MR?: string

  /**
   * Exponent for RSA encryption.
   * @deprecated Since Pronote 2023, use hardcoded constant `RSA_EXPONENT_1024`.
   */
  ER?: string

  /**
   * Whether we should skip request encryption or not.
   */
  sCrA?: boolean

  /**
   * Whether we should skip request compression or not.
   */
  sCoA?: boolean

  /**
   * Only defined and `true` when the instance doesn't have an SSL certificate
   * that is linked directly inside the PRONOTE.net server.
   *
   * On latest versions of Pronote, this adds an encryption layer
   * on the request and responses.
   */
  http?: boolean

  /**
   * Whether polling should be used instead of presence.
   *
   * Pawnote doesn't take this into account
   * and only sends presence requests.
   */
  poll?: boolean
}

export const extractPronoteSessionFromHTML = (html: string): PronoteApiSession => {
  try {
    // Remove all spaces and line breaks.
    const body_cleaned = html.replace(/ /ug, "").replace(/\n/ug, "");

    // Find the relaxed JSON of the session.
    const from = "Start(";
    const to = ")}catch";

    const relaxed_data = body_cleaned.substring(
      body_cleaned.indexOf(from) + from.length,
      body_cleaned.indexOf(to)
    );

    // Convert the relaxed JSON to something we can parse.
    const session_data_string = relaxed_data
      .replace(/(['"])?([a-z0-9A-Z_]+)(['"])?:/gu, "\"$2\": ")
      .replace(/'/gu, "\"");

    return JSON.parse(session_data_string) as PronoteApiSession;
  }
  catch (error) {
    if (html.includes("Votre adresse IP est provisoirement suspendue")) {
      throw new Error("Your IP address is temporarily suspended.");
    }
    else if (html.includes("Le site n'est pas disponible")) {
      throw new Error("The site is not available.");
    }
    else if (html.includes("Le site est momentanément indisponible")) {
      let error = "The site is temporarily unavailable";
      if (html.includes("Toutes les sessions utilisateurs sont occupées")) {
        error += ", all user sessions are busy";
      }

      throw new Error(error + ".");
    }

    throw new Error("Failed to extract session from HTML, for an unknown reason.");
  }
};
