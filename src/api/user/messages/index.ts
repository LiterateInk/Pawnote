import type { PronoteApiUserMessages, ApiUserMessages } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserMessages = makeApiHandler<ApiUserMessages>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserMessages["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    },

    donnees: { listePossessionsMessages: input.possessions }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Messages, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserMessages["response"]>(response.payload);
  return { data: received };
});
