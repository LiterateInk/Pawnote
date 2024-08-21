import type { NewsCategory, SessionHandle, NewsSurvey } from "~/models";
import { decodeNewsItem } from "./news-item";
import { decodeNewsQuestion } from "./news-question";

export const decodeNewsSurvey = (survey: any, session: SessionHandle, categories: NewsCategory[]): NewsSurvey => {
  return {
    is: "survey",
    ...decodeNewsItem(survey, categories),

    questions: survey.listeQuestions.V.map((question: any) => decodeNewsQuestion(question, session)),
    isAnonymous: survey.reponseAnonyme
  };
};
