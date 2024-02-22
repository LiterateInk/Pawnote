import { PronoteApiUserMessageRecipientType } from "~/constants/recipients";
import { BaseMessageRecipient } from "~/parser/recipient";

export const parseHintToType = (hint: string): PronoteApiUserMessageRecipientType => {
  let type: PronoteApiUserMessageRecipientType;

  switch (hint) {
    case "Professeur":
      type = PronoteApiUserMessageRecipientType.Teacher;
      break;
    case "Personnel":
      type = PronoteApiUserMessageRecipientType.Personal;
      break;
    default:
      type = PronoteApiUserMessageRecipientType.Student;
  }

  return type;
};

export const makeDummyRecipient = (name: string, type: PronoteApiUserMessageRecipientType): BaseMessageRecipient => {
  return new BaseMessageRecipient({
    L: name,
    G: type
  });
};
