package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.ResourceContent
import ink.literate.pawnote.models.ResourceContentCategory
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.*

fun decodeResourceContent (content: JsonObject, session: SessionHandle) = ResourceContent(
    id = content["N"]!!.jsonPrimitive.content,
    title = content["L"]!!.jsonPrimitive.content,
    description = content["descriptif"]!!.jsonObject["V"]!!.jsonPrimitive.content,
    category = ResourceContentCategory.fromInt(content["categorie"]!!.jsonObject["V"]!!.jsonObject["G"]!!.jsonPrimitive.int),
    files = content["ListePieceJointe"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, session.information) },
    themes = content["ListeThemes"]!!.jsonObject["V"]!!.jsonArray.map { decodeAssignmentTheme(it.jsonObject) },
    // TODO: Investigate to see what is contained here when not `-1`.
    educativeValue = content["parcoursEducatif"]!!.jsonPrimitive.int
)