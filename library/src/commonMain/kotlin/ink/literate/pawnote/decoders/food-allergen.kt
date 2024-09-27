package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.FoodAllergen

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeFoodAllergen (allergen: JsonObject) = FoodAllergen(
    name = allergen["L"]!!.jsonPrimitive.content,
    color = allergen["couleur"]!!.jsonPrimitive.content
)