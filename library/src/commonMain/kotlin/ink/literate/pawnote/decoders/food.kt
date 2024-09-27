package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Food

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeFood (food: JsonObject) = Food(
    name = food["L"]!!.jsonPrimitive.content,
    allergens = food["listeAllergenesAlimentaire"]!!.jsonObject["V"]!!.jsonArray.map { decodeFoodAllergen(it.jsonObject) },
    labels = food["listeLabelsAlimentaires"]!!.jsonObject["V"]!!.jsonArray.map { decodeFoodLabel(it.jsonObject) }
)