import { PronoteApiOnglets } from "~/constants/onglets";
import type { PronoteApiUserGrades, ApiUserGrades } from "./types";
import { makeApiHandler } from "~/utils/api";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { PronoteApiFunctions } from "~/constants/functions";

export const callApiUserGrades = makeApiHandler<ApiUserGrades>(async (fetcher, input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserGrades["request"]>({
    donnees: {
      Periode: {
        N: input.periodID,
        L: input.periodName
      }
    },

    _Signature_: { onglet: PronoteApiOnglets.Grades }
  });
  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Grades, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserGrades["response"]>(response.payload);
  return { data: received };
});
