import { generateCreationID } from "~/constants/id";
import type { ApiUserHomeworkUpload, PronoteApiUserHomeworkUpload } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";
import { PronoteApiStateType } from "~/constants/states";
import { PronoteApiDocumentType } from "~/constants/files";

export const callApiUserHomeworkUpload = makeApiHandler<ApiUserHomeworkUpload>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserHomeworkUpload["request"]>({
    donnees: {
      listeFichiers: [{
        E: PronoteApiStateType.CREATION,
        G: PronoteApiDocumentType.FILE,
        L: input.fileName,
        N: generateCreationID(),

        idFichier: input.fileID,

        TAF: {
          N: input.homeworkID
        }
      }]
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.HomeworkUpload, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  return input.session.readPronoteFunctionPayload<PronoteApiUserHomeworkUpload["response"]>(response.payload);
});
