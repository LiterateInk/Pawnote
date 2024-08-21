import { NewsQuestion } from "~/models/news-question";
import { NewsQuestionKind } from "~/models/news-question-kind";

export const newsQuestionLocalMutate: {
  (question: NewsQuestion, textInputAnswer?: string): void;
  (question: NewsQuestion, selectedAnswers?: number[], otherFieldTextValue?: string): void;
  (question: NewsQuestion, answers?: number[] | string, textInput?: string): void;
} = (
  question: NewsQuestion,
  answers?: number[] | string,
  textInput?: string
): void => {
  if (
    question.kind === NewsQuestionKind.TextInput ||
    question.kind === NewsQuestionKind.InformationText
  ) {
    question.textInputAnswer = answers as string | undefined;
  }
  else {
    question.selectedAnswers = answers as number[] | undefined;
    question.textInputAnswer = textInput;
  }

  question.answered = typeof answers !== "undefined";
  question.answerDate = question.answered ? new Date() : undefined;
};
