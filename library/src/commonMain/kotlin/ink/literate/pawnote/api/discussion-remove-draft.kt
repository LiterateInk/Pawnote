package ink.literate.pawnote.api

import ink.literate.pawnote.api.private.discussionPostCommand
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionCommand
import ink.literate.pawnote.models.DiscussionDraftMessage
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.addJsonObject
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import kotlinx.serialization.json.putJsonArray

suspend fun discussionRemoveDraft (session: SessionHandle, discussion: Discussion, draft: DiscussionDraftMessage) {
    discussionPostCommand(session, DiscussionCommand.Delete, buildJsonObject {
        putJsonArray("possessions") {
            addJsonObject {
                put("N", draft.possessionID)
            }
        }
    })

    discussions(session, discussion.cache)
    discussionMessages(session, discussion)
}