import type { PronoteApiUserMessages } from "~/api/user/messages/types";
import { BaseMessageRecipient, FetchedMessageRecipient } from "~/parser/recipient";
import type Pronote from "~/client/Pronote";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "~/parser/attachment";
import { PronoteApiResourceType } from "~/constants/resources";
import { PRONOTE_MESSAGE_MYSELF_NAME } from "~/constants/messages";
import { makeDummyRecipient, parseHintToType } from "~/pronote/recipients";

export class StudentMessage {
  readonly #client: Pronote;
  readonly #myself: BaseMessageRecipient;

  readonly #id: string;
  readonly #content: string;
  readonly #created: Date;

  readonly #author: BaseMessageRecipient;
  readonly #receiver?: BaseMessageRecipient;

  readonly #partialVisibility: boolean;
  readonly #amountOfRecipients: number;

  readonly #files: StudentAttachment[];

  constructor (client: Pronote, data: PronoteApiUserMessages["response"]["donnees"]["listeMessages"]["V"][number]) {
    this.#client = client;
    this.#myself = makeDummyRecipient(`${client.studentName} (${client.studentClass})`, PronoteApiResourceType.Student);

    this.#id = data.N;
    this.#content = data.estHTML ? data.contenu.V : data.contenu;
    this.#created = readPronoteApiDate(data.date.V);

    this.#author = data.public_gauche === PRONOTE_MESSAGE_MYSELF_NAME ? this.#myself : makeDummyRecipient(data.public_gauche, parseHintToType(data.hint_gauche));
    if (data.public_droite === PRONOTE_MESSAGE_MYSELF_NAME) this.#receiver = this.#myself;
    else if (typeof data.public_droite === "string") this.#receiver = makeDummyRecipient(data.public_droite, parseHintToType(data.hint_droite!));

    this.#partialVisibility = data.estUnAparte;
    this.#amountOfRecipients = (data.nbPublic ?? 1) + 1; // `+1` because the author is also a recipient.

    this.#files = data.listeDocumentsJoints?.V.map((file) => new StudentAttachment(client, file)) ?? [];
  }

  public async getRecipients (): Promise<FetchedMessageRecipient[]> {
    return this.#client.getRecipientsForMessage(this.#id);
  }

  get id (): string {
    return this.#id;
  }

  get content (): string {
    return this.#content;
  }

  get created (): Date {
    return this.#created;
  }

  get author (): BaseMessageRecipient {
    return this.#author;
  }

  /**
   * @remark `undefined` when there's more than two recipients.
   */
  get receiver (): BaseMessageRecipient | undefined {
    return this.#receiver;
  }

  /**
   * `true` when only some people can see the message.
   */
  get partialVisibility (): boolean {
    return this.#partialVisibility;
  }

  /**
   * @remark The author is also counted as a recipient.
   * @example
   * // In the situation when there's you and a teacher.
   * message.amountOfRecipients === 2; // 1 (you) + 1 (teacher)
   */
  get amountOfRecipients (): number {
    return this.#amountOfRecipients;
  }

  get files (): StudentAttachment[] {
    return this.#files;
  }
}
