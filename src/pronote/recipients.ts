import type { PronoteApiUserResourceType } from "~/constants/users";
import { PronoteApiResourceType } from "~/constants/resources";
import { MessageRecipient } from "~/parser/recipient";

export const parseHintToType = (hint: string): PronoteApiUserResourceType => {
  let type: PronoteApiUserResourceType;

  switch (hint) {
    case "Professeur":
      type = PronoteApiResourceType.Teacher;
      break;
    case "Personnel":
      type = PronoteApiResourceType.Personal;
      break;
    default:
      type = PronoteApiResourceType.Student;
  }

  return type;
};

export const makeDummyRecipient = (name: string, type: PronoteApiUserResourceType): MessageRecipient => {
  return new MessageRecipient({
    L: name,
    G: type
  });
};
