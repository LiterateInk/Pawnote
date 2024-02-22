import type { PronoteApiUserDiscussions } from "~/api/user/discussions/types";
import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";
import type { StudentMessage } from "./messages";
import type Pronote from "~/client/Pronote";

export class StudentDiscussionsOverview {
  public folders: StudentDiscussionFolder[];
  public discussions: StudentDiscussion[];

  constructor (client: Pronote, data: PronoteApiUserDiscussions["response"]["donnees"]) {
    this.folders = data.listeEtiquettes.V.map((folder) => new StudentDiscussionFolder(folder));
    this.discussions = data.listeMessagerie.V
      .filter((discussion) => discussion.estUneDiscussion && (discussion.profondeur || 0) === 0)
      .map((discussion) => new StudentDiscussion(client, discussion, this.folders));
  }
}

export class StudentDiscussionFolder {
  public readonly id: string;
  public readonly name: string;
  public readonly genre: number;

  constructor (data: PronoteApiUserDiscussions["response"]["donnees"]["listeEtiquettes"]["V"][number]) {
    this.id = data.N;
    this.name = data.L;
    this.genre = data.G;
  }
}

export class StudentDiscussion {
  /**
   * Property used internally to make the messages in
   * discussion request.
   */
  public possessions: PronoteApiMessagesPossessionsList;

  public read: boolean;

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
  public dateAsFrenchText: string;
  public subject: string;
  public recipientName?: string;
  public numberOfMessages: number;
  public numberOfMessagesUnread: number;
  public creator?: string;
  public closed: boolean;
  public folders: StudentDiscussionFolder[];

  constructor (private client: Pronote, data: PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number], folders: StudentDiscussionFolder[]) {
    this.possessions = data.listePossessionsMessages.V;
    this.read = data.lu ?? false;
    this.dateAsFrenchText = data.libelleDate!;
    this.subject = data.objet!; // since filtered, object is always here.
    this.recipientName = data.public;
    this.numberOfMessages = data.nombreMessages ?? 0;
    this.numberOfMessagesUnread = data.nbNonLus ?? 0;
    this.creator = data.initiateur;
    this.closed = data.ferme ?? false;
    this.folders = data.listeEtiquettes?.V.map((folder) => folders.find((f) => f.id === folder.N)!) ?? [];
  }

  public fetchMessages (): Promise<StudentMessage[]> {
    return this.client.getMessagesFromDiscussion(this.possessions);
  }
}
