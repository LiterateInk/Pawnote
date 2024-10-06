package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.discussionPostCommand
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionCommand
import ink.literate.pawnote.models.DiscussionDraftMessage
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

/** Send local changes to the object to the server. */
suspend fun discussionRemoteMutateDraft(
    session: SessionHandle,
    discussion: Discussion,
    draft: DiscussionDraftMessage
) {
  discussionPostCommand(
      session,
      DiscussionCommand.brouillon,
      buildJsonObject {
        put("id", draft.possessionID)
        put("content", draft.content)
        put("replyMessageID", draft.replyMessageID)
      })

  discussions(session, discussion.cache)
  discussionMessages(session, discussion)
}
