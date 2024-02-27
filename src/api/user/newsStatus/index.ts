import type { ApiUserNewsStatus, PronoteApiUserNewsStatus } from "./types";
import { makeApiHandler } from "~/utils/api";

import { PronoteApiNewsQuestionType } from "~/constants/news";
import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";

import { createPronoteAPICall } from "~/pronote/requestAPI";
import { createSelectionFrom } from "~/pronote/select";

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

        validationDirecte: true,

        listeQuestions: input.answers.map((answer) => ({
          N: answer.id,
          L: answer.fullTitle,
          genreReponse: answer.genre,

          reponse: {
            N: parseInt(answer.answerID, 10),
            Actif: true,

            // Should give a string directly when we reply to an information
            // or when the question is just a text input.
            valeurReponse: (answer.type === PronoteApiNewsQuestionType.InformationText || answer.type === PronoteApiNewsQuestionType.TextInput)
              ? answer.textInputAnswer ?? ""
              : { // Otherwise, pass the choices as an array of numbers.
                _T: 8,
                V: createSelectionFrom(answer.selectedAnswers ?? [])
              },

            // Defined when the question have choices which can have a text input : "Other" choice.
            valeurReponseLibre: (answer.choices.filter((choice) => choice.isTextInput).length > 0)
              ? answer.textInputAnswer
              : undefined,

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
