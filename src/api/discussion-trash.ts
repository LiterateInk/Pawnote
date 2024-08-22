import { Discussion, DiscussionCommand, SessionHandle } from "~/models";
import { discussions } from "./discussions";
import { discussionPostCommand } from "./private/discussion-post-command";

export const discussionTrash = async (session: SessionHandle, discussion: Discussion): Promise<void> => {
  await discussionPostCommand(session, DiscussionCommand.Trash, {
    possessions: discussion.possessions
  });

  await discussions(session, discussion.cache);
};
