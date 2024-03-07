import type { ApiUserCreateDiscussion, PronoteApiUserCreateDiscussion } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserCreateDiscussion = makeApiHandler<ApiUserCreateDiscussion>(async (fetcher, input) => {
  const payload = input.session.writePronoteFunctionPayload<PronoteApiUserCreateDiscussion["request"]>({
    donnees: {
      contenu: input.content.isHTML ? {
        _T: 21,
        V: input.content.value
      } : input.content.value,

      objet: input.subject,
      estCreationCarnetLiaison: false,
      listeFichiers: [],
      listeDestinataires: input.recipients.map((recipient) => ({
        E: 2,
        G: recipient.type,
        N: recipient.id
      }))
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Discussions
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.CreateMessage, {
    session_instance: input.session.instance,
    payload: payload
  });

  const output = input.session.readPronoteFunctionPayload<PronoteApiUserCreateDiscussion["response"]>(response.payload);
  return output;
});
