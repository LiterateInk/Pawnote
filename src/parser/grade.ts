import { PronoteApiUserGrades } from "~/api/user/grades/types";
import { Pronote } from "..";
import { Period } from "./period";
import { StudentSubject } from "./subject";
import { PronoteApiGradeType, readPronoteApiGrade } from "~/pronote/grades";
import { readPronoteApiDate } from "~/pronote/dates";

/** Represents a grade. */
export class StudentGrade {
  /** the id of the grade (used internally) */
  public id: string;
  /** the actual grade */
  public value: number | PronoteApiGradeType;
  /** the maximum amount of points */
  public outOf: number | PronoteApiGradeType;
  /** the default maximum amount of points */
  public defaultOutOf?: number | PronoteApiGradeType;
  /** the date on which the grade was given */
  public date: Date;
  /** the subject in which the grade was given */
  public subject: StudentSubject;
  /** the average of the class */
  public average: number | PronoteApiGradeType;
  /** the highest grade */
  public max: number | PronoteApiGradeType;
  /** the lowest grade */
  public min: number | PronoteApiGradeType;
  /** the coefficient of the grade */
  public coefficient: number;
  /** comment on the grade description */
  public comment: string;
  /** is the grade bonus : only points above 10 count */
  public isBonus: boolean;
  /** is the grade optional : the grade only counts if it increases the average */
  public isOptional: boolean;
  /** is the grade out of 20. Example 8/10 -> 16/20 */
  public isOutOf20: boolean;

  constructor (
    public client: Pronote,
    /** the period in which the grade was given */
    public period: Period,
    grade: PronoteApiUserGrades["response"]["donnees"]["listeDevoirs"]["V"][number]
  ) {
    this.id = grade.N;
    this.value = readPronoteApiGrade(grade.note.V);
    this.outOf = readPronoteApiGrade(grade.bareme.V);
    this.defaultOutOf = readPronoteApiGrade(grade.baremeParDefaut.V);
    this.date = readPronoteApiDate(grade.date.V);
    this.subject = new StudentSubject(grade.service.V);
    this.average = readPronoteApiGrade(grade.moyenne.V);
    this.max = readPronoteApiGrade(grade.noteMax.V);
    this.min = readPronoteApiGrade(grade.noteMin.V);
    this.coefficient = grade.coefficient;
    this.comment = grade.commentaire;
    this.isBonus = grade.estBonus;
    this.isOptional = grade.estFacultatif && !this.isBonus;
    this.isOutOf20 = grade.estRamenerSur20;
  }
}
