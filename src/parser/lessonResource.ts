import { PronoteApiUserResources } from "~/api/user/resources/types";
import type Pronote from "~/client/Pronote";
import { readPronoteApiDate } from "~/pronote/dates";
import { StudentSubject } from "./subject";
import { StudentLessonContent } from "./lessonContent";
import { StudentHomework } from "./homework";

/**
 * A lesson resource is a single item in the "Content and resources" tab on Pronote.
 * It contains the lesson resources.
 *
 * You can open the lesson's homework from this, see `getHomework()`.
 */
export class StudentLessonResource {
  public id: string;
  public start: Date;
  public end: Date;
  public subject: StudentSubject;
  public homeworkDate?: Date;
  /** Color of the resource in HEX. */
  public backgroundColor: string;
  public contents: StudentLessonContent[];
  public teacherNames: string[];
  public groupNames: string[];

  constructor (
    private client: Pronote,
    data: PronoteApiUserResources["response"]["donnees"]["ListeCahierDeTextes"]["V"][number]
  ) {
    this.id = data.N;
    this.start = readPronoteApiDate(data.Date.V);
    this.end = readPronoteApiDate(data.DateFin.V);
    this.subject = new StudentSubject(data.Matiere.V);

    if (data.dateTAF?.V) {
      this.homeworkDate = readPronoteApiDate(data.dateTAF.V);
    }

    this.teacherNames = data.listeProfesseurs.V.map((teacher) => teacher.L);
    this.groupNames = data.listeGroupes.V.map((group) => group.L);

    this.backgroundColor = data.CouleurFond;
    this.contents = data.listeContenus.V.map((content) => new StudentLessonContent(client, content));
  }

  public getHomework (): Promise<StudentHomework[]> {
    return this.client.getLessonHomework(this.id);
  }
}
