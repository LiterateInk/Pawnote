import type { DiscussionRecipient } from "~/models";

export const decodeDiscussionRecipient = (recipient: any): DiscussionRecipient => ({
  id: recipient.N,
  name: recipient.L,
  kind: recipient.G,
  disallowMessages: recipient.refusMess ?? false
});
