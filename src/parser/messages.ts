import type { PronoteApiUserMessages } from "~/api/user/messages/types";
import { readPronoteApiDate } from "~/pronote/dates";

export class StudentMessage {
  public id: string;
  public content = "";
  public author?: string;
  public created: Date;

  constructor (data: PronoteApiUserMessages["response"]["donnees"]["listeMessages"]["V"][number]) {
    this.id = data.N;
    this.content = data.estHTML ? data.contenu.V : data.contenu;
    if (!data.emetteur) this.author = data.public_gauche;
    this.created = readPronoteApiDate(data.date.V);
  }
}
