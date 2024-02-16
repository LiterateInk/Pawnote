import { PronoteApiUserDiscussions } from "~/api/user/discussions/types";

export class StudentDiscussionsOverview {
  public folders: StudentDiscussionFolder[];
  public discussions: StudentDiscussion[];

  constructor (data: PronoteApiUserDiscussions["response"]["donnees"]) {
    this.folders = data.listeEtiquettes.V.map((folder) => new StudentDiscussionFolder(folder));
    this.discussions = data.listeMessagerie.V
      .filter((discussion) => discussion.estUneDiscussion && (discussion.profondeur || 0) === 0)
      .map((discussion) => new StudentDiscussion(discussion));
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
  public possessions: PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number]["listePossessionsMessages"]["V"];
  public read: boolean;
  public hourString?: string;
  public subject?: string;
  public recipientName?: string;
  public numberOfMessages: number;

  constructor (data: PronoteApiUserDiscussions["response"]["donnees"]["listeMessagerie"]["V"][number]) {
    this.possessions = data.listePossessionsMessages.V;
    this.read = data.lu ?? false;
    this.hourString = data.libelleDate;
    this.subject = data.objet;
    this.recipientName = data.public;
    this.numberOfMessages = data.nombreMessages ?? 0;
  }
}
