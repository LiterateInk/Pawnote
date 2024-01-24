import type { PronoteApiTheme } from "~/constants/themes";
import { StudentSubject } from "./subject";

/**
 * A theme is usually defined on lessons.
 */
export class StudentTheme {
  public id: string;
  public name: string;
  public subject: StudentSubject;

  constructor (data: PronoteApiTheme) {
    this.id = data.N;
    this.name = data.L;
    this.subject = new StudentSubject(data.Matiere.V);
  }
}
