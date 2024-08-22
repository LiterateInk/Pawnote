import type { NewDiscussionRecipientFunction } from "~/models";

export const decodeNewDiscussionRecipientFunction = (fn: any): NewDiscussionRecipientFunction => {
  return {
    id: fn.N,
    name: fn.L
  };
};
