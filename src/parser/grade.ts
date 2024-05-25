import type { PronoteApiUserGrades } from "~/api/user/grades/types";
import type Pronote from "~/client/Pronote";
import { StudentSubject } from "~/parser/subject";
import { type PronoteApiGradeType, readPronoteApiGrade } from "~/pronote/grades";
import { readPronoteApiDate } from "~/pronote/dates";
import { StudentAttachment } from "~/parser//attachment";
import { PronoteApiAttachmentType } from "~/constants/attachments";
import { PronoteApiGradeAttachmentType } from "~/constants/grades";

export class StudentGrade {
  readonly #id: string;
  readonly #value: number | PronoteApiGradeType;
  readonly #outOf: number | PronoteApiGradeType;
  readonly #defaultOutOf?: number | PronoteApiGradeType;
  readonly #date: Date;
  readonly #subject: StudentSubject;
  readonly #average?: number | PronoteApiGradeType;
  readonly #max: number | PronoteApiGradeType;
  readonly #min: number | PronoteApiGradeType;
  readonly #coefficient: number;
  readonly #comment: string;
  readonly #isBonus: boolean;
  readonly #isOptional: boolean;
  readonly #isOutOf20: boolean;

  readonly #subjectFile?: StudentAttachment;
  readonly #correctionFile?: StudentAttachment;

  constructor (client: Pronote, grade: PronoteApiUserGrades["response"]["donnees"]["listeDevoirs"]["V"][number]) {
    this.#id = grade.N;
    this.#value = readPronoteApiGrade(grade.note.V);
    this.#outOf = readPronoteApiGrade(grade.bareme.V);
    this.#defaultOutOf = readPronoteApiGrade(grade.baremeParDefaut.V);
    this.#date = readPronoteApiDate(grade.date.V);
    this.#subject = new StudentSubject(grade.service.V);

    if (grade.moyenne) {
      this.#average = readPronoteApiGrade(grade.moyenne.V);
    }

    this.#max = readPronoteApiGrade(grade.noteMax.V);
    this.#min = readPronoteApiGrade(grade.noteMin.V);
    this.#coefficient = grade.coefficient;
    this.#comment = grade.commentaire;
    this.#isBonus = grade.estBonus;
    this.#isOptional = grade.estFacultatif && !this.isBonus;
    this.#isOutOf20 = grade.estRamenerSur20;

    if (grade.libelleCorrige) {
      this.#correctionFile = new StudentAttachment(client, {
        G: PronoteApiAttachmentType.File,
        L: grade.libelleCorrige,
        N: this.#id
      }, { // Additional genre.
        G: PronoteApiGradeAttachmentType.CorrectionFile
      });
    }

    if (grade.libelleSujet) {
      this.#subjectFile = new StudentAttachment(client, {
        G: PronoteApiAttachmentType.File,
        L: grade.libelleSujet,
        N: this.#id
      }, { // Additional genre.
        G: PronoteApiGradeAttachmentType.SubjectFile
      });
    }
  }

  /** the id of the grade (used internally) */
  get id (): string {
    return this.#id;
  }

  /** the actual grade */
  get value (): number | PronoteApiGradeType {
    return this.#value;
  }

  /** the maximum amount of points */
  get outOf (): number | PronoteApiGradeType {
    return this.#outOf;
  }

  /** the default maximum amount of points */
  get defaultOutOf (): number | PronoteApiGradeType | undefined {
    return this.#defaultOutOf;
  }

  /** the date on which the grade was given */
  get date (): Date {
    return this.#date;
  }

  /** the subject in which the grade was given */
  get subject (): StudentSubject {
    return this.#subject;
  }

  /** the average of the class */
  get average (): number | PronoteApiGradeType | undefined {
    return this.#average;
  }

  /** the highest grade */
  get max (): number | PronoteApiGradeType {
    return this.#max;
  }

  /** the lowest grade */
  get min (): number | PronoteApiGradeType {
    return this.#min;
  }

  /** the coefficient of the grade */
  get coefficient (): number {
    return this.#coefficient;
  }

  /** comment on the grade description */
  get comment (): string {
    return this.#comment;
  }

  /** is the grade bonus : only points above 10 count */
  get isBonus (): boolean {
    return this.#isBonus;
  }

  /** is the grade optional : the grade only counts if it increases the average */
  get isOptional (): boolean {
    return this.#isOptional;
  }

  /** is the grade out of 20. Example 8/10 -> 16/20 */
  get isOutOf20 (): boolean {
    return this.#isOutOf20;
  }

  /** the file of the subject */
  get subjectFile (): StudentAttachment | undefined {
    return this.#subjectFile;
  }

  /** the file of the correction */
  get correctionFile (): StudentAttachment | undefined {
    return this.#correctionFile;
  }
}
