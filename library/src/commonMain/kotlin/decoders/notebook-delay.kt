package decoders

import kotlinx.serialization.json.*
import models.NotebookDelay

fun decodeNotebookDelay (delay: JsonObject): NotebookDelay {
    val isReasonUnknown = delay["estMotifNonEncoreConnu"]!!.jsonPrimitive.boolean
    val justified = delay["justifie"]!!.jsonPrimitive.boolean

    return NotebookDelay(
        id = delay["N"]!!.jsonPrimitive.content,
        date = decodePronoteDate(delay["date"]!!.jsonObject["V"]!!.jsonPrimitive.content),
        minutes = delay["duree"]!!.jsonPrimitive.int,
        justified = justified,
        justification = if(justified) delay["justification"]!!.jsonPrimitive.content else null,
        shouldParentsJustify = delay["aJustifierParParents"]!!.jsonPrimitive.boolean,
        administrativelyFixed = delay["reglee"]!!.jsonPrimitive.boolean,
        isReasonUnknown = isReasonUnknown,
        reason = if (!isReasonUnknown) delay["listeMotifs"]!!.jsonObject["V"]!!.jsonArray[0]!!.jsonObject["L"]!!.jsonPrimitive.content else null
    )
}