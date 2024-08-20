import type { NextAuthenticationCredentials } from "~/authenticate/types";
import type { ApiLoginInformations } from "~/api/login/informations/types";
import type { PawnoteFetcher } from "~/utils/fetcher";

import {
  callApiUserHomework,
  callApiUserHomeworkStatus,
  callApiUserTimetable,

  type ApiUserData
} from "~/api";

import { StudentHomework } from "~/parser/homework";
import { Period, readOngletPeriods, OngletPeriods } from "~/parser/period";

import { Session } from "~/session";
import Queue from "~/utils/queue";

import { readPronoteApiDate, transformDateToPronoteString, translateToPronoteWeekNumber } from "~/pronote/dates";
import { getUTCDate } from "~/utils/dates";
import { callApiUserGrades } from "~/api/user/grades";
import { StudentGrade } from "~/parser/grade";
import { StudentAverage } from "~/parser/average";
import { readPronoteApiGrade } from "~/pronote/grades";
import { callApiUserEvaluations } from "~/api/user/evaluations";
import { StudentEvaluation } from "~/parser/evaluation";
import { PronoteApiAccountId } from "~/constants/accounts";
import { StudentPersonalInformation } from "~/parser/personalInformation";
import { callApiUserPersonalInformation } from "~/api/user/personalInformation";
import { StudentAttachment } from "~/parser/attachment";
import { callApiUserPresence } from "~/api/user/presence";
import { callApiUserResources } from "~/api/user/resources";
import { callApiUserLessonResource } from "~/api/user/lessonResource";
import { callApiUserLessonHomework } from "~/api/user/lessonHomework";
import { StudentLessonResource } from "~/parser/lessonResource";
import { callApiUserNews } from "~/api/user/news";
import { StudentNews, StudentNewsItemQuestion } from "~/parser/news";
import { callApiUserDiscussions } from "~/api/user/discussions";
import { StudentDiscussion, StudentDiscussionsOverview } from "~/parser/discussion";
import { PronoteApiMessagesButtonType } from "~/constants/messages";
import { callApiUserMessages } from "~/api/user/messages";
import { MessagesOverview } from "~/parser/messages";
import { PronoteApiOnglets } from "~/constants/onglets";
import { callApiUserAttendance } from "~/api/user/attendance";
import { StudentAbsence, StudentDelay, StudentObservation, StudentPrecautionaryMeasure, StudentPunishment } from "~/parser/attendance";
import { callApiUserMessageRecipients } from "~/api/user/messageRecipients";
import { DiscussionCreationRecipient, FetchedMessageRecipient } from "~/parser/recipient";
import Holiday from "~/parser/holiday";
import type { PronoteApiNewsPublicSelf } from "~/constants/news";
import { callApiUserNewsStatus } from "~/api/user/newsStatus";
import Authorizations from "~/parser/authorizations";
import type { PronoteApiUserResourceType } from "~/constants/users";
import { callApiUserCreateDiscussionRecipients } from "~/api/user/createDiscussionRecipients";
import { PronoteApiResourceType } from "~/constants/resources";
import { callApiUserCreateDiscussion } from "~/api/user/createDiscussion";
import { callApiUserCreateDiscussionMessage } from "~/api/user/createDiscussionMessage";
import { getPronoteMessageButtonType } from "~/pronote/messages";
import { createPronoteUploadCall } from "~/pronote/requestUpload";
import { PronoteApiFunctions } from "~/constants/functions";
import { callApiUserHomeworkUpload } from "~/api/user/homeworkUpload";
import { callApiUserHomeworkRemoveUpload } from "~/api/user/homeworkRemoveUpload";
import { callApiUserHomepage } from "~/api/user/homepage";
import { Partner } from "~/parser/partner";
import { callApiUserPartnerURL } from "~/api/user/partnerURL";
import { PronoteApiDomainFrequencyType, PronoteApiMaxDomainCycle } from "~/constants/domain";
import { parseSelection } from "~/pronote/select";
import { TimetableOverview } from "~/parser/timetable";
import { callApiUserDiscussionCommand } from "~/api/user/discussionCommand";
import { ApiUserDiscussionAvailableCommands } from "~/api/user/discussionCommand/types";
import type { PawnoteSupportedFormDataFile } from "~/utils/file";
import { callApiUserGeneratePDF } from "~/api/user/generatePDF";
import { Onglets } from "~/parser/onglets";

