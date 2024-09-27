package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.WeekMenu

import kotlinx.serialization.json.*

fun decodeWeekMenu (menu: JsonObject) = WeekMenu(
    containsLunch = menu["AvecRepasMidi"]!!.jsonPrimitive.boolean,
    containsDinner = menu["AvecRepasSoir"]!!.jsonPrimitive.boolean,

    days = menu["ListeJours"]!!.jsonObject["V"]!!.jsonArray.map { decodeMenu(it.jsonObject) },
    weeks = decodeDomain(menu["DomaineDePresence"]!!.jsonObject["V"]!!.jsonPrimitive.content),

    allergens = menu["ListeAllergenes"]!!.jsonObject["V"]!!.jsonArray.map { decodeFoodAllergen(it.jsonObject) },
    labels = menu["Listelabels"]!!.jsonObject["V"]!!.jsonArray.map { decodeFoodLabel(it.jsonObject) }
)