import type { PronoteApiAttendanceAbsence, PronoteApiAttendanceDelay, PronoteApiAttendancePunishment } from "~/constants/attendance";
import type Pronote from "~/client/Pronote";

import { StudentAttachment } from "~/parser/attachment";
import { readPronoteApiDate } from "~/pronote/dates";

export class StudentDelay {
  public id: string;
  public date: Date;
  public minutes: number;
  public justified: boolean;
  public justification: string | null;
  public shouldParentsJustify: boolean;
  public administrativelyFixed: boolean;

  public isReasonUnknown: boolean;
  public reason: string | null;

  constructor (item: PronoteApiAttendanceDelay) {
    this.id = item.N;
    this.date = readPronoteApiDate(item.date.V);
    this.minutes = item.duree;
    this.justified = item.justifie;
    this.justification = this.justified ? item.justification || null : null;
    this.shouldParentsJustify = item.aJustifierParParents;
    this.administrativelyFixed = item.reglee;

    this.isReasonUnknown = item.estMotifNonEncoreConnu;
    this.reason = !this.isReasonUnknown ? item.listeMotifs.V[0].L : null;
  }
}

export class StudentPunishment {
  public id: string;
  public reason: string | null;

  public isDuringLesson: boolean;
  public exclusion: boolean;

  public workToDo: string;
  public workToDoDocuments: Array<StudentAttachment>;

  public circumstances: string;
  public circumstancesDocuments: Array<StudentAttachment>;

  public giver: string;
  public dateGiven: Date;

  public durationMinutes: number;

  constructor (client: Pronote, item: PronoteApiAttendancePunishment) {
    this.id = item.N;
    this.reason = item.listeMotifs.V?.[0].L || null;

    this.exclusion = item.estUneExclusion;
    this.isDuringLesson = !item.horsCours;

    this.workToDo = item.travailAFaire;
    this.workToDoDocuments = item.documentsTAF.V.map((document) => new StudentAttachment(client, document));

    this.circumstances = item.circonstances;
    this.circumstancesDocuments = item.documentsCirconstances.V.map((document) => new StudentAttachment(client, document));

    this.giver = item.demandeur.V.L;
    this.dateGiven = readPronoteApiDate(item.dateDemande.V);

    this.durationMinutes = item.duree;
  }
}

export class StudentAbsence {
  public id: string;
  public from: Date;
  public to: Date;
  public justified: boolean;
  public opened: boolean;

  /**
   * In the format : `HH{h}MM`
   * @example "2h00"
   */
  public hoursMissed: number;
  public minutesMissed: number;
  public daysMissedInReport: number;

  public shouldParentsJustify: boolean;
  public administrativelyFixed: boolean;

  public isReasonUnknown: boolean;
  public reason: string | null;

  constructor (item: PronoteApiAttendanceAbsence) {
    this.id = item.N;
    this.from = readPronoteApiDate(item.dateDebut.V);
    this.to = readPronoteApiDate(item.dateFin.V);
    this.justified = item.justifie;
    this.opened = item.ouverte;
    this.hoursMissed = parseInt(item.NbrHeures.split("h")[0]);
    this.minutesMissed = parseInt(item.NbrHeures.split("h")[1]);
    this.daysMissedInReport = item.NbrJours;
    this.shouldParentsJustify = item.aJustifierParParents;
    this.administrativelyFixed = item.reglee;
    this.isReasonUnknown = item.estMotifNonEncoreConnu;
    this.reason = !this.isReasonUnknown ? item.listeMotifs.V[0].L : null;
  }
}
