package decoders

import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonPrimitive
import models.SessionInformation
import models.TimetableClassActivity

fun decodeTimetableClassActivity (item: JsonObject, sessionInformation: SessionInformation) = TimetableClassActivity(
    title = item["motif"]!!.jsonPrimitive.content,
    attendants = item["accompagnateurs"]!!.jsonArray.map { it.jsonPrimitive.content },
    resourceTypeName = item["strGenreRess"]!!.jsonPrimitive.content,
    resourceValue = item["strRess"]!!.jsonPrimitive.content
)