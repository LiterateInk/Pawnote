import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiResourceType } from "~/constants/resources";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserData } from "~/api";
import type { Session } from "~/session";
import type { PronoteValue } from "~/api/type";
import { PronoteApiHTTPType } from "~/constants/http";
import { PronoteApiLessonStatusType } from "~/constants/lessonCategory";

export interface PronoteApiUserTimetable {
  request: {
    donnees: {
      // If someone from Index-Education sees this, just why ?
      ressource: PronoteApiUserData["response"]["donnees"]["ressource"]
      Ressource: PronoteApiUserData["response"]["donnees"]["ressource"]

      numeroSemaine?: number
      NumeroSemaine?: number

      DateDebut?: PronoteValue<PronoteApiHTTPType.DateTime, string>
      dateDebut?: PronoteValue<PronoteApiHTTPType.DateTime, string>
      DateFin?: PronoteValue<PronoteApiHTTPType.DateTime, string>
      dateFin?: PronoteValue<PronoteApiHTTPType.DateTime, string>

      avecAbsencesEleve: boolean
      avecAbsencesRessource: boolean
      avecConseilDeClasse: boolean
      avecCoursSortiePeda: boolean
      avecDisponibilites: boolean
      avecInfosPrefsGrille: boolean
      avecRetenuesEleve: boolean
      avecRessourcesLibrePiedHoraire: boolean

      estEDTAnnuel: boolean
      estEDTPermanence: boolean

      edt: {
        G: 16
        L: "Emploi du temps"
      }
    }

    _Signature_: {
      onglet: PronoteApiOnglets.Timetable
    }
  }

  response: {
    nom: PronoteApiFunctions.Timetable
    donnees: {
      ParametreExportiCal?: string
      avecExportICal?: boolean
      avecCoursAnnule: boolean

      premierePlaceHebdoDuJour: number
      debutDemiPensionHebdo: number
      finDemiPensionHebdo: number

      prefsGrille: {
        genreRessource: number
      }

      absences: {
        listeAbsences: PronoteValue<PronoteApiHTTPType.Element, []>
        listeRetards: PronoteValue<PronoteApiHTTPType.Element, []>
        listePunitions: PronoteValue<PronoteApiHTTPType.Element, []>
        listeInfirmeries: PronoteValue<PronoteApiHTTPType.Element, []>

        joursCycle: PronoteValue<PronoteApiHTTPType.Element, Array<{
          jourCycle: number
          numeroSemaine: number

          exclusionsEtab?: {
            placeDebut: number
            placeFin: number
            /** Whether it is a "mesure conservatoire" or not. */
            MC: boolean
          }
        }>>
      }

      recreations: PronoteValue<PronoteApiHTTPType.Element, Array<{
        L: string
        place: number
      }>>

      ListeCours: Array<{
        N: string
        estRetenue?: undefined
        estSortiePedagogique?: false

        place: number
        duree: number

        /** Whether the lesson is canceled or not. */
        estAnnule?: boolean
        estPermanence?: boolean
        dispenseEleve?: boolean
        Statut?: string
        memo?: string

        listeVisios?: {
          V: Array<{ url: string }>
        }

        DateDuCours: PronoteValue<PronoteApiHTTPType.DateTime, string>
        DateDuCoursFin?: PronoteValue<PronoteApiHTTPType.DateTime, string>

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
              G: PronoteApiResourceType.Group
            }
            | {
              G: PronoteApiResourceType.Teacher
            }
            | {
              G: PronoteApiResourceType.Personal
            }
          )>
        }

        P: number
        G: PronoteApiLessonStatusType

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
      } | {
        N: string
        estRetenue?: undefined
        estSortiePedagogique: true

        /**
         * Background color for the subject, in HEX format.
         * @example "#ffffff"
         */
        CouleurFond: string
        DateDuCours: PronoteValue<PronoteApiHTTPType.DateTime, string>

        // NOTE: Those four properties are useless, right ?
        // Let me explain :
        // - `DateDuCours` is literally better than `strDateDebut` ;
        // - `strDateFin` can be calculated using `place` and `duree` ;
        // - `placeReelle`, `dureeReelle` and `numeroSemaine` are totally useless.
        placeReelle: number
        dureeReelle: number
        strDateDebut: string
        strDateFin?: string
        numeroSemaine: number

        /**
         * Educational activity title, name or description.
         * @example "Sortie pédagogique"
         */
        motif: string

        /**
         * Array of the names of the teachers who are going to the outing.
         * @example ["LACAZE H.", "FAVIER É."]
         */
        accompagnateurs: string[]

        // NOTE: No idea where this comes from.
        // Even though a check for it is in the website source code, so it might be somewhere ?
        pourAcc?: boolean

        /**
         * Type of the ressource given in `strRess`.
         * @example "Classe"
         */
        strGenreRess: string // can be "Classe"

        /**
         * Resource.
         * @example "5D" // where `5D` is a ressource from type "Classe".
         */
        strRess: string

        place: number
        duree: number
        memo?: string
      } | {
        N: string
        estRetenue: "eleve"
        estSortiePedagogique?: false

        DateDuCours: PronoteValue<PronoteApiHTTPType.DateTime, string>
        ListeContenus: PronoteValue<PronoteApiHTTPType.Element, Array<{ L: string } & (
          | {
            estHoraire: boolean
          }
          | {
            G: PronoteApiResourceType.Room
          }
          | {
            G: PronoteApiResourceType.Teacher
          }
          | {
            G: PronoteApiResourceType.Personal
          }
        )>>

        hintRealise: "Programmée"
        imgRealise: "RealiseProgramme"

        numeroSemaine: number
        place: number
        duree: number
      }>
    }
  }
}

export interface ApiUserTimetable {
  input: {
    session: Session
    resource: PronoteApiUserData["response"]["donnees"]["ressource"]
  } & (
    | {
      /** Should be transformed using `transformDateToPronoteString` method. */
      startPronoteDate: string
      /** Should be transformed using `transformDateToPronoteString` method. */
      endPronoteDate?: string
    }
    | {
      weekNumber: number
    }
  )

  output: {
    data: PronoteApiUserTimetable["response"]
  }
}
