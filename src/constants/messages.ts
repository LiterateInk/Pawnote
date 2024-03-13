import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
export type PronoteApiMessagesPossessionsList = PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number]["listePossessionsMessages"]["V"];
export const PRONOTE_MESSAGE_MYSELF_NAME = "Moi";

export enum PronoteApiMessagesButtonType {
  Send = 0,
  SendEveryone = 1,
  SendEveryoneExceptParentsAndStudents = 3,
  ReplyEveryone = 2,
  ReplyEveryoneExceptParentsAndStudents = 4,
  Close = 5
}
