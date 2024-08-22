import type { Period } from "~/models";
import { decodePronoteDate } from "./pronote-date";

export const decodePeriod = (period: any): Period => {
  return {
    id: period.N,
    kind: period.G,
    name: period.L,

    startDate: decodePronoteDate(period.dateDebut.V),
    endDate: decodePronoteDate(period.dateFin.V)
  };
};
