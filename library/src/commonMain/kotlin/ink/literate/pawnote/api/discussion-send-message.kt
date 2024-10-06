package ink.literate.pawnote.api

import ink.literate.pawnote.api.helpers.createEntityID
import ink.literate.pawnote.core.RequestFN
import ink.literate.pawnote.encoders.encodeDiscussionSendAction
import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.EntityState
import ink.literate.pawnote.models.SessionHandle
import ink.literate.pawnote.models.TabLocation
import ink.literate.pawnote.models.errors.DiscussionActionError
import ink.literate.pawnote.models.errors.DiscussionMessagesMissingError
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.*

suspend fun discussionSendMessage (
    session: SessionHandle,
    discussion: Discussion,
    content: String,
    includeParentsAndStudents: Boolean = false,
    replyTo: String? = discussion.messages?.defaultReplyMessageID
) {
    if (discussion.messages == null)
        throw DiscussionMessagesMissingError()

    if (discussion.messages!!.sendAction == null)
        throw DiscussionActionError()

    val action = encodeDiscussionSendAction(discussion.messages!!.sendAction!!, includeParentsAndStudents)

    val request = RequestFN(session.information, "SaisieMessage", Json.encodeToString(
        buildJsonObject {
            putJsonObject("donnees") {
                if (session.user.authorizations.hasAdvancedDiscussionEditor)
                    putJsonObject("contenu") {
                        put("_T", 21)
                        put("V", content)
                    }
                else
                    put("contenu", content)

                putJsonObject("bouton") {
                    put("N", 0)
                    put("G", action.code)
                }

                putJsonObject("brouillon") {
                    put("N", createEntityID())
                    put("E", EntityState.CREATION.code)
                }

                put("genreDiscussion", 0)

                putJsonObject("messagePourReponse") {
                    put("G", 0)
                    put("N", replyTo)
                }

                putJsonArray("listeFichiers") {}
            }

            putJsonObject("_Signature_") {
                put("onglet", TabLocation.Discussions.code)
            }
        }
    ))

    request.send()

    discussions(session, discussion.cache)
    discussionMessages(session, discussion)
}