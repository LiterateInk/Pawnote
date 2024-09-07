package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.HomepageLink

fun decodeHomepageLink (link: JsonObject): HomepageLink {
    return HomepageLink(
        description = link["commentaire"]!!.jsonPrimitive.content,
        name = link["L"]!!.jsonPrimitive.content,
        url = link["url"]!!.jsonPrimitive.content
    )
}