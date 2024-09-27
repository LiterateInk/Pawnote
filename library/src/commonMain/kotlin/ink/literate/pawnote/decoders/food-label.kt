package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.FoodLabel

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeFoodLabel (label: JsonObject) = FoodLabel(
    name = label["L"]!!.jsonPrimitive.content,
    color = label["couleur"]!!.jsonPrimitive.content
)