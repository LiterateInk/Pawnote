package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Subject

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.boolean
import kotlinx.serialization.json.jsonPrimitive

fun decodeSubject (subject: JsonObject): Subject {
    return Subject(
        id = subject["N"]!!.jsonPrimitive.content,
        name = subject["L"]!!.jsonPrimitive.content,
        inGroups = subject["estServiceGroupe"]?.jsonPrimitive?.boolean ?: false
    )
}