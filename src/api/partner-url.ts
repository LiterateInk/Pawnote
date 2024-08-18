import { RequestFN } from "~/core/request-function";
import { SessionHandle } from "~/models";

export const partnerURL = async (session: SessionHandle, sso: any): Promise<string> => {
  const request = new RequestFN(session, "SaisieURLPartenaire", {
    _Signature_: {
      onglet: 7 // = Presence
    },

    donnees: {
      SSO: sso
    }
  });

  const response = await request.send();
  return response.data.RapportSaisie.urlSSO.V;
};
