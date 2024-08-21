import type { SessionHandle } from "~/models";
import type { NewsQuestion } from "~/models/news-question";
import { decodeAttachment } from "./attachment";
import { decodePronoteDate } from "./pronote-date";
import { NewsQuestionKind } from "~/models/news-question-kind";
import { decodeNewsQuestionChoice } from "./news-question-choice";
import { decodeDomain } from "./domain";

export const decodeNewsQuestion = (question: any, session: SessionHandle): NewsQuestion => {
  const kind: NewsQuestionKind = question.genreReponse;
  const answered: boolean = question.reponse.V.avecReponse;

  let selectedAnswers: number[] | undefined;
  let textInputAnswer: string | undefined;

  if (answered && question.reponse.V.valeurReponse) {
    if (typeof question.reponse.V.valeurReponse === "string") {
      textInputAnswer = question.reponse.V.valeurReponse;
    }
    else {
      selectedAnswers = decodeDomain(question.reponse.V.valeurReponse.V);
      textInputAnswer = question.reponse.V.valeurReponseLibre;
    }
  }

  return {
    id: question.N,
    fullTitle: question.L,
    title: question.titre,
    position: question.rang,
    kind,

    maximumLength: question.tailleReponse,
    shouldRespectMaximumChoices: question.avecMaximum,
    maximumChoices: question.nombreReponsesMax,
    content: question.texte.V,

    attachments: question.listePiecesJointes.V.map((attachment: any) => decodeAttachment(attachment, session)),

    answerID: question.reponse.V.N,
    answered,

    shouldAnswer: question.reponse.V.estReponseAttendue,
    answerDate: question.reponse.V.reponduLe?.V && decodePronoteDate(question.reponse.V.reponduLe.V),

    choices: kind === NewsQuestionKind.TextInput ? [] : question.listeChoix.V.map(decodeNewsQuestionChoice),

    selectedAnswers,
    textInputAnswer
  };
};
