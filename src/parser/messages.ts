import type { PronoteApiUserMessages } from "~/api/user/messages/types";
import type { MessageRecipient, FetchedMessageRecipient } from "~/parser/recipient";
import type { StudentDiscussion } from "~/parser/discussion";

import type Pronote from "~/client/Pronote";
import type Queue from "~/utils/queue";
import type { Session } from "~/session";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "~/parser/attachment";
import { PronoteApiResourceType } from "~/constants/resources";
import { PRONOTE_MESSAGE_MYSELF_NAME, PronoteApiMessagesButtonType } from "~/constants/messages";
import { makeDummyRecipient, parseHintToType } from "~/pronote/recipients";
import { callApiUserMessages } from "~/api/user/messages";

export class MessagesOverview {
  readonly #client: Pronote;
  readonly #clientQueue: Queue;
  readonly #clientSession: Session;
  readonly #discussion: StudentDiscussion;

  #defaultReplyMessageID: string;
  #messages: StudentMessage[];
  // Needed to create a new message...
  #sendButtonGenre: PronoteApiMessagesButtonType;
  #fetchLimit: number;

  public async refetch (limit: number) {
    const { messagePourReponse, listeMessages, listeBoutons } = await this.#clientQueue.push(async () => {
      const { data } = await callApiUserMessages(this.#client.fetcher, {
        possessions: this.#discussion.possessions,
        session: this.#clientSession,
        markAsRead: false,
        limit
      });

      return data.donnees;
    });

    this.#defaultReplyMessageID = messagePourReponse.V.N;
    this.#messages = this.#parseMessages(listeMessages.V);
    this.#sendButtonGenre = this.#readSendButton(listeBoutons.V);
    this.#fetchLimit = limit;
  }

  #readSendButton (listeBoutons: PronoteApiUserMessages["response"]["donnees"]["listeBoutons"]["V"]): PronoteApiMessagesButtonType {
    return listeBoutons.find((button) => button.L.startsWith("Envoyer"))!.G;
  }

  #parseMessages (listeMessages: PronoteApiUserMessages["response"]["donnees"]["listeMessages"]["V"]): StudentMessage[] {
    const output: StudentMessage[] = [];

    for (const message of listeMessages) {
      const instance = new StudentMessage(this.#client, this, message);
      output.push(instance);
    }

    return output.sort((a, b) => b.created.getTime() - a.created.getTime());
  }

  public constructor (
    // Those are very private properties, that's why we drill them down.
    client: Pronote, clientQueue: Queue, clientSession: Session,
    // Parameter needed to fetch the discussion.
    discussion: StudentDiscussion,
    // Current data of the discussion.
    data: PronoteApiUserMessages["response"],
    fetchLimit = 0
  ) {
    this.#client = client;
    this.#clientQueue = clientQueue;
    this.#clientSession = clientSession;
    this.#discussion = discussion;

    this.#defaultReplyMessageID = data.donnees.messagePourReponse.V.N;
    this.#messages = this.#parseMessages(data.donnees.listeMessages.V);
    this.#sendButtonGenre = this.#readSendButton(data.donnees.listeBoutons.V);
    this.#fetchLimit = fetchLimit;
  }

  public get defaultReplyMessageID (): string {
    return this.#defaultReplyMessageID;
  }

  public get messages (): StudentMessage[] {
    return this.#messages;
  }

  /**
   * Will send a message to the discussion and refetch the messages
   * internally so properties are automatically updated.
   */
  public async sendMessage (content: string, includeParentsAndStudents = false, replyTo = this.#defaultReplyMessageID): Promise<void> {
    await this.#client.replyToDiscussionMessage(replyTo, content, this.#sendButtonGenre, includeParentsAndStudents);
    // Update the discussions overview -> updates possessions.
    await this.#discussion.refetch();
    // Fetch the new messages.
    await this.refetch(this.#fetchLimit);
  }

  /**
   * Whether the button "include students and parents"
   * appears on the UI or not.
   */
  public get canIncludeStudentsAndParents (): boolean {
    return this.#sendButtonGenre === PronoteApiMessagesButtonType.ReplyEveryoneExceptParentsAndStudents
        || this.#sendButtonGenre === PronoteApiMessagesButtonType.SendEveryoneExceptParentsAndStudents;
  }
}

export class StudentMessage {
  readonly #client: Pronote;
  readonly #messagesOverview: MessagesOverview;
  readonly #myself: MessageRecipient;

  readonly #id: string;
  readonly #content: string;
  readonly #created: Date;

  readonly #author: MessageRecipient;
  readonly #receiver?: MessageRecipient;

  readonly #partialVisibility: boolean;
  readonly #amountOfRecipients: number;

  readonly #files: StudentAttachment[];
  readonly #replyMessageID: string;

  constructor (client: Pronote, messagesOverview: MessagesOverview, data: PronoteApiUserMessages["response"]["donnees"]["listeMessages"]["V"][number]) {
    this.#client = client;
    this.#messagesOverview = messagesOverview;
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
    this.#replyMessageID = data.messageSource.V.N;
  }

  public async getRecipients (): Promise<FetchedMessageRecipient[]> {
    return this.#client.getRecipientsForMessage(this.#id);
  }

  public reply (content: string, includeParentsAndStudents = false): Promise<void> {
    return this.#messagesOverview.sendMessage(content, includeParentsAndStudents, this.#id);
  }

  public get replyingToMessage (): StudentMessage | undefined {
    return this.#messagesOverview.messages.find((message) => message.id === this.#replyMessageID);
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
