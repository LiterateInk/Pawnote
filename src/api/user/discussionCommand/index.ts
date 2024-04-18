import type { ApiUserDiscussionCommand, PronoteApiUserDiscussionCommand } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserDiscussionCommand = makeApiHandler<ApiUserDiscussionCommand>(async (fetcher, input) => {
  const payload = input.session.writePronoteFunctionPayload<PronoteApiUserDiscussionCommand["request"]>({
    donnees: {
      commande: input.command,
      listePossessionsMessages: input.possessions
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.CreateMessage, {
    session_instance: input.session.instance,
    payload: payload
  });

  const output = input.session.readPronoteFunctionPayload<PronoteApiUserDiscussionCommand["response"]>(response.payload);
  return output;
});
