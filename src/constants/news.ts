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

export interface PronoteApiNewsPublicSelf {
  id: string
  name: string
  type: PronoteApiUserType
}

export interface PronoteApiNewsAnswer {
  id: string
  type: number
}
