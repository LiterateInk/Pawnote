import type { PronoteApiUserTimetable } from "~/api/user/timetable/types";
import Pronote from "~/client/Pronote";

import type { StudentLessonResource } from "./lessonResource";

import { translatePositionToTime, readPronoteApiDate } from "~/pronote/dates";
import { PronoteApiResourceType } from "~/constants/resources";
import { StudentSubject } from "~/parser/subject";
import { PronoteApiLessonStatusType } from "~/constants/lessonCategory";

type TTimetableItem = PronoteApiUserTimetable["response"]["donnees"]["ListeCours"][number];

abstract class TimetableItem {
  readonly #id: string;
  public get id (): string {
    return this.#id;
  }

  readonly #backgroundColor?: string;
  public get backgroundColor (): string | undefined {
    return this.#backgroundColor;
  }

  readonly #startDate: Date;
  public get startDate (): Date {
    return this.#startDate;
  }

  readonly #endDate: Date;
  public get endDate (): Date {
    return this.#endDate;
  }

  readonly #blockLength: number;
  public get blockLength (): number {
    return this.#blockLength;
  }

  readonly #blockPosition: number;
  public get blockPosition (): number {
    return this.#blockPosition;
  }

  readonly #notes?: string;
  public get notes (): string | undefined {
    return this.#notes;
  }

  protected constructor (client: Pronote, item: TTimetableItem) {
    this.#id = item.N;
    this.#backgroundColor = item.CouleurFond;
    this.#startDate = readPronoteApiDate(item.DateDuCours.V);
    this.#blockLength = item.duree;
    this.#blockPosition = item.place;
    this.#notes = item.memo;

    if ("DateDuCoursFin" in item && item.DateDuCoursFin) {
      this.#endDate = readPronoteApiDate(item.DateDuCoursFin.V);
    }
    else {
      const endHours = client.loginInformations.donnees.General.ListeHeuresFin.V;
      const endPosition = this.blockPosition % client.loginInformations.donnees.General.PlacesParJour + this.blockLength - 1;

      const end = new Date(this.#startDate);
      const endPositionTiming = translatePositionToTime(endHours, endPosition);
      end.setHours(endPositionTiming.hours, endPositionTiming.minutes);

      this.#endDate = end;
    }
  }
}

export class TimetableActivity extends TimetableItem {
  readonly #title: string;
  readonly #attendants: string[] = [];
  readonly #resourceTypeName: string;
  readonly #resourceValue: string;

  constructor (client: Pronote, activity: TTimetableItem) {
    if (!("estSortiePedagogique" in activity && activity.estSortiePedagogique)) {
      throw new TypeError("'TimetableActivity' is only designed for activities, not lessons. Consider using 'TimetableLesson' instead.");
    }

    super(client, activity);

    this.#title = activity.motif;
    this.#attendants = activity.accompagnateurs;
    this.#resourceTypeName = activity.strGenreRess;
    this.#resourceValue = activity.strRess;
  }

  public get title (): string {
    return this.#title;
  }

  public get attendants (): string[] {
    return this.#attendants;
  }

  public get resourceTypeName (): string {
    return this.#resourceTypeName;
  }

  public get resourceValue (): string {
    return this.#resourceValue;
  }
}

export class TimetableLesson extends TimetableItem {
  readonly #client: Pronote;

  readonly #genre: PronoteApiLessonStatusType;
  readonly #status?: string;
  readonly #canceled: boolean;
  readonly #exempted: boolean;
  readonly #detention: boolean;
  readonly #test: boolean;
  readonly #virtualClassrooms: string[] = [];

  readonly #personalNames: string[] = [];
  readonly #teacherNames: string[] = [];
  readonly #classrooms: string[] = [];
  readonly #groupNames: string[] = [];
  readonly #subject?: StudentSubject;

  readonly #lessonResourceID?: string;

  constructor (client: Pronote, lesson: TTimetableItem) {
    if ("estSortiePedagogique" in lesson && lesson.estSortiePedagogique) {
      throw new TypeError("'TimetableLesson' is only designed for lessons, not activities. Consider using 'TimetableActivity' instead.");
    }

    super(client, lesson);
    this.#client = client;

    this.#genre = lesson.G;
    this.#status = lesson.Statut;
    this.#canceled = lesson.estAnnule ?? false;
    this.#exempted = lesson.dispenseEleve ?? false;
    this.#detention = lesson.estRetenue ?? false;
    this.#test = lesson.cahierDeTextes?.V.estDevoir ?? false;

    if (lesson.listeVisios) {
      for (const virtualClassroom of lesson.listeVisios.V) {
        this.#virtualClassrooms.push(virtualClassroom.url);
      }
    }

    if (lesson.ListeContenus) {
      for (const data of lesson.ListeContenus.V) {
        switch (data.G) {
          case PronoteApiResourceType.Subject:
            this.#subject = new StudentSubject(data);
            break;
          case PronoteApiResourceType.Teacher:
            this.#teacherNames.push(data.L);
            break;
          case PronoteApiResourceType.Personal:
            this.#personalNames.push(data.L);
            break;
          case PronoteApiResourceType.Room:
            this.#classrooms.push(data.L);
            break;
          case PronoteApiResourceType.Group:
            this.#groupNames.push(data.L);
            break;
        }
      }
    }

    if (lesson.AvecCdT && lesson.cahierDeTextes) {
      this.#lessonResourceID = lesson.cahierDeTextes.V.N;
    }
  }

  public async getResource (): Promise<StudentLessonResource | undefined> {
    if (!this.#lessonResourceID) return;
    return this.#client.getLessonResource(this.#lessonResourceID);
  }

  public get genre (): PronoteApiLessonStatusType {
    return this.#genre;
  }

  /**
   * @example "Classe absente"
   */
  public get status (): string | undefined {
    return this.#status;
  }

  /**
   * Whether this lesson has been canceled or not.
   */
  public get canceled (): boolean {
    return this.#canceled;
  }

  /**
   * Whether the user is exempted from this lesson or not.
   */
  public get exempted (): boolean {
    return this.#exempted;
  }

  public get detention (): boolean {
    return this.#detention;
  }

  /** If there will be a test in the lesson. */
  public get test (): boolean {
    return this.#test;
  }

  /**
   * List of URLs for virtual classrooms.
   */
  public get virtualClassrooms (): string[] {
    return this.#virtualClassrooms;
  }

  /**
   * List of personal names.
   */
  public get personalNames (): string[] {
    return this.#personalNames;
  }

  /**
   * List of teacher names.
   */
  public get teacherNames (): string[] {
    return this.#teacherNames;
  }

  /**
   * List of classrooms.
   */
  public get classrooms (): string[] {
    return this.#classrooms;

  }

  /**
   * List of group names.
   */
  public get groupNames (): string[] {
    return this.#groupNames;
  }

  /**
   * Subject of the lesson.
   */
  public get subject (): StudentSubject | undefined {
    return this.#subject;
  }

  /**
   * Returns `undefined` when there's no resource attached to this lesson.
   * Otherwise, it'll return an ID that can be used in `Pronote#getLessonResource` method.
   *
   * A shortcut for this is to use the `getResource` method in this class.
   */
  public get lessonResourceID (): string | undefined {
    return this.#lessonResourceID;
  }
}
