export enum PronoteApiUserMessageRecipientType {
  Teacher = 3,
  Student = 4,
  Personal = 34
  // TODO: Find other types
}

export interface PronoteApiUserMessageRecipient {
  N: string

  /** Name of the recipient. */
  L: string

  /**
   * Type of the recipient.
   * Tells whether the recipient is a teacher, student, ...
   */
  G: PronoteApiUserMessageRecipientType

  /** NOTE: Not sure what this is. */
  P: number

  /** Whether the recipient refuses messages. */
  refusMess?: boolean
}
