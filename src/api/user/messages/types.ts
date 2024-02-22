import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";
import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";
import type { PronoteApiAttachment } from "~/constants/attachments";

export interface PronoteApiUserMessages {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      listePossessionsMessages: PronoteApiMessagesPossessionsList
      marquerCommeLu: boolean
    }
  }

  response: {
    donnees: {
      listeMessages: PronoteValue<24, Array<{
        N: string

        messageSource: PronoteValue<24, {
          N: string
        }>

        possessionMessage: PronoteValue<24, {
          N: string
        }>

        /** NOTE: No idea what this is. */
        estNonPossede: boolean

        /**
         * Another format of date, why ?
         * @example "ven. 16/02/24 13h35"
         */
        libelleDate: string

        /** @example "16/02/2024 13:35:11" */
        date: PronoteValue<7, string>

        listeDocumentsJoints?: PronoteValue<24, Array<PronoteApiAttachment>>

        /**
         * You're the one who sent the message.
         */
        emetteur: boolean

        /**
         * The one sending the message.
         * @example "Moi" // in this case, `message.emetteur === true`
         */
        public_gauche: string

        /**
         * The one receiving the message.
         * Can be undefined when sending to a lot of people at the same time.
         * When this happens, you can see how much people received the message in `nbPublic`.
         * @example "John D."
         */
        public_droite?: string

        /**
         * @example "Professeur"
         */
        hint_droite?: string

        /**
         * @example "Professeur"
         */
        hint_gauche: string

        estUnAparte: boolean
        /** Shows all the recipients the message was sent to. */
        nbPublic?: number
      } & (
        | {
          contenu: string
          estHTML: false
        }
        | {
          contenu: PronoteValue<number, string>;
          estHTML: true
        }
      )>>

      messagePourReponse: PronoteValue<24, {
        N: string
        G: number
        nbDestinataires: number
      }>

      listeBoutons: PronoteValue<24, Array<{
        G: number
        L: string
      }>>

      /** Is defined only when `marquerCommeLu` is set to `true` in the payload. */
      nbMarquerLu?: number
      nbPossessionsMessage: number
    }

    nom: PronoteApiFunctions.Messages
  }
}

export interface ApiUserMessages {
  input: {
    session: Session
    markAsRead: boolean
    possessions: PronoteApiMessagesPossessionsList
  }

  output: {
    data: PronoteApiUserMessages["response"]
  }
}
