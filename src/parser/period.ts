import { PronoteApiLoginInformations } from "~/api";
import type Pronote from "~/client/Pronote";
import { readPronoteApiDate } from "~/pronote/dates";
import type { StudentGrade } from "./grade";

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

  public async getGrades (): Promise<StudentGrade[]> {
    return this.client.getGradesForPeriod(this);
  }
}
