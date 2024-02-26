import type { PronoteValue } from "~/api/type";
import type { PronoteApiAttachment } from "~/constants/attachments";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiNewsQuestionType } from "~/constants/news";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserNews {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.News
    }
    donnees: {
      modesAffActus: {
        _T: 26
        V: "[0]" // TODO: See <PronoteApiNewsViewType>
      }
    }
  }

  response: {
    nom: PronoteApiFunctions.News
    donnees: {
      listeCategories: PronoteValue<24, Array<{
        N: string

        /**
         * Name of the category
         * @example "Divers"
         */
        L: string

        /**
         * Whether this category is the default selected in the UI.
         */
        estDefaut?: boolean
      }>>

      listeModesAff: Array<{
        G: number
        listeActualites: {
          _T: 24
          V: Array<{
            N: string

            /**
             * Title of the news.
             * @example "Coucou tout le monde !"
             */
            L?: string

            /**
             * Whether your response is anonymous or not.
             */
            reponseAnonyme: boolean

            /**
             * Whether this news is actually a news or not.
             */
            estInformation: boolean

            /**
             * Whether this news is actually a survey or not.
             */
            estSondage: boolean

            /**
             * Category this news belongs to.
             */
            categorie: PronoteValue<24, {
              /**
               * Name of the category
               * @example "Divers"
               */
              L: string

              /**
               * ID of the category, can be paired
               * with the array given in `listeCategories`.
               */
              N: string
            }>

            /**
             * Whether this news have been read or not.
             */
            lue: boolean

            /**
             * Date this news should be displayed.
             * @example "15/02/2024"
             */
            dateDebut: PronoteValue<7, string>

            /**
             * Date this news should be stopped from being displayed.
             * @example "06/07/2024"
             */
            dateFin: PronoteValue<7, string>

            /**
             * TODO: Not sure what this does.
             */
            estProlonge: boolean

            /**
             * Full date this news was created.
             * @example "15/02/2024 23:09:10" // in the server timezone
             */
            dateCreation: PronoteValue<7, string>

            /**
             * Full name of the author of this news.
             * @example "John D."
             */
            auteur: string

            /**
             * Whether you are the author of this news.
             */
            estAuteur: boolean

            /**
             * More information about the author ?
             * TODO: Find out for why this is needed ?
             */
            elmauteur: PronoteValue<24, {
              /**
               * Full name of the author of this news.
               * @example "John D."
               */
              L: string
              N: string
              /**
               * TODO: Not sure what this is.
               */
              G: number
            }>

            /** Student's first name. */
            prenom: string

            /**
             * Student's more info ?
             * TODO: Find why this is needed.
             */
            public: PronoteValue<24, {
              L: string
              N: string
              G: number
              P: number
            }>

            genrePublic: number

            listeQuestions: PronoteValue<24, Array<{
              /**
               * Full title with index in front.
               * @example "Q 1 : Multiples"
               */
              L: string
              N: string
              P: number

              /**
               * Position of the question in the list.
               * Should be displayed in this order.
               */
              rang: number

              genreReponse: PronoteApiNewsQuestionType

              /**
               * Question's title.
               * @example "Multiples"
               */
              titre: string

              /**
               * Raw HTML containing the question's
               * content. This is not sanitized.
               */
              texte: PronoteValue<21, string>
              tailleReponse: number
              avecMaximum: boolean
              nombreReponsesMax: number

              listePiecesJointes: PronoteValue<24, Array<PronoteApiAttachment>>

              listeChoix: PronoteValue<24, Array<{
                L: string
                N: string
                rang: number
                estReponseLibre?: boolean
              }>>

              reponse: PronoteValue<24, {
                N: string
                avecReponse: boolean
                estRepondant: boolean
                estReponseAttendue: boolean
                /** @example "23/02/2024 08:34:38" */
                reponduLe?: PronoteValue<7, string>

                strRepondant?: string

                valeurReponse?: string | {
                  _T: number
                  V: string
                }
              }>
            }>>
          }>
        }
      }>
    }
  }
}

export interface ApiUserNews {
  input: {
    session: Session
  }

  output: {
    data: PronoteApiUserNews["response"]
  }
}
