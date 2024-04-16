import type { PronoteApiUserTimetable } from "~/api/user/timetable/types";
import Pronote from "~/client/Pronote";

import type { StudentLessonResource } from "./lessonResource";

import { translatePositionToTime, readPronoteApiDate } from "~/pronote/dates";
import { PronoteApiResourceType } from "~/constants/resources";
import { StudentSubject } from "~/parser/subject";

/**
 * A single item in the student's timetable.
 */
export class StudentTimetableLesson {
  public id: string;
  /**
   * Whether this lesson has been canceled or not.
   */
  public canceled: boolean;
  /**
   * @example "Classe absente"
   */
  public status?: string;
  public memo?: string;
  public backgroundColor?: string;
  /** If it is a pedagogical outing. */
  public outing: boolean;
  public start: Date;
  /** Specifies if the student's presence is exempt. */
  public exempted: boolean;
  /** List of URLs for virtual classrooms. */
  public virtualClassrooms: string[] = [];
  /** For the same lesson time, the biggest `num` is the one shown on Pronote. */
  public num: number;
  public detention: boolean;
  /** If there will be a test in the lesson. */
  public test: boolean;
  public end: Date;
  public personalNames: string[] = [];
  public teacherNames: string[] = [];
  public classrooms: string[] = [];
  public groupNames: string[] = [];
  public subject?: StudentSubject;
  /** Is the lesson considered normal : is not detention, or an outing. */
  public normal: boolean;

  public haveLessonResource: boolean;
  public lessonResourceID?: string;

  constructor (
    private client: Pronote,
    lesson: PronoteApiUserTimetable["response"]["donnees"]["ListeCours"][number]
  ) {
    this.id = lesson.N;
    this.canceled = lesson.estAnnule ?? false;
    this.status = lesson.Statut;
    this.memo = lesson.memo;
    this.backgroundColor = lesson.CouleurFond;
    this.outing = lesson.estSortiePedagogique ?? false;
    this.start = readPronoteApiDate(lesson.DateDuCours.V);
    this.exempted = lesson.dispenseEleve ?? false;

    for (const visio of lesson.listeVisios?.V ?? []) {
      this.virtualClassrooms.push(visio.url);
    }

    this.num = lesson.P ?? 0;
    this.detention = lesson.estRetenue ?? false;
    this.test = lesson.cahierDeTextes?.V.estDevoir ?? false;
    this.normal = !this.detention && !this.outing;

    if (lesson.DateDuCoursFin) {
      this.end = readPronoteApiDate(lesson.DateDuCoursFin.V);
    }
    else {
      const endHours = client.loginInformations.donnees.General.ListeHeuresFin.V;
      const endPosition = lesson.place % client.loginInformations.donnees.General.PlacesParJour + lesson.duree - 1;
      const endPositionTiming = translatePositionToTime(endHours, endPosition);

      const end = new Date(this.start);
      end.setHours(endPositionTiming.hours, endPositionTiming.minutes);

      this.end = end;
    }

    for (const data of lesson.ListeContenus?.V ?? []) {
      switch (data.G) {
        case PronoteApiResourceType.Subject:
          this.subject = new StudentSubject(data);
          break;
        case PronoteApiResourceType.Teacher:
          this.teacherNames.push(data.L);
          break;
        case PronoteApiResourceType.Personal:
          this.personalNames.push(data.L);
          break;
        case PronoteApiResourceType.Room:
          this.classrooms.push(data.L);
          break;
        case PronoteApiResourceType.Groupe:
          this.groupNames.push(data.L);
          break;
      }
    }

    this.haveLessonResource = Boolean(lesson.AvecCdT && lesson.cahierDeTextes);
    if (this.haveLessonResource) this.lessonResourceID = lesson.cahierDeTextes!.V.N;
  }

  public async getResource (): Promise<StudentLessonResource | undefined> {
    if (!this.haveLessonResource) return;
    return this.client.getLessonResource(this.lessonResourceID!);
  }
}
