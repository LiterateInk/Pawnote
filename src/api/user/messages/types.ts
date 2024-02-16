import type { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";
import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";

export interface PronoteApiUserMessages {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }

    donnees: {
      listePossessionsMessages: PronoteApiMessagesPossessionsList
    }
  }

  response: {
    donnees: {
      listeMessages: {
        _T: 24
        V: Array<{
          N: string

          messageSource: {
            _T: 24
            V: {
              N: string
            }
          }

          possessionMessage: {
            _T: 24
            V: {
              N: string
            }
          }

          /** NOTE: No idea what this is. */
          estNonPossede: boolean

          /**
           * Another format of date, why ?
           * @example "ven. 16/02/24 13h35"
           */
          libelleDate: string

          /** @example "16/02/2024 13:35:11" */
          date: PronoteValue<7, string>

          estUnAparte: boolean

          /**
           * You're the one who sent the message.
           */
          emetteur: boolean

          /**
           * The one sending the message.
           * @example "Moi" // in this case, `message.emetteur === true`
           */
          public_gauche: string
          /**
           * The one receiving the message.
           * @example "John D."
           */
          public_droite: string
          /**
           * @example "Professeur"
           */
          hint_droite: string
        } & (
          | {
            contenu: string
            estHTML: false
          }
          | {
            contenu: PronoteValue<number, string>;
            estHTML: true
          }
        )>
      }

      messagePourReponse: {
        _T: number
        V: {
          N: string
          G: number
          nbDestinataires: number
        }
      }

      listeBoutons: {
        _T: number
        V: Array<{
          G: number
          L: string
        }>
      }

      nbPossessionsMessage: number
    }

    nom: PronoteApiFunctions.Messages
  }
}

export interface ApiUserMessages {
  input: {
    session: Session,
    possessions: PronoteApiMessagesPossessionsList
  }

  output: {
    data: PronoteApiUserMessages["response"]
  }
}
