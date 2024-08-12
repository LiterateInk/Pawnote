import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { Session } from "~/session";
import { PronoteValue } from "~/api/type";
import { PronoteApiUserHomework } from "../homework/types";

export interface PronoteApiUserLessonHomework {
  request: {
    donnees: {
      pourTAF: true
      cahierDeTextes: {
        /** ID of the lesson you want to request. */
        N: string
      }
    }

    _Signature_: {
      onglet: PronoteApiOnglets.Resources
    }
  }

  response: {
    donnees: {
      pourTAF: boolean

      /**
       * Not sure why it's an array, since there's ALWAYS
       * one item here, the one we requested !
       */
      ListeCahierDeTextes: PronoteValue<24, [{
        CouleurFond: string
        Date: PronoteValue<7, string>
        DateFin: PronoteValue<7, string>
        ListeTravailAFaire: PronoteApiUserHomework["response"]["donnees"]["ListeTravauxAFaire"]
        Matiere: PronoteValue<24, {
          L: string
          N: string
        }>
        N: string
        cours: PronoteValue<24, { N: string }>

        /** Groups that are assigned to this lesson. */
        listeGroupes: PronoteValue<24, Array<{
          /**
           * Name of the group
           * @example "5ACC HIGR.2"
           */
          L: string
          /** ID */
          N: string
        }>>

        listeProfesseurs: PronoteValue<24, Array<{
          L: string
          N: string
        }>>

        verrouille: boolean
      }]>
    }

    nom: PronoteApiFunctions.LessonContentInResources
  }
}

export interface ApiUserLessonHomework {
  input: {
    lessonId: string
    session: Session
  }

  output: {
    data: PronoteApiUserLessonHomework["response"]
  }
}
