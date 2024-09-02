package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.Holiday

fun decodeHoliday (holiday: JsonObject): Holiday {
    return Holiday(
        id = holiday["N"]!!.jsonPrimitive.content,
        name = holiday["L"]!!.jsonPrimitive.content,
        startDate = decodePronoteDate(holiday["dateDebut"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        endDate = decodePronoteDate(holiday["dateFin"]!!.jsonObject["V"]!!.jsonPrimitive.content)
    )
}