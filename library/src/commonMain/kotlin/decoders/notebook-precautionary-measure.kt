package decoders

import kotlinx.serialization.json.*
import models.AccessKind
import models.NotebookPrecautionaryMeasure
import models.SessionHandle

fun decodeNotebookPrecautionaryMeasure (item: JsonObject, session: SessionHandle) = NotebookPrecautionaryMeasure(
    id = item["N"]!!.jsonPrimitive.content,
    title = item["nature"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
    comments = item["commentaire"]!!.jsonPrimitive.content,
    reasons = item["listeMotifs"]!!.jsonObject["V"]!!.jsonArray.map { it.jsonObject["L"]!!.jsonPrimitive.content },

    exclusion = item["estUneExclusion"]!!.jsonPrimitive.boolean,

    circumstances = item["circonstances"]!!.jsonPrimitive.content,
    circumstancesDocuments = item["documentsCirconstances"]!!.jsonObject["V"]!!.jsonArray.map { decodeAttachment(it.jsonObject, session.information) },

    decisionMaker = item["decideur"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
    giver = item["demandeur"]!!.jsonObject["V"]!!.jsonObject["L"]!!.jsonPrimitive.content,
    dateGiven = decodePronoteDate(item["dateDemande"]!!.jsonObject["V"]!!.jsonPrimitive.content),
    startDate = decodePronoteDate(item["dateDebut"]!!.jsonObject["V"]!!.jsonPrimitive.content),
    endDate = decodePronoteDate(item["dateFin"]!!.jsonObject["V"]!!.jsonPrimitive.content),
    disallowedAccesses = decodeDomain(item["interditAcces"]!!.jsonObject["V"]!!.jsonPrimitive.content).map { AccessKind.fromInt(it) }
)