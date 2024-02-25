import type { ApiUserNewsStatus, PronoteApiUserNewsStatus } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserNewsStatus = makeApiHandler<ApiUserNewsStatus>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserNewsStatus["request"]>({
    donnees: {
      listeActualites: [{
        N: input.id,
        L: input.name,

        genrePublic: input.publicSelfData.type,
        public: {
          N: input.publicSelfData.id,
          G: input.publicSelfData.type,
          L: input.publicSelfData.name
        },

        E: 2, // TODO
        validationDirecte: true,

        listeQuestions: input.answers.map((answer) => ({
          E: 2, // TODO

          N: answer.id,
          L: answer.fullTitle,
          genreReponse: answer.genre,

          reponse: {
            N: parseInt(answer.answerID, 10),
            E: 1,
            Actif: true,

            valeurReponse: answer.answer ? {
              _T: 8,
              V: JSON.stringify(answer.answer) // [1,2]
            } : "",

            avecReponse: answer.answered,
            estReponseAttendue: answer.shouldAnswer,
            _validationSaisie: true
          }
        })),

        marqueLueSeulement: input.markAsReadOnly,
        lue: input.markAsRead,
        supprimee: false, // TODO
        saisieActualite: false
      }],
      saisieActualite: false
    },

    _Signature_: {
      onglet: PronoteApiOnglets.News
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.PatchNews, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserNewsStatus["response"]>(response.payload);
  return { data: received };
});
