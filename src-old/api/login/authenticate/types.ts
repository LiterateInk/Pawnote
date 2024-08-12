import type { PronoteApiAccountId } from "~/constants/accounts";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { Session } from "~/session";

export interface PronoteApiLoginAuthenticate {
  request: {
    donnees: {
      connexion: 0
      challenge: string
      espace: PronoteApiAccountId
    }
  }

  response: {
    nom: PronoteApiFunctions.Authenticate
    donnees: {
      // Only here if there was an error during auth.
      Acces?: number
      AccesMessage?: {
        message?: string
        titre?: string
      }

      /** AES encryption key to use from now on. */
      cle: string

      /** Last authentication date. */
      derniereConnexion: {
        _T: 7
        V: string
      }

      jetonConnexionAppliMobile?: string

      /** Name of the authenticated user. */
      libelleUtil: string
      modeSecurisationParDefaut: number
    }
  }
}

export interface ApiLoginAuthenticate {
  input: {
    /** Challenge from `ApiLoginIdentify["response"]` solved. */
    solvedChallenge: string

    session: Session
    cookies?: Array<string>
  }

  output: {
    data: PronoteApiLoginAuthenticate["response"]
  }
}
