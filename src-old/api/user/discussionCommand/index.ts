import { PronoteApiDiscussionCommandType } from "~/constants/discussion";
import type { ApiUserDiscussionCommand, PronoteApiUserDiscussionCommand } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";
import { PronoteApiStateType } from "~/constants/states";

export const callApiUserDiscussionCommand = makeApiHandler<ApiUserDiscussionCommand>(async (fetcher, input) => {
  let data: PronoteApiUserDiscussionCommand["request"]["donnees"];

  if (input.command === PronoteApiDiscussionCommandType.brouillon) {
    data = {
      commande: input.command,
      brouillon: typeof input.id === "number" ? {
        E:  PronoteApiStateType.CREATION,
        N: input.id
      } : {
        E: PronoteApiStateType.MODIFICATION,
        N: input.id
      },

      contenu: input.content,

      messagePourReponse: {
        G: 0,
        N: input.replyMessageID
      },

      listeDestinataires: [],
      listeFichiers: [],
      objet: ""
    };
  }
  else if (input.command === "") {
    data = {
      commande: input.command,
      bouton: {
        N: 0,
        G: input.button
      },

      brouillon: {
        N: input.id
      },

      contenu: input.content,
      listeDestinataires: [],
      listeFichiers: [],

      messagePourReponse: {
        G: 0,
        N: input.replyMessageID
      }
    };
  }
  else {
    data = {
      commande: input.command,
      listePossessionsMessages: input.possessions
    };
  }

  const payload = input.session.writePronoteFunctionPayload<PronoteApiUserDiscussionCommand["request"]>({
    donnees: data,

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
