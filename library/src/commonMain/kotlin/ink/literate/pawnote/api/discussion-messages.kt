package ink.literate.pawnote.api

import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.decoders.decodeDiscussionMessages
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionMessages
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

/**
 * Fetches the messages and writes them in the discussion.
 * By default it won't mark the messages as read even after fetching them.
 *
 * You can change this behavior by setting `markAsRead` to `true`.
 * There's no other way to mark the messages as read.
 *
 * @param markAsRead Whether to mark the messages as read after fetching them.
 */
suspend fun discussionMessages (session: SessionHandle, discussion: Discussion, markAsRead: Boolean = false): DiscussionMessages {
    val request = RequestFN(session.information, "ListeMessages", Json.encodeToString(
        buildJsonObject {
            putJsonObject("_Signature_") {
                put("onglet", TabLocation.Discussions.code)
            }

            putJsonObject("donnees") {
                put("listePossessionsMessages", discussion.possessions)
                put("marquerCommeLu", markAsRead)
                put("nbMessagesVus", 0)
            }
        }
    ))

    val response = request.send()
    val messages = decodeDiscussionMessages(Json.parseToJsonElement(response.data).jsonObject["donnees"]!!.jsonObject, session)

    discussion.messages = messages

    return messages
}