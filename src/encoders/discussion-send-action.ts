import { DiscussionSendAction } from "~/models";

export const encodeDiscussionSendAction = (action: DiscussionSendAction, includeParentsAndStudents: boolean): DiscussionSendAction => {
  if (
    action === DiscussionSendAction.SendEveryoneExceptParentsAndStudents &&
    includeParentsAndStudents
  ) action = DiscussionSendAction.SendEveryone;

  if (
    action === DiscussionSendAction.ReplyEveryoneExceptParentsAndStudents &&
    includeParentsAndStudents
  ) action = DiscussionSendAction.ReplyEveryone;

  return action;
};
