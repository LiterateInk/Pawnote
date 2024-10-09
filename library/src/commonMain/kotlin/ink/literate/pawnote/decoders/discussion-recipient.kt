package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.DiscussionRecipient
import ink.literate.pawnote.models.DiscussionRecipientKind
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.int
import kotlinx.serialization.json.jsonPrimitive

fun decodeDiscussionRecipient(recipient: JsonObject) =
    DiscussionRecipient(
        id = recipient["N"]!!.jsonPrimitive.content,
        name = recipient["L"]!!.jsonPrimitive.content,
        kind = DiscussionRecipientKind.fromInt(recipient["G"]!!.jsonPrimitive.int),
        disallowMessages = recipient["refusMess"]?.jsonPrimitive?.boolean ?: false)
