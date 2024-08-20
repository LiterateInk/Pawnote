import type { Attachment } from "./attachment";
import type { HomeworkDifficulty } from "./homework-difficulty";
import type { HomeworkReturn } from "./homework-return";
import type { HomeworkTheme } from "./homework-theme";
import type { Subject } from "./subject";

export type Homework = Readonly<{
  id: string;
  subject: Subject;
  description: string;
  backgroundColor: string;
  done: boolean;
  deadline: Date;
  attachments: Array<Attachment>;
  difficulty: HomeworkDifficulty;
  /** Time that should take, in minutes, to do the homework. */
  length?: number;
  /** Themes associated with this homework. */
  themes: HomeworkTheme[];
  return: HomeworkReturn
  /**
   * If defined, can be used to retrieve
   * the lesson contents from the resources tab.
   */
  lessonResourceID?: string;
}>;
