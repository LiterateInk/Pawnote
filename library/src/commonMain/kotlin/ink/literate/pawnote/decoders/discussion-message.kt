package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.DiscussionMessage
import ink.literate.pawnote.models.DiscussionMessageRecipient
import ink.literate.pawnote.models.EntityKind
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.*

fun hintToEntity (hint: String) : EntityKind {
    val type: EntityKind = when (hint) {
        "Professeur" -> EntityKind.Teacher
        "Personnel" -> EntityKind.Personal
        else -> EntityKind.Student
    }

    return type
}

fun <T> decodeDiscussionMessage(message: JsonObject, session: SessionHandle, decoder: (message: JsonObject) -> T): DiscussionMessage<T> {
    var author: DiscussionMessageRecipient? = null

    if (message["public_gauche"]!!.jsonPrimitive.content != "Moi")
        author = DiscussionMessageRecipient(
            name = message["public_gauche"]!!.jsonPrimitive.content,
            kind = hintToEntity(message["hint_gauche"]!!.jsonPrimitive.content)
        )

    var receiver: DiscussionMessageRecipient? = null

    if (message["public_droite"]!!.jsonPrimitive.isString)
        receiver = DiscussionMessageRecipient(
            name = message["public_droite"]!!.jsonPrimitive.content,
            kind = hintToEntity(message["hint_droite"]!!.jsonPrimitive.content)
        )

    return DiscussionMessage(
        id = message["N"]!!.jsonPrimitive.content,
        content = if(message["estHTML"]?.jsonPrimitive?.boolean == true) message["contenu"]!!.jsonObject["V"]!!.jsonPrimitive.content else message["contenu"]!!.jsonPrimitive.content,
        creationDate = decodePronoteDate(message["date"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        author = author,
        receiver = receiver,
        partialVisibility = message["estUnAparte"]!!.jsonPrimitive.boolean,
        amountOfRecipients = (message["nbPublic"]?.jsonPrimitive?.int ?: 1) + 1,
        files = if (message["listeDocumentsJoints"] != null) message["listeDocumentsJoints"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, session.information) } else listOf(),
        data = decoder(message)
    )
}