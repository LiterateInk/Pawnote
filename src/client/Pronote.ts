import type { NextAuthenticationCredentials } from "~/authenticate/types";
import type { ApiLoginInformations } from "~/api/login/informations/types";

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

  public periods: Array<Period>;

  constructor (
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
    this.sessionID = session.instance.session_id;
    this.isDemo = this.session.instance.demo;

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
    const { data: { donnees: data } } = await callApiUserTimetable({
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

    const { data: { donnees: data } } = await callApiUserHomework({
      session: this.session,
      fromWeekNumber,
      toWeekNumber
    });

    return data.ListeTravauxAFaire.V
      .map((homework) => new StudentHomework(this, homework))
      .filter((homework) => <Date>from <= homework.deadline && homework.deadline <= <Date>to);
  }

  public async getHomeworkForWeek (weekNumber: number): Promise<StudentHomework[]> {
    const { data: { donnees: data } } = await callApiUserHomework({
      session: this.session,
      fromWeekNumber: weekNumber
    });

    return data.ListeTravauxAFaire.V
      .map((homework) => new StudentHomework(this, homework));
  }

  public async patchHomeworkStatus (homeworkID: string, done: boolean): Promise<void> {
    await callApiUserHomeworkStatus({
      session: this.session,
      id: homeworkID,
      status: done
    });
  }

  /**
   * Get grades for a specific period.
   *
   * @remark Internally used in the `Period` class.
   * @param period - Period the grades will be from.
   */
  public async getGradesForPeriod (period: Period): Promise<StudentGrade[]> {
    const { data: { donnees: data } } = await callApiUserGrades({
      session: this.session,
      periodID: period.id,
      periodName: period.name
    });

    return data.listeDevoirs.V
      .map((grade) => new StudentGrade(this, period, grade));
  }
}
