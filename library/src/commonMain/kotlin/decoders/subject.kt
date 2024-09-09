package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonPrimitive
import models.Subject

fun decodeSubject (subject: JsonObject): Subject {
    return Subject(
        id = subject["N"]!!.jsonPrimitive.content,
        name = subject["L"]!!.jsonPrimitive.content,
        inGroups = subject["estServiceGroupe"]?.jsonPrimitive?.boolean ?: false
    )
}