import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserMessageRecipient } from "~/constants/recipients";
import type { Session } from "~/session";

export interface PronoteApiUserMessageRecipients {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }
    donnees: {
      message: {
        N: string
      }

      estPublicParticipant: boolean
      estDestinatairesReponse: boolean
    }
  }

  response: {
    nom: PronoteApiFunctions.MessageRecipients
    donnees: {
      listeDest: PronoteValue<24, Array<PronoteApiUserMessageRecipient>>
    }
  }
}

export interface ApiUserMessageRecipients {
  input: {
    session: Session
    messageID: string
  }

  output: {
    data: PronoteApiUserMessageRecipients["response"]
  }
}
