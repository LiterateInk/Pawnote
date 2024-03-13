import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiMessagesButtonType } from "~/constants/messages";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserCreateDiscussionMessage {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      bouton: {
        N: 0
        G: number
      }

      genreDiscussion: 0

      brouillon: {
        N: -1001,
        E: 1
      }

      /** Message we're replying to. */
      messagePourReponse: {
        N: string
        G: 0
      }

      /** Content (could be HTML or plain text) of the message to send. */
      contenu: string | PronoteValue<21, string>

      /**
       * TODO: Type this.
       *
       * @remark Only available when full customization of the content is available,
       * so not for students.
       */
      listeFichiers?: unknown[]
    }
  }

  response: {
    donnees: {}
    RapportSaisie: {
      messageToast: string
      estCreationDiscussion: true
    }

    nom: PronoteApiFunctions.Discussions
  }
}

export interface ApiUserCreateDiscussionMessage {
  input: {
    session: Session
    content: { isHTML: boolean, value: string }
    replyMessageID: string
    button: PronoteApiMessagesButtonType
  }

  output: PronoteApiUserCreateDiscussionMessage["response"]
}
