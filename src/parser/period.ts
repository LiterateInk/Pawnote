import type Pronote from "~/client/Pronote";
import type { PronoteApiLoginInformations } from "~/api";

import { readPronoteApiDate } from "~/pronote/dates";

export class Period {
  public id: string;
  public name: string;
  public start: Date;
  public end: Date;

  constructor (
    public client: Pronote,
    period: PronoteApiLoginInformations["response"]["donnees"]["General"]["ListePeriodes"][number]
  ) {
    this.id = period.N;
    this.name = period.L;
    this.start = readPronoteApiDate(period.dateDebut.V);
    this.end = readPronoteApiDate(period.dateFin.V);
  }

  public getGradesOverview () {
    return this.client.getGradesOverviewForPeriod(this);
  }

  public getEvaluations () {
    return this.client.getEvaluationsForPeriod(this);
  }

  /**
   * Retrieves delays, absences and punishments for this period.
   */
  public getAttendanceOverview () {
    return this.client.getAttendanceOverviewForPeriod(this);
  }
}
