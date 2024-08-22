import { Discussion, DiscussionCommand, type DiscussionDraftMessage, type SessionHandle } from "~/models";
import { discussionPostCommand } from "./private/discussion-post-command";
import { discussions } from "./discussions";
import { discussionMessages } from "./discussion-messages";

/**
 * Send local changes to the object
 * to the server.
 */
export const discussionRemoteMutateDraft = async (session: SessionHandle, discussion: Discussion, draft: DiscussionDraftMessage): Promise<void> => {
  await discussionPostCommand(session, DiscussionCommand.brouillon, {
    id: draft.possessionID,
    content: draft.content,
    replyMessageID: draft.replyMessageID
  });

  await discussions(session, discussion.cache);
  await discussionMessages(session, discussion);
};
