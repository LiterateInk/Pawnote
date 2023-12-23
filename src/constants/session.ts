import { PronoteApiAccountId } from "./accounts";

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
   * @deprecated Since Pronote 2023, use hardcoded `RSA_EXPONENT_1024`.
   */
  ER?: string

  /** Skip request encryption. */
  sCrA: boolean
  /** Skip request compression. */
  sCoA: boolean
}