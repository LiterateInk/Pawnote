package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.NewDiscussionRecipientFunction
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeNewDiscussionRecipientFunction (fn: JsonObject) = NewDiscussionRecipientFunction(
    id = fn["N"]!!.jsonPrimitive.content,
    name = fn["L"]!!.jsonPrimitive.content
)