import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";
import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { FetchedMessageRecipient } from "~/parser/recipient";
import type { MessagesOverview, StudentMessage } from "~/parser/messages";
import type Pronote from "~/client/Pronote";
import Queue from "~/utils/queue";
import { Session } from "~/session";
import { callApiUserDiscussions } from "~/api/user/discussions";

type UserDiscussionsOverview = PronoteApiUserDiscussions["response"]["donnees"];
type UserDiscussionMessages = UserDiscussionsOverview["listeMessagerie"]["V"][number];
type UserFolder = UserDiscussionsOverview["listeEtiquettes"]["V"][number];

export class StudentDiscussionsOverview {
  readonly #folders: StudentDiscussionFolder[];

  #rawDiscussions: Record<string, UserDiscussionMessages> = {};
  #discussions: StudentDiscussion[];

  readonly #client: Pronote;
  readonly #clientQueue: Queue;
  readonly #clientSession: Session;

  constructor (
    client: Pronote, clientQueue: Queue, clientSession: Session,
    data: UserDiscussionsOverview
  ) {
    this.#client = client;
    this.#clientQueue = clientQueue;
    this.#clientSession = clientSession;

    this.#folders = data.listeEtiquettes.V.map((folder) => new StudentDiscussionFolder(folder));

    this.#discussions = [];
    this.#parseAndAssignDiscussions(data.listeMessagerie.V);
  }

  #parseAndAssignDiscussions (data: UserDiscussionsOverview["listeMessagerie"]["V"]): void {
    const discussions = data.filter((discussion) => discussion.estUneDiscussion && (discussion.profondeur || 0) === 0);

    for (const discussion of discussions) {
      // Get the root message of the discussion, this one is used as an identifier.
      const participantsMessageID = discussion.messagePourParticipants?.V.N;
      if (!participantsMessageID) continue;

      // Update the raw data of the discussion.
      this.#rawDiscussions[participantsMessageID] = discussion;

      if (!this.#discussions.find((currentDiscussion) => currentDiscussion.participantsMessageID === participantsMessageID)) {
        const instance = new StudentDiscussion(
          this.#client,
          () => this.#rawDiscussions[participantsMessageID],
          this
        );

        this.#discussions.push(instance);
      }
    }
  }

  public async refetch (): Promise<void> {
    const { listeMessagerie } = await this.#clientQueue.push(async () => {
      const { data } = await callApiUserDiscussions(this.#client.fetcher, { session: this.#clientSession });
      return data.donnees;
    });

    this.#parseAndAssignDiscussions(listeMessagerie.V);
  }

  public get folders (): StudentDiscussionFolder[] {
    return this.#folders;
  }

  public get discussions (): StudentDiscussion[] {
    return this.#discussions;
  }
}

export class StudentDiscussionFolder {
  readonly #id: string;
  readonly #name: string;
  readonly #genre: number;

  constructor (data: UserFolder) {
    this.#id = data.N;
    this.#name = data.L;
    this.#genre = data.G;
  }

  get id (): string {
    return this.#id;
  }

  get name (): string {
    return this.#name;
  }

  get genre (): number {
    return this.#genre;
  }
}

export class StudentDiscussion {
  readonly #client: Pronote;
  readonly #discussionsOverview: StudentDiscussionsOverview;

  readonly #readData: () => UserDiscussionMessages;
  readonly #dateAsFrenchText: string;
  readonly #recipientName?: string;
  readonly #creator: string;

  readonly #participantsMessageID: string;

  public async refetch (): Promise<void> {
    // Will be automatically assigned inside overview data and accessible through `readData()`.
    await this.#discussionsOverview.refetch();
  }

  public constructor (
    client: Pronote,
    data: () => UserDiscussionMessages,
    discussionsOverview: StudentDiscussionsOverview
  ) {
    this.#client = client;
    this.#discussionsOverview = discussionsOverview;

    this.#readData = data;
    const constantActualData = data();

    this.#dateAsFrenchText = constantActualData.libelleDate!;
    this.#recipientName = constantActualData.public;

    this.#creator = constantActualData.initiateur ?? this.#client.studentName;

    // Always exist in `data`, safe to non-null.
    this.#participantsMessageID = constantActualData.messagePourParticipants!.V.N;
  }

  /**
   * Fetches the messages from the discussion.
   * By default it won't mark the messages as read even after fetching them.
   *
   * You can change this behavior by setting `markAsRead` to `true`.
   * There's no other way to mark the messages as read.
   *
   * @param markAsRead Whether to mark the messages as read after fetching them.
   * @param limit - 0 = no limit, fetch all messages.
   */
  public fetchMessagesOverview (markAsRead = false, limit = 0): Promise<MessagesOverview> {
    return this.#client.getMessagesOverviewFromDiscussion(this, markAsRead, limit);
  }

  /**
   * Marks the discussion as read.
   * @remark This function is a shortcut to `fetchMessages(true)` but here we don't return anything.
   */
  public markAsRead (): Promise<void> {
    return this.#client.markDiscussionAsRead(this);
  }

  /**
   * Fetches the recipients of the discussion.
   * A recipient is someone who is part of the discussion.
   * They don't have to send a message to be considered as a recipient.
   */
  public fetchRecipients (): Promise<FetchedMessageRecipient[]> {
    return this.#client.getRecipientsForMessage(this.#participantsMessageID);
  }

  /**
   * Property used internally to make the messages in
   * discussion request.
   */
  public get possessions (): PronoteApiMessagesPossessionsList {
    return this.#readData().listePossessionsMessages.V;
  }

  /**
   * Output is very variable, see example below.
   * Because of this behavior, we can't transform this into a date.
   * Maybe, we could parse this manually, but it's not a priority.
   * TODO: Parse this manually.
   *
   * @example
   * "lundi 08h53"
   * // or can just be the hour
   * "07h26"
   */
  public get dateAsFrenchText (): string {
    return this.#dateAsFrenchText;
  }

  /**
   * Title of the discussion.
   */
  public get subject (): string {
    return this.#readData().objet ?? "";
  }

  public get recipientName (): string | undefined {
    return this.#recipientName;
  }

  public get numberOfMessages (): number {
    return this.#readData().nombreMessages ?? 0;
  }

  public get numberOfMessagesUnread (): number {
    return this.#readData().nbNonLus ?? 0;
  }

  public get creator (): string {
    return this.#creator;
  }

  public get closed (): boolean {
    return this.#readData().ferme ?? false;
  }

  public get folders (): StudentDiscussionFolder[] {
    return this.#readData().listeEtiquettes?.V.map((folder) => this.#discussionsOverview.folders.find((f) => f.id === folder.N)!) ?? [];
  }

  /**
   * Internal string containing the ID of the message
   * needed to fetch the participants of the discussion.
   */
  public get participantsMessageID (): string {
    return this.#participantsMessageID;
  }
}
