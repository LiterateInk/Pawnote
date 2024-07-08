import type { ApiUserTimetable, PronoteApiUserTimetable } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserTimetable = makeApiHandler<ApiUserTimetable>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserTimetable["request"]>({
    donnees: {
      estEDTAnnuel: false,
      estEDTPermanence: false,

      avecAbsencesEleve: false,
      avecRessourcesLibrePiedHoraire: false,

      avecAbsencesRessource: true,
      avecInfosPrefsGrille: true,
      avecConseilDeClasse: true,
      avecCoursSortiePeda: true,
      avecDisponibilites: true,
      avecRetenuesEleve: true,

      edt: { G: 16, L: "Emploi du temps" },

      ...("weekNumber" in input ? {
        numeroSemaine: input.weekNumber,
        NumeroSemaine: input.weekNumber
      } : {
        DateDebut: {
          _T: 7,
          V: input.startPronoteDate
        },
        dateDebut: {
          _T: 7,
          V: input.startPronoteDate
        },

        ...(input.endPronoteDate && {
          DateFin: {
            _T: 7,
            V: input.endPronoteDate
          },
          dateFin: {
            _T: 7,
            V: input.endPronoteDate
          }
        })
      }),

      Ressource: input.resource,
      ressource: input.resource
    },

    _Signature_: { onglet: PronoteApiOnglets.Timetable }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Timetable, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserTimetable["response"]>(response.payload);
  return { data: received };
});
