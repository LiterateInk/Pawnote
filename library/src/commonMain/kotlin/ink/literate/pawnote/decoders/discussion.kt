package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Discussion
import ink.literate.pawnote.models.DiscussionFolder
import kotlinx.serialization.json.*

fun decodeDiscussion(
    discussion: JsonObject,
    folders: List<DiscussionFolder>,
    cache: MutableList<Discussion>
) =
    Discussion(
        creator = discussion["initiateur"]?.jsonPrimitive?.content,
        recipientName = discussion["public"]?.jsonPrimitive?.content,
        dateAsFrenchText = discussion["libelleDate"]!!.jsonPrimitive.content,
        participantsMessageID =
            discussion["messagePourParticipants"]!!
                .jsonObject["V"]!!
                .jsonObject["N"]!!
                .jsonPrimitive
                .content,
        possessions = discussion["listePossessionsMessages"]!!.jsonObject["V"]!!.jsonArray,
        subject = discussion["objet"]?.jsonPrimitive?.content ?: "",
        numberOfDrafts = discussion["nbBrouillons"]?.jsonPrimitive?.int ?: 0,
        numberOfMessages = discussion["nombreMessages"]?.jsonPrimitive?.int ?: 0,
        numberOfMessagesUnread = discussion["nbNonLus"]?.jsonPrimitive?.int ?: 0,
        folders =
            if (discussion["listeEtiquettes"] != null)
                discussion["listeEtiquettes"]!!
                    .jsonObject["V"]!!
                    .jsonArray
                    .map { current ->
                      folders.find { it.id == current.jsonObject["N"]!!.jsonPrimitive.content }
                    }
                    .filterNotNull()
            else listOf(),
        closed = discussion["ferme"]?.jsonPrimitive?.boolean ?: false,
        cache = cache)
