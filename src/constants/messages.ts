import type { PronoteValue } from "~/api/type";
import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { PronoteApiAttachment } from "~/constants/attachments";
export const PRONOTE_MESSAGE_MYSELF_NAME = "Moi";

export enum PronoteApiMessagesButtonType {
  Send = 0,
  SendEveryone = 1,
  SendEveryoneExceptParentsAndStudents = 3,
  ReplyEveryone = 2,
  ReplyEveryoneExceptParentsAndStudents = 4,
  Close = 5
}

export type PronoteApiMessagesPossessionsList = PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number]["listePossessionsMessages"]["V"];

export type PronoteApiMessageContent = (
  | {
    contenu: string
    estHTML: false
  }
  | {
    contenu: PronoteValue<number, string>;
    estHTML: true
  }
);

type PronoteApiMessage = PronoteApiMessageContent & {
  N: string

  /**
   * When the message is a reply to another one,
   * this is the ID of the message it's replying to.
   */
  messageSource: PronoteValue<24, {
    N: string
  }>

  possessionMessage: PronoteValue<24, {
    N: string
  }>

  /** NOTE: No idea what this is. */
  estNonPossede: boolean

  /**
   * Another format of date, why ?
   * @example "ven. 16/02/24 13h35"
   */
  libelleDate: string

  /** @example "16/02/2024 13:35:11" */
  date: PronoteValue<7, string>

  listeDocumentsJoints?: PronoteValue<24, Array<PronoteApiAttachment>>

  /**
   * You're the one who sent the message.
   */
  emetteur: boolean

  /**
   * The one sending the message.
   * @example "Moi" // in this case, `message.emetteur === true`
   */
  public_gauche: string

  /**
   * The one receiving the message.
   * Can be undefined when sending to a lot of people at the same time.
   * When this happens, you can see how much people received the message in `nbPublic`.
   * @example "John D."
   */
  public_droite?: string

  /**
   * @example "Professeur"
   */
  hint_droite?: string

  /**
   * @example "Professeur"
   */
  hint_gauche: string

  estUnAparte: boolean

  /** Number of recipients the message was sent to. */
  nbPublic?: number
};

export type PronoteApiTransferredMessage = PronoteApiMessage;
export type PronoteApiSentMessage = PronoteApiMessage & {
  listeMessagesPourContexte?: PronoteValue<24, Array<PronoteApiTransferredMessage>>
};
