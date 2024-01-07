import type { ApiUserTimetable, PronoteApiUserTimetable } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserTimetable = makeApiHandler<ApiUserTimetable>(async (input) => {
  if (input.weekNumber <= 0) {
    throw new Error(`Invalid input on callApiUserTimetable, "weekNumber" should be a strictly positive number, got ${input.weekNumber}`);
  }

  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserTimetable["request"]>({
    donnees: {
      estEDTPermanence: false,
      avecAbsencesEleve: false,
      avecRessourcesLibrePiedHoraire: false,

      avecAbsencesRessource: true,
      avecInfosPrefsGrille: true,
      avecConseilDeClasse: true,
      avecCoursSortiePeda: true,
      avecDisponibilites: true,

      NumeroSemaine: input.weekNumber,
      numeroSemaine: input.weekNumber,

      Ressource: input.resource,
      ressource: input.resource
    },

    _Signature_: { onglet: PronoteApiOnglets.Timetable }
  });

  const response = await createPronoteAPICall(PronoteApiFunctions.Timetable, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserTimetable["response"]>(response.payload);
  return { data: received };
});
