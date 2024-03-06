import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserCreateDiscussion {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      avecLu: boolean
      avecMessage: boolean
      possessionMessageDiscussionUnique: null
    }
  }

  response: {
    donnees: {

    }
    nom: PronoteApiFunctions.Discussions
  }
}

export interface ApiUserCreateDiscussion {
  input: {
    session: Session
  }

  output: {
    data: PronoteApiUserCreateDiscussion["response"]
  }
}
