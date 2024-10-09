package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.AssignmentTheme
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeAssignmentTheme(theme: JsonObject) =
    AssignmentTheme(
        id = theme["N"]!!.jsonPrimitive.content,
        name = theme["L"]!!.jsonPrimitive.content,
        subject = decodeSubject(theme["Matiere"]!!.jsonObject["V"]!!.jsonObject))
