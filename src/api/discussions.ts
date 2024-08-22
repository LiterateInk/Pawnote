import { RequestFN } from "~/core/request-function";
import { decodeDiscussions } from "~/decoders/discussions";
import { Discussions, TabLocation, type SessionHandle } from "~/models";

export const discussions = async (session: SessionHandle): Promise<Discussions> => {
  const request = new RequestFN(session, "ListeMessagerie", {
    _Signature_: { onglet: TabLocation.Discussions },

    donnees: {
      avecLu: true,
      avecMessage: true,
      possessionMessageDiscussionUnique: null
    }
  });

  const response = await request.send();
  return decodeDiscussions(response.data.donnees);
};
