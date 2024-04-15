import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiStateType } from "~/constants/states";
import type { Session } from "~/session";

export interface PronoteApiUserHomeworkRemoveUpload {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }

    donnees: {
      listeFichiers: Array<{
        /**
         * State of the file we're uploading.
         * It's always in deletion state when sending the request.
         */
        E: PronoteApiStateType.DELETION

        TAF: {
          /**
           * Homework ID we're removing the uploaded file to.
           * @example "157#xxxxxxxxxxxxxxxxxxxxxxxxx"
           */
          N: string
        }
      }>
    }
  }

  response: {
    nom: PronoteApiFunctions.HomeworkUpload
    RapportSaisie: Record<string, never>
    donnees: Record<string, never>
  }
}

export interface ApiUserHomeworkRemoveUpload {
  input: {
    homeworkID: string
    session: Session
  }

  output: PronoteApiUserHomeworkRemoveUpload["response"]
}
