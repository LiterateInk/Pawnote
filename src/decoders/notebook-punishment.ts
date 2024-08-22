import type { NotebookPunishment, SessionHandle } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeAttachment } from "./attachment";

export const decodeNotebookPunishment = (punishment: any, session: SessionHandle): NotebookPunishment => {
  return {
    id: punishment.N,
    title: punishment.nature.V.L,
    reasons: punishment.listeMotifs.V.map((motif: any) => motif.L),

    exclusion: punishment.estUneExclusion,
    isDuringLesson: !punishment.horsCours,

    workToDo: punishment.travailAFaire,
    workToDoDocuments: punishment.documentsTAF.V.map((document: any) => decodeAttachment(document, session)),

    circumstances: punishment.circonstances,
    circumstancesDocuments: punishment.documentsCirconstances.V.map((document: any) => decodeAttachment(document, session)),

    giver: punishment.demandeur.V.L,
    dateGiven: decodePronoteDate(punishment.dateDemande.V),

    durationMinutes: punishment.duree
  };
};
