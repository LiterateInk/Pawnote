import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiHTTPType } from "~/constants/http";
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
      /**
       * Information about the .ics feed.
       * @since 2024.1.3
       */
      iCal?: {
        avecAgenda: boolean
        avecEDT: boolean
        avecLienPerso: boolean
        liste: PronoteValue<PronoteApiHTTPType.Element, Array<{
          G: number
          L: string
          P: number
          exportAgenda: boolean
          exportEDT: boolean
          paramICal: string
        }>>
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
