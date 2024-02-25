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

import { readPronoteApiDate, translateToPronoteWeekNumber } from "~/pronote/dates";
import { getUTCDate, setDayToEnd, setDayToStart } from "~/utils/dates";
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
import { StudentTimetableLesson } from "~/parser/timetableLesson";
import { StudentLessonResource } from "~/parser/lessonResource";
import { callApiUserNews } from "~/api/user/news";
import { StudentNews, StudentNewsItemQuestion } from "~/parser/news";
import { callApiUserDiscussions } from "~/api/user/discussions";
import { StudentDiscussionsOverview } from "~/parser/discussion";
import type { PronoteApiMessagesPossessionsList } from "~/constants/messages";
import { callApiUserMessages } from "~/api/user/messages";
import { StudentMessage } from "~/parser/messages";
import { PronoteApiOnglets } from "~/constants/onglets";
import { callApiUserAttendance } from "~/api/user/attendance";
import { PronoteApiAttendanceItemType } from "~/constants/attendance";
import { StudentAbsence, StudentDelay, StudentPunishment } from "~/parser/attendance";
import { callApiUserMessageRecipients } from "~/api/user/messageRecipients";
import { FetchedMessageRecipient } from "~/parser/recipient";
import Holiday from "~/parser/holiday";
import type { PronoteApiNewsPublicSelf } from "~/constants/news";
import { callApiUserNewsStatus } from "~/api/user/newsStatus";

export default class Pronote {
  /**
   * First day of the entire timetable.
   * Used to get week numbers relative to this date.
   */
  public firstMonday: Date;

  /**
   * First day of the entire year.
   */
  public firstDate: Date;

  /**
   * Last day of the entire year.
   * Used to get week numbers relative to this date.
   */
  public lastDate: Date;

  /**
   * Username that SHOULD be used for any further authentication.
   */
  public username: string;

  /**
   * Acts as a replacement for the password.
   * Whenever you need to authenticate, you should use this token
   * from now on if you want to avoid entering your password again.
   *
   * Note that this token is only valid for the `deviceUUID` you provided
   * in the authentication options.
   */
  public nextTimeToken: string;

  /**
   * Root URL of the Pronote instance.
   */
  public pronoteRootURL: string;

  /**
   * ID of this account type in the Pronote API.
   */
  public accountTypeID: PronoteApiAccountId;

  /**
   * ID of the currently running session on Pronote.
   */
  public sessionID: number;

  /**
   * Whether the Pronote instance you're connected to
   * is a demonstration server or not.
   *
   * `authenticateToken` won't work against them since
   * next-time tokens aren't saved, even though
   * it's able to generate them.
   */
  public isDemo: boolean;

  /** First name and family name of the logged in student. */
  public studentName: string;

  /** School name of the Pronote instance. */
  public schoolName: string;

  /** @example "3A" */
  public studentClass: string;

  /** An absolute URL giving the profile picture of the logged in student, if exists. */
  public studentProfilePictureURL?: string;
  public periods: Period[];
  private periodsByOnglet: Map<PronoteApiOnglets, OngletPeriods>;

  public isDelegate: boolean;
  public isMemberCA: boolean;

  public holidays: Holiday[];

  private queue: Queue;

  constructor (
    public fetcher: PawnoteFetcher,
    private session: Session,
    credentials: NextAuthenticationCredentials,

    // Accessor for raw data returned from Pronote's API.
    private user: ApiUserData["output"]["data"]["donnees"],
    public loginInformations: ApiLoginInformations["output"]["data"]
  ) {
    this.firstMonday = readPronoteApiDate(loginInformations.donnees.General.PremierLundi.V);
    this.firstDate = readPronoteApiDate(loginInformations.donnees.General.PremiereDate.V);
    this.lastDate = readPronoteApiDate(loginInformations.donnees.General.DerniereDate.V);

    this.username = credentials.username;
    this.nextTimeToken = credentials.token;
    this.pronoteRootURL = session.instance.pronote_url;
    this.accountTypeID = session.instance.account_type_id;
    this.sessionID = session.instance.session_id;
    this.isDemo = session.instance.demo;
    this.studentName = user.ressource.L;
    this.schoolName = user.ressource.Etablissement.V.L;
    this.studentClass = user.ressource.classeDEleve.L;

    if (user.ressource.avecPhoto) {
      this.studentProfilePictureURL = new StudentAttachment(this, {
        G: 1,
        N: user.ressource.N,
        L: "photo.jpg"
      }).url;
    }

    this.periods = [];
    for (const period of loginInformations.donnees.General.ListePeriodes) {
      this.periods.push(new Period(this, period));
    }

    this.periodsByOnglet = new Map();
    for (const ongletPeriods of user.ressource.listeOngletsPourPeriodes.V) {
      this.periodsByOnglet.set(ongletPeriods.G, readOngletPeriods(this.periods, ongletPeriods));
    }

    this.isDelegate = user.ressource.estDelegue ?? false;
    this.isMemberCA = user.ressource.estMembreCA ?? false;
    // TODO: user.ressource.avecDiscussionResponsables;
    // TODO: user.ressource.listeClassesDelegue;
    // TODO: user.ressource.nbMaxJoursDeclarationAbsence;
    // TODO: user.ressource.listeGroupes

    this.holidays = loginInformations.donnees.General.listeJoursFeries.V.map((holiday) => new Holiday(holiday));

    // For further requests, we implement a queue.
    this.queue = new Queue();
  }

