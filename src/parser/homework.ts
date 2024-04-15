import type { PronoteApiUserHomework } from "../api/user/homework/types";
import type Pronote from "../client/Pronote";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentSubject } from "~/parser/subject";
import { StudentAttachment } from "~/parser/attachment";
import type { StudentLessonResource } from "./lessonResource";
import { PronoteApiHomeworkDifficulty, PronoteApiHomeworkReturnType } from "~/constants/homework";
import { StudentTheme } from "./theme";

export class StudentHomework {
  public id: string;
  public subject: StudentSubject;
  public description: string;
  public backgroundColor: string;
  public done: boolean;
  public deadline: Date;
  public attachments: Array<StudentAttachment>;
  public difficulty: PronoteApiHomeworkDifficulty;
  /** Time that should take, in minutes, to do the homework. */
  public lengthInMinutes?: number;
  /** Themes associated with this homework. */
  public themes: StudentTheme[];

  /**
   * Available only if the homework should be returned.
   */
  public return?: {
    type: PronoteApiHomeworkReturnType.PAPER
  } | {
    type: PronoteApiHomeworkReturnType.FILE_UPLOAD
    uploaded: boolean
    canUpload: boolean
  };

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
    this.difficulty = homework.niveauDifficulte;
    this.lengthInMinutes = homework.duree;
    this.themes = homework.ListeThemes.V.map((theme) => new StudentTheme(theme));

    if (homework.avecRendu) {
      if (homework.genreRendu === PronoteApiHomeworkReturnType.PAPER) {
        this.return = {
          type: PronoteApiHomeworkReturnType.PAPER
        };
      }
      else if (homework.genreRendu === PronoteApiHomeworkReturnType.FILE_UPLOAD) {
        this.return = {
          type: PronoteApiHomeworkReturnType.FILE_UPLOAD,
          uploaded: typeof homework.documentRendu !== "undefined",
          canUpload: homework.peuRendre ?? false
        };
      }
    }

    if (homework.cahierDeTextes) {
      this.lessonResourceID = homework.cahierDeTextes.V.N;
    }
  }

  public async uploadFile (file: Buffer | ArrayBuffer, fileName: string): Promise<void> {
    if (!this.return || this.return.type !== PronoteApiHomeworkReturnType.FILE_UPLOAD) {
      throw new Error("This homework cannot be uploaded.");
    }

    await this.client.uploadHomeworkFile(this.id, file, fileName);
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
