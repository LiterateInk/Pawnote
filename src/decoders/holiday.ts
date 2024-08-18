import type { Holiday } from "~/models";
import { decodePronoteDate } from "./pronote-date";

export const decodeHoliday = (holiday: any): Holiday => {
  return {
    id: holiday.N,
    name: holiday.L,
    startDate: decodePronoteDate(holiday.dateDebut.V),
    endDate: decodePronoteDate(holiday.dateFin.V)
  };
};
