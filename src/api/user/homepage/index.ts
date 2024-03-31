import type { PronoteApiUserHomepage, ApiUserHomepage } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { transformDateToPronoteString } from "~/pronote/dates";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserHomepage = makeApiHandler<ApiUserHomepage>(async (fetcher, input) => {
  const nextDateOpened = transformDateToPronoteString(input.nextDateOpened);

  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserHomepage["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.Presence
    },

    donnees: {
      avecConseilDeClasse: true,

      dateGrille: {
        _T: 7,
        V: nextDateOpened
      },

      numeroSemaine: input.weekNumber,

      coursNonAssures: {
        numeroSemaine: input.weekNumber
      },

      personnelsAbsents: {
        numeroSemaine: input.weekNumber
      },

      incidents: {
        numeroSemaine: input.weekNumber
      },

      exclusions: {
        numeroSemaine: input.weekNumber
      },

      donneesVS: {
        numeroSemaine: input.weekNumber
      },

      registreAppel: {
        date: {
          _T: 7,
          V: nextDateOpened
        }
      },

      previsionnelAbsServiceAnnexe: {
        date: {
          _T: 7,
          V: nextDateOpened
        }
      },

      donneesProfs: {
        numeroSemaine: input.weekNumber
      },

      EDT: {
        numeroSemaine: input.weekNumber
      },

      menuDeLaCantine: {
        date: {
          _T: 7,
          V: nextDateOpened
        }
      },

      TAFARendre: {
        date: {
          _T: 7,
          V: nextDateOpened
        }
      },

      TAFEtActivites: {
        date: {
          _T: 7,
          V: nextDateOpened
        }
      },

      partenaireCDI: {
        CDI: {}
      },

      tableauDeBord: {
        date: {
          _T: 7,
          V: nextDateOpened
        }
      }
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.HomePage, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserHomepage["response"]>(response.payload);
  return { data: received };
});
