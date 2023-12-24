import { PronoteApiAccountId } from "../constants/accounts";

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
}
