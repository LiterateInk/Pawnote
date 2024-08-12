import { PronoteApiDiscussionCommandType } from "~/constants/discussion";
import type { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiMessagesButtonType } from "~/constants/messages";
import type { PronoteApiOnglets } from "~/constants/onglets";
import { PronoteApiStateType } from "~/constants/states";
import type { Session } from "~/session";

export interface PronoteApiUserDiscussionCommand {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      commande: PronoteApiDiscussionCommandType.corbeille | PronoteApiDiscussionCommandType.suppression | PronoteApiDiscussionCommandType.restauration
      listePossessionsMessages: Array<{ N: string }>
    } | {
      commande: PronoteApiDiscussionCommandType.brouillon

      brouillon: {
        N: number
        E: PronoteApiStateType.CREATION
      } | {
        N: string
        E: PronoteApiStateType.MODIFICATION
      }

      messagePourReponse: {
        N: string
        G: 0
      }

      objet: ""
      contenu: string

      // TODO: For other account types, maybe ?
      listeDestinataires: never[]
      listeFichiers: never[]
    } | {
      commande: ""
      bouton: {
        N: 0
        G: PronoteApiMessagesButtonType
      }
      brouillon: { N: string }
      messagePourReponse: {
        N: string
        G: 0
      }
      contenu: string
      listeDestinataires: never[]
      listeFichiers: never[]
    }
  }

  response: {
    donnees: {}
    RapportSaisie: {}
    nom: PronoteApiFunctions.CreateMessage
  }
}

export interface ApiUserDiscussionCommand {
  input: {
    session: Session
  } & ApiUserDiscussionAvailableCommands

  output: PronoteApiUserDiscussionCommand["response"]
}

export type ApiUserDiscussionAvailableCommands = (
  | {
    command: PronoteApiDiscussionCommandType.corbeille | PronoteApiDiscussionCommandType.suppression | PronoteApiDiscussionCommandType.restauration
    possessions: Array<{ N: string, E?: PronoteApiStateType.MODIFICATION }>
  }
  | {
    command: PronoteApiDiscussionCommandType.brouillon
    /**
     * - Give `string` to be in edition mode.
     * - Give `number` to be in creation mode.
     */
    id: string | number
    replyMessageID: string
    content: string
  }
  | {
    command: "" // empty when sending
    button: PronoteApiMessagesButtonType
    id: string
    replyMessageID: string
    content: string
  }
);
