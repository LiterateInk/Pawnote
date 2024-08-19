import { RequestFN } from "~/core/request-function";
import { encodePronoteDate } from "~/encoders/pronote-date";
import { type SessionHandle } from "~/models";
import { translateToWeekNumber } from "./helpers/week-number";
import { decodeHomepage } from "~/decoders/homepage";
import type { Homepage } from "~/models/homepage";

/**
 * Retrieve data from the homepage for the given session.
 */
export const homepage = async (session: SessionHandle, day = session.instance.nextBusinessDay): Promise<Homepage> => {
  const weekNumber = translateToWeekNumber(day, session.instance.firstMonday);
  const next = encodePronoteDate(day);

  const request = new RequestFN(session, "PageAccueil", {
    _Signature_: {
      onglet: 7 // = Presence
    },

    donnees: {
      avecConseilDeClasse: true,

      dateGrille: {
        _T: 7,
        V: next
      },

      numeroSemaine: weekNumber,

      coursNonAssures: {
        numeroSemaine: weekNumber
      },

      personnelsAbsents: {
        numeroSemaine: weekNumber
      },

      incidents: {
        numeroSemaine: weekNumber
      },

      exclusions: {
        numeroSemaine: weekNumber
      },

      donneesVS: {
        numeroSemaine: weekNumber
      },

      registreAppel: {
        date: {
          _T: 7,
          V: next
        }
      },

      previsionnelAbsServiceAnnexe: {
        date: {
          _T: 7,
          V: next
        }
      },

      donneesProfs: {
        numeroSemaine: weekNumber
      },

      EDT: {
        numeroSemaine: weekNumber
      },

      menuDeLaCantine: {
        date: {
          _T: 7,
          V: next
        }
      },

      TAFARendre: {
        date: {
          _T: 7,
          V: next
        }
      },

      TAFEtActivites: {
        date: {
          _T: 7,
          V: next
        }
      },

      partenaireCDI: {
        CDI: {}
      },

      tableauDeBord: {
        date: {
          _T: 7,
          V: next
        }
      },

      modificationsEDT: {
        date: {
          _T: 7,
          V: next
        }
      }
    }
  });

  const response = await request.send();
  return decodeHomepage(response.data.donnees);
};
