import type { NextAuthenticationCredentials } from "~/authenticate/types";
import type { ApiLoginInformations } from "~/api/login/informations/types";
import type { PawnoteFetcher } from "~/utils/fetcher";
import { Session } from "~/session";
import Queue from "~/utils/queue";

import { callApiUserGrades } from "~/api/user/grades";
import { StudentGrade } from "~/parser/grade";
import { StudentAverage } from "~/parser/average";
import { readPronoteApiGrade } from "~/pronote/grades";
import { callApiUserEvaluations } from "~/api/user/evaluations";
import { StudentEvaluation } from "~/parser/evaluation";
import { callApiUserDiscussions } from "~/api/user/discussions";
import { StudentDiscussion, StudentDiscussionsOverview } from "~/parser/discussion";
import { PronoteApiMessagesButtonType } from "~/constants/messages";
import { callApiUserMessages } from "~/api/user/messages";
import { MessagesOverview } from "~/parser/messages";
import { callApiUserMessageRecipients } from "~/api/user/messageRecipients";
import { DiscussionCreationRecipient, FetchedMessageRecipient } from "~/parser/recipient";
import type { PronoteApiUserResourceType } from "~/constants/users";
import { callApiUserCreateDiscussionRecipients } from "~/api/user/createDiscussionRecipients";
import { PronoteApiResourceType } from "~/constants/resources";
import { callApiUserCreateDiscussion } from "~/api/user/createDiscussion";
import { callApiUserCreateDiscussionMessage } from "~/api/user/createDiscussionMessage";
import { getPronoteMessageButtonType } from "~/pronote/messages";

import { callApiUserDiscussionCommand } from "~/api/user/discussionCommand";
import { ApiUserDiscussionAvailableCommands } from "~/api/user/discussionCommand/types";
import { callApiUserGeneratePDF } from "~/api/user/generatePDF";

export default class Pronote {
  private queue: Queue;

  constructor (
    public fetcher: PawnoteFetcher,
    private session: Session,

    // Accessor for raw data returned from Pronote's API.
    private user: ApiUserData["output"]["data"]["donnees"],
    public loginInformations: ApiLoginInformations["output"]["data"]
  ) {
  }

  /**
   * Get grades overview for a specific period.
   * Including student's grades with averages and the global averages.
   *
   * @remark Internally used in the `Period` class.
   * @param period - Period the grades overview will be from.
   */
  public async getGradesOverview (period = this.readDefaultPeriodForGradesOverview()) {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserGrades(this.fetcher, {
        session: this.session,
        periodID: period.id,
        periodName: period.name
      });

      return {
        grades: data.listeDevoirs.V
          .map((grade) => new StudentGrade(this, grade)),
        averages: data.listeServices.V
          .map((average) => new StudentAverage(average)),

        overallAverage: data.moyGenerale && readPronoteApiGrade(data.moyGenerale.V),
        classAverage: data.moyGeneraleClasse && readPronoteApiGrade(data.moyGeneraleClasse.V)
      };
    });
  }

  /**
   * @param period - Period the grades report will be from.
   * @returns an URL to download the PDF file.
   */
  public async generateGradesReportPDF (period = this.readDefaultPeriodForGradesReport()) {
    return this.queue.push(async () => {
      const data = await callApiUserGeneratePDF(this.fetcher, {
        session: this.session,
        period
      });

      return this.pronoteRootURL + "/" + data.url;
    });
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
