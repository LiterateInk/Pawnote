import type { ApiUserCreateDiscussionRecipients, PronoteApiUserCreateDiscussionRecipients } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserCreateDiscussionRecipients = makeApiHandler<ApiUserCreateDiscussionRecipients>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserCreateDiscussionRecipients["request"]>({
    donnees: {
      filtreElement: {
        G: input.user.type,
        L: input.user.name,
        N: input.user.id
      },

      onglet: {
        N: 0,
        G: input.recipientType
      }
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.CreateDiscussionRecipients, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserCreateDiscussionRecipients["response"]>(response.payload);
  return { data: received };
});
