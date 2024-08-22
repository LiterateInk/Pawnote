export const DiscussionSendAction = {
  Send: 0,
  SendEveryone: 1,
  SendEveryoneExceptParentsAndStudents: 3,
  ReplyEveryone: 2,
  ReplyEveryoneExceptParentsAndStudents: 4,
  Close: 5
} as const;

export type DiscussionSendAction = typeof DiscussionSendAction[keyof typeof DiscussionSendAction];
