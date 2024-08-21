import { RequestFN } from "~/core/request-function";
import { decodeNews } from "~/decoders/news";
import { encodeDomain } from "~/encoders/domain";
import { type News, type SessionHandle, TabLocation } from "~/models";

export const news = async (session: SessionHandle): Promise<News> => {
  const request = new RequestFN(session, "PageActualites", {
    _Signature_: { onglet: TabLocation.News },

    donnees: {
      modesAffActus: {
        _T: 26,
        V: encodeDomain([0])
      }
    }
  });

  const response = await request.send();
  return decodeNews(response.data.donnees, session);
};
