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
      .map((discussion) => new StudentDiscussion(client, discussion));
  }
}

export class StudentDiscussionFolder {
  public id: string;
  public name: string;
  public genre: number;

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
  public hourString?: string;
  public subject: string;
  public recipientName?: string;
  public numberOfMessages: number;
  public numberOfMessagesUnread: number;
  public creator?: string;
  public closed: boolean;

  constructor (private client: Pronote, data: PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number]) {
    this.possessions = data.listePossessionsMessages.V;
    this.read = data.lu ?? false;
    this.hourString = data.libelleDate;
    this.subject = data.objet!; // since filtered, object is always here.
    this.recipientName = data.public;
    this.numberOfMessages = data.nombreMessages ?? 0;
    this.numberOfMessagesUnread = data.nbNonLus ?? 0;
    this.creator = data.initiateur;
    this.closed = data.ferme ?? false;
    // TODO: ListeEtiquettes
  }

  public fetchMessages (): Promise<StudentMessage[]> {
    return this.client.getMessagesFromDiscussion(this.possessions);
  }
}
