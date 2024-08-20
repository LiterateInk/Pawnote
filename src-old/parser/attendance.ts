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
