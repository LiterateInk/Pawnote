import type { ApiUserHomeworkStatus, PronoteApiUserHomeworkStatus } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserHomeworkStatus = makeApiHandler<ApiUserHomeworkStatus>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserHomeworkStatus["request"]>({
    donnees: {
      listeTAF: [{
        TAFFait: input.status,
        N: input.id
      }]
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.HomeworkDone, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserHomeworkStatus["response"]>(response.payload);
  return { data: received };
});
