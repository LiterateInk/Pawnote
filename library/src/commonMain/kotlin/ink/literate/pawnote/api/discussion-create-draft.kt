package ink.literate.pawnote.api

import ink.literate.pawnote.api.helpers.createEntityID
import ink.literate.pawnote.api.private.discussionPostCommand
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionCommand
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put

suspend fun discussionCreateDraft (session: SessionHandle, discussion: Discussion, content: String, replyTo: String? = discussion.messages?.defaultReplyMessageID) {
    discussionPostCommand(session, DiscussionCommand.brouillon, buildJsonObject {
        put("id", createEntityID())
        put("content", content)
        put("replyMessageID", replyTo)
    })

    discussions(session, discussion.cache)
    discussionMessages(session, discussion)
}