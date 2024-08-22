import type { Skill } from "./skill";
import type { Subject } from "./subject";

export type Evaluation = Readonly<{
  name: string;
  id: string;
  teacher: string;
  coefficient: number;
  description: string;
  subject: Subject;
  /** @example ["Cycle 4"] */
  levels: Array<string>;
  skills: Array<Skill>;
  date: Date;
}>;
