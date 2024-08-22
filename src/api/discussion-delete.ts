import { Discussion, DiscussionCommand, SessionHandle } from "~/models";
import { discussions } from "./discussions";
import { discussionPostCommand } from "./private/discussion-post-command";

export const discussionDelete = async (session: SessionHandle, discussion: Discussion): Promise<void> => {
  await discussionPostCommand(session, DiscussionCommand.Delete, {
    possessions: discussion.possessions
  });

  // Will also remove the reference in the cache.
  await discussions(session, discussion.cache);
};
