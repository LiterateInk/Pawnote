import type { PronoteApiDocumentType } from "~/constants/files";
import type { PronoteApiFunctions } from "~/constants/functions";
import type { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiStateType } from "~/constants/states";
import type { Session } from "~/session";

export interface PronoteApiUserHomeworkUpload {
  request: {
    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }

    donnees: {
      listeFichiers: Array<{
        /**
         * State of the file we're uploading.
         * It's always in creation state when sending the request.
         */
        E: PronoteApiStateType.CREATION

        /**
         * Type of the upload: here it's always a file.
         */
        G: PronoteApiDocumentType.FILE

        /**
         * File name with extension.
         * @example "demo.mp4"
         */
        L: string

        /**
         * A generated creation ID (starts from `-1000`).
         * @example -1001
         */
        N: number

        /**
         * File ID.
         * @example "selecfile_1_123456789"
         */
        idFichier: string

        TAF: {
          /**
           * Homework ID we're attaching the file to.
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

export interface ApiUserHomeworkUpload {
  input: {
    homeworkID: string
    fileName: string
    fileID: string

    session: Session
  }

  output: PronoteApiUserHomeworkUpload["response"]
}
