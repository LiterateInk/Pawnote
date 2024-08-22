import type { NewsCategory, SessionHandle, NewsInformation } from "~/models";
import { decodeNewsItem } from "./news-item";
import { decodeNewsQuestion } from "./news-question";

export const decodeNewsInformation = (information: any, session: SessionHandle, categories: NewsCategory[]): NewsInformation => {
  return {
    is: "information",
    ...decodeNewsItem(information, categories),
    question: decodeNewsQuestion(information.listeQuestions.V[0], session),

    get attachments () {
      return this.question.attachments;
    },

    get acknowledged () {
      return this.question.answered;
    },

    get acknowledgedDate () {
      return this.question.answerDate;
    },

    get needToAcknowledge () {
      return this.question.shouldAnswer;
    },

    get content () {
      return this.question.content;
    }
  };
};
