import type { NewDiscussionRecipientSubSubject, NewDiscussionRecipientSubject } from "~/models";

export const decodeNewDiscussionRecipientSubject = (subject: any, sub: Array<NewDiscussionRecipientSubSubject>): NewDiscussionRecipientSubject => {
  return {
    id: subject.N,
    name: subject.L,
    sub: sub
  };
};
