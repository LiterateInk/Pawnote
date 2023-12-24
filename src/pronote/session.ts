import { PronoteApiAccountId } from "../constants/accounts";

export interface PronoteApiSession {
  /** Session ID as a **string**. */
  h: string
  /** Account Type ID. */
  a: PronoteApiAccountId
  /** Whether the instance is demo or not. */
  d: boolean

  /** ENT Username. */
  e?: string
  /** ENT Password. */
  f?: string
  g?: number

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

  /** Skip request encryption. */
  sCrA: boolean
  /** Skip request compression. */
  sCoA: boolean
}

export const extractPronoteSessionFromHTML = (html: string): PronoteApiSession => {
  if (html.includes("Votre adresse IP est provisoirement suspendue")) {
    throw new Error("Your IP address is temporarily suspended.");
  }

  if (html.includes("Le site n'est pas disponible")) {
    throw new Error("The site is not available.");
  }

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
    throw new Error(`Failed to extract session from HTML.`);
  }
};
