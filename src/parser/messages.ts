import type { PronoteApiUserMessages } from "~/api/user/messages/types";
import type Pronote from "~/client/Pronote";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "~/parser/attachment";

export class StudentMessage {
  public id: string;
  public content: string;
  public created: Date;

  /** `undefined` when the message is sent by the student. */
  public author?: string;
  /**
   * `undefined` when the message is sent to the student
   * and when there's multiple people in the discussion and `onlyVisibleToOne` is `false`.
   */
  public receiver?: string;

  /**
   * Only one person from all the recipients have received the message.
   * @remark You can fetch the name of the recipients of this message with the `getRecipients()` method from this class.
   */
  public onlyVisibleToOne: boolean;
  public amountOfRecipients: number;

  /** Files sent with the message. */
  public files: StudentAttachment[];

  constructor (private client: Pronote, data: PronoteApiUserMessages["response"]["donnees"]["listeMessages"]["V"][number]) {
    this.id = data.N;
    this.content = data.estHTML ? data.contenu.V : data.contenu;
    this.created = readPronoteApiDate(data.date.V);

    // We don't set the author when the message is sent by the student.
    if (!data.emetteur) this.author = data.public_gauche;
    // We don't set the receiver when the message is sent to the student.
    if (data.public_droite !== "Moi") this.receiver = data.public_droite;

    this.onlyVisibleToOne = data.estUnAparte;
    this.amountOfRecipients = data.nbPublic ?? 1;

    this.files = data.listeDocumentsJoints?.V.map((file) => new StudentAttachment(client, file)) ?? [];
  }

  public async getRecipients (): Promise<string[]> {
    if (this.onlyVisibleToOne) return [];
    return this.client.getRecipientsForMessage(this.id);
  }
}
