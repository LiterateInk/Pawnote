import type { NewsQuestionChoice } from "~/models";

export const decodeNewsQuestionChoice = (choice: any): NewsQuestionChoice => {
  return {
    value: choice.L,
    position: choice.rang,
    isTextInput: !!choice.estReponseLibre
  };
};
