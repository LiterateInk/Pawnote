import { PronoteApiFunctions } from "../../../constants/functions";
import { createPronoteAPICall } from "../../../pronote/requestAPI";
import { makeApiHandler } from "../../../utils/api";
import type { ApiLoginIdentify, PronoteApiLoginIdentify } from "./types";

export const callApiLoginIdentify = makeApiHandler<ApiLoginIdentify>(async (input) => {
  const requestPayload = input.session.writePronoteFunctionPayload<PronoteApiLoginIdentify["request"]>({
    donnees: {
      genreConnexion: 0,
      genreEspace: input.session.instance.account_type_id,
      identifiant: input.username,
      pourENT: input.useENT,
      enConnexionAuto: false,
      enConnexionAppliMobile: input.reuseMobileAuthentication,
      demandeConnexionAuto: false,
      demandeConnexionAppliMobile: input.requestFirstMobileAuthentication,
      demandeConnexionAppliMobileJeton: false,
      uuidAppliMobile: input.deviceUUID,
      loginTokenSAV: ""
    }
  });

  const response = await createPronoteAPICall(PronoteApiFunctions.Identify, {
    session_instance: input.session.instance,
    cookies: input.cookies ?? [],
    payload: requestPayload
  });

  const received = input.session.readPronoteFunctionPayload<PronoteApiLoginIdentify["response"]>(response.payload);
  return { data: received };
});
