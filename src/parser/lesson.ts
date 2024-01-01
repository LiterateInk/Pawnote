import type { PronoteApiUserTimetable } from "../api/user/timetable/types";
import type Pronote from "../client/Pronote";
import { PronoteApiResource } from "../constants/resources";
import { translatePositionToTime, readPronoteApiDate } from "../pronote/dates";
import { StudentSubject } from "./subject";

export class StudentLesson {
  public id: string
  public canceled: boolean
  public status?: string
  public memo?: string
  public backgroundColor?: string
  public outing: boolean
  public start: Date
  public exempted: boolean
  public virtualClassrooms: string[] = []
  public num: number
  public detention: boolean
  public test: boolean
  public end: Date
  public teacherNames: string[] = []
  public classrooms: string[] = []
  public groupNames: string[] = []
  public subject?: StudentSubject

  constructor (
    client: Pronote,
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
    
    if (lesson.DateDuCoursFin) {
      this.end = readPronoteApiDate(lesson.DateDuCoursFin.V)
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
        case PronoteApiResource.Matiere:
          this.subject = new StudentSubject(data);
          break;
        case PronoteApiResource.Enseignant:
          this.teacherNames.push(data.L);
          break;
        case PronoteApiResource.Salle:
          this.classrooms.push(data.L);
          break;
        case PronoteApiResource.Groupe:
          this.groupNames.push(data.L);
          break;
      }
    }
  }

  /**
   * Is the lesson considered normal : is not detention, or an outing.
   */
  public get normal (): boolean {
    return !this.detention && !this.outing;
  }
}