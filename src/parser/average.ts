import { PronoteApiUserGrades } from "~/api/user/grades/types";
import { Pronote } from "..";
import { Period } from "./period";
import { StudentSubject } from "./subject";
import { PronoteApiGradeType, readPronoteApiGrade } from "~/pronote/grades";
import { readPronoteApiDate } from "~/pronote/dates";

/** Represents an average. */
export class StudentAverage {
  /** students average in the subject */
  public student: number | PronoteApiGradeType;
  /** classes average in the subject */
  public class_average: number | PronoteApiGradeType;
  /** highest average in the class */
  public max: number | PronoteApiGradeType;
  /** lowest average in the class */
  public min: number | PronoteApiGradeType;
  /** maximum amount of points */
  public outOf: number | PronoteApiGradeType;
  /** the default maximum amount of points */
  public defaultOutOf?: number | PronoteApiGradeType;
  /** subject the average is from */
  public subject: StudentSubject;
  /** background color of the subject */
  public backgroundColor: string;

  constructor (average: PronoteApiUserGrades["response"]["donnees"]["listeServices"]["V"][number]) {
    this.student = readPronoteApiGrade(average.moyEleve.V);
    this.outOf = readPronoteApiGrade(average.baremeMoyEleve.V);
    this.defaultOutOf = readPronoteApiGrade(average.baremeMoyEleveParDefaut.V);
    this.class_average = readPronoteApiGrade(average.moyClasse.V);
    this.min = readPronoteApiGrade(average.moyMin.V);
    this.max = readPronoteApiGrade(average.moyMax.V);
    this.subject = new StudentSubject(average);
    this.backgroundColor = average.couleur;
  }
}
