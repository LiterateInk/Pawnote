import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";
import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { StudentMessage } from "~/parser/messages";
import type Pronote from "~/client/Pronote";

type UserDiscussionsOverview = PronoteApiUserDiscussions["response"]["donnees"];
type UserDiscussionMessages = UserDiscussionsOverview["listeMessagerie"]["V"][number];
type UserFolder = UserDiscussionsOverview["listeEtiquettes"]["V"][number];

export class StudentDiscussionsOverview {
  readonly #folders: StudentDiscussionFolder[];
  readonly #discussions: StudentDiscussion[];

  constructor (client: Pronote, data: UserDiscussionsOverview) {
    this.#folders = data.listeEtiquettes.V.map((folder) => new StudentDiscussionFolder(folder));
    this.#discussions = data.listeMessagerie.V
      .filter((discussion) => discussion.estUneDiscussion && (discussion.profondeur || 0) === 0)
      .map((discussion) => new StudentDiscussion(client, discussion, this.folders));
  }

  get folders (): StudentDiscussionFolder[] {
    return this.#folders;
  }

  get discussions (): StudentDiscussion[] {
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

  readonly #possessions: PronoteApiMessagesPossessionsList;
  readonly #dateAsFrenchText: string;
  readonly #subject: string;
  readonly #recipientName?: string;
  readonly #numberOfMessages: number;
  readonly #numberOfMessagesUnread: number;
  readonly #creator?: string;
  readonly #closed: boolean;
  readonly #folders: StudentDiscussionFolder[];

  constructor (client: Pronote, data: UserDiscussionMessages, folders: StudentDiscussionFolder[]) {
    this.#client = client;

    this.#possessions = data.listePossessionsMessages.V;
    this.#dateAsFrenchText = data.libelleDate!;
    this.#subject = data.objet!;
    this.#recipientName = data.public;
    this.#numberOfMessages = data.nombreMessages ?? 0;
    this.#numberOfMessagesUnread = data.nbNonLus ?? 0;
    this.#creator = data.initiateur;
    this.#closed = data.ferme ?? false;
    this.#folders = data.listeEtiquettes?.V.map((folder) => folders.find((f) => f.id === folder.N)!) ?? [];
  }

  /**
   * Fetches the messages from the discussion.
   * By default it won't mark the messages as read even after fetching them.
   *
   * You can change this behavior by setting `markAsRead` to `true`.
   * There's no other way to mark the messages as read.
   *
   * @param markAsRead Whether to mark the messages as read after fetching them.
   */
  public fetchMessages (markAsRead = false): Promise<StudentMessage[]> {
    return this.#client.getMessagesFromDiscussion(this.#possessions, markAsRead);
  }

  /**
   * Marks the discussion as read.
   * @remark This function is a shortcut to `fetchMessages(true)` but here we don't return anything.
   */
  public async markAsRead (): Promise<void> {
    return this.#client.markDiscussionAsRead(this.#possessions);
  }

  /**
   * Property used internally to make the messages in
   * discussion request.
   */
  get possessions (): PronoteApiMessagesPossessionsList {
    return this.#possessions;
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
  get dateAsFrenchText (): string {
    return this.#dateAsFrenchText;
  }

  /**
   * Title of the discussion.
   */
  get subject (): string {
    return this.#subject;
  }

  get recipientName (): string | undefined {
    return this.#recipientName;
  }

  get numberOfMessages (): number {
    return this.#numberOfMessages;
  }

  get numberOfMessagesUnread (): number {
    return this.#numberOfMessagesUnread;
  }

  get creator (): string | undefined {
    return this.#creator;
  }

  get closed (): boolean {
    return this.#closed;
  }

  get folders (): StudentDiscussionFolder[] {
    return this.#folders;
  }
}
