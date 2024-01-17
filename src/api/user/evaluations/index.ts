import { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserEvaluations, ApiUserEvaluations } from "./types";
import { makeApiHandler } from "~/utils/api";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { PronoteApiFunctions } from "~/constants/functions";

export const callApiUserEvaluations = makeApiHandler<ApiUserEvaluations>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserEvaluations["request"]>({
    donnees: {
      periode: input.period
    },

    _Signature_: { onglet: PronoteApiOnglets.Evaluations }
  });
  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Evaluations, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  
  const received = input.session.readPronoteFunctionPayload<PronoteApiUserEvaluations["response"]>(response.payload);
  return { data: received };
});
