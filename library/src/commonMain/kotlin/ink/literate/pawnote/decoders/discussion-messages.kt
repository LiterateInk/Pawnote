package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.*
import kotlinx.serialization.json.*

fun decodeDiscussionMessages (messages: JsonObject, session: SessionHandle): DiscussionMessages {
    val draft = messages["brouillon"]
    val sents: MutableList<DiscussionMessage<DiscussionSentMessage>> = mutableListOf()
    val drafts: MutableList<DiscussionDraftMessage> = mutableListOf()
    val defaultReplyMessageID = messages["messagePourReponse"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content

    for (message in messages["listeMessages"]!!.jsonObject["V"]!!.jsonArray)
        if (draft != null) drafts.add(decodeDiscussionDraftMessage(message.jsonObject))
        else sents.add(decodeDiscussionMessage(message.jsonObject, session, { decodeDiscussionSentMessage(message.jsonObject, session, sents) }))

    sents.sortedWith {a, b -> b.creationDate.time.toMillisecondOfDay() - a.creationDate.time.toMillisecondOfDay()}

    if (draft != null) {
        val isHTML = draft.jsonObject["V"]!!.jsonObject["estHTML"]?.jsonPrimitive?.boolean ?: false

        drafts.add(
            DiscussionDraftMessage(
                isHTML = isHTML,
                content = if (isHTML) draft.jsonObject["V"]!!.jsonObject["contenu"]!!.jsonPrimitive.content else draft.jsonObject["V"]!!.jsonObject["contenu"]!!.jsonObject["V"]!!.jsonPrimitive.content,
                possessionID = draft.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,
                replyMessageID = defaultReplyMessageID
            )
        )
    }

    val actionObj = messages["listeBoutons"]!!.jsonObject["V"]!!.jsonArray.find { it.jsonObject["L"]!!.jsonPrimitive.content.startsWith("Envoyer") }
    val sendAction: DiscussionSendAction? = if (actionObj != null) DiscussionSendAction.fromInt(actionObj.jsonObject["G"]!!.jsonPrimitive.int) else null
    val canIncludeStudentsAndParents = sendAction == DiscussionSendAction.ReplyEveryoneExceptParentsAndStudents
            || sendAction == DiscussionSendAction.SendEveryoneExceptParentsAndStudents

    return DiscussionMessages(
        sents = sents,
        drafts = drafts,
        defaultReplyMessageID = defaultReplyMessageID,
        sendAction = sendAction,
        canIncludeStudentsAndParents = canIncludeStudentsAndParents
    )
}