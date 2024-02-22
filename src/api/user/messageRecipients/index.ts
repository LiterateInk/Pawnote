import type { PronoteApiUserMessageRecipients, ApiUserMessageRecipients } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserMessageRecipients = makeApiHandler<ApiUserMessageRecipients>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserMessageRecipients["request"]>({
    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    },

    donnees: {
      message: { N: input.messageID },
      estPublicParticipant: true,
      estDestinatairesReponse: false
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.MessageRecipients, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserMessageRecipients["response"]>(response.payload);
  return { data: received };
});
