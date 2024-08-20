import type { Subject } from "./subject";

export type HomeworkTheme = Readonly<{
  id: string;
  name: string;
  subject: Subject;
}>;