  /**
   * You shouldn't have to use this usually,
   * but it's exported here in case of need
   * to do some operations required.
   */
  public getAESEncryptionKeys () {
    return this.session.getAESEncryptionKeys();
  }

  /**
   * User lessons for the given time interval, it won't
   * group or care about the week number of the lessons.
   *
   * @param from - Date for the start of the interval. Will be set to the beginning (00h00) of the given date.
   * @param to   - Date for the end of the interval. When not given, it'll default of the end (23h59) of the given date inside `from` parameter.
   *               Otherwise, will be set to the beginning (00h00) of the given date.
   *
   * @example
   * const from = new Date("2023-09-18");
   * const to   = new Date("2023-09-20");
   *
   * const lessons = await pronote.getLessonsForInterval(from, to);
   * lessons.forEach(lesson => {
   *   console.log("Do something with your", lesson);
   * });
   */
  public async getLessonsForInterval (from: Date, to?: Date): Promise<StudentTimetableLesson[]> {
    setDayToStart(from);

    if (to instanceof Date) setDayToStart(to);
    else {
      to = new Date(from);
      setDayToEnd(to);
    }

    let fromWeekNumber = translateToPronoteWeekNumber(from, this.firstMonday);
    let toWeekNumber = translateToPronoteWeekNumber(to, this.firstMonday);

    // Make sure to set the default to 1.
    if (fromWeekNumber <= 0) fromWeekNumber = 1;
    if (toWeekNumber <= 0) toWeekNumber = 1;

    const lessons: StudentTimetableLesson[] = [];

    for (let weekNumber = fromWeekNumber; weekNumber <= toWeekNumber; weekNumber++) {
      const weekLessons = await this.getTimetableForWeek(weekNumber);
      lessons.push(...weekLessons);
    }

    return lessons
      .filter((lesson) => <Date>from <= lesson.start && lesson.start <= <Date>to);
  }

  /**
   *
   * @param weekNumber
   * @returns
   */
  public async getTimetableForWeek (weekNumber: number): Promise<StudentTimetableLesson[]> {
    return this.queue.push(async () => {
      const { data: { donnees: data } } = await callApiUserTimetable(this.fetcher, {
        resource: this.user.ressource,
        session: this.session,
        weekNumber
      });

      return data.ListeCours
        .map((lesson) => new StudentTimetableLesson(this, lesson));
    });
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

  public readPeriodsForGradesOverview (): Period[] {
    return this.periodsByOnglet.get(PronoteApiOnglets.Grades)!.values.map((period) => period.linkedPeriod)
      .filter(Boolean) as Period[];
  }

  public readDefaultPeriodForGradesOverview (): Period {
    return this.periodsByOnglet.get(PronoteApiOnglets.Grades)!.default;
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

  public readPeriodsForEvaluations (): Period[] {
    return this.periodsByOnglet.get(PronoteApiOnglets.Evaluations)!.values.map((period) => period.linkedPeriod)
      .filter(Boolean) as Period[];
  }

  public readDefaultPeriodForEvaluations (): Period {
    return this.periodsByOnglet.get(PronoteApiOnglets.Evaluations)!.default;
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

  /** Since content inside of it can't change that often, we use a cache to prevent calling the API every time. */
  private personalInformationCache?: StudentPersonalInformation;

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

      this.personalInformationCache = new StudentPersonalInformation(data.Informations);
      return this.personalInformationCache;
    });
  }

