import type { NewsCategory, SessionHandle, NewsSurvey } from "~/models";
import { decodeNewsQuestion } from "./news-question";
import { decodeNewsItem } from "./news-item";

export const decodeNewsSurvey = (survey: any, session: SessionHandle, categories: NewsCategory[]): NewsSurvey => {
  return {
    is: "survey",
    ...decodeNewsItem(survey, categories),

    questions: survey.listeQuestions.V.map((question: any) => decodeNewsQuestion(question, session)),
    isAnonymous: survey.reponseAnonyme
  };
};
