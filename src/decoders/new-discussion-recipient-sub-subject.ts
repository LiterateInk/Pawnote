import type { NewDiscussionRecipientSubSubject } from "~/models";

export const decodeNewDiscussionRecipientSubSubject = (sub: any): NewDiscussionRecipientSubSubject => {
  return {
    id: sub.N,
    name: sub.L,
    from: sub.libelleMatiere
  };
};
