package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.FoodAllergen

fun decodeFoodAllergen (allergen: JsonObject) = FoodAllergen(
    name = allergen["L"]!!.jsonPrimitive.content,
    color = allergen["couleur"]!!.jsonPrimitive.content
)