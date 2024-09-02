package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive
import models.Period

fun decodePeriod (period: JsonObject): Period {
    return Period(
        id = period["N"]!!.jsonPrimitive.content,
        kind = period["G"]!!.jsonPrimitive.content.toInt(),
        name = period["L"]!!.jsonPrimitive.content,

        startDate = decodePronoteDate(period["dateDebut"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        endDate = decodePronoteDate(period["dateFin"]!!.jsonObject["V"]!!.jsonPrimitive.content)
    )
}