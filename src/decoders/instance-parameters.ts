import type { InstanceParameters, WeekFrequency } from "~/models";
import { decodePronoteDate } from "./pronote-date";
import { decodeDomain } from "./domain";

export const decodeInstanceParameters = (parameters: any): InstanceParameters => {
  const weekFrequencies = new Map<number, WeekFrequency>();

  // 62 is the PRONOTE API max domain cycle.
  for (let weekNumber = 1; weekNumber <= 62; weekNumber++) {
    for (const fortnight of [1, 2]) {
      const frequency = decodeDomain(parameters.General.DomainesFrequences[fortnight].V);

      if (frequency.includes(weekNumber)) {
        weekFrequencies.set(weekNumber, {
          label: parameters.General.LibellesFrequences[fortnight],
          fortnight
        });
      }
    }
  }

  return {
    nextBusinessDay: decodePronoteDate(parameters.General.JourOuvre.V),
    firstMonday: decodePronoteDate(parameters.General.PremierLundi.V),
    firstDate: decodePronoteDate(parameters.General.PremiereDate.V),
    lastDate: decodePronoteDate(parameters.General.DerniereDate.V),

    periods: [],
    holidays: [],
    weekFrequencies
  };
};
