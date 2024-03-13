import type { ApiUserCreateDiscussionMessage, PronoteApiUserCreateDiscussionMessage } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserCreateDiscussionMessage = makeApiHandler<ApiUserCreateDiscussionMessage>(async (fetcher, input) => {
  const payload = input.session.writePronoteFunctionPayload<PronoteApiUserCreateDiscussionMessage["request"]>({
    donnees: {
      contenu: input.content.isHTML ? {
        _T: 21,
        V: input.content.value
      } : input.content.value,

      bouton: { N: 0, G: input.button },
      brouillon: { N: -1001, E: 1 },
      genreDiscussion: 0,
      messagePourReponse: {
        G: 0,
        N: input.replyMessageID
      },

      listeFichiers: []
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.CreateMessage, {
    session_instance: input.session.instance,
    payload: payload
  });

  const output = input.session.readPronoteFunctionPayload<PronoteApiUserCreateDiscussionMessage["response"]>(response.payload);
  return output;
});
