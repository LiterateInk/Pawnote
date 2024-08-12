import { PronoteApiMessagesButtonType } from "~/constants/messages";

export const getPronoteMessageButtonType = (type: PronoteApiMessagesButtonType, includeParentsAndStudents: boolean): PronoteApiMessagesButtonType => {
  if (
    type === PronoteApiMessagesButtonType.SendEveryoneExceptParentsAndStudents &&
    includeParentsAndStudents
  ) type = PronoteApiMessagesButtonType.SendEveryone;

  if (
    type === PronoteApiMessagesButtonType.ReplyEveryoneExceptParentsAndStudents &&
    includeParentsAndStudents
  ) type = PronoteApiMessagesButtonType.ReplyEveryone;

  return type;
};
