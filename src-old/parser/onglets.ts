import { ApiUserData } from "~/api";
import { PronoteApiOnglets } from "~/constants/onglets";

export class Onglets {
  public readonly grades: boolean;
  public readonly resources: boolean;
  public readonly homework: boolean;
  public readonly timetable: boolean;
  public readonly evaluations: boolean;
  public readonly account: boolean;
  public readonly presence: boolean;
  public readonly news: boolean;
  public readonly attendance: boolean;
  public readonly discussions: boolean;
  public readonly gradesreport: boolean;

  public readonly ongletsVisibles: number[];
  private rawData: ApiUserData["output"]["data"]["donnees"]["listeOnglets"];
  constructor(
    data: ApiUserData["output"]["data"]["donnees"]
  ) {
    this.rawData = data.listeOnglets;
    function explore(data: Array<OngletType>, deep: number) {
      let list: number[] = [];
      function traverse(obj: OngletType) {
        if ("G" in obj) {
          list.push(obj.G);
        }
        if (obj.Onglet) {
          obj.Onglet.forEach((child) => traverse(child));
        }
      }
      data.forEach((item) => {
        traverse(item);
      });
      return list;
    }
    this.ongletsVisibles = explore(this.rawData, 0);

    this.grades       = 198 in this.ongletsVisibles;
    this.resources    = 89  in this.ongletsVisibles;
    this.homework     = 88  in this.ongletsVisibles;
    this.timetable    = 16  in this.ongletsVisibles;
    this.evaluations  = 201 in this.ongletsVisibles;
    this.account      = 49 in this.ongletsVisibles;
    this.presence     = 7 in this.ongletsVisibles;
    this.news         = 8 in this.ongletsVisibles;
    this.attendance   = 19 in this.ongletsVisibles;
    this.discussions  = 131 in this.ongletsVisibles;
    this.gradesreport = 13 in this.ongletsVisibles;
  }

  public canAccesOnglet(ongletId: number): boolean {
    return ongletId in this.ongletsVisibles;
  }
}

type OngletType = {
  G: number,
  Onglet?: OngletType[]
};
