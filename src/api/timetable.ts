import { TabLocation, type SessionHandle, type Timetable } from "~/models";
import { propertyCaseInsensitive } from "./private/property-case-insensitive";
import { RequestFN } from "~/core/request-function";
import { encodeUserResource } from "~/encoders/user-resource";
import { decodeTimetable } from "~/decoders/timetable";
import { encodePronoteDate } from "~/encoders/pronote-date";

const timetable = async (session: SessionHandle, index: number, additional = {}): Promise<Timetable> => {
  const request = new RequestFN(session, "PageEmploiDuTemps", {
    _Signature_: { onglet: TabLocation.Timetable },

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

      ...propertyCaseInsensitive("ressource", encodeUserResource(session.user.resources[index])),
      ...additional
    }
  });

  const response = await request.send();
  return decodeTimetable(response.data.donnees, session);
};

export const timetableFromWeek = async (session: SessionHandle, weekNumber: number, index = 0): Promise<Timetable> => {
  return timetable(session, index, propertyCaseInsensitive("numeroSemaine", weekNumber));
};

export const timetableFromIntervals = async (session: SessionHandle, startDate: Date, endDate?: Date, index = 0): Promise<Timetable> => {
  return timetable(session, index, {
    ...propertyCaseInsensitive("dateDebut", {
      _T: 7,
      V: encodePronoteDate(startDate)
    }),

    ...(endDate && propertyCaseInsensitive("dateFin", {
      _T: 7,
      V: encodePronoteDate(endDate)
    }))
  });
};
