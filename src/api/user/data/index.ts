import type { ApiUserData, PronoteApiUserData } from "./types";

import { PronoteApiFunctions } from "../../../constants/functions";
import { createPronoteAPICall } from "../../../pronote/requestAPI";
import { makeApiHandler } from "../../../utils/api";

export const callApiUserData = makeApiHandler<ApiUserData>(async (input) => {
  const request_payload = input.session.writePronoteFunctionPayload<PronoteApiUserData["request"]>({});
  const response = await createPronoteAPICall(PronoteApiFunctions.UserData, {
    session_instance: input.session.instance,
    payload: request_payload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiUserData["response"]>(response.payload);
  return { data: received };
});
