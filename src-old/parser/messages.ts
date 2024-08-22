import type { PronoteApiUserMessages } from "~/api/user/messages/types";
import type { MessageRecipient, FetchedMessageRecipient } from "~/parser/recipient";
import type { StudentDiscussion } from "~/parser/discussion";

import type Pronote from "~/client/Pronote";
import type Queue from "~/utils/queue";
import type { Session } from "~/session";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "~/parser/attachment";
import { PronoteApiResourceType } from "~/constants/resources";
import { PRONOTE_MESSAGE_MYSELF_NAME, PronoteApiDraftMessage, PronoteApiMessagesButtonType, PronoteApiSentMessage, PronoteApiTransferredMessage } from "~/constants/messages";
import { makeDummyRecipient, parseHintToType } from "~/pronote/recipients";
import { callApiUserMessages } from "~/api/user/messages";
import { PronoteApiDiscussionCommandType } from "~/constants/discussion";
import { generateCreationID } from "~/constants/id";
import { getPronoteMessageButtonType } from "~/pronote/messages";
export class MessagesOverview {
  /**
   * Will send a message to the discussion and refetch the messages
   * internally so properties are automatically updated.
   */
  public async sendMessage (content: string, includeParentsAndStudents = false, replyTo = this.#defaultReplyMessageID): Promise<void> {
    if (typeof this.#sendButtonGenre === "undefined") throw new Error("You can't create messages in this discussion.");

    await this.#client.replyToDiscussionMessage(replyTo, content, this.#sendButtonGenre, includeParentsAndStudents);
    await this.refetch();
  }

  public async draftMessage (content: string, replyTo = this.#defaultReplyMessageID): Promise<void> {
    await this.#client.postDiscussionCommand({
      command: PronoteApiDiscussionCommandType.brouillon,
      id: generateCreationID(),
      content,
      replyMessageID: replyTo
    });

    await this.refetch();
  }

  public async patchDraft (draft: DraftMessage): Promise<void> {
    await this.#client.postDiscussionCommand({
      command: PronoteApiDiscussionCommandType.brouillon,
      id: draft.possessionID,
      content: draft.content,
      replyMessageID: draft.replyMessageID
    });

    await this.refetch();
  }

  public async deleteDraft (draft: DraftMessage): Promise<void> {
    await this.#client.postDiscussionCommand({
      command: PronoteApiDiscussionCommandType.suppression,
      possessions: [{ N: draft.possessionID }]
    });

    await this.refetch();
  }

  public async sendDraft (draft: DraftMessage, includeParentsAndStudents = false): Promise<void> {
    if (typeof this.#sendButtonGenre === "undefined") throw new Error("You can't create drafts in this discussion.");
    const buttonType = getPronoteMessageButtonType(this.#sendButtonGenre, includeParentsAndStudents);

    await this.#client.postDiscussionCommand({
      command: "",
      button: buttonType,
      content: draft.content,
      id: draft.possessionID,
      replyMessageID: draft.replyMessageID
    });

    await this.refetch();
  }
}

export class DraftMessage {
  readonly #overview: MessagesOverview;
  readonly #possessionID: string;
  readonly #replyMessageID: string;
  #content: string;
  readonly #isHTML: boolean;

  constructor (overview: MessagesOverview, message: PronoteApiDraftMessage) {
    this.#overview = overview;
    this.#possessionID = message.possessionMessage.V.N;
    this.#replyMessageID = message.messageSource.V.N;
    this.#content = message.estHTML ? message.contenu.V : message.contenu;
    this.#isHTML = message.estHTML;
  }

  public async delete (): Promise<void> {
    await this.#overview.deleteDraft(this);
  }

  public async save (): Promise<void> {
    await this.#overview.patchDraft(this);
  }

  public async send (includeParentsAndStudents = false): Promise<void> {
    await this.#overview.sendDraft(this, includeParentsAndStudents);
  }

  public get possessionID (): string {
    return this.#possessionID;
  }

