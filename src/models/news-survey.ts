import type { NewsQuestion } from "./news-question";
import type { NewsItem } from "./news-item";

export type NewsSurvey = NewsItem & Readonly<{
  is: "survey",

  /**
   * List of the questions contained in this survey.
   * You can answer them by reassigning the `answer` property.
   *
   * @example
   * question.answer = "[1..2]";
   */
  questions: NewsQuestion[]

  /** Whether your reply is anonymous or not. */
  isAnonymous: boolean
}>;
