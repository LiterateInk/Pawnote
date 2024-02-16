import type { PronoteApiUserNews, ApiUserNews } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserNews = makeApiHandler<ApiUserNews>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserNews["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.News
    },

    donnees: {
      modesAffActus: {
        _T: 26,
        V: "[0]"
      }
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.News, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserNews["response"]>(response.payload);
  return { data: received };
});
