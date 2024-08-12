import type { PronoteApiUserNews } from "~/api/user/news/types";
import type { PronoteApiUserResourceType } from "./users";

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
  readonly #type: PronoteApiUserResourceType;

  constructor (value: PronoteApiUserNews["response"]["donnees"]["listeModesAff"][number]["listeActualites"]["V"][number]["public"]["V"]) {
    this.#id = value.N;
    this.#name = value.L;
    this.#type = value.G;
  }

  public get id () {
    return this.#id;
  }

  public get name () {
    return this.#name;
  }

  public get type () {
    return this.#type;
  }
}

