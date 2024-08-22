import type { DiscussionMessageRecipient } from "~/models/discussion-message-recipient";

export const decodeDisccusionMessageRecipient = (recipient: any): DiscussionMessageRecipient => {
  return {
    name: recipient.L,
    kind: recipient.G
  };
};
