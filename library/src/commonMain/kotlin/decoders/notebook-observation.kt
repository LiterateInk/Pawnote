package decoders

import kotlinx.serialization.json.*
import models.NotebookObservation
import models.NotebookObservationKind
import models.Subject

fun decodeNotebookObservation (observation: JsonObject): NotebookObservation {
    var subject: Subject? = null

    if (observation["matiere"]!!.jsonObject["V"]!!.jsonObject.contains("L")
        && observation["matiere"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content != "0")
        subject = decodeSubject(observation["matiere"]!!.jsonObject["V"]!!.jsonObject)

    return NotebookObservation(
        id = observation["N"]!!.jsonPrimitive.content,
        date = decodePronoteDate(observation["date"]!!.jsonObject["V"]!!.jsonPrimitive.content),

        opened = observation["estLue"]!!.jsonPrimitive.boolean,
        shouldParentsJustify = observation["avecARObservation"]!!.jsonPrimitive.boolean,

        name = observation["L"]!!.jsonPrimitive.content,
        kind = NotebookObservationKind.fromInt(observation["genreObservation"]!!.jsonPrimitive.int),
        sectionID = observation["rubrique"]!!.jsonObject["V"]!!.jsonObject["N"]!!.jsonPrimitive.content,

        subject = subject,
        reason = observation["commentaire"]?.jsonPrimitive?.content
    )
}