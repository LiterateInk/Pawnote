import type { NotebookPrecautionaryMeasure, SessionHandle } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeAttachment } from "./attachment";
import { decodeDomain } from "./domain";

export const decodeNotebookPrecautionaryMeasure = (item: any, session: SessionHandle): NotebookPrecautionaryMeasure => {
  return {
    id: item.N,
    title: item.nature.V.L,
    comments: item.commentaire,
    reasons: item.listeMotifs.V.map((motif: any) => motif.L),

    exclusion: item.estUneExclusion,

    circumstances: item.circonstances,
    circumstancesDocuments: item.documentsCirconstances.V.map((document: any) => decodeAttachment(document, session)),

    decisionMaker: item.decideur.V.L,
    giver: item.demandeur.V.L,
    dateGiven: decodePronoteDate(item.dateDemande.V),
    startDate: decodePronoteDate(item.dateDebut.V),
    endDate: decodePronoteDate(item.dateFin.V),
    disallowedAccesses: decodeDomain(item.interditAcces.V)
  };
};
