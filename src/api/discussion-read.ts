import { Discussion, SessionHandle } from "~/models";
import { discussionMessages } from "./discussion-messages";

/**
 * Mark a discussion as read.
 * @remark Shortcut of `discussionMessages` but here we don't return anything.
 */
export const discussionRead = async (session: SessionHandle, discussion: Discussion) => {
  await discussionMessages(session, discussion, true);
};
