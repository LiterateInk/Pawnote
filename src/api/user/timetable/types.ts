import type { PronoteApiFunctions } from "../../../constants/functions";
import type { PronoteApiOnglets } from "../../../constants/onglets";
import type { Session } from "../../../session";
import type { PronoteApiUserData } from "../data/types";
import type { PronoteApiResource } from "../../../constants/resources";

export interface PronoteApiUserTimetable {
  request: {
    donnees: {
      ressource: PronoteApiUserData["response"]["donnees"]["ressource"]
      // Why another one ? Not sure, some instances need it all in lowercase,
      // others need the first letter in uppercase...
      Ressource: PronoteApiUserData["response"]["donnees"]["ressource"]

      NumeroSemaine: number
      numeroSemaine: number

      avecAbsencesEleve: boolean
      avecAbsencesRessource: boolean
      avecConseilDeClasse: boolean
      avecCoursSortiePeda: boolean
      avecDisponibilites: boolean
      avecInfosPrefsGrille: boolean
      avecRessourcesLibrePiedHoraire: boolean
      estEDTPermanence: boolean
    }

    _Signature_: {
      onglet: PronoteApiOnglets.Timetable
    }
  }

  response: {
    nom: PronoteApiFunctions.Timetable
    donnees: {
      ParametreExportiCal: string
      avecExportICal: boolean

      avecCoursAnnule: boolean
      debutDemiPensionHebdo: number
      finDemiPensionHebdo: number

      prefsGrille: {
        genreRessource: number
      }

      absences: {
        joursCycle: {
          _T: 24
          V: Array<{
            jourCycle: number
            numeroSemaine: number
          }>
        }
      }

      recreations: {
        _T: 24
        V: Array<{
          L: string
          place: number
        }>
      }

      ListeCours: Array<{
        place: number
        duree: number

        /** Whether the lesson is canceled or not. */
        estAnnule?: boolean
        Statut?: string

        DateDuCours: {
          _T: 7
          V: string
        }

        CouleurFond: string
        ListeContenus: {
          _T: 24
          V: Array<{ L: string } & (
            | {
              G: PronoteApiResource.Matiere
              N: string
            }
            | {
              G: PronoteApiResource.Salle
              N: string
            }
            | {
              G: PronoteApiResource.Enseignant
            }
          )>
        }

        N: string
        P: number
        G: number

        AvecTafPublie: boolean
      }>
    }
  }
}

export interface ApiUserTimetable {
  input: {
    week: number
    session: Session
    resource: PronoteApiUserData["response"]["donnees"]["ressource"]
  }

  output: {
    data: PronoteApiUserTimetable["response"]
  }
}