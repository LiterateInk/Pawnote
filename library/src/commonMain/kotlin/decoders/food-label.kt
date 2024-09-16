package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.FoodLabel

fun decodeFoodLabel (label: JsonObject) = FoodLabel(
    name = label["L"]!!.jsonPrimitive.content,
    color = label["couleur"]!!.jsonPrimitive.content
)