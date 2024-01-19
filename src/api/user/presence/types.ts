import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserPresence {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Presence
    }
  }

  response: {
    nom: PronoteApiFunctions.Presence
  }
}

export interface ApiUserPresence {
  input: {
    session: Session
  }

  output: {
    data: PronoteApiUserPresence["response"]
  }
}
