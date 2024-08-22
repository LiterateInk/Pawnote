import { RequestFN } from "~/core/request-function";
import { decodeEvaluation } from "~/decoders/evaluation";
import { encodePeriod } from "~/encoders/period";
import { type Evaluation, type Period, type SessionHandle, TabLocation } from "~/models";

export const evaluations = async (session: SessionHandle, period: Period): Promise<Array<Evaluation>> => {
  const request = new RequestFN(session, "DernieresEvaluations", {
    _Signature_: { onglet: TabLocation.Evaluations },

    donnees: {
      periode: encodePeriod(period)
    }
  });

  const response = await request.send();

  return response.data.donnees.listeEvaluations.V
    .map(decodeEvaluation);
};
