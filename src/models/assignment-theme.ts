import type { Subject } from "./subject";

export type AssignmentTheme = Readonly<{
  id: string;
  name: string;
  subject: Subject;
}>;
