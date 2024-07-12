import type { PronoteApiUserTimetable } from "~/api/user/timetable/types";
import Pronote from "~/client/Pronote";

import type { StudentLessonResource } from "./lessonResource";

import { translatePositionToTime, readPronoteApiDate, translateToPronoteWeekNumber } from "~/pronote/dates";
import { PronoteApiResourceType } from "~/constants/resources";
import { StudentSubject } from "~/parser/subject";
import { PronoteApiLessonStatusType } from "~/constants/lessonCategory";

type TTimetableItem = PronoteApiUserTimetable["response"]["donnees"]["ListeCours"][number];

abstract class TimetableItem {
  readonly #item: TTimetableItem;

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

  readonly #weekNumber: number;
  public get weekNumber (): number {
    return this.#weekNumber;
  }

  protected constructor (client: Pronote, item: TTimetableItem) {
    this.#item = item;
    this.#id = this.#item.N;
    this.#startDate = readPronoteApiDate(this.#item.DateDuCours.V);
    this.#blockLength = this.#item.duree;
    this.#blockPosition = this.#item.place;
    this.#weekNumber = translateToPronoteWeekNumber(this.#startDate, client.firstMonday);

    if ("CouleurFond" in this.#item && typeof this.#item.CouleurFond === "string") {
      this.#backgroundColor = this.#item.CouleurFond;
    }

    if ("memo" in this.#item && typeof this.#item.memo === "string") {
      this.#notes = this.#item.memo;
    }

    if ("DateDuCoursFin" in this.#item && typeof this.#item.DateDuCoursFin?.V === "string") {
      this.#endDate = readPronoteApiDate(this.#item.DateDuCoursFin.V);
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

  public isActivity (): this is TimetableActivity {
    return "estSortiePedagogique" in this.#item && this.#item.estSortiePedagogique === true;
  }

  public isDetention (): this is TimetableDetention {
    return "estRetenue" in this.#item && typeof this.#item.estRetenue !== "undefined";
  }

  public isLesson (): this is TimetableLesson {
    return !this.isActivity() && !this.isDetention();
  }
}

export class TimetableDetention extends TimetableItem {
  readonly #title?: string;
  readonly #personalNames: string[] = [];
  readonly #teacherNames: string[] = [];
  readonly #classrooms: string[] = [];

  constructor (client: Pronote, detention: TTimetableItem) {
    if (!("estRetenue" in detention && typeof detention.estRetenue !== "undefined")) {
      throw new TypeError("'TimetableDetention' is only designed for detentions. Consider using 'TimetableLesson' or 'TimetableActivity' instead.");
    }

    super(client, detention);

    if (detention.ListeContenus) {
      for (const data of detention.ListeContenus.V) {
        if ("estHoraire" in data && data.estHoraire) {
          this.#title = data.L;
        }
        else if ("G" in data) {
          switch (data.G) {
            case PronoteApiResourceType.Teacher:
              this.#teacherNames.push(data.L);
              break;
            case PronoteApiResourceType.Personal:
              this.#personalNames.push(data.L);
              break;
            case PronoteApiResourceType.Room:
              this.#classrooms.push(data.L);
              break;
          }
        }
      }
    }
  }

  public get title (): string | undefined {
    return this.#title;
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
}
export class TimetableActivity extends TimetableItem {
  readonly #title: string;
  readonly #attendants: string[] = [];
  readonly #resourceTypeName: string;
  readonly #resourceValue: string;

  constructor (client: Pronote, activity: TTimetableItem) {
    if (!("estSortiePedagogique" in activity && activity.estSortiePedagogique)) {
      throw new TypeError("'TimetableActivity' is only designed for activities. Consider using 'TimetableLesson' or 'TimetableDetention' instead.");
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

    if ("estRetenue" in lesson && typeof lesson.estRetenue !== "undefined") {
      throw new TypeError("'TimetableLesson' is only designed for lessons, not detentions. Consider using 'TimetableDetention' instead.");
    }

    super(client, lesson);
    this.#client = client;

    this.#genre = lesson.G;
    this.#status = lesson.Statut;
    this.#canceled = lesson.estAnnule ?? false;
    this.#exempted = lesson.dispenseEleve ?? false;
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
