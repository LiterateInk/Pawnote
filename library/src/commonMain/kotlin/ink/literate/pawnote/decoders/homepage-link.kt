package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.HomepageLink

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeHomepageLink (link: JsonObject): HomepageLink {
    return HomepageLink(
        description = link["commentaire"]!!.jsonPrimitive.content,
        name = link["L"]!!.jsonPrimitive.content,
        url = link["url"]!!.jsonPrimitive.content
    )
}