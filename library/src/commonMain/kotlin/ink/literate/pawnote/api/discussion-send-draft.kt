package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.discussionPostCommand
import ink.literate.pawnote.encoders.encodeDiscussionSendAction
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionDraftMessage
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.errors.DiscussionActionError
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

suspend fun discussionSendDraft (session: SessionHandle, discussion: Discussion, draft: DiscussionDraftMessage, includeParentsAndStudents: Boolean = false) {
    if (discussion.messages == null || discussion.messages!!.sendAction == null)
        throw DiscussionActionError()

    discussionPostCommand(session, null, buildJsonObject {
        put("button", encodeDiscussionSendAction(discussion.messages!!.sendAction!!, includeParentsAndStudents).code)
        put("content", draft.content)
        put("id", draft.possessionID)
        put("replyMessageID", draft.replyMessageID)
    })

    discussions(session, discussion.cache)
    discussionMessages(session, discussion)
}