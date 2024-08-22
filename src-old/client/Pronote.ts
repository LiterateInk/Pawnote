import type { ApiLoginInformations } from "~/api/login/informations/types";
import type { PawnoteFetcher } from "~/utils/fetcher";
import { Session } from "~/session";
import Queue from "~/utils/queue";

import { callApiUserEvaluations } from "~/api/user/evaluations";
import { StudentEvaluation } from "~/parser/evaluation";
import { callApiUserGeneratePDF } from "~/api/user/generatePDF";

export default class Pronote {
  private queue: Queue;

  constructor (
    public fetcher: PawnoteFetcher,
    private session: Session,
    public loginInformations: ApiLoginInformations["output"]["data"]
  ) {
  }

  public async getEvaluations (period = this.readDefaultPeriodForEvaluations()): Promise<StudentEvaluation[]> {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserEvaluations(this.fetcher, {
        session: this.session,
        period
      });

      return data.listeEvaluations.V
        .map((evaluation) => new StudentEvaluation(evaluation));
    });
  }
}
