import { ApiLoginInformations } from "../api/login/informations/types";
import { ApiUserData } from "../api/user/data/types";
import { callApiUserTimetable } from "../api/user/timetable";
import type { NextAuthenticationCredentials } from "../authenticate/types";
import { StudentLesson } from "../parser/lesson";
import { readPronoteApiDate, translateToPronoteWeekNumber } from "../pronote/dates";
import { Session } from "../session";
import { setDayToEnd, setDayToStart } from "../utils/dates";

export default class Pronote {
  /**
   * First day of the entire timetable.
   * Used to get week numbers relative to this date.
   */
  private startDay: Date;

  constructor (
    private session: Session,
    private credentials: NextAuthenticationCredentials,

    // Accessor for raw data returned from Pronote's API.
    private user: ApiUserData["output"]["data"]["donnees"],
    public loginInformations: ApiLoginInformations["output"]["data"]
  ) {
    this.startDay = readPronoteApiDate(this.loginInformations.donnees.General.PremierLundi.V);
  }

  /**
   * Username that SHOULD be used for any further authentication.
   */
  public get username (): string {
    return this.credentials.username;
  }

  /**
   * Acts as a replacement for the password.
   * Whenever you need to authenticate, you should use this token
   * from now on if you want to avoid entering your password again.
   * 
   * Note that this token is only valid for the `deviceUUID` you provided
   * in the authentication options.
   */
  public get nextTimeToken (): string {
    return this.credentials.token;
  }

  /**
   * Whether the Pronote instance you're connected to
   * is a demonstration server or not.
   * 
   * `authenticateToken` won't work against them since
   * next-time tokens aren't saved, even though
   * it's able to generate them.
   */
  public get isDemo (): boolean {
    return this.session.instance.demo;
  }

  /**
   * Returns the user's lessons for the given time interval, it won't
   * group or care about the week number of the lesson.
   * 
   * If the second argument - `to` - is not given, it'll default
   * to the end of the `from` day.
   * 
   * @example
   * const from = new Date("2023-09-18");
   * const to   = new Date("2023-09-20");
   * 
   * const lessons = await pronote.requestLessonsForInterval(from, to);
   * lessons.forEach(lesson => {
   *   console.log("Do something with your", lesson);
   * });
   */
  public async requestLessonsForInterval (from: Date, to?: Date): Promise<StudentLesson[]> {
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
      const weekLessons = await this.requestTimetableForWeek(weekNumber);
      lessons.push(...weekLessons);
    }

    return lessons.filter(lesson => <Date>from <= lesson.start && lesson.start <= <Date>to);
  }

  /**
   * Returns the user's lessons for the given week number.
   */
  public async requestTimetableForWeek (weekNumber: number): Promise<StudentLesson[]> {
    const { data: { donnees: data } } = await callApiUserTimetable({
      resource: this.user.ressource,
      session: this.session,
      weekNumber
    });

    return data.ListeCours.map(lesson => new StudentLesson(this, lesson));
  }
}