package decoders

import kotlinx.serialization.json.*
import models.NotebookPunishment
import models.SessionHandle

fun decodeNotebookPunishment (punishment: JsonObject, session: SessionHandle) = NotebookPunishment(
    id = punishment["N"]!!.jsonPrimitive.content,
    title = punishment["nature"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
    reasons = punishment["listeMotifs"]!!.jsonObject["V"]!!.jsonArray.map { it.jsonObject["L"]!!.jsonPrimitive.content },

    exclusion = punishment["estUneExclusion"]!!.jsonPrimitive.boolean,
    isDuringLesson = !punishment["horsCours"]!!.jsonPrimitive.boolean,

    workToDo = punishment["travailAFaire"]!!.jsonPrimitive.content,
    workToDoDocuments = punishment["documentsTAF"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, session.information) },

    circumstances = punishment["circonstances"]!!.jsonPrimitive.content,
    circumstancesDocuments = punishment["documentsCirconstances"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, session.information) },

    giver = punishment["demandeur"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
    dateGiven = decodePronoteDate(punishment["dateDemande"]!!.jsonObject["V"]!!.jsonPrimitive.content),

    durationMinutes = punishment["duree"]!!.jsonPrimitive.int
)