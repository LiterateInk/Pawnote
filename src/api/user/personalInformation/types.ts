import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";

export interface PronoteApiUserPersonalInformation {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Account
      ressource: { N: string, G: 4 }
    }
  }

  response: {
    nom: PronoteApiFunctions.PersonalInformation
    donnees: {
      Informations: {
        adresse1: string
        adresse2: string
        adresse3: string
        adresse4: string
        codePostal: string
        eMail: string
        indicatifTel: string
        numeroINE: string
        pays: string
        province: string
        telephonePortable: string
        ville: string
      }
    }
  }
}

export interface ApiUserPersonalInformation {
  input: {
    userID: string
    session: Session
  }

  output: {
    data: PronoteApiUserPersonalInformation["response"]
  }
}
