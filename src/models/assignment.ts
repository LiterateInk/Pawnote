import type { Attachment } from "./attachment";
import type { AssignmentDifficulty } from "./assignment-difficulty";
import type { AssignmentReturn } from "./assignment-return";
import type { AssignmentTheme } from "./assignment-theme";
import type { Subject } from "./subject";

export type Assignment = Readonly<{
  id: string;
  subject: Subject;
  description: string;
  backgroundColor: string;
  done: boolean;
  deadline: Date;
  attachments: Array<Attachment>;
  difficulty: AssignmentDifficulty;
  /** Time that should take, in minutes, to do the homework. */
  length?: number;
  /** Themes associated with this homework. */
  themes: AssignmentTheme[];
  return: AssignmentReturn
  /**
   * If defined, can be used to retrieve
   * the lesson contents from the resources tab.
   */
  lessonResourceID?: string;
}>;
