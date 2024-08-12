import type { ApiUserPersonalInformation, PronoteApiUserPersonalInformation } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserPersonalInformation = makeApiHandler<ApiUserPersonalInformation>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserPersonalInformation["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.Account,
      ressource: {
        G: 4,
        N: input.userID
      }
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.PersonalInformation, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserPersonalInformation["response"]>(response.payload);
  return { data: received };
});
