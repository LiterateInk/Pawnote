package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewDiscussionRecipientSubSubject
import ink.literate.pawnote.models.NewDiscussionRecipientSubject
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeNewDiscussionRecipientSubject (subject: JsonObject, sub: List<NewDiscussionRecipientSubSubject>) = NewDiscussionRecipientSubject(
    id = subject["N"]!!.jsonPrimitive.content,
    name = subject["L"]!!.jsonPrimitive.content,
    sub = sub
)