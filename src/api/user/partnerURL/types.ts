import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteSSO } from "~/constants/partner";
import type { Session } from "~/session";

export interface PronoteApiUserPartnerURL {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Presence
    }

    donnees: {
      SSO: PronoteSSO
    }
  }

  response: {
    donnees: {}
    nom: PronoteApiFunctions.PartnerURL
    RapportSaisie: {
      urlSSO: {
        _T: 23
        V: string // URL for SSO login.
      }
    }
  }
}

export interface ApiUserPartnerURL {
  input: {
    session: Session
    sso: PronoteSSO
  }

  output: {
    url: string
  }
}
