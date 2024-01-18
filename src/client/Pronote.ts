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
import { StudentLesson } from "~/parser/lesson";
import { Period } from "~/parser/period";

import { Session } from "~/session";

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

export default class Pronote {
  /**
   * First day of the entire timetable.
   * Used to get week numbers relative to this date.
   */
  public startDay: Date;

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
  public periods: Array<Period>;

  constructor (
    public fetcher: PawnoteFetcher,
    private session: Session,
    credentials: NextAuthenticationCredentials,

    // Accessor for raw data returned from Pronote's API.
    private user: ApiUserData["output"]["data"]["donnees"],
    public loginInformations: ApiLoginInformations["output"]["data"]
  ) {
    this.startDay = readPronoteApiDate(loginInformations.donnees.General.PremierLundi.V);

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
  public async getLessonsForInterval (from: Date, to?: Date): Promise<StudentLesson[]> {
    setDayToStart(from);

    if (to instanceof Date) setDayToStart(to);
    else {
      to = new Date(from);
      setDayToEnd(to);
    }

    const fromWeekNumber = translateToPronoteWeekNumber(from, this.startDay);
    const toWeekNumber = translateToPronoteWeekNumber(to, this.startDay);

    const lessons: StudentLesson[] = [];

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
  public async getTimetableForWeek (weekNumber: number): Promise<StudentLesson[]> {
    const { data: { donnees: data } } = await callApiUserTimetable(this.fetcher, {
      resource: this.user.ressource,
      session: this.session,
      weekNumber
    });

    return data.ListeCours
      .map((lesson) => new StudentLesson(this, lesson));
  }

  public async getHomeworkForInterval (from: Date, to?: Date): Promise<StudentHomework[]> {
    if (!(to instanceof Date)) {
      to = readPronoteApiDate(this.loginInformations.donnees.General.DerniereDate.V);
    }

    from = getUTCDate(from);
    to   = getUTCDate(to);

    const fromWeekNumber = translateToPronoteWeekNumber(from, this.startDay);
    const toWeekNumber   = translateToPronoteWeekNumber(to, this.startDay);

    const { data: { donnees: data } } = await callApiUserHomework(this.fetcher, {
      session: this.session,
      fromWeekNumber,
      toWeekNumber
    });

    return data.ListeTravauxAFaire.V
      .map((homework) => new StudentHomework(this, homework))
      .filter((homework) => <Date>from <= homework.deadline && homework.deadline <= <Date>to);
  }

  public async getHomeworkForWeek (weekNumber: number): Promise<StudentHomework[]> {
    const { data: { donnees: data } } = await callApiUserHomework(this.fetcher, {
      session: this.session,
      fromWeekNumber: weekNumber
    });

    return data.ListeTravauxAFaire.V
      .map((homework) => new StudentHomework(this, homework));
  }

  public async patchHomeworkStatus (homeworkID: string, done: boolean): Promise<void> {
    await callApiUserHomeworkStatus(this.fetcher, {
      session: this.session,
      id: homeworkID,
      status: done
    });
  }

  /**
   * Get grades overview for a specific period.
   * Including student's grades with averages and the global averages.
   *
   * @remark Internally used in the `Period` class.
   * @param period - Period the grades overview will be from.
   */
  public async getGradesOverviewForPeriod (period: Period) {
    const { data: { donnees: data } } = await callApiUserGrades(this.fetcher, {
      session: this.session,
      periodID: period.id,
      periodName: period.name
    });

    return {
      grades: data.listeDevoirs.V
        .map((grade) => new StudentGrade(this, period, grade)),
      averages: data.listeServices.V
        .map((average) => new StudentAverage(average)),

      overallAverage: readPronoteApiGrade(data.moyGenerale.V),
      classAverage: readPronoteApiGrade(data.moyGeneraleClasse.V)
    };
  }

  public async getEvaluationsForPeriod (period: Period): Promise<StudentEvaluation[]> {
    const { data: { donnees: data } } = await callApiUserEvaluations(this.fetcher, {
      session: this.session,
      period: {
        L: period.name,
        N: period.id,
        G: 2
      }
    });

    return data.listeEvaluations.V
      .map((evaluation) => new StudentEvaluation(evaluation));
  }

  /** Since content inside of it can't change that often, we use a cache to prevent calling the API every time. */
  private personalInformationCache?: StudentPersonalInformation;

  /**
   * Allows to get more information such as student's INE, email, phone and address.
   * @param forceUpdate - Forces the API request, even if a cache for this request was made.
   */
  public async getPersonalInformation (forceUpdate = false): Promise<StudentPersonalInformation> {
    // Use cache when exists and allowed.
    if (this.personalInformationCache && !forceUpdate) return this.personalInformationCache;

    // Otherwise, let's renew the data.
    const { data: { donnees: data } } = await callApiUserPersonalInformation(this.fetcher, {
      session: this.session,
      userID: this.user.ressource.N
    });

    this.personalInformationCache = new StudentPersonalInformation(data.Informations);
    return this.personalInformationCache;
  }
}
