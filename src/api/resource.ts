import { RequestFN } from "~/core/request-function";
import { decodeResource } from "~/decoders/resource";
import { TabLocation, type Resource, type SessionHandle } from "~/models";

export const resource = async (session: SessionHandle, resourceID: string): Promise<Resource> => {
  const request = new RequestFN(session, "donneesContenusCDT", {
    _Signature_: { onglet: TabLocation.Resources },

    donnees: {
      cahierDeTextes: { N: resourceID }
    }
  });

  const response = await request.send();

  const resource = response.data.donnees.ListeCahierDeTextes.V[0];
  return decodeResource(resource, session);
};