  private presenceRequestsInterval?: ReturnType<typeof setInterval>;

  /**
   * @param interval Custom interval (in ms) for `Presence` requests. Default to 2 minutes.
   */
  public startPresenceRequests (interval = 2 * 60 * 1000): void {
    if (this.presenceRequestsInterval) this.stopPresenceRequests();
    this.presenceRequestsInterval = setInterval(() => (
      this.queue.push(() => callApiUserPresence(this.fetcher, { session: this.session }))
    ), interval);
  }

  public stopPresenceRequests (): void {
    if (!this.presenceRequestsInterval) return;
    clearInterval(this.presenceRequestsInterval);
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

  public async getDiscussionsOverview (): Promise<StudentDiscussionsOverview> {
    return this.queue.push(async () => {
      const { data } = await callApiUserDiscussions(this.fetcher, { session: this.session });
      return new StudentDiscussionsOverview(this, data.donnees);
    });
  }

  public async getMessagesFromDiscussion (possessions: PronoteApiMessagesPossessionsList, markAsRead = false): Promise<StudentMessage[]> {
    return this.queue.push(async () => {
      const { data } = await callApiUserMessages(this.fetcher, { possessions, session: this.session, markAsRead });
      return data.donnees.listeMessages.V
        .map((message) => new StudentMessage(this, message))
        .sort((a, b) => b.created.getTime() - a.created.getTime());
    });
  }

  /**
   * Mark a discussion as read.
   * @remark Shortcut for `getMessagesFromDiscussion` but here we don't return anything.
   */
  public async markDiscussionAsRead (possessions: PronoteApiMessagesPossessionsList): Promise<void> {
    await this.getMessagesFromDiscussion(possessions, true);
  }

  public async getRecipientsForMessage (messageID: string): Promise<FetchedMessageRecipient[]> {
    return this.queue.push(async () => {
      const { data } = await callApiUserMessageRecipients(this.fetcher, {
        session: this.session,
        messageID
      });

      return data.donnees.listeDest.V.map((dest) => new FetchedMessageRecipient(dest));
    });
  }

  public readDefaultPeriodForAttendance (): Period {
    return this.periodsByOnglet.get(PronoteApiOnglets.Attendance)!.default;
  }

  public readPeriodsForAttendance (): Period[] {
    return this.periodsByOnglet.get(PronoteApiOnglets.Attendance)!.values.map((period) => {
      if (period.linkedPeriod) return period.linkedPeriod;

      // When the period doesn't exist globally, we need
      // to create one that goes from beginning of the year
      // until the end !
      return new Period(this, {
        N: "0", // Not needed.
        periodeNotation: 0, // Unused.

        G: period.genre,
        L: period.name,

        dateDebut: this.loginInformations.donnees.General.PremiereDate,
        dateFin: this.loginInformations.donnees.General.DerniereDate
      });
    });
  }

  public async getAttendance (period = this.readDefaultPeriodForAttendance()) {
    return this.queue.push(async () => {
      const { data } = await callApiUserAttendance(this.fetcher, {
        session: this.session,
        period
      });

      return data.donnees.listeAbsences.V.map((item) => {
        if (item.G === PronoteApiAttendanceItemType.Absence) {
          return new StudentAbsence(item);
        }
        else if (item.G === PronoteApiAttendanceItemType.Delay) {
          return new StudentDelay(item);
        }
        else if (item.G === PronoteApiAttendanceItemType.Punishment) {
          return new StudentPunishment(this, item);
        }
      }).filter(Boolean) as Array<StudentAbsence | StudentDelay | StudentPunishment>;
    });
  }

  public async patchNewsState (information: {
    id: string
    name: string
    public: PronoteApiNewsPublicSelf
  }, answers: StudentNewsItemQuestion[], extra = {
    markAsRead: true,
    markAsReadOnly: false
  }) {
    return this.queue.push(async () => {
      await callApiUserNewsStatus(this.fetcher, {
        session: this.session,
        id: information.id,
        name: information.name,
        publicSelfData: information.public,
        markAsRead: extra.markAsRead,
        markAsReadOnly: extra.markAsReadOnly,
        answers: extra.markAsReadOnly ? [] : answers
      });

      return void 0;
    });
  }
}
