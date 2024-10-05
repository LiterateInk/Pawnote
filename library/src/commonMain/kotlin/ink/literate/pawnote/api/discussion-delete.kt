package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.discussionPostCommand
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionCommand
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.buildJsonObject

suspend fun discussionDelete (session: SessionHandle, discussion: Discussion) {
    discussionPostCommand(session, DiscussionCommand.Delete, buildJsonObject {
        put("possessions", discussion.possessions)
    })

    // Will also remove the reference in the cache.
    discussions(session, discussion.cache)
}