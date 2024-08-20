import type { NotebookDelay } from "~/models/notebook-delay";
import { decodePronoteDate } from "./pronote-date";

export const decodeNotebookDelay = (delay: any): NotebookDelay => {
  const isReasonUnknown = delay.estMotifNonEncoreConnu;
  const justified = delay.justifie;

  return {
    id: delay.N,
    date: decodePronoteDate(delay.date.V),
    minutes: delay.duree,
    justified,
    justification: justified && delay.justification,
    shouldParentsJustify: delay.aJustifierParParents,
    administrativelyFixed: delay.reglee,
    isReasonUnknown,
    reason: !isReasonUnknown && delay.listeMotifs.V[0].L
  };
};
