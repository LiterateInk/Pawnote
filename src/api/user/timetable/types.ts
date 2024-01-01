import type { PronoteApiFunctions } from "../../../constants/functions";
import type { PronoteApiOnglets } from "../../../constants/onglets";
import type { Session } from "../../../session";
import type { PronoteApiUserData } from "../data/types";
import type { PronoteApiResource } from "../../../constants/resources";

export interface PronoteApiUserTimetable {
  request: {
    donnees: {
      // If someone from Index-Education sees this, just why ?
      ressource: PronoteApiUserData["response"]["donnees"]["ressource"]
      Ressource: PronoteApiUserData["response"]["donnees"]["ressource"]
      numeroSemaine: number
      NumeroSemaine: number

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
        estRetenue?: boolean
        estSortiePedagogique?: boolean
        dispenseEleve?: boolean
        Statut?: string
        memo?: string

        listeVisios?: {
          V: Array<{ url: string }>
        }

        DateDuCours: {
          _T: 7
          V: string
        }

        DateDuCoursFin?: {
          _T: 7
          V: string
        }

        CouleurFond?: string

        ListeContenus: {
          _T: 24
          V: Array<{ L: string } & (
            | {
              G: PronoteApiResource.Matiere
              N: string
              estServiceGroupe?: boolean
            }
            | {
              G: PronoteApiResource.Salle
              N: string
            }
            | {
              G: PronoteApiResource.Groupe
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

        cahierDeTextes?: {
          V: {
            estDevoir?: boolean
          }
        }
      }>
    }
  }
}

export interface ApiUserTimetable {
  input: {
    weekNumber: number
    session: Session
    resource: PronoteApiUserData["response"]["donnees"]["ressource"]
  }

  output: {
    data: PronoteApiUserTimetable["response"]
  }
}