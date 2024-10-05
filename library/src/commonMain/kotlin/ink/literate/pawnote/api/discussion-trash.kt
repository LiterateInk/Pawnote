package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.discussionPostCommand
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionCommand
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.buildJsonObject

suspend fun discussionTrash (session: SessionHandle, discussion: Discussion) {
    discussionPostCommand(session, DiscussionCommand.Trash, buildJsonObject {
        put("possessions", discussion.possessions)
    })

    discussions(session, discussion.cache)
}