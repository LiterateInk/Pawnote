export const NewsQuestionKind = {
  /** Text from an information news. */
  InformationText: 0,
  /** Question where there's only text (only from an survey news). */
  SurveyText: 5,

  TextInput: 1,
  UniqueChoice: 2,
  MultipleChoice: 3
} as const;

export type NewsQuestionKind = typeof NewsQuestionKind[keyof typeof NewsQuestionKind];
