import type { PronoteApiAccountId } from "~/constants/accounts";

interface AuthenticateBaseOptions {
  /**
   * An unique identifier for the device
   * that will authenticate to Pronote.
   */
  deviceUUID: string
}

export interface AuthenticatePronoteCredentialsOptions extends AuthenticateBaseOptions {
  username: string
  password: string

  accountTypeID: PronoteApiAccountId
}

export interface AuthenticateENTCredentialsOptions extends AuthenticateBaseOptions {
  entUsername: string
  entPassword: string

  entURL: string
  entToken: string
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
