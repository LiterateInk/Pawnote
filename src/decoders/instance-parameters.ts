import type { InstanceParameters } from "~/models/instance-parameters";
import { decodePronoteDate } from "./pronote-date";

export const decodeInstanceParameters = (parameters: any): InstanceParameters => {
  return {
    nextBusinessDay: decodePronoteDate(parameters.General.JourOuvre.V),
    firstMonday: decodePronoteDate(parameters.General.PremierLundi.V),
    firstDate: decodePronoteDate(parameters.General.PremiereDate.V),
    lastDate: decodePronoteDate(parameters.General.DerniereDate.V),

    periods: [],
    holidays: [],
    weekFrequencies: []
  };
};
