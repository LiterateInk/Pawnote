import { NewsQuestionChoice } from "./news-question-choice";
import { NewsQuestionKind } from "./news-question-kind";
import { Attachment } from "./attachment";

export type NewsQuestion = Readonly<{
  id: string;
  position: number;
  kind: NewsQuestionKind;

  fullTitle: string;
  title: string;

  shouldRespectMaximumChoices: boolean;
  maximumChoices: number;
  maximumLength: number;

  attachments: Array<Attachment>;
  content: string;

  answerID: string;
  shouldAnswer: boolean;

  choices: Array<NewsQuestionChoice>;
}> & {
  selectedAnswers?: Array<number>;
  textInputAnswer?: string;
  answered: boolean;
  answerDate?: Date;
};
