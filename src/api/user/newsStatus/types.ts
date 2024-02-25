import { PronoteValue } from "~/api/type";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiNewsPublicSelf } from "~/constants/news";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserType } from "~/constants/users";
import type { StudentNewsItemQuestion } from "~/parser/news";
import type { Session } from "~/session";

export interface PronoteApiUserNewsStatus {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.News
    }

    donnees: {
      listeActualites: Array<{
        /** ID of the news */
        N: string
        L: string
        E: number
        validationDirecte: boolean
        genrePublic: PronoteApiUserType
        public: {
          N: string
          G: PronoteApiUserType
          L: string
        }
        lue: boolean
        supprimee: boolean
        marqueLueSeulement: boolean
        saisieActualite: boolean
        listeQuestions: Array<{
          N: string
          L: string
          E: number
          genreReponse: number
          reponse: {
            N: number
            E: number
            Actif: boolean
            avecReponse: boolean
            estReponseAttendue: boolean
            valeurReponse: "" | PronoteValue<8, string>
            _validationSaisie: boolean
          }
        }>
      }>
      saisieActualite: boolean
    }
  }

  response: {
    nom: PronoteApiFunctions.PatchNews
    donnees: Record<string, never>
  }
}

export interface ApiUserNewsStatus {
  input: {
    id: string
    name: string

    publicSelfData: PronoteApiNewsPublicSelf

    markAsRead: boolean
    /** When this is provided, `answers` should be an empty array. */
    markAsReadOnly: boolean

    answers: Array<StudentNewsItemQuestion>
    session: Session
  }

  output: {
    data: PronoteApiUserNewsStatus["response"]
  }
}
