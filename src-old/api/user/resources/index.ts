import type { PronoteApiUserResources, ApiUserResources } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserResources = makeApiHandler<ApiUserResources>(async (fetcher, input) => {
  if (input.fromWeekNumber <= 0) {
    throw new Error(`Invalid input on callApiUserResources, "fromWeekNumber" should be a strictly positive number, got ${input.fromWeekNumber}`);
  }

  if (typeof input.toWeekNumber === "number" && input.toWeekNumber <= 0) {
    throw new Error(`Invalid input on callApiUserResources, "fromWeekNumber" should be a strictly positive number, got ${input.fromWeekNumber}`);
  }

  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserResources["request"]>({
    donnees: {
      domaine: {
        _T: 8,
        V: typeof input.toWeekNumber === "number" ? `[${input.fromWeekNumber}..${input.toWeekNumber}]` : `[${input.fromWeekNumber}]`
      }
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Resources
    }
  });

  const response = await createPronoteAPICall(fetcher, PronoteApiFunctions.Resources, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserResources["response"]>(response.payload);
  return { data: received };
});