export default class Pronote {
  private queue: Queue;

  constructor (
    public fetcher: PawnoteFetcher,
    private session: Session,
    credentials: NextAuthenticationCredentials,

    // Accessor for raw data returned from Pronote's API.
    private user: ApiUserData["output"]["data"]["donnees"],
    public loginInformations: ApiLoginInformations["output"]["data"]
  ) {
  }

  /**
   * When `to` is not given, it'll default to the end of the year.
   */
  public async getHomeworkForInterval (from: Date, to = this.lastDate): Promise<StudentHomework[]> {
    from = getUTCDate(from);
    to   = getUTCDate(to);

    let fromWeekNumber = translateToPronoteWeekNumber(from, this.firstMonday);
    let toWeekNumber   = translateToPronoteWeekNumber(to, this.firstMonday);

    // Make sure to set the default to 1.
    if (fromWeekNumber <= 0) fromWeekNumber = 1;
    if (toWeekNumber <= 0) toWeekNumber = 1;

    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserHomework(this.fetcher, {
        session: this.session,
        fromWeekNumber,
        toWeekNumber
      });

      return data.ListeTravauxAFaire.V
        .map((homework) => new StudentHomework(this, homework))
        .filter((homework) => <Date>from <= homework.deadline && homework.deadline <= <Date>to);
    });
  }

  public async getHomeworkForWeek (weekNumber: number): Promise<StudentHomework[]> {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserHomework(this.fetcher, {
        session: this.session,
        fromWeekNumber: weekNumber
      });

      return data.ListeTravauxAFaire.V
        .map((homework) => new StudentHomework(this, homework));
    });
  }

  public async getResourcesForWeek (weekNumber: number) {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserResources(this.fetcher, {
        session: this.session,
        fromWeekNumber: weekNumber
      });

      return {
        lessons: data.ListeCahierDeTextes.V
          .map((lesson) => new StudentLessonResource(this, lesson))
      };
    });
  }

  public async getResourcesForInterval (from: Date, to?: Date) {
    if (!(to instanceof Date)) {
      to = this.lastDate;
    }

    from = getUTCDate(from);
    to   = getUTCDate(to);

    let fromWeekNumber = translateToPronoteWeekNumber(from, this.firstMonday);
    let toWeekNumber   = translateToPronoteWeekNumber(to, this.firstMonday);

    // Make sure to set the default to 1.
    if (fromWeekNumber <= 0) fromWeekNumber = 1;
    if (toWeekNumber <= 0) toWeekNumber = 1;

    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserResources(this.fetcher, {
        session: this.session,
        fromWeekNumber,
        toWeekNumber
      });

      return {
        lessons: data.ListeCahierDeTextes.V
          .map((lesson) => new StudentLessonResource(this, lesson))
          .filter((lesson) => <Date>from <= lesson.end && lesson.end <= <Date>to)
      };
    });
  }

  public async patchHomeworkStatus (homeworkID: string, done: boolean): Promise<void> {
    return this.queue.push(async () => {
      await callApiUserHomeworkStatus(this.fetcher, {
        session: this.session,
        id: homeworkID,
        status: done
      });

      return void 0;
    });
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

  /**
   * Allows to get more information such as student's INE, email, phone and address.
   * @param forceUpdate - Forces the API request, even if a cache for this request was made.
   */
  public async getPersonalInformation (forceUpdate = false): Promise<StudentPersonalInformation> {
    return this.queue.push(async () => {
      // Use cache when exists and allowed.
      if (this.personalInformationCache && !forceUpdate) return this.personalInformationCache;

      // Otherwise, let's renew the data.
      const { data: { donnees: data } } = await callApiUserPersonalInformation(this.fetcher, {
        session: this.session,
        userID: this.user.ressource.N
      });

      this.personalInformationCache = new StudentPersonalInformation(this.session, data);
      return this.personalInformationCache;
    });
  }

  public getTimetableICalURL (iCalToken: string, fileName = "timetable"): string {
    const version = this.session.instance.version.join(".");
    return `${this.pronoteRootURL}/ical/${fileName}.ics?icalsecurise=${iCalToken}&version=${version}&param=266f3d32`;
  }

  public async getLessonResource (lessonId: string): Promise<StudentLessonResource> {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserLessonResource(this.fetcher, {
        session: this.session,
        lessonId
      });

      const content = data.ListeCahierDeTextes.V[0];
      return new StudentLessonResource(this, content);
    });
  }

  public async getLessonHomework (lessonId: string): Promise<StudentHomework[]> {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserLessonHomework(this.fetcher, {
        session: this.session,
        lessonId
      });

      return data.ListeCahierDeTextes.V[0].ListeTravailAFaire.V
        .map((homework) => new StudentHomework(this, homework));
    });
  }

  public async getNews (): Promise<StudentNews> {
    return this.queue.push(async () => {
      const { data: { donnees: data }} = await callApiUserNews(this.fetcher, { session: this.session });
      return new StudentNews(this, data);
    });
  }

  #throwIfNotAllowedReadMessages (): void {
    if (!this.authorizations.canReadDiscussions) throw new Error("You can't read messages in this instance.");
  }

  #throwIfNotAllowedCreateMessages (): void {
    if (!this.authorizations.canDiscuss) throw new Error("You can't create messages in this instance.");
  }

  public async getDiscussionsOverview (): Promise<StudentDiscussionsOverview> {
    return this.queue.push(async () => {
      this.#throwIfNotAllowedReadMessages();

      const { data } = await callApiUserDiscussions(this.fetcher, { session: this.session });
      return new StudentDiscussionsOverview(this, this.queue, this.session, data.donnees);
    });
  }

  public async getMessagesOverviewFromDiscussion (discussion: StudentDiscussion, markAsRead = false, limit = 0): Promise<MessagesOverview> {
    return this.queue.push(async () => {
      this.#throwIfNotAllowedReadMessages();

      const { data } = await callApiUserMessages(this.fetcher, { possessions: discussion.possessions, session: this.session, markAsRead, limit });
      return new MessagesOverview(
        this, this.queue, this.session,
        discussion,
        data
      );
    });
  }

  public async postDiscussionCommand (payload: ApiUserDiscussionAvailableCommands): Promise<void> {
    await this.queue.push(async () => {
      this.#throwIfNotAllowedCreateMessages();

      await callApiUserDiscussionCommand(this.fetcher, {
        session: this.session,
        ...payload
      });
    });
  }

  /**
   * Mark a discussion as read.
   * @remark Shortcut for `getMessagesFromDiscussion` but here we don't return anything.
   */
  public async markDiscussionAsRead (discussion: StudentDiscussion): Promise<void> {
    await this.getMessagesOverviewFromDiscussion(discussion, true, 0);
  }

  public async getRecipientsForMessage (messageID: string): Promise<FetchedMessageRecipient[]> {
    return this.queue.push(async () => {
      this.#throwIfNotAllowedReadMessages();

      const { data } = await callApiUserMessageRecipients(this.fetcher, {
        session: this.session,
        messageID
      });

      return data.donnees.listeDest.V.map((dest) => new FetchedMessageRecipient(dest));
    });
  }

  /**
   * Updates the status of a news item.
   * Could be a read, or answer to a survey.
   *
   * Should only be used internally, but if you know
   * what you're doing, you can use it.
   */
  public async patchNewsState (information: {
    id: string
    title: string
    public: PronoteApiNewsPublicSelf
  }, answers: StudentNewsItemQuestion[], extra = {
    delete: false,
    markAsRead: true,
    onlyMarkAsRead: false
  }) {
    return this.queue.push(async () => {
      await callApiUserNewsStatus(this.fetcher, {
        session: this.session,
        id: information.id,
        name: information.title,
        publicSelfData: information.public,
        markAsRead: !extra.delete && extra.markAsRead,
        onlyMarkAsRead: !extra.delete && extra.onlyMarkAsRead,
        delete: !extra.onlyMarkAsRead && extra.delete,
        answers: (extra.onlyMarkAsRead || extra.delete) ? [] : answers
      });

      return void 0;
    });
  }

  #throwIfNotAllowedRecipientType (type: PronoteApiUserResourceType): void {
    switch (type) {
      case PronoteApiResourceType.Teacher:
        if (!this.authorizations.canDiscussWithTeachers)
          throw new Error("You can't discuss with teachers.");
        break;
      case PronoteApiResourceType.Student:
        if (!this.authorizations.canDiscussWithStudents)
          throw new Error("You can't discuss with students.");
        break;
      case PronoteApiResourceType.Personal:
        if (!this.authorizations.canDiscussWithStaff)
          throw new Error("You can't discuss with staff.");
        break;
    }
  }

  /**
   * Returns a list of possible recipients when creating a discussion.
   *
   * This step is required before creating a discussion.
   * It allows to know who can be the recipient of the discussion.
   */
  public async getRecipientsForDiscussionCreation (type: PronoteApiUserResourceType): Promise<DiscussionCreationRecipient[]> {
    return this.queue.push(async () => {
      this.#throwIfNotAllowedRecipientType(type);

      const response = await callApiUserCreateDiscussionRecipients(this.fetcher, {
        recipientType: type,
        session: this.session,
        user: {
          type: this.user.ressource.G,
          name: this.user.ressource.L,
          id: this.user.ressource.N
        }
      });

      return response.data.donnees.listeRessourcesPourCommunication.V
        .filter((recipient) => recipient.avecDiscussion)
        .map((r) => new DiscussionCreationRecipient(r));
    });
  }

  /**
   * Creates a discussion.
   *
   * Sadly, we can't get the ID of the created discussion
   * or anything else related to it, you need to request the
   * discussions list once again using `getDiscussionsOverview()`.
  */
  public async createDiscussion (subject: string, content: string, recipients: DiscussionCreationRecipient[]): Promise<void> {
    return this.queue.push(async () => {
      this.#throwIfNotAllowedCreateMessages();
      if (recipients.length <= 0) throw new Error("You need to select at least one recipient to create a discussion.");

      await callApiUserCreateDiscussion(this.fetcher, {
        session: this.session,
        recipients,
        subject,
        content: {
          isHTML: this.authorizations.hasAdvancedDiscussionEditor,
          value: content
        }
      });
    });
  }

  public async replyToDiscussionMessage (replyMessageID: string, content: string, button: PronoteApiMessagesButtonType, includeParentsAndStudents = false): Promise<void> {
    return this.queue.push(async () => {
      this.#throwIfNotAllowedCreateMessages();
      const buttonType = getPronoteMessageButtonType(button, includeParentsAndStudents);

      await callApiUserCreateDiscussionMessage(this.fetcher, {
        session: this.session,
        replyMessageID,
        button: buttonType,
        content: {
          isHTML: this.authorizations.hasAdvancedDiscussionEditor,
          value: content
        }
      });
    });
  }

  public async uploadHomeworkFile (homeworkID: string, file: PawnoteSupportedFormDataFile, fileName: string): Promise<void> {
    return this.queue.push(async () => {
      // Check if the homework can be uploaded.
      // Otherwise we'll get an error during the upload.
      // @ts-expect-error : trust the process.
      const fileSize: number | undefined = file.size || file.byteLength;
      if (typeof fileSize === "number" && fileSize > this.#authorizations.maxHomeworkFileUploadSize) {
        throw new Error(`File size is too big, maximum allowed is ${this.#authorizations.maxHomeworkFileUploadSize} bytes.`);
      }

      // Ask to the server to store the file for us.
      const payload = this.session.writePronoteFileUploadPayload(file);
      await createPronoteUploadCall(this.fetcher, PronoteApiFunctions.HomeworkUpload, {
        session_instance: this.session.instance,
        fileName: fileName,
        payload
      });

      await callApiUserHomeworkUpload(this.fetcher, {
        fileID: payload.fileID,
        fileName,
        homeworkID,
        session: this.session
      });
    });
  }

  public async removeHomeworkFile (homeworkID: string): Promise<void> {
    return this.queue.push(async () => {
      await callApiUserHomeworkRemoveUpload(this.fetcher, {
        session: this.session,
        homeworkID
      });
    });
  }

  public getFrequencyForWeek (weekNumber: number): { type: PronoteApiDomainFrequencyType, name: string } | null {
    if (weekNumber < 1) throw new Error("Week number must be at least 1.");
    else if (weekNumber > PronoteApiMaxDomainCycle) throw new Error(`Week number can't be more than maximum value which is ${PronoteApiMaxDomainCycle}.`);

    return this.#weekFrequencies[weekNumber];
  }
}
