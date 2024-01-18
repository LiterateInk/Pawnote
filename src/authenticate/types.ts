import type { PronoteApiAccountId } from "~/constants/accounts";
import type { PawnoteFetcher } from "~/utils/fetcher";

interface AuthenticateBaseOptions {
  /**
   * An unique identifier for the device
   * that will authenticate to Pronote.
   */
  deviceUUID: string

  /**
   * By default, Pawnote is going to use `fetch` (Fetch API).
   * If, for some reason, you need to use another method to make an
   * HTTP request, you'll have to provide it here.
   */
  fetcher?: PawnoteFetcher
}

export interface AuthenticatePronoteCredentialsOptions extends AuthenticateBaseOptions {
  username: string
  password: string

  accountTypeID: PronoteApiAccountId
}

export interface AuthenticateQRCodeOptions extends AuthenticateBaseOptions {
  /** 4 numbers you've entered in the Pronote UI. */
  pinCode: string

  /** Data contained in the QR code, you might use another tool to decode the QRCode to have this object. */
  dataFromQRCode: {
    jeton: string
    login: string
    /** URL of the Pronote instance, with correct mobile account path. */
    url: string
  }
}

export interface AuthenticateTokenOptions extends AuthenticateBaseOptions {
  username: string
  token: string

  accountTypeID: PronoteApiAccountId
}

/**
 * After the first authentication, we'll store the credentials
 * for the next authentication, if the user wants to reuse them.
 */
export interface NextAuthenticationCredentials {
  username: string
  /** Replacement for the password. */
  token: string
}
