import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiResourceType } from "~/constants/resources";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserData } from "~/api";
import type { Session } from "~/session";
import type { PronoteValue } from "~/api/type";

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
              G: PronoteApiResourceType.Subject
              N: string
              estServiceGroupe?: boolean
            }
            | {
              G: PronoteApiResourceType.Room
              N: string
            }
            | {
              G: PronoteApiResourceType.Groupe
            }
            | {
              G: PronoteApiResourceType.Teacher
            }
          )>
        }

        N: string
        P: number
        G: number

        AvecTafPublie: boolean

        /**
         * Defined if `AvecCdT` is `true`.
         * Contains the ID of the item in the `PronoteApiUserResources.ListeCahierDeTextes` array.
         */
        cahierDeTextes?: PronoteValue<24, {
          /** ID in `ListeCahierDeTextes` from `PronoteApiUserResources` response. */
          N: string
          // TODO: Check if this really happens.
          estDevoir?: boolean
        }>

        /**
         * Defined and `true` when something has been
         * written on this lesson in the "content and resources" page.
         *
         * ---
         *
         * `AvecCdT` means _**Avec Cahier de Textes**_, which is the same naming
         * used in responses inside [`PronoteApiUserResources`](../resources/types.ts): `ListeCahierDeTextes`
         */
        AvecCdT?: boolean
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
