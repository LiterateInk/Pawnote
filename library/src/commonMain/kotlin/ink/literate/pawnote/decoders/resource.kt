package ink.literate.pawnote.decoders

import ink.literate.pawnote.models.Resource
import ink.literate.pawnote.models.SessionHandle
import kotlinx.serialization.json.JsonObject
import kotlinx.serialization.json.jsonArray
import kotlinx.serialization.json.jsonObject
import kotlinx.serialization.json.jsonPrimitive

fun decodeResource (resource: JsonObject, session: SessionHandle) = Resource(
    id = resource["N"]!!.jsonPrimitive.content,
    startDate = decodePronoteDate(resource["Date"]!!.jsonObject["V"]!!.jsonPrimitive.content),
    endDate = decodePronoteDate(resource["DateFin"]!!.jsonObject["V"]!!.jsonPrimitive.content),
    subject = decodeSubject(resource["Matiere"]!!.jsonObject["V"]!!.jsonObject),

    haveAssignment = resource.contains("dateTAF"),
    assignmentDeadline = if (resource.contains("dateTAF")) decodePronoteDate(resource["dateTAF"]!!.jsonObject["V"]!!.jsonPrimitive.content) else null,

    teachers = resource["listeProfesseurs"]!!.jsonObject["V"]!!.jsonArray.map { it.jsonObject["L"]!!.jsonPrimitive.content },
    groups = resource["listeGroupes"]!!.jsonObject["V"]!!.jsonArray.map { it.jsonObject["L"]!!.jsonPrimitive.content },

    backgroundColor = resource["CouleurFond"]!!.jsonPrimitive.content,
    contents = resource["listeContenus"]!!.jsonObject["V"]!!.jsonArray.map { decodeResourceContent(it.jsonObject, session) }
)