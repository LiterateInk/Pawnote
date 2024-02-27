import { PronoteApiUserType } from "~/constants/users";
import { BaseMessageRecipient } from "~/parser/recipient";

export const parseHintToType = (hint: string): PronoteApiUserType => {
  let type: PronoteApiUserType;

  switch (hint) {
    case "Professeur":
      type = PronoteApiUserType.Teacher;
      break;
    case "Personnel":
      type = PronoteApiUserType.Personal;
      break;
    default:
      type = PronoteApiUserType.Student;
  }

  return type;
};

export const makeDummyRecipient = (name: string, type: PronoteApiUserType): BaseMessageRecipient => {
  return new BaseMessageRecipient({
    L: name,
    G: type
  });
};
