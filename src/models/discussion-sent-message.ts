import type { DiscussionMessage } from "./discussion-message";

export type DiscussionSentMessage = DiscussionMessage & Readonly<{
  replyMessageID: string
  replyingTo?: DiscussionMessage
  transferredMessages: DiscussionMessage[]
}>;
