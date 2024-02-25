import { PronoteApiUserType } from "./users";


export interface PronoteApiUserMessageRecipient {
  N: string

  /** Name of the recipient. */
  L: string

  /**
   * Type of the recipient.
   * Tells whether the recipient is a teacher, student, ...
   */
  G: PronoteApiUserType

  /** NOTE: Not sure what this is. */
  P: number

  /** Whether the recipient refuses messages. */
  refusMess?: boolean
}
