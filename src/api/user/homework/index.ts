import type { PronoteApiUserHomework, ApiUserHomework } from "./types";

import { PronoteApiFunctions } from "~/constants/functions";
import { PronoteApiOnglets } from "~/constants/onglets";
import { createPronoteAPICall } from "~/pronote/requestAPI";
import { makeApiHandler } from "~/utils/api";

export const callApiUserHomework = makeApiHandler<ApiUserHomework>(async (input) => {
  if (input.fromWeekNumber <= 0) {
    throw new Error(`Invalid input on callApiUserHomework, "fromWeekNumber" should be a strictly positive number, got ${input.fromWeekNumber}`);
  }

  if (typeof input.toWeekNumber === "number" && input.toWeekNumber <= 0) {
    throw new Error(`Invalid input on callApiUserHomework, "fromWeekNumber" should be a strictly positive number, got ${input.fromWeekNumber}`);
  }

  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserHomework["request"]>({
    donnees: {
      domaine: {
        _T: 8,
        V: typeof input.toWeekNumber === "number" ? `[${input.fromWeekNumber}..${input.toWeekNumber}]` : `[${input.fromWeekNumber}]`
      }
    },

    _Signature_: {
      onglet: PronoteApiOnglets.Homework
    }
  });

  const response = await createPronoteAPICall(PronoteApiFunctions.Homework, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserHomework["response"]>(response.payload);
  return { data: received };
});
