import type { PronoteApiUserDiscussions, ApiUserDiscussions } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserDiscussions = makeApiHandler<ApiUserDiscussions>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserDiscussions["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    },

    donnees: {
      avecLu: true,
      avecMessage: true,
      possessionMessageDiscussionUnique: null
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Discussions, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserDiscussions["response"]>(response.payload);
  return { data: received };
});
