import type { PronoteApiUserType } from "./users";

export enum PronoteApiNewsQuestionType {
  InformationText = 0,
  UniqueChoice = 2,
  MultipleChoice = 3,
  SurveyText = 5
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
