import type { SessionInstance, Session } from "../session";

import { PronoteApiFunctions } from "../constants/functions";
import { retrieveResponseCookies } from "../utils/headers";

export interface PronoteApiFunctionPayload<T> {
  nom: string
  session: number
  numeroOrdre: string

  /** `string` only when compressed and/or encrypted. */
  donneesSec: T | string
}

export const createPronoteAPICall = async (
  apiFunctionName: PronoteApiFunctions,
  request: {
    payload: ReturnType<Session["writePronoteFunctionPayload"]>
    session_instance: SessionInstance
    cookies?: string[]
  }
) => {
  try {
    const pronote_url = request.session_instance.pronote_url;
    const function_url = pronote_url + `/appelfonction/${request.session_instance.account_type_id}/${request.session_instance.session_id}/${request.payload.order}`;
    const response = await fetch(function_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: request.cookies?.join("; ") ?? ""
      },
      body: JSON.stringify({
        session: request.session_instance.session_id,
        numeroOrdre: request.payload.order,
        nom: apiFunctionName,

        donneesSec: request.payload.data
      })
    });

    const payload = await response.text();
    const cookies = retrieveResponseCookies(response.headers);

    return { payload, cookies };
  }
  catch (error) {
    throw new Error(`Failed to call API function "${apiFunctionName}": ${error}`);
  }
};
