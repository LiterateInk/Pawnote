import type { PronoteApiUserHomework } from "../api/user/homework/types";
import type Pronote from "../client/Pronote";
import type { PawnoteSupportedFormDataFile } from "~/utils/file";
import type { StudentLessonResource } from "./lessonResource";

import { readPronoteApiDate } from "~/pronote/dates";
import { StudentSubject } from "~/parser/subject";
import { StudentAttachment } from "~/parser/attachment";
import { PronoteApiHomeworkDifficulty, PronoteApiHomeworkReturnType } from "~/constants/homework";
import { StudentTheme } from "./theme";

export class StudentHomework {
  /**
   * If defined, can be used to retrieve
   * the lesson contents from the resources tab.
   *
   * You can directly fetch the contents using `getContent()`.
   */
  public lessonResourceID?: string;

  public async removeUploadedFile (): Promise<void> {
    if (!this.return || this.return.type !== PronoteApiHomeworkReturnType.FILE_UPLOAD) {
      throw new Error("This homework cannot be uploaded.");
    }

    await this.client.removeHomeworkFile(this.id);
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
