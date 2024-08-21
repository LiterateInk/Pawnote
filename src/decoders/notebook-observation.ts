import type { NotebookObservation, Subject } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeSubject } from "./subject";

export const decodeNotebookObservation = (observation: any): NotebookObservation => {
  let subject: Subject | undefined;

  if ("L" in observation.matiere.V && observation.matiere.V.N !== "0") {
    subject = decodeSubject(observation.matiere.V);
  }

  return {
    id: observation.N,
    date: decodePronoteDate(observation.date.V),

    opened: observation.estLue,
    shouldParentsJustify: observation.avecARObservation,

    sectionName: observation.L,
    sectionKind: observation.genreObservation,
    sectionID: observation.rubrique.V.N,

    subject,
    reason: observation.commentaire
  };
};
