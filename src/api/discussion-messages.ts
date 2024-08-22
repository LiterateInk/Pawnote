import { RequestFN } from "~/core/request-function";
import { decodeDiscussionMessages } from "~/decoders/discussion-messages";
import { type Discussion, type DiscussionMessages, type SessionHandle, TabLocation } from "~/models";

/**
 * Fetches the messages from the discussion.
 * By default it won't mark the messages as read even after fetching them.
 *
 * You can change this behavior by setting `markAsRead` to `true`.
 * There's no other way to mark the messages as read.
 *
 * @param markAsRead Whether to mark the messages as read after fetching them.
 * @param limit - 0 = no limit, fetch all messages.
 */
export const discussionMessages = async (session: SessionHandle, discussion: Discussion, markAsRead = false, limit = 0): Promise<DiscussionMessages> => {
  const request = new RequestFN(session, "ListeMessages", {
    _Signature_: { onglet: TabLocation.Discussions },

    donnees: {
      listePossessionsMessages: discussion.possessions,
      marquerCommeLu: markAsRead,
      nbMessagesVus: limit
    }
  });

  const response = await request.send();
  return decodeDiscussionMessages(response.data.donnees, session);
};
