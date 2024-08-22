import { type Discussion, DiscussionCommand, type SessionHandle } from "~/models";
import { discussionPostCommand } from "./private/discussion-post-command";
import { createEntityID } from "./helpers/entity-id";
import { discussions } from "./discussions";
import { discussionMessages } from "./discussion-messages";

export const discussionCreateDraft = async (session: SessionHandle, discussion: Discussion, content: string, replyTo = discussion.messages?.defaultReplyMessageID): Promise<void> => {
  await discussionPostCommand(session, DiscussionCommand.brouillon, {
    id: createEntityID(),
    content,
    replyMessageID: replyTo
  });

  await discussions(session, discussion.cache);
  await discussionMessages(session, discussion);
};
