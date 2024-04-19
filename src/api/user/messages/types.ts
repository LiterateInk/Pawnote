import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";
import type { PronoteApiMessagesPossessionsList, PronoteApiMessagesButtonType, PronoteApiSentMessage, PronoteApiTransferredMessage } from "~/constants/messages";

export interface PronoteApiUserMessages {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      listePossessionsMessages: PronoteApiMessagesPossessionsList
      marquerCommeLu: boolean
      nbMessagesVus: number
    }
  }

  response: {
    donnees: {
      listeMessages: PronoteValue<24, Array<PronoteApiSentMessage | PronoteApiTransferredMessage>>

      messagePourReponse: PronoteValue<24, {
        N: string
        G: number
        nbDestinataires: number
      }>

      listeBoutons: PronoteValue<24, Array<{
        G: PronoteApiMessagesButtonType
        L: string
      }>>

      brouillon?: PronoteValue<24, {
        N: string
        contenu: PronoteValue<21, string>
        estHTML: boolean
      }>

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
    limit: number
    possessions: PronoteApiMessagesPossessionsList
  }

  output: {
    data: PronoteApiUserMessages["response"]
  }
}
