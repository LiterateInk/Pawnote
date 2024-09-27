package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.SessionInformation
import ink.literate.pawnote.models.TimetableClassActivity

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive

fun decodeTimetableClassActivity (item: JsonObject, sessionInformation: SessionInformation) = TimetableClassActivity(
    title = item["motif"]!!.jsonPrimitive.content,
    attendants = item["accompagnateurs"]!!.jsonArray.map { it.jsonPrimitive.content },
    resourceTypeName = item["strGenreRess"]!!.jsonPrimitive.content,
    resourceValue = item["strRess"]!!.jsonPrimitive.content
)