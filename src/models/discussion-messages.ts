import type { DiscussionSendAction } from "./discussion-send-action";
import type { DiscussionSentMessage } from "./discussion-sent-message";
import type { DiscussionDraftMessage } from "./discussion-draft-message";

export type DiscussionMessages = Readonly<{
  defaultReplyMessageID: string
  sents: Array<DiscussionSentMessage>
  drafts: Array<DiscussionDraftMessage>

  /**
   * Can't create message in the discussion if
   * this is not defined.
   */
  sendAction?: DiscussionSendAction

  /**
   * Whether the button "include students and parents"
   * appears on the UI or not.
   */
  canIncludeStudentsAndParents: boolean
}>;
