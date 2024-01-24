import type { PronoteApiUserHomework } from "../api/user/homework/types";
import type Pronote from "../client/Pronote";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentSubject } from "~/parser/subject";
import { StudentAttachment } from "~/parser/attachment";
import type { StudentLessonResource } from "./lessonResource";

export class StudentHomework {
  public id: string;
  public subject: StudentSubject;
  public description: string;
  public backgroundColor: string;
  public done: boolean;
  public deadline: Date;
  public attachments: Array<StudentAttachment>;

  /**
   * If defined, can be used to retrieve
   * the lesson contents from the resources tab.
   *
   * You can directly fetch the contents using `getContent()`.
   */
  public lessonResourceID?: string;

  constructor (
    private client: Pronote,
    homework: PronoteApiUserHomework["response"]["donnees"]["ListeTravauxAFaire"]["V"][number]
  ) {
    this.id = homework.N;
    this.description = homework.descriptif.V;
    this.done = homework.TAFFait;
    this.subject = new StudentSubject(homework.Matiere.V);
    this.deadline = readPronoteApiDate(homework.PourLe.V);
    this.backgroundColor = homework.CouleurFond;
    this.attachments = homework.ListePieceJointe.V.map((raw) => new StudentAttachment(client, raw));

    if (homework.cahierDeTextes) {
      this.lessonResourceID = homework.cahierDeTextes.V.N;
    }
  }

  public async setDone (done: boolean): Promise<void> {
    await this.client.patchHomeworkStatus(this.id, done);
    this.done = done;
  }

  public async getResource (): Promise<StudentLessonResource | undefined> {
    if (!this.lessonResourceID) return;
    return this.client.getLessonResource(this.lessonResourceID);
  }
}
