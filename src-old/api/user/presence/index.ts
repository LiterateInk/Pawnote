import type { PronoteApiUserPresence, ApiUserPresence } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserPresence = makeApiHandler<ApiUserPresence>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserPresence["request"]>({
    _Signature_: { onglet: PronoteApiOnglets.Presence }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Presence, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserPresence["response"]>(response.payload);
  return { data: received };
});
