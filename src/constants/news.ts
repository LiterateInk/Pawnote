import { PronoteApiUserNews } from "~/api/user/news/types";
import type { PronoteApiUserType } from "./users";

export enum PronoteApiNewsQuestionType {
  /** Text from an information news. */
  InformationText = 0,
  /** Question where there's only text (only from an survey news). */
  SurveyText = 5,

  TextInput = 1,
  UniqueChoice = 2,
  MultipleChoice = 3
}

// TODO: Use this inside the function type when implemented
export enum PronoteApiNewsViewType {
  Reception = 0,
  Broadcast = 1,
  Draft = 2,
  Template = 3
}

export class PronoteApiNewsPublicSelf {
  readonly #id: string;
  readonly #name: string;
  readonly #type: PronoteApiUserType;

  constructor (value: PronoteApiUserNews["response"]["donnees"]["listeModesAff"][number]["listeActualites"]["V"][number]["public"]["V"]) {
    this.#id = value.N;
    this.#name = value.L;
    this.#type = value.G;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }
}

export interface PronoteApiNewsAnswer {
  id: string
  type: number
}
