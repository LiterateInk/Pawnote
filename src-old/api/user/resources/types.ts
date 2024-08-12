import type { PronoteValue } from "~/api/type";
import type { PronoteApiAttachment } from "~/constants/attachments";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiLessonContentCategory } from "~/constants/lessonCategory";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiThemesList } from "~/constants/themes";
import type { Session } from "~/session";

export interface PronoteApiUserResources {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Resources
    }

    donnees: {
      /** You put the week(s) you want to get between the brackets. */
      domaine: PronoteValue<8, `[${number}..${number}]` | `[${number}]`>
    }
  }

  response: {
    nom: PronoteApiFunctions.Resources
    donnees: {
      ListeCahierDeTextes: PronoteValue<24, Array<{
        /** ID */
        N: string

        /** Contains the lesson ID in timetable. */
        cours: PronoteValue<24, {
          /** ID of the lesson in timetable. */
          N: string
        }>

        // TODO: Not sure what this do.
        verrouille: boolean

        /** Groups that are assigned to this lesson. */
        listeGroupes: PronoteValue<24, Array<{
          /**
           * Name of the group
           * @example "5ACC HIGR.2"
           */
          L: string
          /** ID */
          N: string
        }>>

        /** Subject of the lesson. */
        Matiere: PronoteValue<24, {
          /**
           * Name of the subject.
           * @example "HISTOIRE-GÉOGRAPHIE"
           */
          L: string
          /** ID */
          N: string
        }>

        /** Color in HEX of the subject in Pronote. */
        CouleurFond: string

        listeProfesseurs: PronoteValue<24, Array<{
          /** Name of the teacher. */
          L: string
          /** ID of the teacher. */
          N: string
        }>>

        /**
         * When the lesson starts.
         * @example "26/01/2024 08:00:00"
         */
        Date: PronoteValue<7, string>

        /**
         * When the lesson ends.
         * @example "26/01/2024 09:00:00"
         */
        DateFin: PronoteValue<7, string>

        /**
         * If there's an homework related, this is the date it should be given.
         * @example "30/01/2024"
         */
        dateTAF?: PronoteValue<7, string>

        /** Contents of the lesson. */
        listeContenus: PronoteValue<24, Array<{
          /** Name of the content. */
          L: string
          /** ID of the content. */
          N: string

          /** HTML string containing the formatted description. */
          descriptif: PronoteValue<21, string>

          /** Category given to the content. */
          categorie: PronoteValue<24, (
            | {
              N: "0"
              G: PronoteApiLessonContentCategory.NONE
            }
            | {
              /**
               * Name of the category.
               *
               * @example
               * "Cours" // Only if `.G === PronoteApiLessonContentCategory.LESSON`
               * "AP" // Only if `.G === PronoteApiLessonContentCategory.AP`
               * // etc... you got it !
               */
              L: string
              /** ID */
              N: string
              /** Type, excluding the `NONE` one we checked in the union before. */
              G: Exclude<PronoteApiLessonContentCategory, PronoteApiLessonContentCategory.NONE>
            }
          )>

          /** Themes associated with the lesson. */
          ListeThemes: PronoteApiThemesList

          /** @example "Uniquement les thèmes associés aux matières du contenu" */
          libelleCBTheme: string

          /** `-1` when not defined. */
          parcoursEducatif: number

          /** Potential attached files or links. */
          ListePieceJointe: PronoteValue<24, Array<PronoteApiAttachment & {
            estUnLienInterne: boolean
          }>>

          training: PronoteValue<24, {
            // TODO: Find what are QCM made of.
            ListeExecutionsQCM: Array<unknown>
          }>
        }>>

        // TODO: Find out what this do ?
        listeElementsProgrammeCDT: PronoteValue<24, Array<unknown>>
      }>>

      ListeRessourcesPedagogiques: {
        _T: 24
        V: {
          listeRessources: {
            _T: 24
            V: Array<{
              G: number
              ressource: {
                _T: number
                V: {
                  L: string
                  N: string
                  G: number
                  commentaire: string
                }
              }
              listePeriodesNotation: {
                _T: number
                V: Array<{
                  N: string
                }>
              }
              ListeThemes: {
                _T: number
                V: Array<{
                  L: string
                  N: string
                  Matiere: {
                    _T: number
                    V: {
                      L: string
                      N: string
                    }
                  }
                }>
              }
              date: {
                _T: number
                V: string
              }
              matiere: {
                _T: number
                V: {
                  N: string
                }
              }
            }>
          }
          listeMatieres: {
            _T: number
            V: Array<{
              L: string
              N: string
              G: number
              couleur: string
            }>
          }
        }
      }
      ListeRessourcesNumeriques: {
        _T: 24
        V: {}
      }
    }
  }
}

export interface ApiUserResources {
  input: {
    session: Session

    fromWeekNumber: number
    toWeekNumber?: number
  }

  output: {
    data: PronoteApiUserResources["response"]
  }
}
