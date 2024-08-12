import type Pronote from "~/client/Pronote";

import type {
  PronoteApiAttendanceAbsence,
  PronoteApiAttendanceDelay,
  PronoteApiAttendancePunishment,
  PronoteApiAttendanceObservation,
  PronoteApiAttendanceObservationType,
  PronoteApiAttendancePrecautionaryMeasure,
  PronoteApiAttendancePrecautionaryMeasureDisallowedType
} from "~/constants/attendance";

import { StudentAttachment } from "~/parser/attachment";
import { StudentSubject } from "~/parser/subject";

import { readPronoteApiDate } from "~/pronote/dates";
import { parseSelection } from "~/pronote/select";

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
  public title: string;
  public reasons: string[];

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
    this.title = item.nature.V.L;
    this.reasons = item.listeMotifs.V.map((motif) => motif.L);

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

export class StudentPrecautionaryMeasure {
  public id: string;
  public title: string;
  public comments: string;
  public reasons: string[];

  public exclusion: boolean;

  public circumstances: string;
  public circumstancesDocuments: Array<StudentAttachment>;

  public decisionMaker: string;
  public giver: string;
  public dateGiven: Date;
  public from: Date;
  public to: Date;
  public disallowedAccesses: PronoteApiAttendancePrecautionaryMeasureDisallowedType[];

  constructor (client: Pronote, item: PronoteApiAttendancePrecautionaryMeasure) {
    this.id = item.N;
    this.title = item.nature.V.L;
    this.comments = item.commentaire;
    this.reasons = item.listeMotifs.V.map((motif) => motif.L);

    this.exclusion = item.estUneExclusion;

    this.circumstances = item.circonstances;
    this.circumstancesDocuments = item.documentsCirconstances.V.map((document) => new StudentAttachment(client, document));

    this.decisionMaker = item.decideur.V.L;
    this.giver = item.demandeur.V.L;
    this.dateGiven = readPronoteApiDate(item.dateDemande.V);
    this.from = readPronoteApiDate(item.dateDebut.V);
    this.to = readPronoteApiDate(item.dateFin.V);
    this.disallowedAccesses = parseSelection(item.interditAcces.V);
  }
}

export class StudentAbsence {
  public id: string;
  public from: Date;
  public to: Date;
  public justified: boolean;
  public opened: boolean;

  public hoursMissed: number;
  public minutesMissed: number;
  public daysMissedInReport: number;

  public shouldParentsJustify: boolean;
  public administrativelyFixed: boolean;

  public isReasonUnknown: boolean;
  public reason?: string;

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
    this.reason = !this.isReasonUnknown ? item.listeMotifs.V[0].L : void 0;
  }
}

export class StudentObservation {
  public id: string;
  public opened: boolean;
  public date: Date;
  public shouldParentsJustify: boolean;

  public section: {
    /**
     * ID of the observation section.
     *
     * Might be useful when you're looking for the same
     * observation section when going through an `StudentObservation` array.
     */
    id: string
    name: string
    type: PronoteApiAttendanceObservationType
  };

  public subject?: StudentSubject;
  public reason?: string;

  constructor (item: PronoteApiAttendanceObservation) {
    this.id = item.N;
    this.opened = item.estLue;
    this.date = readPronoteApiDate(item.date.V);
    this.shouldParentsJustify = item.avecARObservation;

    this.section = {
      name: item.L,
      type: item.genreObservation,
      id: item.rubrique.V.N
    };

    // Check if subject is correctly given, before assigning one.
    if ("L" in item.matiere.V && item.matiere.V.N !== "0") {
      this.subject = new StudentSubject(item.matiere.V);
    }

    // Only assign reason if it is not empty.
    if (item.commentaire) {
      this.reason = item.commentaire;
    }
  }
}
