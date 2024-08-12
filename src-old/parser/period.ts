import type Pronote from "~/client/Pronote";
import type { PronoteApiLoginInformations, PronoteApiUserData } from "~/api";
import type { PronoteApiID } from "~/constants/id";

import { readPronoteApiDate } from "~/pronote/dates";

export class OngletPeriod {
  public linkedPeriod?: Period;

  // TODO: Find different types...
  // 0 = ?
  // 1 = ?
  // Is there any more ?
  public notationType?: number;
  public active?: boolean;
  public genre: number;
  public name: string;

  constructor (knownPeriods: Period[], ongletPeriodData: PronoteApiUserData["response"]["donnees"]["ressource"]["listeOngletsPourPeriodes"]["V"][number]["listePeriodes"]["V"][number]) {
    this.linkedPeriod = knownPeriods.find((p) => p.id === ongletPeriodData.N);
    this.notationType = ongletPeriodData.GenreNotation;
    this.active = ongletPeriodData.A;
    this.genre = ongletPeriodData.G;
    this.name = ongletPeriodData.L;
  }
}

export class Period {
  public id: PronoteApiID<112> | "0";
  public name: string;
  public genre: number;

  public start: Date;
  public end: Date;

  constructor (
    public client: Pronote,
    period: PronoteApiLoginInformations["response"]["donnees"]["General"]["ListePeriodes"][number]
  ) {
    this.id = period.N;
    this.name = period.L;
    this.genre = period.G;

    this.start = readPronoteApiDate(period.dateDebut.V);
    this.end = readPronoteApiDate(period.dateFin.V);
  }
}

export interface OngletPeriods {
  /**
   * Default selected period for this onglet.
   */
  default: Period,

  /**
   * List of available periods for this onglet.
   * There might be extra ones not available in `Pronote.periods`.
   */
  values: OngletPeriod[]
}

export const readOngletPeriods = (knownPeriods: Period[], ongletData: PronoteApiUserData["response"]["donnees"]["ressource"]["listeOngletsPourPeriodes"]["V"][number]): OngletPeriods => {
  return {
    default: knownPeriods.find((p) => p.id === ongletData.periodeParDefaut?.V.N)!,
    values: ongletData.listePeriodes.V.map((p) => new OngletPeriod(knownPeriods, p))
  };
};
