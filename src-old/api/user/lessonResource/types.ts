import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserResources } from "../resources/types";
import type { Session } from "~/session";

export interface PronoteApiUserLessonResource {
  request: {
    donnees: {
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
      /**
       * Not sure why it's an array, since there's ALWAYS
       * one item here, the one we requested !
       */
      ListeCahierDeTextes: PronoteApiUserResources["response"]["donnees"]["ListeCahierDeTextes"]
    }

    nom: PronoteApiFunctions.LessonContentInResources
  }
}

export interface ApiUserLessonResource {
  input: {
    lessonId: string
    session: Session
  }

  output: {
    data: PronoteApiUserLessonResource["response"]
  }
}
