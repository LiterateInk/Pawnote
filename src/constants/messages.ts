import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
export type PronoteApiMessagesPossessionsList = PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number]["listePossessionsMessages"]["V"];
