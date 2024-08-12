import type { ApiUserHomeworkRemoveUpload, PronoteApiUserHomeworkRemoveUpload } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";
import { PronoteApiStateType } from "~/constants/states";

export const callApiUserHomeworkRemoveUpload = makeApiHandler<ApiUserHomeworkRemoveUpload>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserHomeworkRemoveUpload["request"]>({
    donnees: {
      listeFichiers: [{
        E: PronoteApiStateType.DELETION,
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

  return input.session.readPronoteFunctionPayload<PronoteApiUserHomeworkRemoveUpload["response"]>(response.payload);
});
