import type { ApiUserLessonHomework, PronoteApiUserLessonHomework } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserLessonHomework = makeApiHandler<ApiUserLessonHomework>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserLessonHomework["request"]>({
    donnees: {
      pourTAF: true,
      cahierDeTextes: {
        N: input.lessonId
      }
    },

    _Signature_: { onglet: PronoteApiOnglets.Resources }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.LessonContentInResources, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserLessonHomework["response"]>(response.payload);
  return { data: received };
});
