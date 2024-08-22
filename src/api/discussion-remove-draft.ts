import { Discussion, DiscussionCommand, DiscussionDraftMessage, DiscussionMessages, SessionHandle } from "~/models";
import { discussionPostCommand } from "./private/discussion-post-command";
import { discussions } from "./discussions";
import { discussionMessages } from "./discussion-messages";

export const discussionRemoveDraft = async (session: SessionHandle, discussion: Discussion, draft: DiscussionDraftMessage): Promise<void> => {
  await discussionPostCommand(session, DiscussionCommand.Delete, {
    possessions: [{ N: draft.possessionID }]
  });

  await discussions(session, discussion.cache);
  await discussionMessages(session, discussion);
};
