import type { AccountKind } from "./account-kind";
import type { SessionAccessKind } from "./session-access-kind";

export interface SessionInformation {
  readonly id: number
  readonly accountKind: AccountKind

  /** Whether the instance is demo or not. */
  readonly demo: boolean

  /**
   * How the session is accessed.
   * @default SessionAccessKind.ACCOUNT
   */
  readonly accessKind: SessionAccessKind

  readonly rsaModulus: string
  readonly rsaExponent: string

  /**
   * Since PRONOTE 2023, RSA modulus and exponent are hardcoded.
   * Before, we would need to pick them up in the session object.
   *
   * Eventually, this update also added a different behavior during
   * login phase when using constants.
   *
   * That's why we have this property to know which values
   * are there and what method we should use.
   */
  readonly rsaFromConstants: boolean

  aesKey: string
  aesIV: string

  /**
   * Whether we should skip request encryption or not.
   */
  readonly skipEncryption: boolean

  /**
   * Whether we should skip request compression or not.
   */
  readonly skipCompression: boolean

  /**
   * Only defined and `true` when the instance doesn't have an SSL certificate
   * that is linked directly inside the PRONOTE.net server.
   *
   * On latest versions of PRONOTE, this adds an encryption layer
   * on the request and responses.
   */
  readonly http: boolean

  /**
   * Whether polling should be used instead of presence.
   *
   * Pawnote doesn't take this into account
   * and only sends presence requests.
   */
  readonly poll: boolean

  /**
   * Current order of requests in the queue.
  *
   * Every request made and response received increment this value by one.
   * That means that an HTTP request should increment this by 2.
   *
   * Starts with `0`.
   */
  order: number
}
