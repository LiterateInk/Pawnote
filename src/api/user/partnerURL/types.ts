import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { Session } from "~/session";

export interface PronoteApiUserPartnerURL {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Presence
    }

    donnees: {
      SSO: {
        codePartenaire: string
        intituleLien: string
        description: string
      }
    }
  }

  response: {
    donnees: {}
    nom: PronoteApiFunctions.PartnerURL
    RapportSaisie: {
      urlSSO: {
        _T: 23
        V: string
      }
    }
  }
}

export interface ApiUserPartnerURL {
  input: {
    session: Session

    sso: {
      code: string
      description: string
      linkLabel: string
    }
  }

  output: {
    url: string
  }
}
