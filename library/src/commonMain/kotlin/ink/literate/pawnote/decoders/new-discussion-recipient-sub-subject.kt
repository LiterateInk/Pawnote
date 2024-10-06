package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewDiscussionRecipientSubSubject
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeNewDiscussionRecipientSubSubject (sub: JsonObject) = NewDiscussionRecipientSubSubject(
    id = sub["N"]!!.jsonPrimitive.content,
    name = sub["L"]!!.jsonPrimitive.content,
    from = sub["libelleMatiere"]!!.jsonPrimitive.content
)