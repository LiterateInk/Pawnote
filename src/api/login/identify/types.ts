import type { PronoteApiAccountId } from "~/constants/accounts";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { Session } from "~/session";

export interface PronoteApiLoginIdentify {
  request: {
    donnees: {
      genreConnexion: 0
      genreEspace: PronoteApiAccountId
      identifiant: string
      pourENT: boolean
      enConnexionAuto: false
      enConnexionAppliMobile: boolean
      demandeConnexionAuto: false
      demandeConnexionAppliMobile: boolean
      demandeConnexionAppliMobileJeton: boolean
      uuidAppliMobile: string
      loginTokenSAV: string
    }
  }

  response: {
    nom: PronoteApiFunctions.Identify
    donnees: {
      /** String that may be used in the challenge if defined. */
      alea?: string
      /** Challenge to resolve for authentication. */
      challenge: string

      /** When using ENT to log in for the first time, you'll need your account username. */
      login?: string

      /** `>0` means that username should be lowercase. */
      modeCompLog?: number
      /** `>0` means that password should be lowercase. */
      modeCompMdp?: number
    }
  }
}

export interface ApiLoginIdentify {
  input: {
    session: Session,

    /** We should still provide the username since, for now, the `session` object is incomplete. */
    username: string
    /** Cookies should be the same as the ones used in `../informations` call. */
    cookies: Array<string>

    /**
     * Whether we use ENT or not.
     * Note that this is relevant only for first-time authentications.
     */
    useENT: boolean

    /** When it's the first-time authentication. */
    requestFirstMobileAuthentication: boolean
    /** When we authenticate using a token. */
    reuseMobileAuthentication: boolean

    deviceUUID: string
  }

  output: {
    data: PronoteApiLoginIdentify["response"]
  }
}
