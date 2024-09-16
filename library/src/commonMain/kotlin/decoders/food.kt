package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.Food

fun decodeFood (food: JsonObject) = Food(
    name = food["L"]!!.jsonPrimitive.content,
    allergens = food["listeAllergenesAlimentaire"]!!.jsonObject["V"]!!.jsonArray.map { decodeFoodAllergen(it.jsonObject) },
    labels = food["listeLabelsAlimentaires"]!!.jsonObject["V"]!!.jsonArray.map { decodeFoodLabel(it.jsonObject) }
)