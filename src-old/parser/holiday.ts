import { PronoteApiLoginInformations } from "~/api";
import { readPronoteApiDate } from "~/pronote/dates";

class Holiday {
  readonly #id: string;
  readonly #name: string;

  readonly #start: Date;
  readonly #end: Date;

  constructor (data: PronoteApiLoginInformations["response"]["donnees"]["General"]["listeJoursFeries"]["V"][number]) {
    this.#id = data.N;
    this.#name = data.L;

    this.#start = readPronoteApiDate(data.dateDebut.V);
    this.#end = readPronoteApiDate(data.dateFin.V);
  }

  public get id (): string {
    return this.#id;
  }

  public get name (): string {
    return this.#name;
  }

  public get start (): Date {
    return this.#start;
  }

  public get end (): Date {
    return this.#end;
  }
}

export default Holiday;