  public get replyMessageID (): string {
    return this.#replyMessageID;
  }

  public get content (): string {
    return this.#content;
  }

  public set content (value: string) {
    this.#content = value;
  }

  public get isHTML (): boolean {
    return this.#isHTML;
  }
}

export abstract class Message {
  readonly #client: Pronote;
  readonly #id: string;
  readonly #content: string;
  readonly #created: Date;

  readonly #author: MessageRecipient;
  readonly #receiver?: MessageRecipient;

  readonly #partialVisibility: boolean;
  readonly #amountOfRecipients: number;

  readonly #files: StudentAttachment[];

  protected constructor (client: Pronote, data: PronoteApiSentMessage | PronoteApiTransferredMessage) {
    this.#client = client;
    const myself = makeDummyRecipient(`${client.studentName} (${client.studentClass})`, PronoteApiResourceType.Student);

    this.#id = data.N;
    this.#content = data.estHTML ? data.contenu.V : data.contenu;
    this.#created = readPronoteApiDate(data.date.V);

    this.#author = data.public_gauche === PRONOTE_MESSAGE_MYSELF_NAME ? myself : makeDummyRecipient(data.public_gauche, parseHintToType(data.hint_gauche));
    if (data.public_droite === PRONOTE_MESSAGE_MYSELF_NAME) this.#receiver = myself;
    else if (typeof data.public_droite === "string") this.#receiver = makeDummyRecipient(data.public_droite, parseHintToType(data.hint_droite!));

    this.#partialVisibility = data.estUnAparte;
    this.#amountOfRecipients = (data.nbPublic ?? 1) + 1; // `+1` because the author is also a recipient.

    this.#files = data.listeDocumentsJoints?.V.map((file) => new StudentAttachment(client, file)) ?? [];
  }

  public async getRecipients (): Promise<FetchedMessageRecipient[]> {
    return this.#client.getRecipientsForMessage(this.#id);
  }

  public get id (): string {
    return this.#id;
  }

  public get content (): string {
    return this.#content;
  }

  public get created (): Date {
    return this.#created;
  }

  public get author (): MessageRecipient {
    return this.#author;
  }

  /**
   * @remark `undefined` when there's more than two recipients.
   */
  public get receiver (): MessageRecipient | undefined {
    return this.#receiver;
  }

  /**
   * `true` when only some people can see the message.
   */
  public get partialVisibility (): boolean {
    return this.#partialVisibility;
  }

  /**
   * @remark The author is also counted as a recipient.
   * @example
   * // In the situation when there's you and a teacher.
   * message.amountOfRecipients === 2; // 1 (you) + 1 (teacher)
   */
  public get amountOfRecipients (): number {
    return this.#amountOfRecipients;
  }

  public get files (): StudentAttachment[] {
    return this.#files;
  }
}


export class SentMessage extends Message {
  readonly #messagesOverview: MessagesOverview;
  readonly #replyMessageID: string;
  readonly #transferredMessages: TransferredMessage[] = [];

  public constructor (client: Pronote, messagesOverview: MessagesOverview, data: PronoteApiSentMessage) {
    super(client, data);

    this.#messagesOverview = messagesOverview;
    this.#replyMessageID = data.messageSource.V.N;

    if (data.listeMessagesPourContexte) {
      for (const message of data.listeMessagesPourContexte.V) {
        const instance = new TransferredMessage(client, message);
        this.#transferredMessages.push(instance);
      }
    }
  }

  public reply (content: string, includeParentsAndStudents = false): Promise<void> {
    return this.#messagesOverview.sendMessage(content, includeParentsAndStudents, this.id);
  }

  public draftReply (content: string): Promise<void> {
    return this.#messagesOverview.draftMessage(content, this.id);
  }

  public get replyingToMessage (): SentMessage | undefined {
    return this.#messagesOverview.messages.find((message) => message.id === this.#replyMessageID);
  }

  public get transferredMessages (): TransferredMessage[] {
    return this.#transferredMessages;
  }
}
